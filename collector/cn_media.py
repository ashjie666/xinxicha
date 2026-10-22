# -*- coding: utf-8 -*-
"""国内游戏媒体 RSS（游戏茶馆 / 触乐）：只回答「国内媒体有没有报道这款游戏」。

**仅展示，不参与 6 项评分，也不进 P1→P2→P3 回退链**：
  - 两源每轮各请求 1 次（命中 http 缓存则不重复抓），请求量与游戏款数无关；
  - 源失败只把该源记进 state（ops 健康表可见），详情页对应面板显示「近 7 日无提及」，
    任何分数都不变；
  - 匹配只看标题：name_cn 按子串（中文没有词边界），name_en 按词边界（避免 mmo 命中
    commonplace 这类误伤；`Project Mugen / Neverness` 这类多别名按 / 拆开分别匹配）。

时间窗口按 RSS 里的 pubDate 过滤（游戏茶馆是 +0000、触乐是 +0800，parse 后统一转 CST）。
条目少于窗口天数也照常返回：这两家 feed 只给最近 10 / 30 条，本身就是「最近报道」。
"""

import re
import time
import xml.etree.ElementTree as ET
from datetime import timedelta, timezone
from email.utils import parsedate_to_datetime

from . import http

CST = timezone(timedelta(hours=8))
ASCII_TERM_RE = re.compile(r'[a-z0-9][a-z0-9 .\-]*')
# 「火影忍者手游」「王者荣耀国际服」在媒体标题里常省略后缀，补一条去后缀的别名提高命中率；
# 只去掉这两个后缀，避免把「洛克王国：世界」误缩成另一款页游「洛克王国」
CN_SUFFIXES = ('国际服', '手游')


def parse_feed(text):
    """解析 RSS 2.0 / Atom，返回条目列表；不是 XML 或没有条目结构时返回 None。

    与「解析成功但 0 条」区分：返回 None 表示源已失效（被重定向到 HTML / 拦截页），
    由调用方记成取源失败，而不是静默当成「无相关新闻」。
    """
    try:
        root = ET.fromstring(text)
    except Exception:  # noqa: BLE001 - 不是合法 XML，判定为非 RSS
        return None
    items = []
    for node in root.iter():
        if str(node.tag).split('}')[-1] not in ('item', 'entry'):
            continue
        title = link = pub_raw = ''
        for child in node:
            tag = str(child.tag).split('}')[-1]
            if tag == 'title' and not title:
                title = (child.text or '').strip()
            elif tag == 'link' and not link:
                # Atom 的 <link href="…"/> 没有文本，href 在属性里
                link = (child.text or child.attrib.get('href') or '').strip()
            elif tag in ('pubDate', 'published', 'updated', 'date') and not pub_raw:
                pub_raw = (child.text or '').strip()
        if not title:
            continue
        moment, published = _stamp(pub_raw)
        items.append({'title': title, 'url': link, 'published': published, 'moment': moment})
    return items


def _stamp(raw):
    """RSS 时间 → (CST 无时区 datetime, 'YYYY-MM-DD')；解析失败返回 (None, '')"""
    if not raw:
        return None, ''
    try:
        moment = parsedate_to_datetime(raw)
    except Exception:  # noqa: BLE001 - 个别源时间格式不规范，按「时间未知」处理
        return None, ''
    if moment is None:
        return None, ''
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=timezone.utc)
    local = moment.astimezone(CST)
    return local.replace(tzinfo=None), local.strftime('%Y-%m-%d')


def game_terms(game):
    """把一款游戏的标题匹配词摊平成 [(kind, term)]：kind=cn 走子串，kind=en 走词边界"""
    terms = []
    seen = set()
    for value in [game.get('name_cn') or ''] + [game.get('name_en') or '']:
        for part in re.split(r'[/、]', value):
            part = part.strip()
            if not part:
                continue
            key = part.lower()
            if key in seen:
                continue
            seen.add(key)
            terms.append(('en' if ASCII_TERM_RE.fullmatch(key) else 'cn', key))
    name_cn = (game.get('name_cn') or '').strip()
    for suffix in CN_SUFFIXES:
        if name_cn.endswith(suffix) and len(name_cn) > len(suffix):
            base = name_cn[:-len(suffix)].lower()
            if base not in seen:
                seen.add(base)
                terms.append(('cn', base))
    return terms


def title_hits(title_low, terms):
    """返回命中的第一个词（用于展示）；不命中返回空串"""
    for kind, term in terms:
        if kind == 'cn':
            if term in title_low:
                return term
            continue
        pattern = r'(?<![a-z0-9])' + re.escape(term) + r'(?![a-z0-9])'
        if re.search(pattern, title_low):
            return term
    return ''


