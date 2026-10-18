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
        if not self.network:
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
            if len(series) < 2 or series[0] == 0:
                self._count('trends', False)
                state_mod.record(self.state, 'trends', False, error='Trends 无有效数据',
                                 degrade_after=self.config['collection']['failure_policy']['degrade_after_consecutive_failures'])
                return unavailable('Google Trends', 'Fallback: Google Search', 'Trends 无有效数据')
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

    def _reddit(self, game):
        if not self.network:
            self._skip('reddit')
            return unavailable('Reddit', 'Fallback: Discord/F5Bot', '网络不可达，跳过调用')
        if self.budget_left() < 5:
            self._skip('reddit')
            return unavailable('Reddit', 'Fallback: Discord/F5Bot', '预算不足，跳过调用')
        query = game.get('name_en') or game.get('name_cn')
        url = 'https://www.reddit.com/search.json?q={}&sort=new&limit=50&t=day'.format(
            urllib.parse.quote(query))
        result = http.fetch_json(
            url,
            timeout=self.config['collection']['request_timeout'],
            user_agent=self.config['collection']['user_agent'],
            use_cache=not self.no_cache,
            ttl_hours=self.config['collection']['cache_ttl_hours'])
        degrade = self.config['collection']['failure_policy']['degrade_after_consecutive_failures']
        if not result.get('ok'):
            self._count('reddit', False)
            state_mod.record(self.state, 'reddit', False, error='Reddit: {}'.format(result.get('error')),
                             degrade_after=degrade)
            return unavailable('Reddit', 'Fallback: Discord/F5Bot', 'Reddit: {}'.format(result.get('error')))
        children = ((result.get('data') or {}).get('data') or {}).get('children') or []
        count = len(children)
        self._count('reddit', True)
        state_mod.record(self.state, 'reddit', True, value=count, degrade_after=degrade)
        return fresh('Reddit', 'P1 主源', count)

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
        url = ('https://www.bing.com/news/search?q={}&qft=sortbydate%3d%221%22&format=rss'
               .format(urllib.parse.quote(query)))
        result = http.fetch(
            url,
            timeout=self.config['collection']['request_timeout'],
            user_agent=self.config['collection']['user_agent'],
            use_cache=not self.no_cache,
            ttl_hours=self.config['collection']['cache_ttl_hours'])
        degrade = self.config['collection']['failure_policy']['degrade_after_consecutive_failures']
        if not result.get('ok'):
            self._count('x_twitter', False)
            state_mod.record(self.state, 'x_twitter', False,
                             error='RSS: {}'.format(result.get('error')), degrade_after=degrade)
            return unavailable('X/Twitter', kind, 'RSS: {}'.format(result.get('error')))
        count = rss_item_count(result.get('text') or '')
        self._count('x_twitter', True)
        value = 'player_only' if count else 'none'
        note = 'Bing News RSS 命中 {} 条'.format(count) if count else 'Bing News RSS 无相关新闻'
        state_mod.record(self.state, 'x_twitter', True, value=value, degrade_after=degrade)
        return fresh('Bing News RSS', note, value, tier='P2')

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
        trends = self._with_fallback('trends', self._trends(game), 'Trends')
        reddit = self._with_fallback('reddit', self._reddit(game), 'Reddit')
        x_twitter = self._with_fallback('x_twitter', self._x_twitter(game), 'X')

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
