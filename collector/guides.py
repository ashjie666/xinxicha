# -*- coding: utf-8 -*-
"""海外攻略供给采集：按 Reddit 攻略贴计数折算 0–10 的 overseas_supply。

为什么单独一个模块、而不是塞进 sources._reddit：
  1) 现有 Reddit 采集量的是「近 24 小时讨论量」（t=day、sort=new），
     攻略供给看的是「近一年有没有攻略可看」，时间窗与查询词都不同；
     合成一次请求会让两个指标的定义互相污染。
  2) 逐款多打一次请求成本翻倍，且 Reddit 对匿名 RSS 限流很紧（2026-10-23
     实测 30s 间隔仍会 429），故做成「每周一次 + 款级缓存」：非当周直接读
     state 上次结果。

写入位置：
  state.games[game_id]['guide_posts'|'guide_hits'|'guide_supply'] = {value, at}
  state.sources['reddit_guides'] = 源健康（ops 页可见）
  state.meta['guides_at'] = 本周实际采集时间
"""

import email.utils
import re
import time
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta

from . import http
from . import state as state_mod


def _norm(text):
    """归一化：小写 + 把标点换成空格 + 压缩空白

    用于跨标点差异的短语匹配。2026-10-23 实测：《Honkai: Star Rail》带冒号，
    直接拿去搜会把冒号当分隔符，返回 100 条却没一条标题含原名；标题里写的是
    「Honkai: Star Rail Progression Guide」，若按原串做子串匹配也永远命中不了。
    两边都归一化后再按词边界比对即可。
    """
    return re.sub(r'[\W_]+', ' ', (text or '').lower(), flags=re.UNICODE).strip()


def _query_name(name):
    """查询用的名字：标点换空格、保留原大小写（Reddit 搜索不区分大小写）"""
    return re.sub(r'[\W_]+', ' ', name or '').strip()


def _parse_dt(text):
    """解析 Atom 的 published/updated（ISO）或 RSS 的 pubDate（RFC 822）"""
    text = (text or '').strip()
    if not text:
        return None
    try:
        return datetime.fromisoformat(text.replace('Z', '+00:00')).replace(tzinfo=None)
    except ValueError:
        pass
    try:
        parsed = email.utils.parsedate_to_datetime(text)
        return parsed.replace(tzinfo=None)
    except (TypeError, ValueError):
        return None


def _entries(text):
    """返回 [(发布时间 datetime|None, 标题)]，兼容 Atom <entry> 与 RSS <item>

    根节点必须是 feed / rss / RDF：Reddit 被拦截时仍是 HTTP 200，正文是网页 HTML，
    若不校验会被 ET 解析成「0 条」并当成采集成功——请求失败与「确实没有攻略贴」
    就分不开了（项目已有同类教训，见 source_state 相关记录）。此时返回 None。
    """
    try:
        root = ET.fromstring(text)
    except Exception:  # noqa: BLE001 - 解析失败由调用方按取源失败处理
        return None
    root_tag = root.tag.split('}')[-1] if isinstance(root.tag, str) else ''
    if root_tag not in ('feed', 'rss', 'RDF'):
        return None
    rows = []
    for node in root.iter():
        tag = node.tag
        if not isinstance(tag, str) or tag.split('}')[-1] not in ('item', 'entry'):
            continue
        title, published = '', None
        for child in node:
            name = child.tag.split('}')[-1]
            if name == 'title':
                title = child.text or ''
            elif name in ('published', 'updated', 'pubDate') and child.text:
                published = published or _parse_dt(child.text)
        rows.append((published, title))
    return rows


def _tally(rows, since, phrase, terms):
    """返回 (相关帖数, 其中标题含攻略词的条数)

    主计数＝标题含游戏名短语的近一年帖数，短语按词边界比对（防 mmo 命中
    commonplace 这类子串噪音）。2026-10-23 实测《Monster Hunter Outlanders》
    近一年相关帖 100 条（limit 上限），而标题带 guide/tips 的只有 1 条：社区供给
    绝大多数是新闻、讨论、实机视频，若用「标题出现攻略词」当计数，所有游戏都会
    落在 0–1 档、差异被压平。供给分因此按 guide_hits 折算，posts 只作展示。
    """
    key = _norm(phrase)
    posts = guide_hits = 0
    if not key:
        return posts, guide_hits
    needle = ' ' + key + ' '
    normalized_terms = [_norm(term) for term in terms]
    for published, title in rows:
        if published is not None and published < since:
            continue
        flat = _norm(title)
        if needle not in ' ' + flat + ' ':
            continue
        posts += 1
        if any(term and term in flat for term in normalized_terms):
            guide_hits += 1
    return posts, guide_hits


