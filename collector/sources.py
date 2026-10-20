# -*- coding: utf-8 -*-
"""数据源采集 + P1→P2→P3 回退链。

设计要点（规格表「自动化说明」+「回退逻辑说明」）：
  - 开局先做两级网络探测（P1 代理失败后再探 P2 Bing RSS）；两级都不通才进离线分支，
    全流程秒级完成、不刷失败日志；仅 P1 不通时仍允许 x_twitter 走 P2 回退
  - P1（Trends / Reddit / X）先试：能拿到就写真实值；拿不到则按规则 1 沿用上次有效值并标 stale
  - 无历史值 → 记 0 分（不重分配权重）
  - 每次调用都写进 state（连续失败计数、降级、last_success_at）
  - 预算（--budget-seconds）用尽即停止后续网络调用
"""

import time
import urllib.parse
import xml.etree.ElementTree as ET

from . import http
from . import state as state_mod

P1_KEYS = ['trends', 'reddit', 'x_twitter']


def rss_item_count(text):
    """统计 RSS <channel> 下的 <item> 条数；解析失败返回 0（Bing News RSS 为标准 RSS 2.0）"""
    try:
        return len(ET.fromstring(text).findall('.//item'))
    except Exception:  # noqa: BLE001 - 任何解析异常都按 0 条处理，走 none 档
        return 0


def unavailable(origin, kind, error, value=None):
    return {
        'available': False,
        'value': value,
        'origin': origin,
        'kind': kind,
        'stale': True,
        'error': error,
    }


def fresh(origin, kind, value, tier='P1'):
    """tier: P1=主源直连；P2=回退源成功（前端与 used/fallbacks 标注都会区分）"""
    return {
        'available': True,
        'value': value,
        'origin': origin,
        'kind': kind,
        'stale': False,
        'error': None,
        'tier': tier,
    }


