# -*- coding: utf-8 -*-
"""新游候选发现层（方案 A）：复用 Bing News RSS，按已知厂商名 + 品类词检索。

候选**只提示、不入库、不参与评分**——人工确认后才由人写进 data/seed_games.json。
因此本模块不触碰评分模型，也不改 20 款清单本身。

CLI 便于本地单独验证（不写盘用 --dry-run）：
    python -m collector.discover [--limit N] [--offline] [--dry-run]
"""

import argparse
import html
import os
import re
import sys
import time
import urllib.parse
from datetime import timedelta, timezone
from email.utils import parsedate_to_datetime
from xml.etree import ElementTree as ET

from . import emit
from . import http

URL_TEMPLATE = ('https://www.bing.com/news/search?q={query}'
                '&qft=sortbydate%3d%221%22&format=rss')
TAG_RE = re.compile(r'<[^>]+>')
WS_RE = re.compile(r'\s+')
NORM_RE = re.compile(r'[\s\W_]+', re.UNICODE)
CST = timezone(timedelta(hours=8))


def normalize(text):
    """标题归一化：转小写并去掉所有空白与标点，用于去重"""
    return NORM_RE.sub('', (text or '').lower())


def clean_text(raw, limit=120):
    """去 HTML 标签 / 解实体 / 压缩空白；limit>0 时截断"""
    text = WS_RE.sub(' ', html.unescape(TAG_RE.sub(' ', raw or ''))).strip()
    if limit and len(text) > limit:
        text = text[:limit].rstrip() + '…'
    return text


def _node_text(node, tag):
    child = node.find(tag)
    return child.text if child is not None and child.text else ''


def _stamp(pub_raw):
    """RSS pubDate → (北京时间字符串, 时间戳)；解析失败返回 ('', 0)"""
    if not pub_raw:
        return '', 0
    try:
        moment = parsedate_to_datetime(pub_raw)
    except Exception:  # noqa: BLE001 - 个别源 pubDate 不规范，按无时间处理
        return '', 0
    if moment is None:
        return '', 0
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=timezone.utc)
    local = moment.astimezone(CST)
    return local.strftime('%Y-%m-%d %H:%M'), local.timestamp()


def parse_rss(text):
    """解析 Bing News RSS，返回候选条目列表。

    非 RSS 内容（例如被重定向到 Bing 首页 HTML，或空频道）返回 None——
    与「解析成功但确实 0 条」区分开，避免静默吞掉「源已失效」这一事实。
    """
    try:
        root = ET.fromstring(text)
    except Exception:  # noqa: BLE001 - 不是合法 XML，判定为非 RSS
        return None
    if root.tag != 'rss' and root.find('.//channel') is None:
        return None
    items = []
    for node in root.findall('.//item'):
        pub_raw = (_node_text(node, 'pubDate') or '').strip()
        published, ts = _stamp(pub_raw)
        items.append({
            'title': clean_text(_node_text(node, 'title'), 0),
            'url': (_node_text(node, 'link') or '').strip(),
            'published': published,
            'pub_raw': pub_raw,
            'summary': clean_text(_node_text(node, 'description'), 120),
            'ts': ts,
        })
    return items


def known_names(seed_games):
    """已监控游戏的 name_cn / name_en（小写），用于过滤候选"""
    names = set()
    for game in seed_games.get('games', []):
        for field in ('name_cn', 'name_en'):
            value = (game.get(field) or '').strip().lower()
            if value:
                names.add(value)
    return names


def is_known(title, names):
    low = (title or '').lower()
    for name in names:
        if name in low:
            return True
    return False


