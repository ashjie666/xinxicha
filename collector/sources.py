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
    """统计订阅源条目数：兼容 RSS 2.0 的 <item> 与 Atom 1.0 的 <entry>。

    Reddit 的 .rss（含 search.rss）返回的是 Atom（<feed><entry>），早期只数 <item>，
    会把每次成功请求都算成 0 条，令 Reddit 分项（20% 权重）恒为 0 分——2026-10-20
    用真实样本实测：同一次查询 25 条 <entry>、0 条 <item>，而旧函数返回 0。
    解析失败返回 0；是否「源失效」另由 looks_like_rss 判定（见 _reddit）。
    """
    try:
        root = ET.fromstring(text)
    except Exception:  # noqa: BLE001 - 任何解析异常都按 0 条处理，走 none 档
        return 0
    count = 0
    for node in root.iter():
        tag = node.tag
        if isinstance(tag, str) and tag.split('}')[-1] in ('item', 'entry'):
            count += 1
    return count


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


def _mean(values):
    """算术均值（含 0 点）；无数据返回 None。均值天然带小数，用来提高水位区分度"""
    if not values:
        return None
    return sum(values) / float(len(values))


def level_from_means(game_mean, low_term, low_mean, high_term, high_mean, min_span=0.0):
    """把 7 日序列均值折算成跨批次、跨游戏可比的搜索水位（纯函数，便于单测）。

    双锚点折线定标（冷锚为 50 分界）：
      - 游戏均值 ≥ 冷锚均值：50 + 50 ×（游戏均值 − 冷锚均值）÷（热锚均值 − 冷锚均值）→ 50-100
      - 游戏均值 < 冷锚均值：50 × 游戏均值 ÷ 冷锚均值 → 0-50
      —— 冷/热锚点把 0-100 的批内相对刻度拉伸铺开，避免旧法「顶格 100 并列」；
         越界不截断：高于热锚保留 >100 并注明。
    用折线而非单段线性的原因：单段线性会把所有低于冷锚的款统一压成 0
    （2026-10-20 run #22 实测 21 款里 8 款挤 0.0、8 款挤 100.0，只有 5 个不同值）。
    降级：热锚缺失 / 冷锚缺失 / **冷锚均值 ≤ 0** / 两锚跨度 < min_span → 单锚点比例定标（优先热锚）。
      冷锚均值 ≤ 0 必须降级：批内归一化下比本批最高词弱 1% 的词会被整数截断成 0，
      此时折线退化成「所有游戏都落在 50.0」的假分界（2026-10-20 run #23 实测 13 款并列 50.0）。
    留空：游戏词无数据、或两个锚点都无数据。
    """

    def fmt(value):
        return '{:.1f}'.format(value) if value is not None else '—'

    base = {
        'value': None,
        'raw': round(game_mean, 1) if game_mean is not None else None,
        'stale': False,
        'mode': None,
        'anchor_low': low_term,
        'anchor_low_raw': round(low_mean, 1) if low_mean is not None else None,
        'anchor_high': high_term,
        'anchor_high_raw': round(high_mean, 1) if high_mean is not None else None,
    }

    def out(note, value=None, mode=None):
        item = dict(base)
        item.update({'note': note, 'value': value, 'mode': mode})
        return item

    if game_mean is None:
        return out('水位不可用：游戏词本批无数据')

    # 冷锚必须 > 0 才能充当 50 分界：批内归一化下，比本批最高词弱 1% 的词会被整数截断成 0，
    # 此时折线会退化成「所有游戏都落在 50.0」的假分界（2026-10-20 run #23 实测 13 款并列 50.0）
    usable_low = low_mean is not None and low_mean > 0
    span = None
    if low_mean is not None and high_mean is not None:
        span = high_mean - low_mean
    if high_mean:
        if usable_low and span is not None and span > 0 and span >= float(min_span or 0):
            # 折线定标（冷锚为 50 分界）：冷锚以下用「冷锚比例」铺在 0-50，
            # 冷锚到热锚之间线性映射到 50-100。单段线性会把所有低于冷锚的款统一
            # 压成 0（run #22 实测低量级 8 款全挤 0.0），折线才能把它们铺开。
            if game_mean >= low_mean:
                level_value = 50.0 + 50.0 * (game_mean - low_mean) / span
            else:
                level_value = 50.0 * game_mean / float(low_mean)
            note = ('7d 均值 {} · 冷锚「{}」{} / 热锚「{}」{} → 双锚折线定标（冷锚为 50 分界）'
                    .format(fmt(game_mean), low_term, fmt(low_mean), high_term, fmt(high_mean)))
            if level_value > 100:
                note += '，高于热锚（未截断）'
            return out(note, round(level_value, 2), 'dual')
        if low_mean is not None and not usable_low:
            why = '冷锚「{}」本批均值 0（低于分辨率下限）'.format(low_term or '')
        elif low_mean is None:
            why = '冷锚缺失'
        else:
            why = '两锚跨度 {} < {}'.format(fmt(span), min_span)
        note = ('7d 均值 {} · 热锚「{}」{} 单锚点定标（{}）'
                .format(fmt(game_mean), high_term, fmt(high_mean), why))
        if game_mean <= 0:
            note += '，游戏词低于本批分辨率下限'
        return out(note, round(100.0 * game_mean / float(high_mean), 2), 'single-high')
    if usable_low:
        return out('7d 均值 {} · 冷锚「{}」{} 单锚点定标（热锚缺失）'
                   .format(fmt(game_mean), low_term, fmt(low_mean)),
                   round(100.0 * game_mean / float(low_mean), 2), 'single-low')
    if low_term or high_term:
        return out('水位不可用：锚点词本批均被压到分辨率下限（批内最高词的 1%）')
    return out('水位不可用：锚点词本批均无数据')


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
        """Trends 单批取源：批次为 [游戏词, 冷锚点, 热锚点]（未配置锚点时只传游戏词）。

        同一批次同时产出两个量：
          - 变化率（评分用，占 30% 权重）：游戏词列首末两点，判据与口径保持不变
          - 搜索水位（展示用，不参与评分）：用 7 日序列均值做双锚点折线定标
            （冷锚为 50 分界，见 level_from_means），
            并**取消 100 上限截断**——旧做法 min(max_level, raw × target ÷ 锚点实测值)
            会让「量级高于锚点 1.67 倍」的款全部顶格成 100 而无法区分（首轮 2 款并列）；
            热锚/冷锚缺失或两锚跨度 < min_span 时自动降级为单锚点比例定标

        锚点词必须与游戏词同批才有可比性，代价是小量级游戏的变化率会受批内归一化的
        整数截断影响略有失真（实测多数款的原始值仍落在 20-100，影响有限）。
        这个代价必须付：2026-10-20 实测过「水位另发一次锚点批次」的做法——Trends 请求数
        从 21 次翻倍到 42 次会撞上 Google 的窗口配额，把占 30% 权重的变化率分项打到
        13/21 款 stale（其中 11 款 429 限流），评分链路被展示指标拖下水。

        水位取不到时留空（前端显示「—」），**不做 stale 兜底**：水位是逐款各异的现状值，
        用 state 里那个源级共享的上次值冒充会张冠李戴。
        """
        conf = self.config.get('trends_anchor') or {}
        enabled = conf.get('enabled', True)
        min_span = float(conf.get('min_span') or 0)
        low_term = conf.get('low') if enabled else None
        high_term = conf.get('high') if enabled else None

        def blank_level(note):
            return {'value': None, 'raw': None, 'stale': False, 'note': note, 'mode': None,
                    'anchor_low': low_term, 'anchor_low_raw': None,
                    'anchor_high': high_term, 'anchor_high_raw': None}

        def attach(signal, level):
            signal['level'] = level
            return signal

        if not self.trends_client:
            self._skip('trends')
            return attach(unavailable('Google Trends', 'P1 主源（未安装 pytrends）',
                                      self.trends_error or 'pytrends 不可用'),
                          blank_level('水位不可用：未安装 pytrends'))
        # 门禁用「外网任一探针可达」而非单独的 P1 探针：不同源的可达性互不相同，
        # 机房 IP 常见 Reddit 不通但 Google 通，按 P1 探针门控会让 Trends 永不被请求
        if not (self.network or self.p2_network):
            self._skip('trends')
            return attach(unavailable('Google Trends', 'Fallback: Google Search', '网络不可达，跳过调用'),
                          blank_level('水位不可用：网络不可达'))
        if self.budget_left() < 8:
            self._skip('trends')
            return attach(unavailable('Google Trends', 'Fallback: Google Search', '预算不足，跳过调用'),
                          blank_level('水位不可用：预算不足，未请求'))
        keyword = game.get('name_en') or game.get('name_cn')
        # 批次＝游戏词 + 冷锚点 + 热锚点（去重、剔除与游戏词同名者）；单批最多 3 词，请求数不变
        terms = [keyword]
        for term in (low_term, high_term):
            if term and term != keyword and term not in terms:
                terms.append(term)
        degrade = self.config['collection']['failure_policy']['degrade_after_consecutive_failures']
        try:
            client = self.trends_client(hl='en-US', tz=0)
            client.build_payload(terms, timeframe='now 7-d', geo='')
            frame = client.interest_over_time()
            series = [int(v) for v in frame[keyword].tolist()] if keyword in frame else []

            def series_of(term):
                return [int(v) for v in frame[term].tolist()] if term and term in frame else []

            # 水位＝7 日序列均值经双锚点折线定标（均值带小数，配合双锚提升区分度）；
            # 全部分支与文案收在 level_from_means 里，便于单测
            level = level_from_means(
                _mean(series), low_term, _mean(series_of(low_term)),
                high_term, _mean(series_of(high_term)), min_span)
            nonzero = len([v for v in series if v > 0])
            # 变化率用首末两点计算：数据点过少时首末两点极易失真为极端值
            # （实测出现过 -100%：7 日窗口内只有个别点位有量），故要求至少 3 个非零数据点。
            # 三种触发原因分别说明：否则「非零点 N 个，少于 3 个」在 N=3（实际因首点为 0 触发）时自相矛盾
            reason = ''
            if series and len(series) < 2:
                reason = '7 日内有效数据点不足 2 个'
            elif not series:
                reason = '本批未返回游戏词数据'
            elif series[0] == 0:
                reason = '7 日窗口首点无搜索量，无法计算变化率'
            elif nonzero < 3:
                reason = '7 日内非零数据点 {} 个，少于 3 个不计算变化率'.format(nonzero)
            if reason:
                self._count('trends', False)
                error = 'Trends 数据不足（{}）'.format(reason)
                state_mod.record(self.state, 'trends', False, error=error, degrade_after=degrade)
                # 数据不足只是点位不够，本批的水位若取到照样展示
                return attach(unavailable('Google Trends', 'Fallback: Google Search', error), level)
            change = (series[-1] - series[0]) / float(series[0]) * 100.0
            self._count('trends', True)
            state_mod.record(self.state, 'trends', True, value=round(change, 1), degrade_after=degrade)
            return attach(fresh('Google Trends', 'P1 主源', round(change, 1)), level)
        except Exception as error:  # noqa: BLE001
            self._count('trends', False)
            state_mod.record(self.state, 'trends', False, error='Trends 限流/异常：{}'.format(error),
                             degrade_after=degrade)
            return attach(unavailable('Google Trends', 'Fallback: Google Search',
                                      'Trends 限流/异常：{}'.format(error)),
                          blank_level('水位不可用：批次异常 {}'.format(error)))

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
        text = result.get('text') or ''
        # HTTP 200 不代表拿到了订阅源：被拦成 HTML 时应记取源失败，
        # 否则会静默变成「成功但 0 条」，掩盖源失效（2026-10-20 修复）
        if not http.looks_like_rss(text):
            self._count('reddit', False)
            state_mod.record(self.state, 'reddit', False,
                             error='Reddit: 返回非订阅源内容（疑似拦截页）',
                             degrade_after=degrade)
            return unavailable('Reddit', 'Fallback: Discord/F5Bot',
                               'Reddit: 返回非订阅源内容（疑似拦截页）')
        count = rss_item_count(text)
        self._count('reddit', True)
        state_mod.record(self.state, 'reddit', True, value=count, degrade_after=degrade)
        return fresh('Reddit', 'P1 主源（.rss）', count)

    def _x_twitter(self, game):
        """无凭据：按规格走 P2 回退——Bing News RSS（公开、免凭据、stdlib 可解析）。

        产出「命中的新闻条数」作为取值，由 config.scoring.bands.x_official 的
        数值区间分档算分（2026-10-20 改造：早期只映射枚举 player_only / none，
        只要命中 1 条新闻就与命中 12 条同为 60 分，21 款全部并列、零区分度）。
        RSS 无法区分官方公告与媒体报道，故该分项实际反映「媒体提及量」。
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
        note = 'Bing News RSS 命中 {} 条'.format(count) if count else 'Bing News RSS 无相关新闻'
        state_mod.record(self.state, 'x_twitter', True, value=count, degrade_after=degrade)
        return fresh('Bing News RSS', note, count, tier='P2')

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
        # 以原 signal 为基底改写：保留 level 等扩展字段（水位只留空、不借源级上次值冒充）
        fallback = dict(signal)
        fallback.update({
            'value': last_value,
            'kind': 'stale（沿用上次有效值）',
            'stale': True,
        })
        return fallback

    def gather(self, game):
        # Trends 单批同时产出变化率（评分）与搜索水位（展示），水位随 signal 一起返回
        trends = self._with_fallback('trends', self._trends(game), 'Trends')
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
