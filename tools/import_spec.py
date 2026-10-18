# -*- coding: utf-8 -*-
"""一次性幂等导入：把规格表（xlsx 解包目录）固化成 data/seed_*.json。

  python tools/import_spec.py [--spec-dir _spec] [--xlsx <path>]

- 只读规格，不写 web/；产出人工基线层（采集器绝不改写这些字段）
- 幂等：重复运行结果一致；写入 meta.spec_sha（xlsx 原始文件 sha256）
- 只用标准库，兼容 Python 3.6+
"""

import argparse
import hashlib
import io
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
DEFAULT_XLSX = os.path.join(
    os.environ.get('USERPROFILE', ''), '.trae-cn', 'attachments',
    '137a2c12-49c8-4c46-8860-a4969a5d9f8b_8d4d8b0a-1505-4a87-9f38-61b7bbba7310_'
    '中国游戏厂商海外信息差监控MVP表格(含回退逻辑).xlsx')


def cell_text(cell):
    """内联字符串取 <t>，数字/公式取值取 <v>（Excel 对空单元格会整格省略）"""
    parts = []
    for node in cell.iter():
        tag = node.tag.rsplit('}', 1)[-1]
        if tag in ('t', 'v'):
            parts.append(node.text or '')
    return ''.join(parts).strip()


def col_of(ref):
    letters = re.match(r'([A-Z]+)', ref or '')
    return letters.group(1) if letters else ''


def read_sheet(path):
    """返回 {行号: {列字母: 文本}}"""
    with io.open(path, 'r', encoding='utf-8') as handle:
        tree = ET.parse(handle)
    rows = {}
    for row in tree.getroot().findall('.//m:sheetData/m:row', NS):
        index = int(row.get('r') or 0)
        values = {}
        for cell in row.findall('m:c', NS):
            col = col_of(cell.get('r'))
            if col:
                values[col] = cell_text(cell)
        rows[index] = values
    return rows


def col_index(letters):
    total = 0
    for char in letters:
        total = total * 26 + (ord(char) - 64)
    return total - 1


def row_list(values):
    """把 {列字母: 文本} 转成按列顺序的列表（左侧空列不丢）"""
    if not values:
        return []
    count = max(col_index(col) for col in values) + 1
    out = [''] * count
    for col, text in values.items():
        out[col_index(col)] = text
    return out


def header_of(rows, index):
    return row_list(rows.get(index, {}))


def table(rows, header_index, data_indexes, keys=None):
    """按表头生成字典列表；keys 指定列名（默认取表头原文）"""
    header = header_of(rows, header_index)
    names = keys if keys else [name.replace('\n', '') for name in header]
    items = []
    for index in data_indexes:
        values = row_list(rows.get(index, {}))
        if not any(values):
            continue
        item = {}
        for position, name in enumerate(names):
            if not name:
                continue
            item[name] = values[position] if position < len(values) else ''
        items.append(item)
    return items


def tail_lines(rows, start_index, end_index):
    lines = []
    for index in range(start_index, end_index + 1):
        for text in row_list(rows.get(index, {})):
            if text:
                lines.append(text)
    return lines


def slugify(text, fallback):
    slug = re.sub(r'[^a-z0-9]+', '-', (text or '').lower()).strip('-')
    return slug or fallback


def parse_date(raw):
    """宽松解析：'2026-10-27(首测)' 取 2026-10-27；'2026冬季(预估)'/'未公布' 返回 None"""
    match = re.search(r'(\d{4}-\d{2}-\d{2})', raw or '')
    return match.group(1) if match else None


def sha256_of(path):
    if not os.path.isfile(path):
        return ''
    digest = hashlib.sha256()
    with open(path, 'rb') as handle:
        while True:
            chunk = handle.read(65536)
            if not chunk:
                break
            digest.update(chunk)
    return digest.hexdigest()


def write_json(path, payload):
    directory = os.path.dirname(path)
    if directory and not os.path.isdir(directory):
        os.makedirs(directory)
    with io.open(path, 'w', encoding='utf-8', newline='\n') as handle:
        handle.write(json.dumps(payload, ensure_ascii=False, indent=2))
        handle.write(u'\n')


