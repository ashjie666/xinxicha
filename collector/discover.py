# -*- coding: utf-8 -*-
"""新游候选发现层（方案 A）：复用 Bing News RSS，按已知厂商名 + 品类词检索。

候选**只提示、不入库、不参与评分**——人工确认后才由人写进 data/seed_games.json。
因此本模块不触碰评分模型，也不改 20 款清单本身。

网络侧见 http.fetch_bing_news：www.bing.com 对中国大陆 IP 会跳转到 cn.bing.com（该站
不提供 News RSS），故按顺序回退到 global.bing.com 并带上锁定美国市场的 Cookie。

相关性过滤见 config.discovery.relevance：中文检索词的 Bing News 结果会混进大量无关
内容（景区上新、文化旅游节之类），故要求标题同时命中「目标词」（target.match）与
「游戏类词」（relevance.game_terms）才留下；两者各自的丢弃数记在目标行上。

CLI 便于本地单独验证（不写盘用 --dry-run）：
    python -m collector.discover [--limit N] [--offline] [--dry-run]
"""

import argparse
import html
import os
import re
import sys
import time
from datetime import timedelta, timezone
from email.utils import parsedate_to_datetime
from xml.etree import ElementTree as ET

from . import emit
from . import http

# 区域跳转与 host 回退见 http.BING_NEWS_HOSTS：中国大陆 IP 访问 www.bing.com 会被
# 302 到 cn.bing.com（该站不提供 News RSS），需回退到 global.bing.com + 市场 Cookie。
TAG_RE = re.compile(r'<[^>]+>')
WS_RE = re.compile(r'\s+')
NORM_RE = re.compile(r'[\s\W_]+', re.UNICODE)
ASCII_TERM_RE = re.compile(r'[a-z0-9][a-z0-9 .\-]*')
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


def fetch_items(collection, query):
    """取该 query 的 Bing News RSS，返回 (items, error)。

    items 为列表（允许为空）= 解析成功；取不到 RSS 时 items 为 None。
    host 顺序与市场 Cookie 见 http.fetch_bing_news（海外机房走第一顺位即可）。
    """
    feed = http.fetch_bing_news(query,
                                timeout=collection.get('request_timeout', 8),
                                user_agent=collection.get('user_agent'),
                                use_cache=True,
                                ttl_hours=collection.get('cache_ttl_hours', 12))
    if not feed.get('ok'):
        return None, feed.get('error') or '请求失败'
    items = parse_rss(feed.get('text') or '')
    if items is None:
        return None, '{} 返回非 RSS 内容（被重定向到网页）'.format(feed.get('host') or 'Bing')
    return items, None


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


def term_hits(title_low, term):
    """单个词是否命中标题。

    纯英文（数字）词按词边界匹配，否则 mmo 会命中 commonplace；含中文的词直接做
    子串匹配——中文没有词边界，且关键词本身就是完整词组。
    """
    term = (term or '').strip().lower()
    if not term:
        return False
    if ASCII_TERM_RE.fullmatch(term):
        pattern = r'(?<![a-z0-9])' + re.escape(term) + r'(?![a-z0-9])'
        return re.search(pattern, title_low) is not None
    return term in title_low


def target_terms(target):
    """target 的目标词：优先取 config 的 match；缺失时按厂商名 / 品类分词兜底"""
    terms = [term for term in (target.get('match') or []) if term]
    if terms:
        return terms
    if target.get('kind') == 'publisher':
        return [target.get('label') or '']
    return [part for part in re.split(r'[\s/、]+', target.get('category') or '') if part]


def relevance(title, terms, game_terms, launch_terms=None):
    """返回 (命中的目标词, 命中的游戏类词, 命中的上线词)

    目标词为空即判定为无关；游戏类词与上线词只要命中其一就保留——「上线 / 发售 /
    定档」这类标题即使不含「新游 / 游戏」等词，也是明确的新品信号，单独判为无效会漏掉
    最有价值的档期消息。上线词单独返回是为了在页面「命中依据」里单独展示一格。
    游戏类词里排除掉本 target 自己的 match 词：品类目标的 match 本身就是领域词
    （休闲 / 塔防 / SLG），不去掉的话「休闲」一个词就同时凑满两个命中，过滤失效。
    """
    low = (title or '').lower()
    own = set((term or '').strip().lower() for term in terms)
    hit_target = next((term for term in terms if term_hits(low, term)), '')
    hit_theme = next((term for term in game_terms
                      if (term or '').strip().lower() not in own and term_hits(low, term)), '')
    hit_launch = next((term for term in (launch_terms or [])
                       if (term or '').strip().lower() not in own and term_hits(low, term)), '')
    return hit_target, hit_theme, hit_launch


