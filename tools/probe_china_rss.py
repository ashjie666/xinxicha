# -*- coding: utf-8 -*-
"""探测国内候选 RSS 源是否仍然可用（只读，不改数据、不联网写库）。

背景（2026-10-22 实测）：国内游戏媒体大面积下线 RSS，21 个候选地址里只活下来 3 个。
本脚本把当时的结论固化成可复跑的检查，避免以后接源时再手工逐个试：

  - 已知可用（known_good）：触乐 / 机核 / 游戏茶馆 —— 直连与海外出口（美国 IP）均返回 XML；
  - 曾失败：GameLook（feed 已停）/ 游研社（超时）/ 游民星空、3DM（403 反爬）/
    cnBeta（已并入 MSN）/ RSSHub 公共实例（国内不可达）等，留作回归观察。

用法：
    python tools/probe_china_rss.py                          # 直连全部候选
    python tools/probe_china_rss.py --only chuapp,gcores     # 只测指定源
    python tools/probe_china_rss.py --proxy sock:127.0.0.1:1080   # 经 SOCKS5 模拟海外出口（走 curl）
    python tools/probe_china_rss.py --proxy http://127.0.0.1:8899  # 经 HTTP 代理（走 urllib）

判定口径与 collector/http.py 的 looks_like_rss 一致：
  响应体以 <?xml / <rss / <feed 开头，且能解析出至少 1 个 <item>/<entry>，才算可用。
  HTTP 200 但返回 HTML（多数已停用 feed 的站点会跳首页）判为失败，不静默当成空结果。

退出码：known_good 的源全部可用 → 0；任一 known_good 失败 → 1（可接进 CI 做回归告警）。
"""

import argparse
import gzip
import os
import re
import shutil
import socket
import ssl
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zlib

UA = ('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
      '(KHTML, like Gecko) Chrome/124.0 Safari/537.36')

SOURCES = [
    {'key': 'chuapp', 'name': '触乐', 'url': 'https://www.chuapp.com/feed', 'known_good': True},
    {'key': 'gcores', 'name': '机核', 'url': 'https://www.gcores.com/rss', 'known_good': True},
    {'key': 'youxichaguan', 'name': '游戏茶馆', 'url': 'https://www.youxichaguan.com/feed', 'known_good': True},
    {'key': 'gamelook', 'name': 'GameLook', 'url': 'https://www.gamelook.com.cn/feed', 'known_good': False},
    {'key': 'gamelook-http', 'name': 'GameLook·http', 'url': 'http://www.gamelook.com.cn/feed', 'known_good': False},
    {'key': 'yysub', 'name': '游研社', 'url': 'https://www.yysub.net/rss', 'known_good': False},
    {'key': 'indienova', 'name': 'indienova', 'url': 'https://indienova.com/feed', 'known_good': False},
    {'key': 'youxiputao', 'name': '游戏葡萄', 'url': 'http://youxiputao.com/feed', 'known_good': False},
    {'key': 'gameres', 'name': 'GameRes', 'url': 'https://www.gameres.com/feed', 'known_good': False},
    {'key': 'donews', 'name': 'DoNews', 'url': 'https://www.donews.com/rss', 'known_good': False},
    {'key': 'cnbeta', 'name': 'cnBeta', 'url': 'https://www.cnbeta.com.tw/feed', 'known_good': False},
    {'key': 'gamersky', 'name': '游民星空', 'url': 'https://www.gamersky.com/rss', 'known_good': False},
    {'key': '3dmgame', 'name': '3DM', 'url': 'https://www.3dmgame.com/rss', 'known_good': False},
    {'key': 'a9vg', 'name': 'A9VG', 'url': 'https://www.a9vg.com/feed', 'known_good': False},
    {'key': 'rsshub-gamelook', 'name': 'RSSHub·GameLook', 'url': 'https://rsshub.app/gamelook', 'known_good': False},
]


def decode_body(raw, headers):
    encoding = (headers.get('Content-Encoding') or '').lower()
    if encoding == 'gzip':
        try:
            raw = gzip.decompress(raw)
        except Exception:  # noqa: BLE001 - 解压失败按原文处理，交给格式判定
            pass
    elif encoding == 'deflate':
        try:
            raw = zlib.decompress(raw)
        except Exception:  # noqa: BLE001
            pass
    charset = 'utf-8'
    found = re.search(r'charset=([\w-]+)', headers.get('Content-Type') or '', re.I)
    if found:
        charset = found.group(1)
    try:
        return raw.decode(charset, 'replace')
    except LookupError:
        return raw.decode('utf-8', 'replace')


def parse_feed(text):
    """返回 (条目数, 最新标题, 错误)。条目数 > 0 才算真 RSS。"""
    head = (text or '').lstrip()[:200].lower()
    if not (head.startswith('<?xml') or head.startswith('<rss') or head.startswith('<feed')):
        return 0, '', 'HTTP 200 但返回 HTML（非 RSS）'
    try:
        root = ET.fromstring(text)
    except ET.ParseError as error:
        return 0, '', 'XML 解析失败: {}'.format(str(error)[:60])
    items = [node for node in root.iter() if node.tag.split('}')[-1] in ('item', 'entry')]
    latest = ''
    if items:
        for child in items[0]:
            if child.tag.split('}')[-1] == 'title':
                latest = (child.text or '').strip().replace('\n', ' ')[:60]
                break
    if not items:
        return 0, '', 'RSS 里没有条目'
    return len(items), latest, ''


