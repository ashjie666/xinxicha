# -*- coding: utf-8 -*-
"""评分引擎（唯一权威实现）+ 回退规则 + 回退演练场景预计算。

权重取 config.scoring.weights（2026-10-22 起为 20/15/15/20/15/15，
规格表原始 30/20/15/15/10/10 已按「机会窗口优先」下调声量项）：
  Trends 上升 20% / Reddit 15% / X 官方公告 15% / 海外供给不足 20%
  / 国内攻略成熟度 15% / 上线窗口近 15%
语义固定：缺失源记 0 分、不重分配权重、只加 stale 标记。
"""

from datetime import datetime

COMPONENTS = [
    ('trends_rise', 'Trends 上升', 'trends'),
    ('reddit', 'Reddit 讨论量', 'reddit'),
    ('x_official', 'X 官方公告', 'x_twitter'),
    ('supply_gap', '海外供给不足', None),
    ('cn_maturity', '国内攻略成熟度', None),
    ('launch_window', '上线窗口近', None),
]

SCENARIOS = [
    ('trends_dead', 'Google Trends 失活', ['trends']),
    ('reddit_dead', 'Reddit 失活', ['reddit']),
    ('x_dead', 'X/Twitter 失活', ['x_twitter']),
    ('p1_all_dead', 'P1 全部失败', ['trends', 'reddit', 'x_twitter']),
]


def clamp(value, low=0, high=100):
    return max(low, min(high, value))


def band_score(value, bands):
    """bands: [[下界, 上界|null, 得分], ...]，第一个命中即返回"""
    if value is None:
        return None
    for low, high, score in bands:
        if value >= low and (high is None or value < high):
            return score
    return 0


def days_until(launch_date, today):
    if not launch_date:
        return None
    try:
        target = datetime.strptime(launch_date, '%Y-%m-%d').date()
    except ValueError:
        return None
    return (target - today).days


def supply_gap_score(game, config):
    gap = None
    if game.get('overseas_supply') is not None:
        gap = 10 - float(game['overseas_supply'])
    elif game.get('gap_level'):
        gap = config['scoring']['gap_level_to_gap_score'].get(game['gap_level'])
    if gap is None:
        return None, None
    return clamp((gap - 5) / 4.0 * 100), gap


def launch_window_score(game, today, config):
    """上线窗口：80 天为关键词占位峰值，越临近上线递减，上线 60 天后最低。

    规格表原档位是「7 天内 100 / 30 天内 70 / 90 天内 40」，语义是越靠近上线
    越值钱；但关键词占位要提前做，上线前一周才准备已经抢不过内容站。故改为
    分段线性插值（config.scoring.bands.launch_window_points，按天数降序）：
      距上线 180 天 30 分 → 80 天 100 分（峰值）→ 30 天 70 → 当日 45
      → 上线后 60 天 10 → 再往后固定 launch_window_after_min（0）
    已上线款不再走「live 固定 20 分」的兜底，一律按折线算；只有未公布档期的
    才用 launch_window_fallback.unknown。
    """
    days = days_until(game.get('launch_date'), today)
    if days is None:
        return float(config['scoring']['bands']['launch_window_fallback']['unknown']), None
    points = config['scoring']['bands']['launch_window_points']
    after_min = float(config['scoring']['bands'].get('launch_window_after_min', 0))
    if days >= points[0][0]:
        return float(points[0][1]), days
    for index in range(len(points) - 1):
        day_high, score_high = points[index]
        day_low, score_low = points[index + 1]
        if day_low <= days <= day_high:
            ratio = (days - day_low) / float(day_high - day_low)
            return round(score_low + ratio * (score_high - score_low), 1), days
    return after_min, days


def component_rows(game, signals, config, today):
    """返回 6 个分项明细：得分、权重、加权分、取值、来源标签、是否 stale"""
    weights = config['scoring']['weights']
    bands = config['scoring']['bands']
    rows = []

    def make(key, label, score, value, origin, kind, stale, note=''):
        weight = weights[key]
        rows.append({
            'key': key,
            'label': label,
            'score': None if score is None else round(score, 1),
            'weight': weight,
            'weighted': 0.0 if score is None else round(score * weight / 100.0, 2),
            'value': value,
            'origin': origin,
            'kind': kind,
            'stale': stale,
            'note': note,
        })

    def p1_row(key, label, source_key, bands_key, fallback_kind):
        source = signals.get(source_key, {})
        value = source.get('value')
        stale = bool(source.get('stale')) or not source.get('available')
        if value is not None:
            score = bands[bands_key].get(value, 0) if isinstance(bands[bands_key], dict) else band_score(value, bands[bands_key])
            kind = source.get('kind') or 'P1 主源'
            if stale and not source.get('available'):
                kind = 'stale（沿用上次有效值）'
            make(key, label, score, value, source.get('origin'), kind, stale, source.get('error') or '')
        else:
            make(key, label, 0, None, source.get('origin') or label,
                 source.get('kind') or fallback_kind, bool(source.get('stale')),
                 source.get('error') or '源不可用且无历史值，记 0 分（不重分配权重）')

    # 1) Trends 上升 30%
    p1_row('trends_rise', 'Trends 上升', 'trends', 'trends_7d', 'Fallback: Google Search')
    # 2) Reddit 20%
    p1_row('reddit', 'Reddit 讨论量', 'reddit', 'reddit_daily', 'Fallback: Discord/Forum')
    # 3) X 官方公告 15%
    p1_row('x_official', 'X 官方公告', 'x_twitter', 'x_official', 'Fallback: RSS/官网')

    # 4) 海外供给不足 15%
    score, gap = supply_gap_score(game, config)
    if score is None:
        make('supply_gap', '海外供给不足', 0, None, 'P2 搜索/官网', 'Fallback: 人工基线', True, '缺口未知')
    else:
        origin = 'P2 搜索/官网（自动）' if game.get('overseas_supply') is not None else '人工基线（缺口评估 {}）'.format(game.get('gap_level'))
        make('supply_gap', '海外供给不足', score, gap, origin, 'P3 兜底', False)

    # 5) 国内攻略成熟度 10%
    cn_score = game.get('cn_guide_score')
    if cn_score is None:
        make('cn_maturity', '国内攻略成熟度', 0, None, 'TapTap/B站/NGA', 'P3 兜底', True, '未评估')
    else:
        make('cn_maturity', '国内攻略成熟度', clamp((float(cn_score) - 1) / 4.0 * 100), cn_score,
             'TapTap/B站/NGA 人工评估', 'P3 兜底', False)

    # 6) 上线窗口近 10%
    score, days = launch_window_score(game, today, config)
    note = '无确定档期' if days is None else ('距上线 {} 天'.format(days) if days > 0 else '已上线')
    make('launch_window', '上线窗口近', score, days, '官网/游戏日历', 'P3 兜底', False, note)

    return rows