def build(rows1, rows2, rows3, rows4, rows5, rows6, rows7, spec_sha):
    fields = []
    for index in range(2, 18):
        values = row_list(rows1.get(index, {}))
        if len(values) < 2 or not values[0]:
            continue
        fields.append({
            'code': values[0],
            'name': values[1] if len(values) > 1 else '',
            'desc': values[2] if len(values) > 2 else '',
            'type': values[3] if len(values) > 3 else '',
            'freq': values[4] if len(values) > 4 else '',
            'source': values[5] if len(values) > 5 else '',
            'rule': values[6] if len(values) > 6 else '',
        })

    games = []
    used = {}
    for index in range(2, 22):
        values = row_list(rows2.get(index, {}))
        if len(values) < 8 or not values[1]:
            continue
        seq = int(values[0]) if values[0].isdigit() else index - 1
        base = slugify(values[2], 'game-{}'.format(seq))
        used[base] = used.get(base, 0) + 1
        game_id = base if used[base] == 1 else '{}-{}'.format(base, used[base])
        games.append({
            'id': game_id,
            'seq': seq,
            'name_cn': values[1],
            'name_en': values[2],
            'publisher': values[3],
            'type': values[4],
            'status': values[5],
            'launch_date_raw': values[6],
            'launch_date': parse_date(values[6]),
            'cn_guide_score': int(values[7]) if values[7].isdigit() else None,
            'gap_level': values[8],
            'trends_7d': None,
            'reddit_daily': None,
            'x_mentions': None,
            'total_score': None,
            'action_manual': values[13] if len(values) > 13 else '',
            'priority': values[14] if len(values) > 14 else '',
            'note': values[15] if len(values) > 15 else '',
            'signal_source': values[16] if len(values) > 16 else '',
            'confidence': values[17] if len(values) > 17 else '',
            'last_update': values[18] if len(values) > 18 else '',
        })

    keywords = []
    for index in range(2, 52):
        values = row_list(rows3.get(index, {}))
        if len(values) < 2 or not values[1]:
            continue
        keywords.append({
            'id': int(values[0]) if values[0].isdigit() else index - 1,
            'keyword': values[1],
            'game_cn': values[2] if len(values) > 2 else '',
            'intent': values[3] if len(values) > 3 else '',
            'competition': int(values[4]) if len(values) > 4 and values[4].isdigit() else None,
            'rank_est': values[5] if len(values) > 5 else '',
            'trends_7d': None,
            'covered': '',
            'page_plan': values[8] if len(values) > 8 else '',
            'note': values[9] if len(values) > 9 else '',
        })

    tasks = table(rows4, 1, range(2, 14), keys=[
        'id', 'stage', 'name', 'steps', 'tools', 'eta', 'status', 'note', 'fallback'])

    automation = table(rows5, 1, range(2, 12), keys=[
        'module', 'plan', 'tool', 'difficulty', 'priority', 'desc',
        'source_priority', 'fallback_target', 'failure_policy'])

    roadmap = table(rows6, 1, range(2, 7), keys=[
        'stage', 'time', 'goal', 'tasks', 'deliverable', 'acceptance'])

    fallback_sources = table(rows7, 1, range(2, 11), keys=[
        'priority', 'source', 'purpose', 'condition', 'target', 'weight', 'policy'])

    fallback_rules = tail_lines(rows7, 14, 19)
    weights = table(rows7, 22, range(23, 29), keys=['signal', 'weight', 'desc'])

    seed_games = {
        'meta': {
            'spec_sha': spec_sha,
            'source_title': '中国游戏厂商海外信息差监控MVP表格(含回退逻辑)',
            'sheet': 'MVP字段表 + 目标游戏清单',
            'note': '人工基线层：采集器只改写自动字段，本文件字段永不改写',
        },
        'field_dict': fields,
        'games': games,
        'signal_notes': tail_lines(rows2, 22, 26),
    }
    seed_keywords = {
        'meta': {'spec_sha': spec_sha, 'sheet': '关键词清单', 'count': len(keywords)},
        'keywords': keywords,
    }
    seed_ops = {
        'meta': {'spec_sha': spec_sha, 'sheet': '每日任务清单 + 自动化说明 + 实施路线图 + 回退逻辑说明'},
        'tasks': tasks,
        'automation': automation,
        'roadmap': roadmap,
        'fallback_sources': fallback_sources,
        'fallback_rules': fallback_rules,
        'weights': weights,
    }
    return seed_games, seed_keywords, seed_ops


def main(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument('--spec-dir', default=os.path.join(ROOT, '_spec'))
    parser.add_argument('--xlsx', default=DEFAULT_XLSX)
    parser.add_argument('--out', default=os.path.join(ROOT, 'data'))
    args = parser.parse_args(argv)

    sheets = []
    for index in range(1, 8):
        path = os.path.join(args.spec_dir, 'xl', 'worksheets', 'sheet{}.xml'.format(index))
        if not os.path.isfile(path):
            raise SystemExit('缺少规格表文件：{}'.format(path))
        sheets.append(read_sheet(path))

    spec_sha = sha256_of(args.xlsx)
    seed_games, seed_keywords, seed_ops = build(*(sheets + [spec_sha]))

    write_json(os.path.join(args.out, 'seed_games.json'), seed_games)
    write_json(os.path.join(args.out, 'seed_keywords.json'), seed_keywords)
    write_json(os.path.join(args.out, 'seed_ops.json'), seed_ops)

    print('seed_games.json  : {} 款游戏 / {} 个字段'.format(
        len(seed_games['games']), len(seed_games['field_dict'])))
    print('seed_keywords.json: {} 个关键词'.format(len(seed_keywords['keywords'])))
    print('seed_ops.json    : {} 条任务 / {} 个自动化模块 / {} 条回退源 / {} 条规则 / {} 行权重 / {} 阶段路线图'.format(
        len(seed_ops['tasks']), len(seed_ops['automation']), len(seed_ops['fallback_sources']),
        len(seed_ops['fallback_rules']), len(seed_ops['weights']), len(seed_ops['roadmap'])))
    print('spec_sha         : {}'.format(spec_sha[:16] if spec_sha else '(未找到 xlsx，跳过校验)'))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
