# -*- coding: utf-8 -*-
"""数据源状态机：连续失败计数、降级、stale 标记、上次有效值。

状态落盘在 data/source_state.json —— 运行日志（web/data/log.json）会被裁剪，
不能当状态源。规则（规格表「失败处理规则」）：
  1) 单次失败保留上次有效值并标 stale
  2) 连续 3 次失败 → 该源降级，后续不再优先调用
  3) P1 全部失败 → 页面显示"今日海外信号不足，建议人工复核"

「上次有效值」分两层（2026-10-20 拆分）：
  - sources[key].last_value：源级，供 ops 健康表展示「该源最近一次成功值」
  - games[game_id][key].value：款级，供逐款指标（trends / reddit / x_twitter）做 stale 兜底
    逐款指标必须用款级：源级是「一源一条」，给 A 款兜底时会读到 B 款的最近成功值
    （实测 9 款 stale 的 trends_7d 借用了同批前一款的值：Last Asylum 借到 8.9 → 被抬进
     60 分档，怪物猎人：旅人借到上一轮的 4.9 → 抬进 30 分档）
"""

import os

from . import http

STATE_PATH = os.path.join(http.ROOT, 'data', 'source_state.json')


def blank_source():
    return {
        'consecutive_failures': 0,
        'total_failures': 0,
        'total_success': 0,
        'degraded': False,
        'last_attempt_at': None,
        'last_success_at': None,
        'last_error': None,
        'last_value': None,
        'stale': False,
    }


def load():
    state = http.read_json(STATE_PATH, {'schema': 1, 'sources': {}})
    if not isinstance(state, dict):
        state = {'schema': 1, 'sources': {}}
    state.setdefault('sources', {})
    state.setdefault('games', {})
    return state


def source_state(state, key):
    state['sources'].setdefault(key, blank_source())
    return state['sources'][key]


def record(state, key, ok, value=None, error=None, note=None, degrade_after=3):
    """写入一次调用结果；失败不置零，保留上次有效值并标 stale"""
    entry = source_state(state, key)
    entry['last_attempt_at'] = http.stamp_cst()
    if note:
        entry['last_error_note'] = note

    if ok:
        entry['consecutive_failures'] = 0
        entry['total_success'] = int(entry.get('total_success') or 0) + 1
        entry['degraded'] = False
        entry['last_success_at'] = entry['last_attempt_at']
        entry['last_error'] = None
        entry['stale'] = False
        if value is not None:
            entry['last_value'] = value
    else:
        entry['consecutive_failures'] = int(entry.get('consecutive_failures') or 0) + 1
        entry['total_failures'] = int(entry.get('total_failures') or 0) + 1
        entry['last_error'] = error
        entry['stale'] = True
        if entry['consecutive_failures'] >= degrade_after:
            entry['degraded'] = True
    return entry


def record_game(state, game_id, key, value):
    """写入「某款某源」的上次成功值（款级历史），供 stale 兜底按款取用"""
    if not game_id or value is None:
        return None
    entry = state.setdefault('games', {}).setdefault(game_id, {})
    entry[key] = {'value': value, 'at': http.stamp_cst()}
    return entry


def game_last_value(state, game_id, key):
    """读某款某源的上次成功值；无历史返回 None（调用方留空「—」，不借源级值）"""
    entry = ((state.get('games') or {}).get(game_id) or {}).get(key) or {}
    return entry.get('value')


def save(state):
    http.write_json(STATE_PATH, state)
    return state


def health_rows(state, config):
    """给前端 / --probe 用的源健康表"""
    rows = []
    degrade_after = config['collection']['failure_policy']['degrade_after_consecutive_failures']
    for source in config['sources']:
        entry = source_state(state, source['key'])
        rows.append({
            'key': source['key'],
            'label': source['label'],
            'priority': source['priority'],
            'enabled': source['enabled'],
            'manual': source.get('mode') == 'manual-baseline',
            'signal': source['signal'],
            'fallback': source['fallback'],
            'consecutive_failures': entry['consecutive_failures'],
            'degraded': entry['degraded'],
            'stale': entry['stale'],
            'status': status_text(source, entry, degrade_after),
            'last_success_at': entry['last_success_at'],
            'last_attempt_at': entry['last_attempt_at'],
            'last_error': entry['last_error'],
        })
    return rows


def status_text(source, entry, degrade_after):
    if not source['enabled']:
        return '未启用'
    if entry['degraded']:
        return '已降级（连续 {} 次失败）'.format(entry['consecutive_failures'])
    if entry['consecutive_failures']:
        return '失败 {} 次（保留上值 · stale）'.format(entry['consecutive_failures'])
    if entry['last_success_at']:
        return '正常'
    if entry['last_attempt_at']:
        return '尚无可信数据'
    if source.get('mode') == 'manual-baseline':
        # 这类源设计上就不做自动采集（取值来自人工维护的基线数据），
        # 如实标明「待自动化」，避免被误读成采集故障
        return '人工基线 · 待自动化'
    return '未探测'


def p1_all_dead(state, config):
    keys = [s['key'] for s in config['sources'] if s['priority'] == 'P1' and s['enabled']]
    if not keys:
        return True
    for key in keys:
        entry = source_state(state, key)
        if entry['consecutive_failures'] == 0 and entry['last_success_at']:
            return False
    return True
