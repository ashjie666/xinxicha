# -*- coding: utf-8 -*-
"""一次性验证：Trends 款级 stale 兜底（不联网、不改数据）。

在 GitHub Actions 手动触发 workflow「verify-trends-fallback」后运行：
先由 actions/cache 恢复上一轮采集的 data/source_state.json，再直接调用
真实的 Collector._with_fallback，检查两件事：

1. 有款级历史的游戏：失败信号应取回「本款」的历史值，kind 标为 stale；
2. 无历史的游戏：失败信号原样返回，value 保持 None（不借别款的值）。

为什么不能直接等自然触发：款级兜底要同时满足「该款今天失败」+「该款此前
成功过」。若当天失败的款都没有历史，兜底分支根本不会被走到，只能靠这里
人工注入一个失败信号来验证。
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from collector import sources  # noqa: E402

STATE_PATH = Path('data/source_state.json')
STALE_KIND = 'stale（沿用本款上次有效值）'


def main():
    if not STATE_PATH.exists():
        print('SKIP: 没有 data/source_state.json（缓存未命中），本轮不做判定')
        return 0

    state = json.loads(STATE_PATH.read_text(encoding='utf-8'))
    games = state.get('games') or {}
    with_history = [
        (game_id, (entry.get('trends') or {}).get('value'))
        for game_id, entry in games.items()
        if (entry.get('trends') or {}).get('value') is not None
    ]
    if not with_history:
        print('SKIP: state 里没有任何款级 trends 历史，无法验证兜底')
        return 0

    collector = sources.Collector.__new__(sources.Collector)
    collector.state = state
    failed = sources.unavailable('Google Trends', 'Fallback: Google Search', '模拟取源失败')

    game_id, expected = with_history[0]
    got = collector._with_fallback('trends', failed, 'Trends', game_id)
    ok_value = got.get('value') == expected
    ok_kind = got.get('kind') == STALE_KIND

    missing = collector._with_fallback('trends', failed, 'Trends', '__no_history__')
    ok_empty = missing.get('value') is None

    print('样本款: %s' % game_id)
    print('  历史值=%r  兜底值=%r  kind=%r' % (expected, got.get('value'), got.get('kind')))
    print('无历史款: value=%r（应为 None）' % missing.get('value'))

    ok = ok_value and ok_kind and ok_empty
    print('RESULT: %s' % ('PASS' if ok else 'FAIL'))
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