def fetch_urllib(url, proxy, timeout):
    handlers = [urllib.request.HTTPSHandler(context=ssl._create_unverified_context())]
    if proxy:
        handlers.append(urllib.request.ProxyHandler({'http': proxy, 'https': proxy}))
    opener = urllib.request.build_opener(*handlers)
    request = urllib.request.Request(url, headers={
        'User-Agent': UA,
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.6',
    })
    with opener.open(request, timeout=timeout) as response:
        raw = response.read()
        headers = {key: value for key, value in response.headers.items()}
    return {'ok': True, 'text': decode_body(raw, headers), 'ctype': headers.get('Content-Type') or '',
            'status': 200, 'final_url': '', 'error': ''}


def fetch_curl(url, proxy, timeout):
    """SOCKS5 代理只能走 curl：urllib 的 ProxyHandler 不支持 socks 协议。"""
    handle, path = tempfile.mkstemp(suffix='.xml')
    os.close(handle)
    try:
        command = ['curl', '-sS', '--proxy', proxy, '-A', UA, '-m', str(timeout),
                   '-o', path, '-w', '%{http_code}|%{content_type}|%{url_effective}', url]
        done = subprocess.run(command, capture_output=True, universal_newlines=True, timeout=timeout + 10)
        if done.returncode != 0:
            return {'ok': False, 'error': 'curl: {}'.format((done.stderr or '').strip()[:90])}
        parts = (done.stdout or '').strip().split('|')
        status = int(parts[0]) if parts and parts[0].isdigit() else 0
        ctype = parts[1] if len(parts) > 1 else ''
        final_url = parts[2] if len(parts) > 2 and parts[2] != url else ''
        if status >= 400:
            return {'ok': False, 'error': 'HTTP {}'.format(status)}
        with open(path, 'rb') as stream:
            raw = stream.read()
        return {'ok': True, 'text': raw.decode('utf-8', 'replace'), 'ctype': ctype,
                'status': status, 'final_url': final_url, 'error': ''}
    except subprocess.TimeoutExpired:
        return {'ok': False, 'error': 'curl 超时'}
    except Exception as error:  # noqa: BLE001
        return {'ok': False, 'error': '{}: {}'.format(type(error).__name__, str(error)[:90])}
    finally:
        try:
            os.remove(path)
        except OSError:
            pass


def probe(source, proxy, timeout):
    started = time.time()
    use_curl = bool(proxy) and proxy.lower().startswith(('sock', 'socks'))
    if use_curl and not shutil.which('curl'):
        return {'source': source, 'ok': False, 'error': 'SOCKS 代理需要 curl，但系统里找不到', 'ms': 0}
    try:
        if use_curl:
            result = fetch_curl(source['url'], proxy, timeout)
        else:
            result = fetch_urllib(source['url'], proxy, timeout)
    except urllib.error.HTTPError as error:
        return {'source': source, 'ok': False, 'error': 'HTTP {}'.format(error.code),
                'ms': int((time.time() - started) * 1000)}
    except (urllib.error.URLError, socket.timeout, ssl.SSLError) as error:
        reason = getattr(error, 'reason', error)
        return {'source': source, 'ok': False, 'error': '{}: {}'.format(type(error).__name__, str(reason)[:90]),
                'ms': int((time.time() - started) * 1000)}
    except Exception as error:  # noqa: BLE001
        return {'source': source, 'ok': False, 'error': '{}: {}'.format(type(error).__name__, str(error)[:90]),
                'ms': int((time.time() - started) * 1000)}

    if not result.get('ok'):
        return {'source': source, 'ok': False, 'error': result.get('error') or '请求失败',
                'ms': int((time.time() - started) * 1000)}

    items, latest, error = parse_feed(result.get('text') or '')
    return {
        'source': source,
        'ok': bool(items),
        'items': items,
        'latest': latest,
        'ctype': (result.get('ctype') or '').split(';')[0],
        'final_url': result.get('final_url') or '',
        'error': error,
        'ms': int((time.time() - started) * 1000),
    }


def main():
    parser = argparse.ArgumentParser(description='探测国内候选 RSS 源可用性（只读）')
    parser.add_argument('--proxy', default='', help='sock:host:port 或 socks5h://host:port（走 curl）；http://host:port（走 urllib）')
    parser.add_argument('--only', default='', help='只测指定 key，逗号分隔，如 chuapp,gcores')
    parser.add_argument('--timeout', type=int, default=15)
    args = parser.parse_args()

    proxy = args.proxy
    if proxy.lower().startswith('sock:'):
        proxy = 'socks5h://' + proxy[5:]

    wanted = set(key.strip() for key in args.only.split(',') if key.strip())
    sources = [row for row in SOURCES if not wanted or row['key'] in wanted]
    if not sources:
        print('没有匹配的源，可用 key：' + ', '.join(row['key'] for row in SOURCES))
        return 2

    print('代理: %s · 超时: %ss · 候选: %d 个\n' % (proxy or '直连', args.timeout, len(sources)))
    results = []
    for index, source in enumerate(sources, 1):
        result = probe(source, proxy, args.timeout)
        results.append(result)
        tag = 'OK  ' if result['ok'] else 'FAIL'
        print('[%d] %s %-16s %s' % (index, tag, source['name'], source['url']))
        if result['ok']:
            print('         %s · 条目 %d · 最新: %s · %dms'
                  % (result.get('ctype') or '—', result['items'], result.get('latest') or '—', result['ms']))
        else:
            print('         %s · %dms%s' % (result.get('error') or '失败', result['ms'],
                                            (' · 跳转至 ' + result['final_url']) if result.get('final_url') else ''))

    good = [row['source']['name'] for row in results if row['ok']]
    print('\n可用 %d / %d：%s' % (len(good), len(results), '、'.join(good) or '无'))

    broken_known = [row['source']['name'] for row in results
                    if row['source']['known_good'] and not row['ok']]
    if broken_known:
        print('回归告警：原本可用的源现在失败 —— ' + '、'.join(broken_known))
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