def total_of(rows):
    return round(sum(row['weighted'] for row in rows), 1)


def action_of(total, config):
    for threshold, action in config['scoring']['thresholds']:
        if total >= threshold:
            return action
    return config['scoring']['thresholds'][-1][1]


def confidence_of(signals, config, dead=None):
    dead = dead or []
    p1_keys = [key for key in ('trends', 'reddit', 'x_twitter') if key not in dead]
    alive = 0
    for key in p1_keys:
        source = signals.get(key, {})
        if source.get('available') and source.get('value') is not None:
            alive += 1
    total_p1 = len([s for s in config['sources'] if s['priority'] == 'P1' and s['enabled']])
    if alive == 0 or (dead and len(dead) >= total_p1):
        return '低'
    if alive < total_p1:
        return '中'
    return '高'


def compute_game(game, signals, config, today, days_tracked, dead=None):
    """单款游戏的完整评分结果；dead 用于回退演练（强制某些源失活）"""
    dead = dead or []
    effective = {}
    for key, value in signals.items():
        if key in dead:
            effective[key] = {
                'available': False,
                'value': None,
                'stale': True,
                'origin': value.get('origin') or key,
                'kind': 'Fallback: 演练（{} 失活）'.format(key),
                'error': '演练：该源被强制标记为失活',
            }
        else:
            effective[key] = value

    rows = component_rows(game, effective, config, today)
    total = total_of(rows)
    base_applied = False
    if total < config['scoring']['base_score_new_game']:
        total = float(config['scoring']['base_score_new_game'])
        base_applied = True
    eligible = days_tracked >= config['scoring']['min_days_for_ranking']
    confidence = confidence_of(signals, config, dead)
    action = action_of(total, config)
    basis = '规则引擎'
    if confidence == '低':
        action = '人工复核（P1 全部不可用）'
        basis = '规则引擎（置信度低，按失败规则 3 建议人工复核）'
    return {
        'components': rows,
        'total': total,
        'action_engine': action,
        'action_basis': basis,
        'confidence': confidence,
        'base_score_applied': base_applied,
        'days_tracked': days_tracked,
        'ranking_eligible': eligible,
        'ranking_note': '正式排名' if eligible else '观察期（第 {}/{} 天）'.format(
            min(days_tracked, config['scoring']['min_days_for_ranking']),
            config['scoring']['min_days_for_ranking']),
    }


def scenario_map(game, signals, config, today, days_tracked):
    """回退演练：Python 预计算，前端只查表切换"""
    out = []
    for key, label, dead in SCENARIOS:
        result = compute_game(game, signals, config, today, days_tracked, dead=dead)
        out.append({
            'key': key,
            'label': label,
            'total': result['total'],
            'action_engine': result['action_engine'],
            'confidence': result['confidence'],
            'stale_sources': dead,
        })
    return out


def weights_table(config):
    labels = {
        'trends_rise': 'Google Trends 上升',
        'reddit': 'Reddit 讨论量',
        'x_official': 'X/Twitter 官方公告',
        'supply_gap': '海外供给不足',
        'cn_maturity': '国内攻略成熟度',
        'launch_window': '上线窗口近',
    }
    notes = {
        'trends_rise': '海外需求最直接信号，搜索量飙升=玩家关注度激增',
        'reddit': '真实玩家提问和讨论，反映新手问题和内容缺口',
        'x_official': '上线/测试/维护/版本更新等官方信号',
        'supply_gap': '英文攻略站少=竞争小=有机会窗口',
        'cn_maturity': '国内已有结构化攻略=可转化为英文内容的素材多',
        'launch_window': '提前 80 天是关键词占位峰值（100 分），越临近上线竞争越饱和、逐段递减，上线 60 天后归零',
    }
    rows = []
    for key, label in labels.items():
        rows.append({
            'key': key,
            'signal': label,
            'weight': config['scoring']['weights'][key],
            'weight_text': '{}%'.format(config['scoring']['weights'][key]),
            'desc': notes[key],
        })
    return rows