def build(config, seed_games, run_info, p2_network=True, offline=False, limit=0):
    """逐 target 检索 → 过滤已知游戏 → 相关性过滤 → 去重 → 按时间倒序截断，返回 discover payload"""
    cfg = config.get('discovery') or {}
    relevance_cfg = cfg.get('relevance') or {}
    game_terms = [term for term in (relevance_cfg.get('game_terms') or []) if term]
    launch_terms = [term for term in (relevance_cfg.get('launch_terms') or []) if term]
    relevance_on = bool(relevance_cfg.get('enabled', True)) and bool(game_terms or launch_terms)
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
            'dropped_target': 0,
            'dropped_theme': 0,
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

        items, error = fetch_items(collection, row['query'])
        if items is None:
            row['error'] = error
            target_rows.append(row)
            continue
        row['ok'] = True
        row['hits'] = len(items)

        terms = target_terms(target)
        fresh = []
        for item in items:
            if not item['title'] or is_known(item['title'], names):
                continue
            hit_target = hit_theme = hit_launch = ''
            if relevance_on:
                hit_target, hit_theme, hit_launch = relevance(
                    item['title'], terms, game_terms, launch_terms)
                if not hit_target:
                    row['dropped_target'] += 1
                    continue
                if not hit_theme and not hit_launch:
                    row['dropped_theme'] += 1
                    continue
            # 不能去掉 query 再当去重键：Bing News RSS 把所有链接都包成同一条
            # apiclick.aspx?…&tid=xxx 跳转地址，只有 query 部分能区分文章。
            key_url = (item['url'] or '').strip()
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
                'hit_target': hit_target,
                'hit_theme': hit_theme,
                'hit_launch': hit_launch,
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

    seqs = [int(game.get('seq') or 0) for game in seed_games.get('games', [])]
    counts = {
        'candidates': len(candidates),
        'targets': len(target_rows),
        'targets_ok': len([row for row in target_rows if row['ok']]),
        'known_games': len(seed_games.get('games', [])),
        'dropped_target': sum(row['dropped_target'] for row in target_rows),
        'dropped_theme': sum(row['dropped_theme'] for row in target_rows),
    }
    counts['dropped_total'] = counts['dropped_target'] + counts['dropped_theme']
    return {
        'meta': emit.build_meta(config, run_info, counts),
        'note': cfg.get('note') or '',
        'relevance': {
            'enabled': relevance_on,
            'note': relevance_cfg.get('note') or '',
            'game_terms': game_terms,
        },
        'truncated': truncated,
        # 前端「加入监控」生成条目时用它填 seq，避免与既有清单撞号
        'next_seq': (max(seqs) + 1) if seqs else 1,
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

    print('{:<28}{:<10}{:>6}{:>8}{:>6}  {}'.format(
        '检索目标', '类型', '命中', '已过滤', '新增', '状态'))
    for row in payload['targets']:
        print('{:<28}{:<10}{:>6}{:>8}{:>6}  {}'.format(
            row['label'], '厂商' if row['kind'] == 'publisher' else '品类',
            row['hits'], row['dropped_target'] + row['dropped_theme'], row['new'],
            'OK' if row['ok'] else (row['error'] or '失败')))
    counts = payload['meta']['counts']
    print('\n候选合计 {} 条（截断:{}）· 目标 OK {}/{} · 已监控 {} 款已过滤 · 相关性剔除 {} 条（未命中目标词 {} / 未命中游戏类词或上线词 {}）'.format(
        counts['candidates'], '是' if payload['truncated'] else '否',
        counts['targets_ok'], counts['targets'], counts['known_games'],
        counts['dropped_total'], counts['dropped_target'], counts['dropped_theme']))
    for record in payload['candidates'][:10]:
        print('  [{}] {} ← {}（命中 {} + {}）'.format(
            record['published'] or '时间未知', record['title'], record['target'],
            record.get('hit_target') or '—', record.get('hit_theme') or '—'))

    if args.dry_run:
        print('（--dry-run，未写入 web/data）')
    else:
        emit.write_pair('discover', payload)
        print('已写入   : web/data/discover (.json + .js)')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
