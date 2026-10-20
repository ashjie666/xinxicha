window.XC_GAMES = {
  "meta": {
    "site": "xinxicha",
    "title": "中国游戏厂商海外信息差监控",
    "subtitle": "20 款国产游戏 × 50 个英文 SEO 关键词 · 每日巡检 · 含 P1→P2→P3 回退逻辑",
    "schema_version": 1,
    "generated_at_cst": "2026-10-20 12:53:11",
    "data_mode": "live",
    "spec_sha": "9cd00c7db5c7eaadc02f7596ffc2cb436a7f30f71b359e7206365c9016898d5d",
    "network": false,
    "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
    "alert": null,
    "duration_sec": 646.1,
    "counts": {
      "games": 21,
      "p0": 2,
      "p1_priority": 6
    },
    "trends_anchor": {
      "enabled": true,
      "low": "mobile game",
      "high": "video games",
      "min_span": 15,
      "note": "搜索水位（展示用，不参与评分；另出「水位名次」列以保证每款可区分）：Google Trends 每批都把本批最高值归一成 100（整数），批内分辨率下限＝最高词的 1%，故跨批次、跨游戏比较必须靠同批锚点校准。做法＝把「游戏词 + 冷锚点 low + 热锚点 high」放进同一批请求（请求数仍是每游戏 1 次，不额外增次），按 7 日序列均值做双锚折线定标：冷锚以下用「50 × 游戏均值 ÷ 冷锚均值」铺在 0-50，冷锚到热锚之间用「50 + 50 ×（游戏均值 − 冷锚均值）÷（热锚均值 − 冷锚均值）」映射到 50-100，越界不截断（高于热锚保留 >100 并注明）。用折线而非单段线性的原因：单段线性会把所有低于冷锚的款统一压成 0（run #22 实测 8 款挤 0.0、8 款挤 100.0）。冷锚均值必须 > 0 才能充当 50 分界：批内被压成 0 的锚点会让折线退化成「所有游戏都落在 50.0」的假分界（2026-10-20 run #23 实测 13 款并列 50.0），故冷锚均值 ≤ 0 时自动降级为「单锚点比例定标」（优先热锚）；热锚缺失、冷锚缺失、两锚均值跨度 < min_span 同样降级。取不到留空「—」并写明原因，不做 stale 兜底（逐款水位各异，借源级上次值会张冠李戴）。刻意不另发锚点批次：2026-10-20 实测请求数 21→42 会撞 Google 窗口配额，把占 30% 权重的变化率分项打到 13/21 款 stale。量级选型（run #23 实测教训）：热锚若比所有游戏都热，就会成为批内归一化基准、把弱游戏的相对值压到整数下限（当轮 13 款 game_mean=0、trends_rise stale 14/21），故把 low 由 gacha game 上调为 mobile game，让冷锚均值稳定 > 0、弱游戏不再落进 50.0 假分界；high= gaming 量级过大、自己反而成为批内归一化基准（run #24 实测热锚批内均值 40.1、冷锚仅 2.4），把弱游戏的相对值压到整数下限，连带其 7 日首点为 0 使变化率不可算 —— trends_rise（占 30% 权重）stale 随锚点量级上升（无锚点 4/21 → 单锚同批 6/21 → 双锚 gaming 14/21），即「为展示水位塞进同批的锚点词」正在损伤评分链路；故 high 由 gaming 下调为 video games（量级更接近游戏群，备选 Steam），代价是冷/热跨度收窄、部分强游戏可能越过热锚（已注明不截断，run #24 后待 CI 复核）。批内分辨率下限是硬约束：低于「本批最高词 1%」的款在数值上必然并列 0，差异由「水位名次」列的次键（Trends 7d → Reddit 24h → 游戏名）体现。"
    },
    "scoring_note": "权重取规格表「回退逻辑说明」的评分权重（30/20/15/15/10/10）；规格表「MVP字段表」F13 的 5×20% 旧公式已废弃"
  },
  "field_dict": [
    {
      "code": "F01",
      "name": "游戏名称(中文)",
      "desc": "游戏的中文名称",
      "type": "文本",
      "freq": "每日",
      "source": "爬虫/手动录入",
      "rule": ""
    },
    {
      "code": "F02",
      "name": "游戏名称(英文)",
      "desc": "游戏的海外发行英文名",
      "type": "文本",
      "freq": "每日",
      "source": "爬虫/手动录入",
      "rule": "用于英文SEO关键词匹配"
    },
    {
      "code": "F03",
      "name": "厂商/发行商",
      "desc": "研发商或海外发行商",
      "type": "文本",
      "freq": "每周",
      "source": "手动录入",
      "rule": "判断是否中国厂商"
    },
    {
      "code": "F04",
      "name": "游戏类型",
      "desc": "手游/PC/主机/跨端",
      "type": "文本",
      "freq": "首次录入",
      "source": "手动录入",
      "rule": ""
    },
    {
      "code": "F05",
      "name": "海外上线状态",
      "desc": "未上线/测试中/已上线/下架",
      "type": "文本",
      "freq": "每日",
      "source": "官网/TapTap/Steam",
      "rule": "状态变化触发通知"
    },
    {
      "code": "F06",
      "name": "海外上线日期",
      "desc": "确定的上线日期或窗口",
      "type": "日期",
      "freq": "每周",
      "source": "官网/游戏日历",
      "rule": "距上线天数=上线日期-今天"
    },
    {
      "code": "F07",
      "name": "国内攻略成熟度",
      "desc": "1-5分，1=无攻略，5=非常完备",
      "type": "数字",
      "freq": "每周",
      "source": "手动评估+B站/NGA搜索",
      "rule": "5分=已有角色表/掉落表/配装/活动攻略等结构化内容"
    },
    {
      "code": "F08",
      "name": "海外攻略供给量",
      "desc": "英文攻略站覆盖数量",
      "type": "数字",
      "freq": "每周",
      "source": "Google搜英文关键词",
      "rule": "1分=几乎无英文攻略，5分=已被Game8/IGN等全覆盖"
    },
    {
      "code": "F09",
      "name": "海外供给缺口分",
      "desc": "10 - 海外攻略供给量(加权)",
      "type": "数字",
      "freq": "每周",
      "source": "计算字段=F08衍生",
      "rule": "供给越少分数越高，>6分值得跟进"
    },
    {
      "code": "F10",
      "name": "Google Trends 7日变化",
      "desc": "英文关键词搜索趋势7日变化率",
      "type": "数字(%)",
      "freq": "每日",
      "source": "pytrends/Google Trends API",
      "rule": "正增长>20%标记为上升"
    },
    {
      "code": "F11",
      "name": "Reddit讨论量",
      "desc": "相关子版块提及次数",
      "type": "数字",
      "freq": "每日",
      "source": "F5Bot/Reddit JSON API",
      "rule": "单日新增>5条标记为活跃"
    },
    {
      "code": "F12",
      "name": "X/Twitter讨论量",
      "desc": "相关推文提及次数",
      "type": "数字",
      "freq": "每日",
      "source": "Apify/Nitter",
      "rule": "官方账号发推或玩家求助帖"
    },
    {
      "code": "F13",
      "name": "信息差总分",
      "desc": "综合评分(加权汇总)",
      "type": "数字",
      "freq": "每日",
      "source": "计算字段",
      "rule": ""
    },
    {
      "code": "F14",
      "name": "建议动作",
      "desc": "根据分数给出的操作建议",
      "type": "文本",
      "freq": "每日",
      "source": "规则引擎",
      "rule": ">=80=抢首发攻略 / 60-79=做数据表占位 / 40-59=监控不投入 / <40=暂不投入"
    },
    {
      "code": "F15",
      "name": "目标关键词数",
      "desc": "该游戏关联的英文SEO关键词数量",
      "type": "数字",
      "freq": "每周",
      "source": "关键词表关联",
      "rule": ""
    },
    {
      "code": "F16",
      "name": "最近更新日期",
      "desc": "最后监控更新日期",
      "type": "日期",
      "freq": "每日",
      "source": "自动",
      "rule": ""
    },
    {
      "code": "F17",
      "name": "国服状态",
      "desc": "国内外上线先后关系：国服先行/同步上线/国际服先行/未知",
      "type": "文本",
      "freq": "首次录入",
      "source": "手动录入",
      "rule": "不参与评分，仅作信息差时间窗口参考"
    }
  ],
  "signal_notes": [
    "信号来源说明:",
    "P1(主源): Google Trends + Reddit + X/Twitter — 最实时准确的海外信号",
    "P2(回退): Google Search结果数 + Discord/官方社区 + 厂商官网/Steam — P1失败时启用",
    "P3(兜底): Sensor Tower/游戏社日历 + TapTap/B站/微博 + RSS/新闻聚合 — 补充信号，不单独触发高分"
  ],
  "games": [
    {
      "id": "monster-hunter-outlanders",
      "seq": 1,
      "name_cn": "怪物猎人：旅人",
      "name_en": "Monster Hunter Outlanders",
      "publisher": "腾讯/天美/Grezzo",
      "type": "手游",
      "status": "即将上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "2026-10-29",
      "launch_date": "2026-10-29",
      "cn_guide_score": 2,
      "gap_level": "高",
      "trends_7d": 100.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "抢首发攻略",
      "priority": "P0",
      "note": "国际服先上线，国服2027+，时间窗口最干净",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": 100.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 1.18,
            "raw": 1.1,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 1.1 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 100,
          "weight": 30,
          "weighted": 30.0,
          "value": 100.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 10,
          "weighted": 2.5,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 70,
          "weight": 10,
          "weighted": 7.0,
          "value": 9,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "距上线 9 天"
        }
      ],
      "total": 63.5,
      "prev_total": 33.5,
      "delta": 30.0,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 33.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 63.5,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 54.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 24.5,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 1.18,
      "trends_level_raw": 1.1,
      "trends_level_note": "7d 均值 1.1 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 12,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": 9,
      "overseas_supply": null,
      "keywords_count": 13,
      "stale": false
    },
    {
      "id": "phantom-blade-zero",
      "seq": 2,
      "name_cn": "影之刃零",
      "name_en": "Phantom Blade Zero",
      "publisher": "灵游坊",
      "type": "PC/PS5",
      "status": "即将上线",
      "cn_status": "同步上线",
      "launch_date_raw": "2026-10-29",
      "launch_date": "2026-10-29",
      "cn_guide_score": 4,
      "gap_level": "中",
      "trends_7d": -26.3,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做发售期专题",
      "priority": "P0",
      "note": "PC/PS5买断，发售期爆发，长尾有限",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -26.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 15.13,
            "raw": 14.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 14.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -26.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 6,
          "origin": "人工基线（缺口评估 中）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 10,
          "weighted": 7.5,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 70,
          "weight": 10,
          "weighted": 7.0,
          "value": 9,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "距上线 9 天"
        }
      ],
      "total": 27.2,
      "prev_total": 27.2,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 27.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 27.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 15.13,
      "trends_level_raw": 14.0,
      "trends_level_note": "7d 均值 14.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 5,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 6,
      "launch_days": 9,
      "overseas_supply": null,
      "keywords_count": 7,
      "stale": false
    },
    {
      "id": "roco-kingdom-world",
      "seq": 3,
      "name_cn": "洛克王国：世界",
      "name_en": "Roco Kingdom World",
      "publisher": "腾讯魔方",
      "type": "跨端",
      "status": "测试中",
      "cn_status": "国际服先行",
      "launch_date_raw": "2026-10-27(首测)",
      "launch_date": null,
      "cn_guide_score": 4,
      "gap_level": "高",
      "trends_7d": -26.3,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做预约/测试攻略",
      "priority": "P1",
      "note": "国际服首测中，正式服节奏未定",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -26.3,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
          "level": {
            "value": 0.03,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -26.3,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 10,
          "weighted": 7.5,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 32.5,
      "prev_total": 32.5,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 32.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 32.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 23.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 23.5,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.03,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 14,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 3,
      "stale": true
    },
    {
      "id": "star-valley",
      "seq": 4,
      "name_cn": "星布谷地",
      "name_en": "Star Valley",
      "publisher": "米哈游",
      "type": "PC/手游",
      "status": "未上线",
      "cn_status": "同步上线",
      "launch_date_raw": "2026冬季(预估)",
      "launch_date": null,
      "cn_guide_score": 3,
      "gap_level": "高",
      "trends_7d": 20.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "生活模拟类，海外未上线，提前建内容库",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": 20.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 4.69,
            "raw": 4.3,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 4.3 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 100,
          "weight": 30,
          "weighted": 30.0,
          "value": 20.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 50.0,
          "weight": 10,
          "weighted": 5.0,
          "value": 3,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 60.0,
      "prev_total": 30.0,
      "delta": 30.0,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 30.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 60.0,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 51.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 21.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 4.69,
      "trends_level_raw": 4.3,
      "trends_level_note": "7d 均值 4.3 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 7,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 3,
      "stale": false
    },
    {
      "id": "project-origin",
      "seq": 5,
      "name_cn": "源初之结",
      "name_en": "Project Origin",
      "publisher": "米哈游",
      "type": "PC/主机",
      "status": "未上线",
      "cn_status": "同步上线",
      "launch_date_raw": "未公布",
      "launch_date": null,
      "cn_guide_score": 2,
      "gap_level": "高",
      "trends_7d": -100.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做预约占位页",
      "priority": "P1",
      "note": "写实奇幻共斗新作，全球预约已开",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -100.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 0.86,
            "raw": 0.8,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 0.8 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -100.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 10,
          "weighted": 2.5,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 27.5,
      "prev_total": 27.5,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 27.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 27.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 0.86,
      "trends_level_raw": 0.8,
      "trends_level_note": "7d 均值 0.8 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 13,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": false
    },
    {
      "id": "project-mugen-neverness",
      "seq": 6,
      "name_cn": "无限大",
      "name_en": "Project Mugen / Neverness",
      "publisher": "网易",
      "type": "PC/主机/手游",
      "status": "未上线",
      "cn_status": "同步上线",
      "launch_date_raw": "2027-01-15",
      "launch_date": "2027-01-15",
      "cn_guide_score": 1,
      "gap_level": "高",
      "trends_7d": -100.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "都市开放世界RPG，定档明确",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -100.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
          "level": {
            "value": 0.0,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -100.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 10,
          "weighted": 0.0,
          "value": 1,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 40,
          "weight": 10,
          "weighted": 4.0,
          "value": 87,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "距上线 87 天"
        }
      ],
      "total": 28.0,
      "prev_total": 28.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 28.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 28.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.0,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 17,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": 87,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": true
    },
    {
      "id": "naruto-mobile-global",
      "seq": 7,
      "name_cn": "火影忍者手游",
      "name_en": "Naruto Mobile Global",
      "publisher": "腾讯",
      "type": "手游",
      "status": "宣布发行",
      "cn_status": "国服先行",
      "launch_date_raw": "未公布",
      "launch_date": null,
      "cn_guide_score": 5,
      "gap_level": "高",
      "trends_7d": -100.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "占关键词建预约站",
      "priority": "P1",
      "note": "国内运营10年攻略极成熟，海外刚宣布",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -100.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 限流/异常：The request failed: Google returned a response with code 429",
          "level": {
            "value": null,
            "raw": null,
            "stale": false,
            "note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
            "mode": null,
            "anchor_low": "mobile game",
            "anchor_low_raw": null,
            "anchor_high": "video games",
            "anchor_high_raw": null
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -100.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 限流/异常：The request failed: Google returned a response with code 429"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 10,
          "weighted": 10.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 35.0,
      "prev_total": 35.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 35.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 35.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 26.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 26.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": null,
      "trends_level_raw": null,
      "trends_level_note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
      "trends_level_stale": false,
      "trends_level_mode": null,
      "trends_level_rank": null,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": null,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": null,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 3,
      "stale": true
    },
    {
      "id": "the-outcast",
      "seq": 8,
      "name_cn": "异人之下",
      "name_en": "The Outcast",
      "publisher": "腾讯魔方",
      "type": "格斗手游",
      "status": "测试中",
      "cn_status": "国服先行",
      "launch_date_raw": "2026-12(预估)",
      "launch_date": null,
      "cn_guide_score": 3,
      "gap_level": "高",
      "trends_7d": -33.3,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做机制/连招攻略",
      "priority": "P1",
      "note": "11月4日终局测试，国内预约3000万+",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -33.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 3.37,
            "raw": 3.1,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 3.1 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -33.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 50.0,
          "weight": 10,
          "weighted": 5.0,
          "value": 3,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 30.0,
      "prev_total": 34.5,
      "delta": -4.5,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 30.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 30.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 21.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 21.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 3.37,
      "trends_level_raw": 3.1,
      "trends_level_note": "7d 均值 3.1 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 10,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 2,
      "stale": false
    },
    {
      "id": "where-winds-meet",
      "seq": 9,
      "name_cn": "燕云十六声",
      "name_en": "Where Winds Meet",
      "publisher": "网易",
      "type": "PC/手游",
      "status": "已上线(部分)",
      "cn_status": "国服先行",
      "launch_date_raw": "2025-11(全球)",
      "launch_date": null,
      "cn_guide_score": 4,
      "gap_level": "中",
      "trends_7d": -20.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "补英文攻略",
      "priority": "P2",
      "note": "海外已上线但英文攻略深度不够",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 19.41,
            "raw": 17.9,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 17.9 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 6,
          "origin": "人工基线（缺口评估 中）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 10,
          "weighted": 7.5,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 25.8,
      "prev_total": 25.8,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 21.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 25.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [],
      "trends_level": 19.41,
      "trends_level_raw": 17.9,
      "trends_level_note": "7d 均值 17.9 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 4,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 6,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 2,
      "stale": false
    },
    {
      "id": "last-asylum-plague",
      "seq": 10,
      "name_cn": "Last Asylum: Plague",
      "name_en": "Last Asylum: Plague",
      "publisher": "三七互娱",
      "type": "手游SLG",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 2,
      "gap_level": "中",
      "trends_7d": -20.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做赛季攻略",
      "priority": "P2",
      "note": "8月收入环比增37%，赛季制更新频繁",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 限流/异常：The request failed: Google returned a response with code 429",
          "level": {
            "value": null,
            "raw": null,
            "stale": false,
            "note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
            "mode": null,
            "anchor_low": "mobile game",
            "anchor_low_raw": null,
            "anchor_high": "video games",
            "anchor_high_raw": null
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 限流/异常：The request failed: Google returned a response with code 429"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 6,
          "origin": "人工基线（缺口评估 中）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 10,
          "weighted": 2.5,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 20.8,
      "prev_total": 20.0,
      "delta": 0.8,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 20.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": null,
      "trends_level_raw": null,
      "trends_level_note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
      "trends_level_stale": false,
      "trends_level_mode": null,
      "trends_level_rank": null,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": null,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": null,
      "x_state": "player_only",
      "gap_score": 6,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 0,
      "stale": true
    },
    {
      "id": "clash-of-critters",
      "seq": 11,
      "name_cn": "Clash of Critters",
      "name_en": "Clash of Critters",
      "publisher": "莉莉丝",
      "type": "手游",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 1,
      "gap_level": "中",
      "trends_7d": -20.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做新手攻略",
      "priority": "P2",
      "note": "MAU增长明显，英文供给仍在建立",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 限流/异常：The request failed: Google returned a response with code 429",
          "level": {
            "value": null,
            "raw": null,
            "stale": false,
            "note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
            "mode": null,
            "anchor_low": "mobile game",
            "anchor_low_raw": null,
            "anchor_high": "video games",
            "anchor_high_raw": null
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 限流/异常：The request failed: Google returned a response with code 429"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 6,
          "origin": "人工基线（缺口评估 中）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 10,
          "weighted": 0.0,
          "value": 1,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 20.0,
      "prev_total": 20.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": true,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": null,
      "trends_level_raw": null,
      "trends_level_note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
      "trends_level_stale": false,
      "trends_level_mode": null,
      "trends_level_rank": null,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": null,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": null,
      "x_state": "player_only",
      "gap_score": 6,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 2,
      "stale": true
    },
    {
      "id": "flamb-merge-cook",
      "seq": 12,
      "name_cn": "Flambé: Merge & Cook",
      "name_en": "Flambé: Merge & Cook",
      "publisher": "柠檬微趣",
      "type": "手游休闲",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 2,
      "gap_level": "中",
      "trends_7d": -20.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做关卡攻略",
      "priority": "P2",
      "note": "合成+模拟经营，海外收入创新高",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
          "level": {
            "value": 0.0,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 6,
          "origin": "人工基线（缺口评估 中）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 10,
          "weighted": 2.5,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 20.8,
      "prev_total": 20.0,
      "delta": 0.8,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 20.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.0,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 15,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 6,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 0,
      "stale": true
    },
    {
      "id": "tasty-travels-merge-game",
      "seq": 13,
      "name_cn": "Tasty Travels",
      "name_en": "Tasty Travels: Merge Game",
      "publisher": "点点互动",
      "type": "手游休闲",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 2,
      "gap_level": "中",
      "trends_7d": -20.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做资源攻略",
      "priority": "P2",
      "note": "合并+旅行经营类，攻略内容少",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
          "level": {
            "value": 0.0,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -20.0,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 6,
          "origin": "人工基线（缺口评估 中）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 10,
          "weighted": 2.5,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 20.8,
      "prev_total": 20.0,
      "delta": 0.8,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 20.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.0,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 16,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 6,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": true
    },
    {
      "id": "genshin-impact",
      "seq": 14,
      "name_cn": "原神",
      "name_en": "Genshin Impact",
      "publisher": "米哈游/HoYoverse",
      "type": "跨端",
      "status": "已上线",
      "cn_status": "同步上线",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": -16.7,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争激烈不建议",
      "priority": "P3",
      "note": "搜索量大但英文站已饱和",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -16.7,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 109.76,
            "raw": 67.4,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 67.4 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界），高于热锚（未截断）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -16.7,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 15,
          "weighted": 0.0,
          "value": 2,
          "origin": "人工基线（缺口评估 低）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 10,
          "weighted": 10.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 24.5,
      "prev_total": 24.5,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 24.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 109.76,
      "trends_level_raw": 67.4,
      "trends_level_note": "7d 均值 67.4 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界），高于热锚（未截断）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 2,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 2,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": false
    },
    {
      "id": "honkai-star-rail",
      "seq": 15,
      "name_cn": "崩坏：星穹铁道",
      "name_en": "Honkai: Star Rail",
      "publisher": "米哈游/HoYoverse",
      "type": "跨端",
      "status": "已上线",
      "cn_status": "同步上线",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": -8.3,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争激烈不建议",
      "priority": "P3",
      "note": "同上",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -8.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 11.58,
            "raw": 10.7,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 10.7 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -8.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 15,
          "weighted": 0.0,
          "value": 2,
          "origin": "人工基线（缺口评估 低）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 10,
          "weighted": 10.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 24.5,
      "prev_total": 38.0,
      "delta": -13.5,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 24.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 11.58,
      "trends_level_raw": 10.7,
      "trends_level_note": "7d 均值 10.7 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 6,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 2,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": false
    },
    {
      "id": "wuthering-waves",
      "seq": 16,
      "name_cn": "鸣潮",
      "name_en": "Wuthering Waves",
      "publisher": "库洛游戏",
      "type": "跨端",
      "status": "已上线",
      "cn_status": "同步上线",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": -8.3,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做差异化内容",
      "priority": "P3",
      "note": "Steam在线稳定但大站已覆盖",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": false,
          "value": -8.3,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "error": "Trends 限流/异常：The request failed: Google returned a response with code 429",
          "level": {
            "value": null,
            "raw": null,
            "stale": false,
            "note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
            "mode": null,
            "anchor_low": "mobile game",
            "anchor_low_raw": null,
            "anchor_high": "video games",
            "anchor_high_raw": null
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -8.3,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 限流/异常：The request failed: Google returned a response with code 429"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 15,
          "weighted": 0.0,
          "value": 2,
          "origin": "人工基线（缺口评估 低）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 10,
          "weighted": 7.5,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 22.0,
      "prev_total": 20.0,
      "delta": 2.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 22.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "Trends（stale）",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Trends（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": null,
      "trends_level_raw": null,
      "trends_level_note": "水位不可用：批次异常 The request failed: Google returned a response with code 429",
      "trends_level_stale": false,
      "trends_level_mode": null,
      "trends_level_rank": null,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": null,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": null,
      "x_state": "player_only",
      "gap_score": 2,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": true
    },
    {
      "id": "honor-of-kings",
      "seq": 17,
      "name_cn": "王者荣耀国际服",
      "name_en": "Honor of Kings",
      "publisher": "腾讯/Level Infinite",
      "type": "手游",
      "status": "已上线",
      "cn_status": "国服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": 0.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "赛事/英雄更新压力大",
      "priority": "P3",
      "note": "下载增长明显但英文攻略站已有",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": 0.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 3.55,
            "raw": 3.3,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 3.3 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 30,
          "weight": 30,
          "weighted": 9.0,
          "value": 0.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 15,
          "weighted": 0.0,
          "value": 2,
          "origin": "人工基线（缺口评估 低）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 10,
          "weighted": 7.5,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 26.5,
      "prev_total": 20.0,
      "delta": 6.5,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 26.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 3.55,
      "trends_level_raw": 3.3,
      "trends_level_note": "7d 均值 3.3 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 9,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 2,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": false
    },
    {
      "id": "arknights",
      "seq": 18,
      "name_cn": "明日方舟",
      "name_en": "Arknights",
      "publisher": "鹰角网络",
      "type": "手游",
      "status": "已上线",
      "cn_status": "国服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": 14.7,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争激烈",
      "priority": "P3",
      "note": "英文社区成熟，攻略站多",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": 14.7,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 57.43,
            "raw": 45.3,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 42.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 45.3 · 冷锚「mobile game」42.9 / 热锚「video games」59.5 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 60,
          "weight": 30,
          "weighted": 18.0,
          "value": 14.7,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 15,
          "weighted": 0.0,
          "value": 2,
          "origin": "人工基线（缺口评估 低）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 10,
          "weighted": 10.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 38.0,
      "prev_total": 38.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 38.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 29.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 57.43,
      "trends_level_raw": 45.3,
      "trends_level_note": "7d 均值 45.3 · 冷锚「mobile game」42.9 / 热锚「video games」59.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 3,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 42.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": "player_only",
      "gap_score": 2,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": false
    },
    {
      "id": "afk-journey",
      "seq": 19,
      "name_cn": "剑与远征：启程",
      "name_en": "AFK Journey",
      "publisher": "莉莉丝/Farlight",
      "type": "手游",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": -33.3,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争较激烈",
      "priority": "P3",
      "note": "莉莉丝发行能力强但英文供给充足",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -33.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 2.39,
            "raw": 2.2,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 2.2 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -33.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 15,
          "weighted": 0.0,
          "value": 2,
          "origin": "人工基线（缺口评估 低）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 10,
          "weighted": 7.5,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 20.0,
      "prev_total": 20.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": true,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [],
      "trends_level": 2.39,
      "trends_level_raw": 2.2,
      "trends_level_note": "7d 均值 2.2 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 11,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 2,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": false
    },
    {
      "id": "rise-of-kingdoms",
      "seq": 20,
      "name_cn": "万国觉醒",
      "name_en": "Rise of Kingdoms",
      "publisher": "莉莉丝/Farlight",
      "type": "手游SLG",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "已上线",
      "launch_date": null,
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": -25.0,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "老牌产品增长平稳",
      "priority": "P3",
      "note": "英文市场成熟，增量有限",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -25.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 3.61,
            "raw": 3.3,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 46.1,
            "anchor_high": "video games",
            "anchor_high_raw": 63.9,
            "note": "7d 均值 3.3 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 0,
          "weight": 30,
          "weighted": 0.0,
          "value": -25.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 15,
          "weighted": 0.0,
          "value": 2,
          "origin": "人工基线（缺口评估 低）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 10,
          "weighted": 10.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 20.0,
      "prev_total": 20.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 3,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 3.61,
      "trends_level_raw": 3.3,
      "trends_level_note": "7d 均值 3.3 · 冷锚「mobile game」46.1 / 热锚「video games」63.9 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 8,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 46.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 63.9,
      "x_state": "player_only",
      "gap_score": 2,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 1,
      "stale": false
    },
    {
      "id": "hunger",
      "seq": 21,
      "name_cn": "HUNGER",
      "name_en": "HUNGER",
      "publisher": "待确认",
      "type": "PC",
      "status": "测试中",
      "cn_status": "待确认",
      "launch_date_raw": "待确认",
      "launch_date": null,
      "cn_guide_score": 1,
      "gap_level": "高",
      "trends_7d": -7.2,
      "reddit_daily": 0,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P2",
      "note": "2026-10-19 Steam 开启测试（末日搜打撤生存）；厂商 / 国服状态 / 上线档期均待确认 —— 本条来自新游候选发现层的人工确认",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-20",
      "signals": {
        "trends": {
          "available": true,
          "value": -7.2,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 324.38,
            "raw": 66.9,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 14.8,
            "anchor_high": "video games",
            "anchor_high_raw": 20.6,
            "note": "7d 均值 66.9 · 热锚「video games」20.6 单锚点定标（两锚跨度 5.8 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "error": null,
          "tier": "P2"
        }
      },
      "components": [
        {
          "key": "trends_rise",
          "label": "Trends 上升",
          "score": 15,
          "weight": 30,
          "weighted": 4.5,
          "value": -7.2,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": "player_only",
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 9,
          "origin": "人工基线（缺口评估 高）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 10,
          "weighted": 0.0,
          "value": 1,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10,
          "weight": 10,
          "weighted": 1.0,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 29.5,
      "prev_total": null,
      "delta": null,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 1,
      "ranking_eligible": false,
      "ranking_note": "观察期（第 1/3 天）",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 25.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 29.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 20.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 20.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
          "stale_sources": [
            "trends",
            "reddit",
            "x_twitter"
          ]
        }
      ],
      "sources_used": [
        "P1·Trends",
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [],
      "trends_level": 324.38,
      "trends_level_raw": 66.9,
      "trends_level_note": "7d 均值 66.9 · 热锚「video games」20.6 单锚点定标（两锚跨度 5.8 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 1,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 14.8,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 20.6,
      "x_state": "player_only",
      "gap_score": 9,
      "launch_days": null,
      "overseas_supply": null,
      "keywords_count": 0,
      "stale": false
    }
  ]
};
