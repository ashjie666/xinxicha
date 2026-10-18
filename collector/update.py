# -*- coding: utf-8 -*-
"""入口：python -m collector.update

  --probe            只体检数据源 + 打印源健康表（不写任何文件）
  --dry-run          完整跑一遍流程，但不写文件
  --offline          强制离线（不发任何网络请求，全走 P1→P2→P3 回退）
  --no-cache         忽略本地 HTTP 缓存
  --budget-seconds N 网络采集中途的硬预算（默认取 config.collection.budget_seconds）

任何数据源失败都不会让进程失败：离线也应退出码 0 并写出 stale / fallback 状态。
"""

import argparse
import os
import sys
import time
import traceback

from . import emit
from . import http
from . import scoring
from . import sources
from . import state as state_mod


def load_config():
    path = os.path.join(http.ROOT, 'config.json')
    config = http.read_json(path)
    if not config:
        raise RuntimeError('缺少 config.json：{}'.format(path))
    return config


def load_seed(name):
    path = os.path.join(http.ROOT, 'data', 'seed_{}.json'.format(name))
    payload = http.read_json(path)
    if not payload:
        raise RuntimeError('缺少 {}.json，请先运行：python tools/import_spec.py'.format(path))
    return payload


def days_tracked_from(existing_log, today):
    days = [day for day in (existing_log or {}).get('days', []) if day.get('totals')]
    dates = set(day.get('date') for day in days)
    dates.add(today)
    return len(dates)


def prev_totals_from(existing_log, today):
    days = [day for day in (existing_log or {}).get('days', []) if day.get('date') != today and day.get('totals')]
    days.sort(key=lambda item: item.get('date') or '')
    return days[-1]['totals'] if days else {}


def main(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument('--probe', action='store_true')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--offline', action='store_true')
    parser.add_argument('--no-cache', action='store_true')
    parser.add_argument('--budget-seconds', type=int, default=0)
    args = parser.parse_args(argv)

    started = time.time()
    config = load_config()
    seed_games = load_seed('games')
    seed_keywords = load_seed('keywords')
    seed_ops = load_seed('ops')

    state = state_mod.load()
    budget = args.budget_seconds or config['collection']['budget_seconds']

    collector = sources.Collector(config, state, offline=args.offline,
                                  no_cache=args.no_cache, budget_seconds=budget)
    collector.probe()

    if args.probe:
        print('网络探测: {}'.format(collector.probe_detail))
        print('{:<14}{:<8}{:<10}{}'.format('源', '优先级', '状态', '上次成功'))
        for row in state_mod.health_rows(state, config):
            print('{:<14}{:<8}{:<10}{}'.format(
                row['label'], row['priority'], row['status'], row['last_success_at'] or '—'))
        print('\n本次探测未写入任何文件。')
        return 0

    today = http.now_cst().date()
    existing_log = http.read_json(os.path.join(emit.WEB_DATA, 'log.json'), {'days': []})
    days_tracked = days_tracked_from(existing_log, http.today_cst())
    prev_totals = prev_totals_from(existing_log, http.today_cst())

    keyword_counts = {}
    for keyword in seed_keywords['keywords']:
        keyword_counts[keyword.get('game_cn')] = keyword_counts.get(keyword.get('game_cn'), 0) + 1

    scored = {}
    log_rows = []
    fresh_p1 = False
    for game in seed_games['games']:
        signals, log_row = collector.gather(game)
        for key in ('trends', 'reddit', 'x_twitter'):
            if signals[key]['available']:
                fresh_p1 = True
        result = scoring.compute_game(game, signals, config, today, days_tracked)
        result['signals'] = signals
        result['log_row'] = log_row
        result['launch_days'] = scoring.days_until(game.get('launch_date'), today)
        result['keywords_count'] = keyword_counts.get(game['name_cn'], 0)
        result['stale_sources'] = [key for key in ('trends', 'reddit', 'x_twitter') if signals[key]['stale']]
        result['scenarios'] = scoring.scenario_map(game, signals, config, today, days_tracked)
        result['prev_total'] = prev_totals.get(game['id'])
        result['delta'] = None if result['prev_total'] is None else round(result['total'] - result['prev_total'], 1)
        scored[game['id']] = result
        log_rows.append(log_row)

    alive = state_mod.p1_all_dead(state, config)
    alert = config['collection']['failure_policy']['p1_all_dead_alert'] if alive else None
    data_mode = 'live' if fresh_p1 else 'fallback'

    run_info = {
        'generated_at_cst': http.stamp_cst(),
        'date_cst': http.today_cst(),
        'data_mode': data_mode,
        'spec_sha': seed_games['meta'].get('spec_sha', ''),
        'network': collector.network,
        'probe_detail': collector.probe_detail,
        'alert': alert,
        'duration_sec': round(time.time() - started, 1),
        'calls': collector.calls,
    }

    health_rows = state_mod.health_rows(state, config)
    totals = dict((game_id, result['total']) for game_id, result in scored.items())

    games_payload = emit.build_games(config, seed_games, scored, run_info)
    keywords_payload = emit.build_keywords(config, seed_keywords, seed_games, run_info)
    log_payload = emit.build_log(config, existing_log, run_info, log_rows, totals)
    ops_payload = emit.build_ops(config, seed_ops, seed_games, health_rows, log_payload, run_info, scoring)

    if args.dry_run:
        print('--dry-run：跑通流程但不写文件。')
    else:
        emit.write_pair('games', games_payload)
        emit.write_pair('keywords', keywords_payload)
        emit.write_pair('ops', ops_payload)
        emit.write_pair('log', log_payload)
        state_mod.save(state)

    ranked = sorted(scored.items(), key=lambda item: item[1]['total'], reverse=True)
    print('生成时间 : {} (CST)'.format(run_info['generated_at_cst']))
    print('数据模式 : {}  P1网络: {}  P2网络: {}  {}'.format(
        data_mode,
        '可达' if collector.network else '不可达',
        '可达' if collector.p2_network else '不可达',
        collector.probe_detail))
    print('跟踪天数 : {} 天（满 {} 天参与正式排名）'.format(days_tracked, config['scoring']['min_days_for_ranking']))
    print('源调用   : {}'.format(', '.join(
        '{}={}/{}/{}'.format(key, bucket['ok'], bucket['failed'], bucket['skipped'])
        for key, bucket in collector.calls.items()) or '无'))
    if alert:
        print('【告警】{}'.format(alert))
    print('分数 TOP5:')
    for game_id, result in ranked[:5]:
        name = [g['name_cn'] for g in seed_games['games'] if g['id'] == game_id][0]
        print('  {:<22}{:>6}  {}  {}'.format(name, result['total'], result['action_engine'], result['confidence']))
    if args.dry_run:
        print('（未写入 web/data）')
    else:
        print('已写入   : web/data/games|keywords|ops|log (.json + .js)')
    return 0


if __name__ == '__main__':
    try:
        sys.exit(main(sys.argv[1:]))
    except SystemExit:
        raise
    except Exception:  # noqa: BLE001 - 兜底打印后以非 0 退出，便于发现真实缺陷
        traceback.print_exc()
        sys.exit(1)