class Collector(object):
    def __init__(self, config, state, offline=False, no_cache=False, budget_seconds=60):
        self.config = config
        self.state = state
        self.offline = offline
        self.no_cache = no_cache
        self.deadline = time.time() + max(10, int(budget_seconds))
        self.network = False
        self.p2_network = False
        self.probe_detail = '未探测'
        self.calls = {}
        self.trends_client = None
        self.trends_error = None
        self._init_trends()

    # ---------- 基础设施 ----------

    def _init_trends(self):
        try:
            from pytrends.request import TrendReq  # noqa: F401
            self.trends_client = TrendReq
        except Exception as error:  # noqa: BLE001 - 可选依赖
            self.trends_client = None
            self.trends_error = '未安装 pytrends（可选依赖）：{}'.format(type(error).__name__)

    def budget_left(self):
        return self.deadline - time.time()

    def budget_note(self):
        return '预算剩余 {:.0f}s'.format(self.budget_left())

    def _count(self, key, ok):
        bucket = self.calls.setdefault(key, {'attempted': 0, 'ok': 0, 'failed': 0, 'skipped': 0})
        bucket['attempted'] += 1
        bucket['ok' if ok else 'failed'] += 1

    def _skip(self, key):
        self.calls.setdefault(key, {'attempted': 0, 'ok': 0, 'failed': 0, 'skipped': 0})['skipped'] += 1

    def probe(self):
        if self.offline:
            self.network = False
            self.p2_network = False
            self.probe_detail = '--offline 强制离线'
            return False
        url = self.config['collection']['network_probe_url']
        timeout = self.config['collection']['network_probe_timeout']
        self.network = http.probe_network(url, timeout=timeout)
        if self.network:
            self.p2_network = True
            self.probe_detail = '可达'
            return True
        # P1 代理不可达时再用 P2 代理（Bing News RSS）探测：
        # 境内服务器常见「P1 全墙、P2 可达」，此时仍应让 x_twitter 走 P2 回退，
        # 而不是一刀切进离线分支导致 P2 永远轮不到。
        url_p2 = self.config['collection'].get('network_probe_url_p2')
        self.p2_network = bool(url_p2) and http.probe_network(
            url_p2, timeout=max(5, timeout))
        if self.p2_network:
            self.probe_detail = ('P1 不可达（{}s 探测超时被拒），P2 可达（Bing News RSS）'
                                 .format(timeout))
        else:
            self.probe_detail = '不可达（{}s 探测超时被拒）'.format(timeout)
        return self.p2_network

    # ---------- 各源 ----------

    def _trends(self, game):
        if not self.trends_client:
            self._skip('trends')
            return unavailable('Google Trends', 'P1 主源（未安装 pytrends）',
                               self.trends_error or 'pytrends 不可用')
        # 门禁用「外网任一探针可达」而非单独的 P1 探针：不同源的可达性互不相同，
        # 机房 IP 常见 Reddit 不通但 Google 通，按 P1 探针门控会让 Trends 永不被请求
        if not (self.network or self.p2_network):
            self._skip('trends')
            return unavailable('Google Trends', 'Fallback: Google Search', '网络不可达，跳过调用')
        if self.budget_left() < 8:
            self._skip('trends')
            return unavailable('Google Trends', 'Fallback: Google Search', '预算不足，跳过调用')
        keyword = game.get('name_en') or game.get('name_cn')
        try:
            client = self.trends_client(hl='en-US', tz=0)
            client.build_payload([keyword], timeframe='now 7-d', geo='')
            frame = client.interest_over_time()
            series = [int(v) for v in frame[keyword].tolist()] if keyword in frame else []
            nonzero = len([v for v in series if v > 0])
            # 变化率用首末两点计算：数据点过少时首末两点极易失真为极端值
            # （实测出现过 -100%：7 日窗口内只有个别点位有量），故要求至少 3 个非零数据点。
            # 三种触发原因分别说明：否则「非零点 N 个，少于 3 个」在 N=3（实际因首点为 0 触发）时自相矛盾
            reason = ''
            if len(series) < 2:
                reason = '7 日内有效数据点不足 2 个'
            elif series[0] == 0:
                reason = '7 日窗口首点无搜索量，无法计算变化率'
            elif nonzero < 3:
                reason = '7 日内非零数据点 {} 个，少于 3 个不计算变化率'.format(nonzero)
            if reason:
                self._count('trends', False)
                error = 'Trends 数据不足（{}）'.format(reason)
                state_mod.record(self.state, 'trends', False, error=error,
                                 degrade_after=self.config['collection']['failure_policy']['degrade_after_consecutive_failures'])
                return unavailable('Google Trends', 'Fallback: Google Search', error)
            change = (series[-1] - series[0]) / float(series[0]) * 100.0
            self._count('trends', True)
            state_mod.record(self.state, 'trends', True, value=round(change, 1),
                             degrade_after=self.config['collection']['failure_policy']['degrade_after_consecutive_failures'])
            return fresh('Google Trends', 'P1 主源', round(change, 1))
        except Exception as error:  # noqa: BLE001
            self._count('trends', False)
            state_mod.record(self.state, 'trends', False, error='Trends 限流/异常：{}'.format(error),
                             degrade_after=self.config['collection']['failure_policy']['degrade_after_consecutive_failures'])
            return unavailable('Google Trends', 'Fallback: Google Search', 'Trends 限流/异常：{}'.format(error))

    def _trends_level(self, game, trends_raw):
        """搜索水位（展示用，不参与评分）：把锚点词与游戏词放进同一批次，
        用「锚点定标值 ÷ 锚点同批实测值」把该批 0-100 相对指数折算成
        跨批次、跨游戏可比的「搜索水位」。Google Trends 每批都把该批最高值归一成 100，
        不校准就无法横向比较（同一款游戏在不同批次里的数值互不可比）。

        为什么单独发一次请求：批次里混入锚点词会改变该批的归一化基准，整数截断后
        小量级游戏的变化率会被压成 0/1 噪声——而变化率是占 30% 权重的评分分项，
        不能为展示指标冒这个险。因此评分链路仍走「仅游戏词」的原批次，水位另发一次。

        水位取不到时沿用上次有效值并标 stale，无历史则留空（前端显示「—」）；
        任何情况下都不改动评分。
        """
        conf = self.config.get('trends_anchor') or {}
        target = float(conf.get('target') or 60)
        max_level = float(conf.get('max_level') or 100)
        anchor = conf.get('term')
        result = {
            'value': None, 'raw': None, 'stale': False, 'note': '',
            'anchor_term': anchor, 'anchor_raw': None, 'target': target, 'scale': None,
        }
        if not conf.get('enabled', True) or not anchor:
            result['note'] = '未启用锚点校准（trends_anchor.enabled=false 或 term 为空）'
            return result
        if not self.trends_client:
            result['note'] = '未安装 pytrends，水位不可用'
            return result
        if not (self.network or self.p2_network):
            result['note'] = '网络不可达，水位不可用'
            return self._level_stale(result)
        degrade = self.config['collection']['failure_policy']['degrade_after_consecutive_failures']
        error = trends_raw.get('error') or ''
        # 「数据不足」说明请求本身是成功的（只是点位不够），仍值得再取一次水位；
        # 限流/异常则不再追加请求，直接沿用上次水位，避免加剧限流
        if not trends_raw.get('available') and '数据不足' not in error:
            result['note'] = '变化率请求失败（{}），未再发锚点批次'.format(error or '未知原因')
            return self._level_stale(result)
        if self.budget_left() < 8:
            result['note'] = '预算不足，未发锚点批次'
            return self._level_stale(result)
        keyword = game.get('name_en') or game.get('name_cn')
        interval = float(conf.get('interval_sec') or 0)
        if interval > 0:
            time.sleep(interval)
        try:
            client = self.trends_client(hl='en-US', tz=0)
            client.build_payload([keyword, anchor], timeframe='now 7-d', geo='')
            frame = client.interest_over_time()
            series = [int(v) for v in frame[keyword].tolist()] if keyword in frame else []
            anchor_series = [int(v) for v in frame[anchor].tolist()] if anchor in frame else []
            reason = ''
            if not anchor_series:
                reason = '锚点词「{}」本批无数据'.format(anchor)
            elif anchor_series[-1] <= 0:
                reason = '锚点词「{}」本批末点实测为 0，无法定标'.format(anchor)
            elif not series:
                reason = '游戏词「{}」本批无数据'.format(keyword)
            if reason:
                self._count('trends_level', False)
                state_mod.record(self.state, 'trends_level', False,
                                 error='水位：{}'.format(reason), degrade_after=degrade)
                result['note'] = '水位不可用：{}'.format(reason)
                return self._level_stale(result)
            raw = series[-1]
            anchor_raw = anchor_series[-1]
            scale = target / float(anchor_raw)
            level = min(max_level, max(0.0, raw * scale))
            note = '原始 {} · 锚点实测 {}'.format(raw, anchor_raw)
            if level >= max_level:
                note += ' · 顶格（量级高于锚点）'
            elif raw <= 1:
                note += ' · 分辨率下限（原始值 ≤1）'
            result.update({'value': round(level, 2), 'raw': raw, 'anchor_raw': anchor_raw,
                           'scale': round(scale, 4), 'note': note})
            self._count('trends_level', True)
            state_mod.record(self.state, 'trends_level', True, value=round(level, 2),
                             degrade_after=degrade)
            return result
        except Exception as error:  # noqa: BLE001 - 展示指标，异常只降级不中断
            self._count('trends_level', False)
            state_mod.record(self.state, 'trends_level', False,
                             error='水位锚点批次异常：{}'.format(error), degrade_after=degrade)
            result['note'] = '水位不可用：锚点批次异常 {}'.format(error)
            return self._level_stale(result)

    def _level_stale(self, result):
        """水位取不到：沿用上次有效水位并标 stale；无历史则留空（前端显示「—」）"""
        entry = state_mod.source_state(self.state, 'trends_level')
        last = entry.get('last_value')
        if last is None:
            return result
        result['value'] = last
        result['stale'] = True
        result['note'] = 'stale（沿用上次水位）：{}'.format(result.get('note') or '本次未取到')
        return result

    def _reddit(self, game):
        # 同上：外网任一探针可达即尝试（Reddit 对机房 IP 常 403，失败会快速返回而非等超时）
        if not (self.network or self.p2_network):
            self._skip('reddit')
            return unavailable('Reddit', 'Fallback: Discord/F5Bot', '网络不可达，跳过调用')
        cfg = self.config['collection']
        reserve = float(cfg.get('budget_reserve_sec') or 0)
        if self.budget_left() < max(5.0, reserve):
            self._skip('reddit')
            return unavailable('Reddit', 'Fallback: Discord/F5Bot',
                               '预算接近用尽（预留给其余源），跳过调用')
        query = game.get('name_en') or game.get('name_cn')
        degrade = cfg['failure_policy']['degrade_after_consecutive_failures']
        # 实测（2026-10-18，GitHub runner）：未认证的 .json 端点恒返回 403（与 UA 无关）；
        # 而 .rss 端点可用，但对机房 IP 按「漏桶」限流——3s 间隔时 20 次里仅 3 次成功
        # （起始放行约 2 次，之后约每 40s 才再放行 1 次），其余 429。
        # 站点每天只需 1 次成功更新，故以「先拿到数据」为优先：
        #   - 基础间隔放宽到 min_interval_sec（现 30s），落在可持续速率以内
        #   - 遇 429（限流）再退避 reddit_retry_wait_sec（现 60s）重试，最多 reddit_max_attempts 次
        interval = float(cfg.get('min_interval_sec') or 0)
        retry_wait = float(cfg.get('reddit_retry_wait_sec') or 0)
        attempts = max(1, int(cfg.get('reddit_max_attempts') or 1))
        url = 'https://www.reddit.com/search.rss?q={}&sort=new&t=day'.format(urllib.parse.quote(query))
        result = {'ok': False, 'status': 0, 'error': '未发起请求'}
        for attempt in range(attempts):
            if interval > 0:
                time.sleep(interval)
            result = http.fetch(
                url,
                timeout=cfg['request_timeout'],
                user_agent='xinxicha-monitor/0.1 (by /u/xinxicha)',
                use_cache=not self.no_cache,
                ttl_hours=cfg['cache_ttl_hours'])
            if result.get('ok'):
                break
            # 只有 429（限流）值得退避重试；403 / 超时等重试无益，直接返回走 stale 兜底
            if result.get('status') != 429 or attempt + 1 >= attempts:
                break
            if self.budget_left() < retry_wait + max(5.0, reserve):
                break
            time.sleep(retry_wait)
        if not result.get('ok'):
            self._count('reddit', False)
            state_mod.record(self.state, 'reddit', False, error='Reddit: {}'.format(result.get('error')),
                             degrade_after=degrade)
            return unavailable('Reddit', 'Fallback: Discord/F5Bot', 'Reddit: {}'.format(result.get('error')))
        count = rss_item_count(result.get('text') or '')
        self._count('reddit', True)
        state_mod.record(self.state, 'reddit', True, value=count, degrade_after=degrade)
        return fresh('Reddit', 'P1 主源（.rss）', count)

    def _x_twitter(self, game):
        """无凭据：按规格走 P2 回退——Bing News RSS（公开、免凭据、stdlib 可解析）。

        RSS 只能证明「有新闻提及」，无法区分官方公告与媒体报道，
        保守映射到 x_official 档位 player_only（60 分）；0 条 → none（0 分）。
        """
        kind = 'Fallback: RSS/厂商官网公告'
        if not self.p2_network:
            self._skip('x_twitter')
            return unavailable('X/Twitter', kind, 'P1/P2 网络均不可达，跳过调用')
        if self.budget_left() < 5:
            self._skip('x_twitter')
            return unavailable('X/Twitter', kind, '预算不足，跳过调用')
        query = game.get('name_en') or game.get('name_cn')
        feed = http.fetch_bing_news(
            query,
            timeout=self.config['collection']['request_timeout'],
            user_agent=self.config['collection']['user_agent'],
            use_cache=not self.no_cache,
            ttl_hours=self.config['collection']['cache_ttl_hours'])
        degrade = self.config['collection']['failure_policy']['degrade_after_consecutive_failures']
        if not feed.get('ok'):
            self._count('x_twitter', False)
            state_mod.record(self.state, 'x_twitter', False,
                             error='RSS: {}'.format(feed.get('error')), degrade_after=degrade)
            return unavailable('X/Twitter', kind, 'RSS: {}'.format(feed.get('error')))
        count = rss_item_count(feed.get('text') or '')
        self._count('x_twitter', True)
        value = 'player_only' if count else 'none'
        note = 'Bing News RSS 命中 {} 条'.format(count) if count else 'Bing News RSS 无相关新闻'
        state_mod.record(self.state, 'x_twitter', True, value=value, degrade_after=degrade)
        return fresh('Bing News RSS', note, value, tier='P2')

    def _rss(self, game):
        """P3「官方公告兜底」：Bing News RSS（免凭据、stdlib 可解析）。

        与 x_twitter 的 P2 回退用同一 URL，第二次调用命中 HTTP 缓存（ttl_hours），
        因此不产生额外网络流量。命中条目数只写进 state 供健康表/回退记录，
        不参与 6 项评分（评分维度里没有这一项）。
        """
        kind = 'P3 兜底（Bing News RSS）'
        if not self.p2_network:
            self._skip('rss')
            return unavailable('RSS / 新闻聚合', kind, 'P2 网络不可达，跳过调用')
        if self.budget_left() < 5:
            self._skip('rss')
            return unavailable('RSS / 新闻聚合', kind, '预算不足，跳过调用')
        query = game.get('name_en') or game.get('name_cn')
        feed = http.fetch_bing_news(
            query,
            timeout=self.config['collection']['request_timeout'],
            user_agent=self.config['collection']['user_agent'],
            use_cache=not self.no_cache,
            ttl_hours=self.config['collection']['cache_ttl_hours'])
        degrade = self.config['collection']['failure_policy']['degrade_after_consecutive_failures']
        if not feed.get('ok'):
            self._count('rss', False)
            state_mod.record(self.state, 'rss', False,
                             error='RSS: {}'.format(feed.get('error')), degrade_after=degrade)
            return unavailable('RSS / 新闻聚合', kind, 'RSS: {}'.format(feed.get('error')))
        count = rss_item_count(feed.get('text') or '')
        self._count('rss', True)
        state_mod.record(self.state, 'rss', True, value=count, degrade_after=degrade)
        return fresh('Bing News RSS', 'P3 兜底（新闻聚合命中 {} 条）'.format(count), count, tier='P3')

    # ---------- 汇总 ----------

    def _with_fallback(self, key, signal, label):
        """规则 1：单次失败保留上次有效值并标 stale"""
        if signal['available']:
            return signal
        entry = state_mod.source_state(self.state, key)
        last_value = entry.get('last_value')
        if last_value is None:
            return signal
        return {
            'available': False,
            'value': last_value,
            'origin': signal['origin'],
            'kind': 'stale（沿用上次有效值）',
            'stale': True,
            'error': signal['error'],
        }

    def gather(self, game):
        trends_raw = self._trends(game)
        trends = self._with_fallback('trends', trends_raw, 'Trends')
        # 搜索水位：展示用现状指标，独立一次「锚点批次」请求；取不到只降级，不影响评分
        trends['level'] = self._trends_level(game, trends_raw)
        reddit = self._with_fallback('reddit', self._reddit(game), 'Reddit')
        x_twitter = self._with_fallback('x_twitter', self._x_twitter(game), 'X')
        # P3 兜底源：只做健康记账、不参与评分；放在 X 之后以便命中其 HTTP 缓存
        self._rss(game)

        signals = {'trends': trends, 'reddit': reddit, 'x_twitter': x_twitter}

        used, fallbacks = [], []
        for key, signal, label in (('trends', trends, 'Trends'), ('reddit', reddit, 'Reddit'), ('x_twitter', x_twitter, 'X')):
            tier = signal.get('tier') or 'P1'
            if signal['available']:
                used.append('{}·{}'.format(tier, label))
                if tier != 'P1':
                    fallbacks.append(signal.get('kind') or 'Fallback: {}'.format(label))
            elif signal['value'] is not None:
                used.append('{}（stale）'.format(label))
                fallbacks.append('Fallback: {}（沿用上次值）'.format(label))
            else:
                fallbacks.append(signal.get('kind') or 'Fallback: {}'.format(label))

        log_row = {
            'id': game.get('id'),
            'name_cn': game.get('name_cn'),
            'used': used,
            'fallbacks': fallbacks,
            'detail': {
                'trends': trends.get('error') or '正常',
                'reddit': reddit.get('error') or '正常',
                'x_twitter': x_twitter.get('error') or '正常',
            },
        }
        return signals, log_row