def _supply_of(count, buckets):
    """把攻略贴条数折算成 0–10 的供给分（条数越多供给越充足）"""
    for threshold, value in sorted(buckets, key=lambda pair: pair[0], reverse=True):
        if count >= threshold:
            return float(value)
    return 0.0


def _recent(state, game_id, key, max_stale_days):
    """读款级上次值；超过 max_stale_days 视为过期（返回 None）"""
    entry = ((state.get('games') or {}).get(game_id) or {}).get(key) or {}
    value, at = entry.get('value'), entry.get('at')
    if value is None or not at:
        return None
    try:
        stamp = datetime.strptime(at, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        return None
    age_days = (http.now_cst() - stamp).total_seconds() / 86400.0
    return value if age_days <= max_stale_days else None


def _is_due(state, config):
    cfg = config.get('guides') or {}
    every = int(cfg.get('every_days') or 7)
    last = (state.get('meta') or {}).get('guides_at')
    if not last:
        return True
    try:
        stamp = datetime.strptime(last, '%Y-%m-%d %H:%M:%S')
    except ValueError:
        return True
    return (http.now_cst() - stamp).days >= every


def collect(config, games, state, offline=False, no_cache=False):
    """返回 {'due', 'collected', 'failed', 'skipped', 'games': {game_id: {...}}}

    每款结果键：
      posts     近一年标题含游戏名的帖子数（社区体量，= limit 时代表「≥limit」，saturated 标）
      guide_hits 其中标题还含攻略词的条数（折 supply 的依据）
      supply    0–10 供给分（由 guide_hits 按 buckets 折算）
      saturated 是否触到 limit 上限（显示为 100+）
      kind      fresh / cached / none

    折算依据为什么是 guide_hits 而不是 posts：2026-10-23 实测（t=year、sort=new、
    limit=100），《Wuthering Waves》100 条里标题含名 32、攻略词 6；《Phantom Blade
    Zero》57/2；《Monster Hunter Outlanders》100 条里攻略词 1。用攻略词命中折算，
    三款落到 6 / 4 / 2 三档，与人工 gap_level（低 / 中 / 高）方向一致；若改用帖总量
    （32 / 57 / 85），MHO 会被判成「供给充足」，与人工判断相反——它那 100 条多半是
    同一支官方预告被多个 bot 重复转发。posts 只作展示，反映社区体量。

    查询用引号短语（`"游戏名"`）：2026-10-23 实测不加引号时 Reddit 走宽松词匹配，
    搜《Monster Hunter Outlanders》会返回 Edmonton 舞蹈指南、求职贴等无关内容，
    还混进 2010 年的旧帖；加引号后 29 条里 27 条标题含游戏名。
    """
    cfg = config.get('guides') or {}
    result = {'due': False, 'collected': 0, 'failed': 0, 'skipped': 0, 'games': {}}
    if not cfg.get('enabled'):
        for game in games:
            result['games'][game['id']] = {'posts': None, 'guide_hits': None, 'supply': None,
                                           'saturated': False, 'kind': 'none', 'at': None}
        return result

    max_stale = float(cfg.get('max_stale_days') or 21)
    due = _is_due(state, config)
    result['due'] = due

    if not due or offline:
        limit = int(cfg.get('limit') or 100)
        for game in games:
            posts = _recent(state, game['id'], 'guide_posts', max_stale)
            supply = _recent(state, game['id'], 'guide_supply', max_stale)
            hits = _recent(state, game['id'], 'guide_hits', max_stale)
            result['games'][game['id']] = {
                'posts': None if posts is None else int(posts),
                'guide_hits': None if hits is None else int(hits),
                'supply': None if supply is None else float(supply),
                'saturated': bool(posts is not None and int(posts) >= limit),
                'kind': 'cached' if supply is not None else 'none',
                'at': ((state.get('games') or {}).get(game['id']) or {}).get('guide_supply', {}).get('at'),
            }
            result['skipped'] += 1
        return result

    terms = [str(term).lower() for term in (cfg.get('terms') or [])]
    buckets = cfg.get('buckets') or [[0, 0]]
    window_days = int(cfg.get('window_days') or 365)
    limit = int(cfg.get('limit') or 100)
    interval = float(cfg.get('interval_sec') or 0)
    retry_wait = float(cfg.get('retry_wait_sec') or 0)
    attempts = max(1, int(cfg.get('max_attempts') or 1))
    budget = float(cfg.get('budget_seconds') or 0)
    started = time.time()
    since = http.now_cst() - timedelta(days=window_days)
    first_error = None

    for game in games:
        # reddit_query 可在 seed 里逐款覆盖（如 HUNGER 这类通名游戏需加限定词）
        phrase = (game.get('reddit_query') or game.get('name_en') or '').strip()
        if not phrase:
            result['games'][game['id']] = {'posts': None, 'guide_hits': None, 'supply': None,
                                           'saturated': False, 'kind': 'none', 'at': None}
            result['skipped'] += 1
            continue

        posts = supply = hits = None
        error = None
        if budget and (time.time() - started) > budget:
            error = '攻略采集预算用尽'
        else:
            query = (cfg.get('query_template') or '"{name}"').format(name=_query_name(phrase))
            url = 'https://www.reddit.com/search.rss?q={}&sort=new&t=year&limit={}'.format(
                urllib.parse.quote(query, safe=':"'), limit)
            for attempt in range(attempts):
                if interval > 0:
                    time.sleep(interval)
                fetched = http.fetch(
                    url,
                    timeout=config['collection']['request_timeout'],
                    user_agent='xinxicha-monitor/0.1 (by /u/xinxicha)',
                    use_cache=not no_cache,
                    ttl_hours=config['collection']['cache_ttl_hours'])
                if fetched.get('ok'):
                    rows = _entries(fetched.get('text') or '')
                    if rows is None:
                        error = 'Reddit 攻略源解析失败（疑似拦截页）'
                    else:
                        posts, hits = _tally(rows, since, phrase, terms)
                        supply = _supply_of(hits, buckets)
                    break
                error = 'Reddit: {}'.format(fetched.get('error'))
                if fetched.get('status') != 429 or attempt + 1 >= attempts:
                    break
                if budget and (time.time() - started) + retry_wait > budget:
                    break
                time.sleep(retry_wait)

        if posts is not None:
            state_mod.record_game(state, game['id'], 'guide_posts', posts)
            state_mod.record_game(state, game['id'], 'guide_hits', hits)
            state_mod.record_game(state, game['id'], 'guide_supply', supply)
            result['games'][game['id']] = {
                'posts': posts, 'guide_hits': hits, 'supply': supply,
                'saturated': posts >= limit, 'kind': 'fresh', 'at': http.stamp_cst(),
            }
            result['collected'] += 1
        else:
            first_error = first_error or error
            cached_posts = _recent(state, game['id'], 'guide_posts', max_stale)
            cached_supply = _recent(state, game['id'], 'guide_supply', max_stale)
            cached_hits = _recent(state, game['id'], 'guide_hits', max_stale)
            result['games'][game['id']] = {
                'posts': None if cached_posts is None else int(cached_posts),
                'guide_hits': None if cached_hits is None else int(cached_hits),
                'supply': None if cached_supply is None else float(cached_supply),
                'saturated': bool(cached_posts is not None and int(cached_posts) >= limit),
                'kind': 'cached' if cached_supply is not None else 'none',
                'at': ((state.get('games') or {}).get(game['id']) or {}).get('guide_supply', {}).get('at'),
            }
            result['failed'] += 1

    # 源健康：本周至少拿到一条才算成功；失败次数由 state 累计
    state_mod.record(
        state, 'reddit_guides', result['collected'] > 0,
        value=result['collected'], error=first_error,
        degrade_after=config['collection']['failure_policy']['degrade_after_consecutive_failures'])
    state.setdefault('meta', {})['guides_at'] = http.stamp_cst()
    return result
