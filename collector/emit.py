# -*- coding: utf-8 -*-
"""双轨导出：web/data/<name>.json（fetch 用）+ <name>.js（window.XC_* 全局，绕开 file:// CORS）。"""

import io
import json
import os

from . import http

WEB_DATA = os.path.join(http.ROOT, 'web', 'data')
GLOBALS = {
    'games': 'XC_GAMES',
    'keywords': 'XC_KEYWORDS',
    'ops': 'XC_OPS',
    'log': 'XC_LOG',
    'discover': 'XC_DISCOVER',
}


def write_pair(name, payload):
    json_path = os.path.join(WEB_DATA, name + '.json')
    js_path = os.path.join(WEB_DATA, name + '.js')
    http.write_json(json_path, payload)
    text = 'window.{} = '.format(GLOBALS[name]) + _dump(payload) + ';\n'
    directory = os.path.dirname(js_path)
    if not os.path.isdir(directory):
        os.makedirs(directory)
    with io.open(js_path, 'w', encoding='utf-8', newline='\n') as handle:
        handle.write(text)
    return json_path, js_path


def _dump(payload):
    import json
    return json.dumps(payload, ensure_ascii=False, indent=2)


def build_meta(config, run_info, counts):
    return {
        'site': config['site']['name'],
        'title': config['site']['title'],
        'subtitle': config['site']['subtitle'],
        'schema_version': config['site']['schema_version'],
        'generated_at_cst': run_info['generated_at_cst'],
        'data_mode': run_info['data_mode'],
        'spec_sha': run_info['spec_sha'],
        'network': run_info['network'],
        'probe_detail': run_info['probe_detail'],
        'alert': run_info['alert'],
        'duration_sec': run_info['duration_sec'],
        'counts': counts,
        'trends_anchor': config.get('trends_anchor') or {},
        'scoring_note': config['scoring']['note'],
    }


def build_games(config, seed_games, scored, run_info):
    games = []
    for game in seed_games['games']:
        result = scored[game['id']]
        level = (result['signals'].get('trends') or {}).get('level') or {}
        item = dict(game)
        item.update({
            'signals': result['signals'],
            'components': result['components'],
            'total': result['total'],
            'prev_total': result['prev_total'],
            'delta': result['delta'],
            'action_engine': result['action_engine'],
            'action_basis': result['action_basis'],
            'confidence': result['confidence'],
            'base_score_applied': result['base_score_applied'],
            'days_tracked': result['days_tracked'],
            'ranking_eligible': result['ranking_eligible'],
            'ranking_note': result['ranking_note'],
            'scenarios': result['scenarios'],
            'sources_used': result['log_row']['used'],
            'fallbacks': result['log_row']['fallbacks'],
            'stale_sources': result['stale_sources'],
            'trends_7d': result['signals']['trends'].get('value'),
            'trends_level': level.get('value'),
            'trends_level_raw': level.get('raw'),
            'trends_level_note': level.get('note') or '',
            'trends_level_stale': bool(level.get('stale')),
            'trends_anchor_term': level.get('anchor_term'),
            'trends_anchor_raw': level.get('anchor_raw'),
            'trends_anchor_target': level.get('target'),
            'reddit_daily': result['signals']['reddit'].get('value'),
            'x_state': result['signals']['x_twitter'].get('value'),
            'gap_score': _gap(game, config),
            'launch_days': result['launch_days'],
            'overseas_supply': game.get('overseas_supply'),
            'keywords_count': result['keywords_count'],
            'last_update': run_info['date_cst'],
            'stale': not result['signals']['trends']['available'] or not result['signals']['reddit']['available'],
        })
        games.append(item)
    return {
        'meta': build_meta(config, run_info, {
            'games': len(games),
            'p0': len([g for g in games if g['priority'] == 'P0']),
            'p1_priority': len([g for g in games if g['priority'] == 'P1']),
        }),
        'field_dict': seed_games['field_dict'],
        'signal_notes': seed_games.get('signal_notes', []),
        'games': games,
    }