def blank(key, label):
    return {'key': key, 'label': label, 'ok': False, 'items': 0, 'matched': 0,
            'error': None, 'skipped': False}


def collect(config, games, no_cache=False, offline=False):
    """返回 {'enabled', 'window_days', 'sources': [...], 'games': {game_id: {...}}}

    games[game_id] = {'count': 命中条数, 'titles': [{'source','label','title','url','published'}]}
    titles 已按时间倒序、按 config 的 titles_per_game 截断。
    """
    cfg = (config.get('collection') or {}).get('cn_media') or {}
    window_days = int(cfg.get('window_days') or 7)
    per_game = max(1, int(cfg.get('titles_per_game') or 3))
    enabled = bool(cfg.get('enabled', True))
    result = {'enabled': enabled, 'window_days': window_days, 'sources': [], 'games': {}}
    if not enabled:
        return result

    terms_by_game = dict((game.get('id'), game_terms(game)) for game in games)
    cutoff = http.now_cst() - timedelta(days=window_days)
    timeout = int((config.get('collection') or {}).get('request_timeout') or 8)
    user_agent = (config.get('collection') or {}).get('user_agent')
    ttl_hours = (config.get('collection') or {}).get('cache_ttl_hours', 12)

    for source in cfg.get('sources') or []:
        key = source.get('key') or ''
        label = source.get('label') or key
        stat = blank(key, label)
        result['sources'].append(stat)
        if offline:
            stat.update({'skipped': True, 'error': '离线模式，跳过调用'})
            continue

        fetched = http.fetch(source.get('url') or '', timeout=timeout, user_agent=user_agent,
                             use_cache=not no_cache, ttl_hours=ttl_hours)
        if not fetched.get('ok'):
            stat['error'] = '请求失败：{}'.format(fetched.get('error') or '未知错误')
            continue
        text = fetched.get('text') or ''
        if not http.looks_like_rss(text):
            stat['error'] = '返回非 RSS 内容（疑似拦截页或 feed 已停用）'
            continue
        items = parse_feed(text)
        if items is None:
            stat['error'] = 'RSS 解析失败（内容不是合法 XML）'
            continue

        window_items = []
        for item in items:
            if item['moment'] is not None and item['moment'] < cutoff:
                continue
            window_items.append(item)
        window_items.sort(key=lambda rec: rec['moment'] or cutoff, reverse=True)
        stat['ok'] = True
        stat['items'] = len(window_items)

        matched_any = set()
        for item in window_items:
            title_low = item['title'].lower()
            for game_id, terms in terms_by_game.items():
                hit = title_hits(title_low, terms)
                if not hit:
                    continue
                matched_any.add(item['url'] or item['title'])
                payload = result['games'].setdefault(game_id, {'count': 0, 'titles': []})
                payload['count'] += 1
                if len(payload['titles']) < per_game:
                    payload['titles'].append({
                        'source': key,
                        'label': label,
                        'title': item['title'],
                        'url': item['url'],
                        'published': item['published'],
                        'hit': hit,
                    })
        stat['matched'] = len(matched_any)

    return result


def main(argv=None):
    """命令行体检：python -m collector.cn_media（只读，不写 web/data）"""
    import argparse
    import os
    import sys

    parser = argparse.ArgumentParser(description='国内媒体 RSS 抓取体检（只读，不写数据）')
    parser.add_argument('--no-cache', action='store_true')
    parser.add_argument('--offline', action='store_true')
    args = parser.parse_args(argv)

    loaded = http.read_json(os.path.join(http.ROOT, 'config.json')) or {}
    seed = http.read_json(os.path.join(http.ROOT, 'data', 'seed_games.json')) or {'games': []}
    started = time.time()
    payload = collect(loaded, seed.get('games') or [], no_cache=args.no_cache, offline=args.offline)
    print('耗时 {:.1f}s · 窗口 {} 天'.format(time.time() - started, payload['window_days']))
    for stat in payload['sources']:
        print('{:<12}{:<4}{:>4} 条 · 命中 {:<3} {}'.format(
            stat['label'], 'OK' if stat['ok'] else 'FAIL', stat['items'], stat['matched'],
            stat['error'] or ''))
    for game_id, item in sorted(payload['games'].items(), key=lambda row: row[1]['count'], reverse=True):
        name = [g.get('name_cn') for g in seed.get('games') or [] if g.get('id') == game_id]
        print('{:<24}{:>3} 条  {}'.format(name[0] if name else game_id, item['count'],
                                         ' / '.join(rec['title'] for rec in item['titles'])[:120]))
    return 0


if __name__ == '__main__':
    import sys
    sys.exit(main(sys.argv[1:]))
