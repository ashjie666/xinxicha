# -*- coding: utf-8 -*-
"""一次性验证：Trends 款级 stale 兜底（不联网、不改数据）。

在 GitHub Actions 手动触发 workflow「verify-trends-fallback」后运行，
直接调用真实的 Collector._with_fallback，检查三件事：

1. 合成用例：用 state.record_game 写入两款不同的历史值，失败信号必须各自
   取回「本款」的值（12.3 / -4.5），不能串款；
2. 无历史的款：失败信号原样返回，value 保持 None（不借别款的值）；
3. 真实样本（若缓存里的 data/source_state.json 有款级历史）：同样按款取回。

为什么不能直接等自然触发：款级兜底要同时满足「该款今天失败」+「该款此前
成功过」。若当天失败的款都没有历史，兜底分支根本不会被走到，只能靠这里
人工注入一个失败信号来验证。合成用例不依赖缓存，因此本轮一定会有结论。
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from collector import sources  # noqa: E402
from collector import state as state_mod  # noqa: E402

STATE_PATH = Path('data/source_state.json')
STALE_KIND = 'stale（沿用本款上次有效值）'


def collector_with(state):
    collector = sources.Collector.__new__(sources.Collector)
    collector.state = state
    return collector


def failed_signal():
    return sources.unavailable('Google Trends', 'Fallback: Google Search', '模拟取源失败')


def real_case(state):
    """真实 state 有款级历史时，验证第一款；没有则返回 None（不判失败）。"""
    games = state.get('games') or {}
    with_history = [
        (game_id, (entry.get('trends') or {}).get('value'))
        for game_id, entry in games.items()
        if (entry.get('trends') or {}).get('value') is not None
    ]
    print('真实 state: games 款数=%d，其中有 trends 历史=%d' % (len(games), len(with_history)))
    if not with_history:
        print('NOTE: 缓存里没有款级 trends 历史，本轮只跑合成用例')
        return None

    game_id, expected = with_history[0]
    got = collector_with(state)._with_fallback('trends', failed_signal(), 'Trends', game_id)
    ok = got.get('value') == expected and got.get('kind') == STALE_KIND
    print('真实样本 %s: 历史值=%r 兜底值=%r kind=%r -> %s'
          % (game_id, expected, got.get('value'), got.get('kind'), 'OK' if ok else 'NG'))
    return ok


def synthetic_case():
    """不依赖缓存：用真实的 record_game 写入两款历史，验证按款取值、不串款。"""
    state = {}
    state_mod.record_game(state, 'proof-a', 'trends', 12.3)
    state_mod.record_game(state, 'proof-b', 'trends', -4.5)
    collector = collector_with(state)

    a = collector._with_fallback('trends', failed_signal(), 'Trends', 'proof-a')
    b = collector._with_fallback('trends', failed_signal(), 'Trends', 'proof-b')
    missing = collector._with_fallback('trends', failed_signal(), 'Trends', 'proof-none')

    ok_a = a.get('value') == 12.3 and a.get('kind') == STALE_KIND
    ok_b = b.get('value') == -4.5 and b.get('kind') == STALE_KIND
    ok_not_cross = a.get('value') != b.get('value')
    ok_missing = missing.get('value') is None and missing.get('kind') != STALE_KIND

    print('合成用例 proof-a: 兜底值=%r kind=%r -> %s'
          % (a.get('value'), a.get('kind'), 'OK' if ok_a else 'NG'))
    print('合成用例 proof-b: 兜底值=%r kind=%r -> %s'
          % (b.get('value'), b.get('kind'), 'OK' if ok_b else 'NG'))
    print('合成用例 不串款: %r != %r -> %s'
          % (a.get('value'), b.get('value'), 'OK' if ok_not_cross else 'NG'))
    print('合成用例 无历史 proof-none: value=%r kind=%r -> %s'
          % (missing.get('value'), missing.get('kind'), 'OK' if ok_missing else 'NG'))
    return ok_a and ok_b and ok_not_cross and ok_missing


def main():
    state = {}
    if STATE_PATH.exists():
        state = json.loads(STATE_PATH.read_text(encoding='utf-8'))
    else:
        print('NOTE: 没有 data/source_state.json（缓存未命中），跳过真实样本')

    real_ok = real_case(state)
    synthetic_ok = synthetic_case()

    ok = synthetic_ok and (real_ok is not False)
    print('RESULT: %s' % ('PASS' if ok else 'FAIL'))
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main())