def _gap(game, config):
    if game.get('overseas_supply') is not None:
        return round(10 - float(game['overseas_supply']), 2)
    return config['scoring']['gap_level_to_gap_score'].get(game.get('gap_level'))


def build_keywords(config, seed_keywords, seed_games, run_info):
    index = {}
    for game in seed_games['games']:
        index[game['name_cn']] = game['id']

    keywords = []
    for keyword in seed_keywords['keywords']:
        item = dict(keyword)
        item['game_id'] = index.get(keyword.get('game_cn'))
        item['covered'] = keyword.get('covered') or '否'
        keywords.append(item)

    by_game = {}
    for item in keywords:
        key = item['game_id'] or 'all'
        by_game[key] = by_game.get(key, 0) + 1

    intents = {}
    for item in keywords:
        intents[item['intent']] = intents.get(item['intent'], 0) + 1

    return {
        'meta': build_meta(config, run_info, {
            'keywords': len(keywords),
            'covered': len([k for k in keywords if k['covered'] == '是']),
            'not_covered': len([k for k in keywords if k['covered'] != '是']),
            'high_competition': len([k for k in keywords if (k.get('competition') or 0) >= 4]),
        }),
        'by_game': by_game,
        'by_intent': intents,
        'keywords': keywords,
    }


def build_ops(config, seed_ops, seed_games, health_rows, log_payload, run_info, scoring_module):
    return {
        'meta': build_meta(config, run_info, {
            'tasks': len(seed_ops['tasks']),
            'automation': len(seed_ops['automation']),
            'roadmap': len(seed_ops['roadmap']),
        }),
        'scoring': {
            'weights': config['scoring']['weights'],
            'thresholds': config['scoring']['thresholds'],
            'bands': config['scoring']['bands'],
            'base_score_new_game': config['scoring']['base_score_new_game'],
            'min_days_for_ranking': config['scoring']['min_days_for_ranking'],
            'gap_level_to_gap_score': config['scoring']['gap_level_to_gap_score'],
            'confidence_rules': config['scoring']['confidence_rules'],
            'note': config['scoring']['note'],
        },
        'trends_anchor': config.get('trends_anchor') or {},
        'weights_table': scoring_module.weights_table(config),
        'components_order': [row[0] for row in scoring_module.COMPONENTS],
        'component_labels': {row[0]: row[1] for row in scoring_module.COMPONENTS},
        'scenarios': [{'key': row[0], 'label': row[1], 'dead': row[2]} for row in scoring_module.SCENARIOS],
        'tasks': seed_ops['tasks'],
        'automation': seed_ops['automation'],
        'roadmap': seed_ops['roadmap'],
        'fallback_sources': seed_ops['fallback_sources'],
        'fallback_rules': seed_ops['fallback_rules'],
        'field_dict': seed_games['field_dict'],
        'signal_notes': seed_games.get('signal_notes', []),
        'failure_policy': config['collection']['failure_policy'],
        'sources': config['sources'],
        'health': health_rows,
        'run_log': log_payload,
    }


def build_log(config, existing, run_info, log_rows, totals):
    """按天聚合的运行日志：最近 30 天，每天保留 runs + totals 快照"""
    days = [day for day in (existing or {}).get('days', []) if isinstance(day, dict)]
    today = run_info['date_cst']
    entry = None
    for day in days:
        if day.get('date') == today:
            entry = day
            break
    if entry is None:
        entry = {'date': today, 'runs': [], 'totals': {}}
        days.append(entry)
    entry['runs'].append({
        'at': run_info['generated_at_cst'],
        'network': run_info['network'],
        'probe_detail': run_info['probe_detail'],
        'data_mode': run_info['data_mode'],
        'duration_sec': run_info['duration_sec'],
        'alert': run_info['alert'],
        'calls': run_info['calls'],
        'games': log_rows,
    })
    entry['totals'] = totals
    days.sort(key=lambda item: item.get('date') or '')
    days = days[-30:]

    tracked = len([day for day in days if day.get('totals')])
    return {
        'meta': dict(build_meta(config, run_info, {'days': len(days), 'games_logged': len(log_rows)}),
                     **{'days_tracked': tracked}),
        'days': days,
    }