def build(config, seed_games, run_info, p2_network=True, offline=False, limit=0):
    """逐 target 检索 → 过滤已知游戏 → 去重 → 按时间倒序截断，返回 discover payload"""
    cfg = config.get('discovery') or {}
    targets = list(cfg.get('targets') or [])
    if limit and limit > 0:
        targets = targets[:limit]

    collection = config.get('collection') or {}
    names = known_names(seed_games)
    max_candidates = int(cfg.get('max_candidates') or 40)
    per_query_max = int(cfg.get('per_query_max') or 8)
    interval = float(cfg.get('request_interval_sec') or 0)
    budget = float(cfg.get('budget_seconds') or 0)
    can_fetch = bool(p2_network) and not offline
    started = time.time()

    target_rows = []
    candidates = []
    seen_title = set()
    seen_url = set()

    for index, target in enumerate(targets):
        row = {
            'label': target.get('label') or target.get('query') or '',
            'kind': target.get('kind') or 'category',
            'category': target.get('category') or '',
            'query': target.get('query') or '',
            'ok': False,
            'hits': 0,
            'new': 0,
            'error': None,
        }
        if not can_fetch:
            row['error'] = '离线模式，跳过调用' if offline else 'P2 网络不可达，跳过调用'
            target_rows.append(row)
            continue
        if budget and (time.time() - started) > budget:
            row['error'] = '预算不足，跳过调用'
            target_rows.append(row)
            continue

        url = URL_TEMPLATE.format(query=urllib.parse.quote(row['query']))
        result = http.fetch(url,
                            timeout=collection.get('request_timeout', 8),
                            user_agent=collection.get('user_agent'),
                            use_cache=True,
                            ttl_hours=collection.get('cache_ttl_hours', 12))
        if not result.get('ok'):
            row['error'] = result.get('error') or '请求失败'
            target_rows.append(row)
            continue

        items = parse_rss(result.get('text') or '')
        if items is None:
            row['error'] = '返回非 RSS 内容（Bing 可能重定向到网页）'
            target_rows.append(row)
            continue
        row['ok'] = True
        row['hits'] = len(items)

        fresh = []
        for item in items:
            if not item['title'] or is_known(item['title'], names):
                continue
            key_url = (item['url'] or '').split('?')[0]
            if normalize(item['title']) in seen_title or (key_url and key_url in seen_url):
                continue
            seen_title.add(normalize(item['title']))
            if key_url:
                seen_url.add(key_url)
            record = dict(item)
            record.update({
                'target': row['label'],
                'kind': row['kind'],
                'category': row['category'],
                'query': row['query'],
            })
            fresh.append(record)

        fresh.sort(key=lambda rec: rec.get('ts') or 0, reverse=True)
        fresh = fresh[:per_query_max]
        row['new'] = len(fresh)
        candidates.extend(fresh)
        target_rows.append(row)

        if interval and index < len(targets) - 1:
            time.sleep(interval)

    candidates.sort(key=lambda rec: rec.get('ts') or 0, reverse=True)
    truncated = len(candidates) > max_candidates
    candidates = candidates[:max_candidates]
    for record in candidates:
        record.pop('ts', None)

    counts = {
        'candidates': len(candidates),
        'targets': len(target_rows),
        'targets_ok': len([row for row in target_rows if row['ok']]),
        'known_games': len(seed_games.get('games', [])),
    }
    return {
        'meta': emit.build_meta(config, run_info, counts),
        'note': cfg.get('note') or '',
        'truncated': truncated,
        'known_games': [{
            'id': game['id'],
            'name_cn': game['name_cn'],
            'name_en': game.get('name_en') or '',
        } for game in seed_games.get('games', [])],
        'targets': target_rows,
        'candidates': candidates,
    }


def main(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument('--limit', type=int, default=0, help='只跑前 N 个检索目标')
    parser.add_argument('--offline', action='store_true', help='不发任何网络请求')
    parser.add_argument('--dry-run', action='store_true', help='跑通流程但不写文件')
    args = parser.parse_args(argv)

    config = http.read_json(os.path.join(http.ROOT, 'config.json')) or {}
    seed_games = http.read_json(os.path.join(http.ROOT, 'data', 'seed_games.json')) or {'games': []}
    run_info = {
        'generated_at_cst': http.stamp_cst(),
        'date_cst': http.today_cst(),
        'data_mode': 'live',
        'spec_sha': (seed_games.get('meta') or {}).get('spec_sha', ''),
        'network': False,
        'probe_detail': '本地 CLI 单独运行',
        'alert': None,
        'duration_sec': 0.0,
        'calls': {},
    }

    payload = build(config, seed_games, run_info,
                    p2_network=not args.offline, offline=args.offline, limit=args.limit)

    print('{:<28}{:<10}{:>6}{:>6}  {}'.format('检索目标', '类型', '命中', '新增', '状态'))
    for row in payload['targets']:
        print('{:<28}{:<10}{:>6}{:>6}  {}'.format(
            row['label'], '厂商' if row['kind'] == 'publisher' else '品类',
            row['hits'], row['new'], 'OK' if row['ok'] else (row['error'] or '失败')))
    counts = payload['meta']['counts']
    print('\n候选合计 {} 条（截断:{}）· 目标 OK {}/{} · 已监控 {} 款已过滤'.format(
        counts['candidates'], '是' if payload['truncated'] else '否',
        counts['targets_ok'], counts['targets'], counts['known_games']))
    for record in payload['candidates'][:10]:
        print('  [{}] {} ← {}'.format(record['published'] or '时间未知', record['title'], record['target']))

    if args.dry_run:
        print('（--dry-run，未写入 web/data）')
    else:
        emit.write_pair('discover', payload)
        print('已写入   : web/data/discover (.json + .js)')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
