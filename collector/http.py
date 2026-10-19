# -*- coding: utf-8 -*-
"""std-lib HTTP + 原子写 + 本地缓存（兼容 Python 3.6+）。"""

import hashlib
import io
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(ROOT, 'data', 'cache')

CST = timedelta(hours=8)


def now_cst():
    """北京时间（不依赖本机时区，CI 的 UTC runner 也成立）"""
    return datetime.utcfromtimestamp(time.time() + 8 * 3600)


def stamp_cst(fmt='%Y-%m-%d %H:%M:%S'):
    return now_cst().strftime(fmt)


def today_cst():
    return now_cst().strftime('%Y-%m-%d')


def read_json(path, default=None):
    if not os.path.isfile(path):
        return default
    try:
        with io.open(path, 'r', encoding='utf-8') as handle:
            return json.load(handle)
    except ValueError:
        return default


def atomic_write(path, text):
    directory = os.path.dirname(path)
    if directory and not os.path.isdir(directory):
        os.makedirs(directory)
    temp = path + '.tmp'
    with io.open(temp, 'w', encoding='utf-8', newline='\n') as handle:
        handle.write(text)
    if os.path.isfile(path):
        os.remove(path)
    os.rename(temp, path)


def write_json(path, payload):
    atomic_write(path, json.dumps(payload, ensure_ascii=False, indent=2) + u'\n')


def cache_key(url):
    return hashlib.sha1(url.encode('utf-8')).hexdigest()


def cache_paths(url):
    key = cache_key(url)
    return (os.path.join(CACHE_DIR, key + '.json'), os.path.join(CACHE_DIR, key + '.body'))


def cache_get(url, ttl_hours):
    meta_path, body_path = cache_paths(url)
    meta = read_json(meta_path)
    if not meta or not os.path.isfile(body_path):
        return None
    if ttl_hours is not None:
        age = time.time() - float(meta.get('fetched_at_epoch') or 0)
        if age > ttl_hours * 3600:
            return None
    with io.open(body_path, 'r', encoding='utf-8', errors='replace') as handle:
        return handle.read()


def cache_put(url, text, status):
    meta_path, body_path = cache_paths(url)
    atomic_write(body_path, text)
    write_json(meta_path, {
        'url': url,
        'status': status,
        'fetched_at': stamp_cst(),
        'fetched_at_epoch': time.time(),
        'length': len(text),
    })


def fetch(url, timeout=8, user_agent=None, use_cache=True, ttl_hours=12, headers=None):
    """返回 {ok, status, text, cached, error}；任何异常都被吸收，不抛出

    headers 为追加的自定义请求头（如 Cookie: _EDGE_S=mkt=en-us 用于绕开
    Bing 对中国大陆 IP 的区域跳转），默认头不受影响。
    """
    if use_cache:
        cached = cache_get(url, ttl_hours)
        if cached is not None:
            return {'ok': True, 'status': 200, 'text': cached, 'cached': True, 'error': None}

    request = urllib.request.Request(url)
    request.add_header('User-Agent', user_agent or 'Mozilla/5.0 (compatible; xinxicha-monitor/0.1)')
    request.add_header('Accept', 'application/json,text/html;q=0.9,*/*;q=0.8')
    for name, value in (headers or {}).items():
        request.add_header(name, value)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            body = response.read().decode('utf-8', 'replace')
            status = getattr(response, 'status', 200) or 200
        if use_cache:
            cache_put(url, body, status)
        return {'ok': True, 'status': status, 'text': body, 'cached': False, 'error': None}
    except urllib.error.HTTPError as error:
        return {'ok': False, 'status': error.code, 'text': '', 'cached': False,
                'error': 'HTTP {}'.format(error.code)}
    except Exception as error:  # noqa: BLE001 - 任何网络异常都只降级，不影响主流程
        return {'ok': False, 'status': 0, 'text': '', 'cached': False,
                'error': '{}: {}'.format(type(error).__name__, error)}


def fetch_json(url, **kwargs):
    result = fetch(url, **kwargs)
    if not result['ok']:
        return result
    try:
        result['data'] = json.loads(result['text'])
    except ValueError as error:
        result['ok'] = False
        result['error'] = 'JSON 解析失败: {}'.format(error)
    return result


# Bing News RSS 的区域跳转：中国大陆 IP 访问 www.bing.com 会被 302 到 cn.bing.com，
# 而 cn.bing.com 不提供该订阅源（继续 302 回首页 HTML）。global.bing.com 解析到微软
# 全球边缘节点，只要带上锁定美国市场的 Cookie 就能拿到真正的 XML。海外机房（CI）
# 走第一顺位即可，无需回退。
BING_NEWS_HOSTS = ('www.bing.com', 'global.bing.com')
BING_NEWS_COOKIE = '_EDGE_S=mkt=en-us'
BING_NEWS_URL = ('https://{host}/news/search?q={query}'
                 '&qft=sortbydate%3d%221%22&format=rss')


def looks_like_rss(text):
    """轻量判定响应是不是 RSS：真订阅源一定是 XML 开头，被重定向时给的是 HTML 首页"""
    head = (text or '').lstrip()[:200].lower()
    return head.startswith('<?xml') or head.startswith('<rss')


def fetch_bing_news(query, timeout=8, user_agent=None, use_cache=True, ttl_hours=12):
    """按 BING_NEWS_HOSTS 顺序取 Bing News RSS，返回 {ok, text, host, cached, error}

    ok 为 True 表示「拿到了 RSS 文本」而不只是「HTTP 200」——被重定向到网页 HTML 时
    记成错误，避免把「源已失效」静默当成「无相关新闻」。任何异常都被吸收，不抛出。
    """
    last_error = '未发起请求'
    for host in BING_NEWS_HOSTS:
        url = BING_NEWS_URL.format(host=host, query=urllib.parse.quote(query or ''))
        result = fetch(url, timeout=timeout, user_agent=user_agent, use_cache=use_cache,
                       ttl_hours=ttl_hours, headers={'Cookie': BING_NEWS_COOKIE})
        if not result.get('ok'):
            last_error = result.get('error') or '请求失败'
            continue
        if not looks_like_rss(result.get('text')):
            last_error = '{} 返回非 RSS 内容（被重定向到网页）'.format(host)
            continue
        return {'ok': True, 'text': result.get('text') or '', 'host': host,
                'cached': result.get('cached'), 'error': None}
    return {'ok': False, 'text': '', 'host': '', 'cached': False, 'error': last_error}


def probe_network(url, timeout=3):
    """开局轻量探测：只判断网络通不通，不写缓存"""
    result = fetch(url, timeout=timeout, use_cache=False)
    return bool(result['ok'])
