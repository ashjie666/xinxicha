window.XC_GAMES = {
  "meta": {
    "site": "xinxicha",
    "title": "中国游戏厂商海外信息差监控",
    "subtitle": "20 款国产游戏 × 50 个英文 SEO 关键词 · 每日巡检 · 含 P1→P2→P3 回退逻辑",
    "schema_version": 1,
    "generated_at_cst": "2026-10-30 10:24:28",
    "data_mode": "live",
    "spec_sha": "9cd00c7db5c7eaadc02f7596ffc2cb436a7f30f71b359e7206365c9016898d5d",
    "network": false,
    "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
    "alert": null,
    "duration_sec": 1706.4,
    "counts": {
      "games": 22,
      "p0": 2,
      "p1_priority": 13
    },
    "trends_anchor": {
      "enabled": true,
      "low": "mobile game",
      "high": "video games",
      "min_span": 15,
      "note": "搜索水位（展示用，不参与评分；另出「水位名次」列以保证每款可区分）：Google Trends 每批都把本批最高值归一成 100（整数），批内分辨率下限＝最高词的 1%，故跨批次、跨游戏比较必须靠同批锚点校准。做法＝把「游戏词 + 冷锚点 low + 热锚点 high」放进同一批请求（pytrends 单批上限 5 词，故每批装 collection.trends_batch_size 个游戏词 + 两个锚点；2026-10-20 起由 prefetch_trends 批量预取，请求数由每款 1 次降到约 N/批），按 7 日序列均值做双锚折线定标：冷锚以下用「50 × 游戏均值 ÷ 冷锚均值」铺在 0-50，冷锚到热锚之间用「50 + 50 ×（游戏均值 − 冷锚均值）÷（热锚均值 − 冷锚均值）」映射到 50-100，越界不截断（高于热锚保留 >100 并注明）。用折线而非单段线性的原因：单段线性会把所有低于冷锚的款统一压成 0（run #22 实测 8 款挤 0.0、8 款挤 100.0）。冷锚均值必须 > 0 才能充当 50 分界：批内被压成 0 的锚点会让折线退化成「所有游戏都落在 50.0」的假分界（2026-10-20 run #23 实测 13 款并列 50.0），故冷锚均值 ≤ 0 时自动降级为「单锚点比例定标」（优先热锚）；热锚缺失、冷锚缺失、两锚均值跨度 < min_span 同样降级。取不到留空「—」并写明原因，不做 stale 兜底（逐款水位各异，借源级上次值会张冠李戴）。刻意不另发锚点批次：2026-10-20 实测请求数 21→42 会撞 Google 窗口配额，把占 30% 权重的变化率分项打到 13/21 款 stale。量级选型（run #23 实测教训）：热锚若比所有游戏都热，就会成为批内归一化基准、把弱游戏的相对值压到整数下限（当轮 13 款 game_mean=0、trends_rise stale 14/21），故把 low 由 gacha game 上调为 mobile game，让冷锚均值稳定 > 0、弱游戏不再落进 50.0 假分界；high= gaming 量级过大、自己反而成为批内归一化基准（run #24 实测热锚批内均值 40.1、冷锚仅 2.4），把弱游戏的相对值压到整数下限，连带其 7 日首点为 0 使变化率不可算 —— trends_rise（占 30% 权重）stale 随锚点量级上升（无锚点 4/21 → 单锚同批 6/21 → 双锚 gaming 14/21），即「为展示水位塞进同批的锚点词」正在损伤评分链路；故 high 由 gaming 下调为 video games（量级更接近游戏群，备选 Steam），代价是冷/热跨度收窄、部分强游戏可能越过热锚（已注明不截断，run #24 后待 CI 复核）。批内分辨率下限是硬约束：低于「本批最高词 1%」的款在数值上必然并列 0，差异由「水位名次」列的次键（Trends 7d → Reddit 24h → 游戏名）体现。"
    },
    "scoring_note": "2026-10-22 由规格表的 30/20/15/15/10/10 调整为 20/15/15/20/15/15：业务重心从「海外声量」转向「可下手的机会窗口」，人工基线三项合计由 35% 提到 50%，纯声量两项由 50% 降到 35%。上线窗口同期由「7 天内最高」的阶梯改为折线：提前 80 天是关键词占位峰值（100 分），越临近上线竞争越饱和、逐段递减，上线 60 天后归零（原实现 >90 天仍给 40 分，与「长期埋伏最低」文案不符）。离线用当日在库 29 款复核：总分区间 20–62.5 → 21.5–68.8，「做数据表占位」5→7 款，前四名不变；代价是人工字段仅 5 档、约四分之一款有确定档期，唯一取值数 24→22，区分度略降。规格表「MVP字段表」F13 的 5×20% 旧公式仍为废弃状态"
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
  "cn_media": {
    "window_days": 7,
    "sources": [
      {
        "key": "cn_media_youxichaguan",
        "label": "游戏茶馆",
        "ok": true,
        "items": 10,
        "matched": 2,
        "error": null
      },
      {
        "key": "cn_media_chuapp",
        "label": "触乐",
        "ok": true,
        "items": 15,
        "matched": 3,
        "error": null
      }
    ]
  },
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
      "trends_7d": 1324.5,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "抢首发攻略",
      "priority": "P0",
      "note": "国际服先上线，国服2027+，时间窗口最干净",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 2.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 1324.5,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 27.28,
            "raw": 4.6,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 12.6,
            "anchor_high": "video games",
            "anchor_high_raw": 16.7,
            "note": "7d 均值 4.6 · 热锚「video games」16.7 单锚点定标（两锚跨度 4.1 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 20.0,
          "value": 1324.5,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 80.0,
          "weight": 20,
          "weighted": 16.0,
          "value": 8.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 44.4,
          "weight": 15,
          "weighted": 6.66,
          "value": -1,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 76.4,
      "prev_total": 76.5,
      "delta": -0.1,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 56.4,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 61.4,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 61.4,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 26.4,
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
      "trends_level": 27.28,
      "trends_level_raw": 4.6,
      "trends_level_note": "7d 均值 4.6 · 热锚「video games」16.7 单锚点定标（两锚跨度 4.1 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 4,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 12.6,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 16.7,
      "x_state": 12,
      "gap_score": 8.0,
      "launch_days": -1,
      "guide_posts": 27,
      "guide_hits": 1,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 13,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "occupy",
        "label": "优先占位",
        "rank": 1,
        "water": 27.28,
        "rise": 1324.5,
        "trend": "rising",
        "water_band": "low",
        "note": "水位 27.3 · 7d +1324.5%"
      }
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
      "trends_7d": 459.9,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做发售期专题",
      "priority": "P0",
      "note": "PC/PS5买断，发售期爆发，长尾有限",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 2.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 459.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 178.27,
            "raw": 29.9,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 12.6,
            "anchor_high": "video games",
            "anchor_high_raw": 16.7,
            "note": "7d 均值 29.9 · 热锚「video games」16.7 单锚点定标（两锚跨度 4.1 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 20.0,
          "value": 459.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 80.0,
          "weight": 20,
          "weighted": 16.0,
          "value": 8.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 15,
          "weighted": 11.25,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 44.4,
          "weight": 15,
          "weighted": 6.66,
          "value": -1,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 83.9,
      "prev_total": 84.0,
      "delta": -0.1,
      "action_engine": "抢首发攻略",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 63.9,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 68.9,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 68.9,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 33.9,
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
      "trends_level": 178.27,
      "trends_level_raw": 29.9,
      "trends_level_note": "7d 均值 29.9 · 热锚「video games」16.7 单锚点定标（两锚跨度 4.1 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 2,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 12.6,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 16.7,
      "x_state": 12,
      "gap_score": 8.0,
      "launch_days": -1,
      "guide_posts": 26,
      "guide_hits": 1,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 7,
      "cn_media_count": 3,
      "cn_media_titles": [
        {
          "source": "cn_media_chuapp",
          "label": "触乐",
          "title": "从《黑神话：悟空》到《影之刃零》，一份名单里的江湖",
          "url": "http://www.chuapp.com/article/291723.html",
          "published": "2026-10-29",
          "hit": "影之刃零"
        },
        {
          "source": "cn_media_chuapp",
          "label": "触乐",
          "title": "等待《影之刃零》上线前的最后一小时，可以看看这些",
          "url": "http://www.chuapp.com/article/291722.html",
          "published": "2026-10-29",
          "hit": "影之刃零"
        },
        {
          "source": "cn_media_chuapp",
          "label": "触乐",
          "title": "从《影之刃零》完整版中能看到的，是审美、技术与匠心",
          "url": "http://www.chuapp.com/article/291716.html",
          "published": "2026-10-27",
          "hit": "影之刃零"
        }
      ],
      "stale": false,
      "opportunity": {
        "key": "differentiate",
        "label": "差异化切入",
        "rank": 2,
        "water": 178.27,
        "rise": 459.9,
        "trend": "rising",
        "water_band": "head",
        "note": "水位 178.3 · 7d +459.9% · 头部"
      }
    },
    {
      "id": "roco-kingdom-world",
      "seq": 3,
      "name_cn": "洛克王国：世界",
      "name_en": "Roco Kingdom: World",
      "publisher": "腾讯魔方",
      "type": "跨端",
      "status": "测试中",
      "cn_status": "国际服先行",
      "launch_date_raw": "2026-10-27(首测)",
      "launch_date": null,
      "cn_guide_score": 4,
      "gap_level": "高",
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做预约/测试攻略",
      "priority": "P1",
      "note": "国际服首测中，正式服节奏未定",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.04,
            "raw": 0.0,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.0 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 15,
          "weighted": 11.25,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 62.8,
      "prev_total": 62.8,
      "delta": 0.0,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 62.8,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 47.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 47.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 32.8,
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.04,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 21,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": null,
      "guide_posts": 1,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 3,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 0.04,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "star-valley",
      "seq": 4,
      "name_cn": "星布谷地",
      "name_en": "Petit Planet",
      "publisher": "米哈游",
      "type": "PC/手游",
      "status": "未上线",
      "cn_status": "同步上线",
      "launch_date_raw": "2026冬季(预估)",
      "launch_date": null,
      "cn_guide_score": 3,
      "gap_level": "高",
      "trends_7d": -5.5,
      "reddit_daily": 15,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "生活模拟类，海外未上线，提前建内容库",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": -5.5,
          "origin": "Google Trends",
          "kind": "stale（沿用本款上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 1.98,
            "raw": 1.2,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 1.2 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 15,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 10,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 10 条",
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
          "weight": 20,
          "weighted": 3.0,
          "value": -5.5,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 80,
          "weight": 15,
          "weighted": 12.0,
          "value": 15,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 80,
          "weight": 15,
          "weighted": 12.0,
          "value": 10,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 10 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 50.0,
          "weight": 15,
          "weighted": 7.5,
          "value": 3,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 56.0,
      "prev_total": 56.0,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 53.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 44.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 44.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 29.0,
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
        "Bing News RSS 命中 10 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 1.98,
      "trends_level_raw": 1.2,
      "trends_level_note": "7d 均值 1.2 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 13,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 10,
      "gap_score": 10.0,
      "launch_days": null,
      "guide_posts": 0,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 3,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "cooling",
        "label": "不投入",
        "rank": 6,
        "water": 1.98,
        "rise": -5.5,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 2.0 · 7d -5.5% · stale"
      }
    },
    {
      "id": "project-origin",
      "seq": 5,
      "name_cn": "源初之结",
      "name_en": "NODUSFALL",
      "publisher": "米哈游",
      "type": "PC/主机",
      "status": "未上线",
      "cn_status": "同步上线",
      "launch_date_raw": "未公布",
      "launch_date": null,
      "cn_guide_score": 2,
      "gap_level": "高",
      "trends_7d": null,
      "reddit_daily": 3,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做预约占位页",
      "priority": "P1",
      "note": "写实奇幻共斗新作，全球预约已开",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.4,
            "raw": 0.2,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.2 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 3,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 11,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 45,
          "weight": 15,
          "weighted": 6.75,
          "value": 3,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 90,
          "weight": 15,
          "weighted": 13.5,
          "value": 11,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 45.5,
      "prev_total": 45.5,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 45.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 38.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 32.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 25.2,
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.4,
      "trends_level_raw": 0.2,
      "trends_level_note": "7d 均值 0.2 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 18,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 11,
      "gap_score": 10.0,
      "launch_days": null,
      "guide_posts": 0,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 0.4,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "project-mugen-neverness",
      "seq": 6,
      "name_cn": "无限大",
      "name_en": "ANANTA",
      "reddit_query": "Ananta",
      "publisher": "网易",
      "type": "PC/主机/手游",
      "status": "未上线",
      "cn_status": "同步上线",
      "launch_date_raw": "2027-01-15",
      "launch_date": "2027-01-15",
      "cn_guide_score": 1,
      "gap_level": "高",
      "trends_7d": -5.4,
      "reddit_daily": 13,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "都市开放世界RPG，定档明确",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -5.4,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 13.35,
            "raw": 7.9,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 7.9 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 13,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 3.0,
          "value": -5.4,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 80,
          "weight": 15,
          "weighted": 12.0,
          "value": 13,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 15,
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
          "score": 98.2,
          "weight": 15,
          "weighted": 14.73,
          "value": 77,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "距上线 77 天"
        }
      ],
      "total": 64.7,
      "prev_total": 61.8,
      "delta": 2.9,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 61.7,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 52.7,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 49.7,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 34.7,
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
      "trends_level": 13.35,
      "trends_level_raw": 7.9,
      "trends_level_note": "7d 均值 7.9 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 6,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": 77,
      "guide_posts": 0,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "cooling",
        "label": "不投入",
        "rank": 6,
        "water": 13.35,
        "rise": -5.4,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 13.3 · 7d -5.4%"
      }
    },
    {
      "id": "naruto-mobile-global",
      "seq": 7,
      "name_cn": "火影忍者手游",
      "name_en": "Naruto Mobile",
      "publisher": "腾讯",
      "type": "手游",
      "status": "宣布发行",
      "cn_status": "国服先行",
      "launch_date_raw": "未公布",
      "launch_date": null,
      "cn_guide_score": 5,
      "gap_level": "高",
      "trends_7d": -37.7,
      "reddit_daily": 6,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "占关键词建预约站",
      "priority": "P1",
      "note": "国内运营10年攻略极成熟，海外刚宣布",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -37.7,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 5.29,
            "raw": 3.1,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 3.1 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 6,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": -37.7,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": 6,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 60.5,
      "prev_total": 60.5,
      "delta": 0.0,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 60.5,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 51.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 45.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 36.5,
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
      "trends_level": 5.29,
      "trends_level_raw": 3.1,
      "trends_level_note": "7d 均值 3.1 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 9,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": null,
      "guide_posts": 1,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 3,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "cooling",
        "label": "不投入",
        "rank": 6,
        "water": 5.29,
        "rise": -37.7,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 5.3 · 7d -37.7%"
      }
    },
    {
      "id": "the-outcast",
      "seq": 8,
      "name_cn": "异人之下",
      "name_en": "The Hidden Ones",
      "publisher": "腾讯魔方",
      "type": "格斗手游",
      "status": "测试中",
      "cn_status": "国服先行",
      "launch_date_raw": "2026-12(预估)",
      "launch_date": null,
      "cn_guide_score": 3,
      "gap_level": "高",
      "trends_7d": -34.8,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做机制/连招攻略",
      "priority": "P1",
      "note": "11月4日终局测试，国内预约3000万+",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 4.0,
      "signals": {
        "trends": {
          "available": false,
          "value": -34.8,
          "origin": "Google Trends",
          "kind": "stale（沿用本款上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.69,
            "raw": 0.4,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.4 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": -34.8,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 60.0,
          "weight": 20,
          "weighted": 12.0,
          "value": 6.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 50.0,
          "weight": 15,
          "weighted": 7.5,
          "value": 3,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 51.0,
      "prev_total": 51.0,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 51.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 36.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 36.0,
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
      "trends_level": 0.69,
      "trends_level_raw": 0.4,
      "trends_level_note": "7d 均值 0.4 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 17,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 6.0,
      "launch_days": null,
      "guide_posts": 3,
      "guide_hits": 2,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 2,
      "cn_media_count": 1,
      "cn_media_titles": [
        {
          "source": "cn_media_youxichaguan",
          "label": "游戏茶馆",
          "title": "超3850万预约！3D格斗竞技新游《异人之下》将于12月上线",
          "url": "https://youxichaguan.com/archives/216569",
          "published": "2026-10-29",
          "hit": "异人之下"
        }
      ],
      "stale": true,
      "opportunity": {
        "key": "cooling",
        "label": "不投入",
        "rank": 6,
        "water": 0.69,
        "rise": -34.8,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 0.7 · 7d -34.8% · stale"
      }
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
      "launch_date_raw": "2025-11-14",
      "launch_date": "2025-11-14",
      "cn_guide_score": 4,
      "gap_level": "中",
      "trends_7d": -15.0,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "补英文攻略",
      "priority": "P2",
      "note": "海外已上线但英文攻略深度不够",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -15.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 24.36,
            "raw": 14.5,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 14.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 3.0,
          "value": -15.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 15,
          "weighted": 11.25,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -350,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 44.2,
      "prev_total": 44.2,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 41.2,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 29.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 29.2,
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
      "trends_level": 24.36,
      "trends_level_raw": 14.5,
      "trends_level_note": "7d 均值 14.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 5,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 0.0,
      "launch_days": -350,
      "guide_posts": 52,
      "guide_hits": 18,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 2,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "cooling",
        "label": "不投入",
        "rank": 6,
        "water": 24.36,
        "rise": -15.0,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 24.4 · 7d -15.0%"
      }
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
      "launch_date_raw": "2026-02-11",
      "launch_date": "2026-02-11",
      "cn_guide_score": 2,
      "gap_level": "中",
      "trends_7d": -0.9,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做赛季攻略",
      "priority": "P2",
      "note": "8月收入环比增37%，赛季制更新频繁",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 6.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -0.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 2.57,
            "raw": 1.5,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 1.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 3.0,
          "value": -0.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 40.0,
          "weight": 20,
          "weighted": 8.0,
          "value": 4.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -261,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 44.8,
      "prev_total": 44.8,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 41.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 29.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 29.8,
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
      "trends_level": 2.57,
      "trends_level_raw": 1.5,
      "trends_level_note": "7d 均值 1.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 12,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 4.0,
      "launch_days": -261,
      "guide_posts": 9,
      "guide_hits": 4,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 2.57,
        "rise": -0.9,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 2.6 · 7d -0.9%"
      }
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
      "launch_date_raw": "2026-05-20",
      "launch_date": "2026-05-20",
      "cn_guide_score": 1,
      "gap_level": "中",
      "trends_7d": -8.4,
      "reddit_daily": 5,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做新手攻略",
      "priority": "P2",
      "note": "MAU增长明显，英文供给仍在建立",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": false,
          "value": -8.4,
          "origin": "Google Trends",
          "kind": "stale（沿用本款上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 10.05,
            "raw": 1.1,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 8.3,
            "anchor_high": "video games",
            "anchor_high_raw": 11.0,
            "note": "7d 均值 1.1 · 热锚「video games」11.0 单锚点定标（两锚跨度 2.7 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 5,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 11,
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
          "weight": 20,
          "weighted": 3.0,
          "value": -8.4,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": 5,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 90,
          "weight": 15,
          "weighted": 13.5,
          "value": 11,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 15,
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
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -163,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 25.5,
      "prev_total": 24.0,
      "delta": 1.5,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 13,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 22.5,
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
      "trends_level": 10.05,
      "trends_level_raw": 1.1,
      "trends_level_note": "7d 均值 1.1 · 热锚「video games」11.0 单锚点定标（两锚跨度 2.7 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 8,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 8.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 11.0,
      "x_state": 11,
      "gap_score": 0.0,
      "launch_days": -163,
      "guide_posts": 33,
      "guide_hits": 31,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 2,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "cooling",
        "label": "不投入",
        "rank": 6,
        "water": 10.05,
        "rise": -8.4,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 10.1 · 7d -8.4% · stale"
      }
    },
    {
      "id": "hunger",
      "seq": 21,
      "name_cn": "HUNGER",
      "name_en": "HUNGER",
      "publisher": "Good Fun Corporation",
      "type": "PC",
      "status": "测试中",
      "cn_status": "待确认",
      "launch_date_raw": "待确认",
      "launch_date": null,
      "cn_guide_score": 1,
      "gap_level": "高",
      "trends_7d": 15.3,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P2",
      "note": "2026-10-19 Steam 开启测试（末日搜打撤生存）；厂商 / 国服状态 / 上线档期均待确认 —— 本条来自新游候选发现层的人工确认",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 4.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 15.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 424.72,
            "raw": 46.8,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 8.3,
            "anchor_high": "video games",
            "anchor_high_raw": 11.0,
            "note": "7d 均值 46.8 · 热锚「video games」11.0 单锚点定标（两锚跨度 2.7 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 12.0,
          "value": 15.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 60.0,
          "weight": 20,
          "weighted": 12.0,
          "value": 6.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 15,
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
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 55.5,
      "prev_total": 54.0,
      "delta": 1.5,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 11,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 43.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 40.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 40.5,
          "action_engine": "监控不投入",
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
      "trends_level": 424.72,
      "trends_level_raw": 46.8,
      "trends_level_note": "7d 均值 46.8 · 热锚「video games」11.0 单锚点定标（两锚跨度 2.7 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 1,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 8.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 11.0,
      "x_state": 12,
      "gap_score": 6.0,
      "launch_days": null,
      "guide_posts": 2,
      "guide_hits": 2,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "differentiate",
        "label": "差异化切入",
        "rank": 2,
        "water": 424.72,
        "rise": 15.3,
        "trend": "rising",
        "water_band": "head",
        "note": "水位 424.7 · 7d +15.3% · 头部"
      }
    },
    {
      "id": "sword-x-staff",
      "seq": 22,
      "name_cn": "杖剑传说",
      "name_en": "Sword x Staff",
      "publisher": "吉比特/雷霆游戏",
      "type": "手游",
      "status": "已上线(部分)",
      "cn_status": "国服先行",
      "launch_date_raw": "2026-05-19（欧美）｜2026Q4（韩国/东南亚）",
      "launch_date": "2026-05-19",
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": -3.1,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P1",
      "note": "吉比特自研、雷霆游戏发行；欧美版（Sword x Staff）2026-05-19 已上线，上线首月同时位于 10+ 区域 App Store 游戏畅销榜 Top50（美国均值 44、最高 26）；韩国/东南亚版计划 2026Q4 上线。cn_guide_score=4：17173 有全职业七转配装/技能替换攻略、九游攻略大全、游戏狗阵容推荐；gap_level=低：英文侧已有独立 wiki（sword-x-staff.wiki）与 BlueStacks 技能/Fantomon 攻略，供给较充分",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": false,
          "value": -3.1,
          "origin": "Google Trends",
          "kind": "stale（沿用本款上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 4.5,
            "raw": 2.7,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 2.7 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 3.0,
          "value": -3.1,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 15,
          "weighted": 11.25,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -164,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 44.2,
      "prev_total": 44.2,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 41.2,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 29.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 29.2,
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
      "trends_level": 4.5,
      "trends_level_raw": 2.7,
      "trends_level_note": "7d 均值 2.7 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 11,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 0.0,
      "launch_days": -164,
      "guide_posts": 24,
      "guide_hits": 23,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 4.5,
        "rise": -3.1,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 4.5 · 7d -3.1% · stale"
      }
    },
    {
      "id": "wenjian-changsheng",
      "seq": 23,
      "name_cn": "问剑长生",
      "name_en": "Sword of Immortality",
      "publisher": "吉比特/雷霆游戏",
      "type": "手游",
      "status": "即将上线",
      "cn_status": "国服先行",
      "launch_date_raw": "2026Q4（欧美，预估）",
      "launch_date": null,
      "cn_guide_score": 4,
      "gap_level": "高",
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P1",
      "note": "吉比特自研、雷霆游戏/LTGAMES GLOBAL 发行；亚洲服（台港澳）2025-11-27 已上线，欧美版计划 2026Q4 上线。英文名 Sword of Immortality 取自 LTGAMES GLOBAL 海外发行文案（SEAGM 商品页引用），欧美版上线后需复核；国内攻略成熟（TapTap 新手/职业/神通/法宝/资源全流程、九游副本阵容与掉落、官方玩法说明）",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.02,
            "raw": 0.0,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.0 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 15,
          "weighted": 11.25,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 62.8,
      "prev_total": 62.8,
      "delta": 0.0,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 62.8,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 47.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 47.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 32.8,
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.02,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 22,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": null,
      "guide_posts": 0,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 0.02,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "tides-of-annihilation",
      "seq": 24,
      "name_cn": "湮灭之潮",
      "name_en": "Tides of Annihilation",
      "publisher": "Eclipse Glow Games（腾讯投资）",
      "type": "PC/主机",
      "status": "未上线",
      "cn_status": "同步上线",
      "launch_date_raw": "未公布（Steam/PSN 均为 TBD）",
      "launch_date": null,
      "cn_guide_score": 2,
      "gap_level": "高",
      "trends_7d": null,
      "reddit_daily": 6,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "成都蛇夫座·日蚀边缘工作室（Eclipse Glow Games）研发自发，腾讯为主要投资方；PC/PS5/Xbox 买断单机，全球同步、无分区服；目前仅公布与线下试玩，暂无发售日（媒体预估 2026 秋—2027，非官方）。cn_guide_score=2：游侠只有攻略汇总与试玩向内容，无角色/配装/掉落/全流程；gap_level=高：仅粉丝 wiki 与 IGN 试玩，无 Game8/Fandom 完整攻略",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.92,
            "raw": 0.5,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 6,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": 6,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 25.0,
          "weight": 15,
          "weighted": 3.75,
          "value": 2,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 49.2,
      "prev_total": 49.2,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 49.2,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 40.2,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 34.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 25.2,
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.92,
      "trends_level_raw": 0.5,
      "trends_level_note": "7d 均值 0.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 15,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": null,
      "guide_posts": 32,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 0.92,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "arknights-endfield",
      "seq": 25,
      "name_cn": "明日方舟：终末地",
      "name_en": "Arknights: Endfield",
      "publisher": "鹰角网络/Gryphline",
      "type": "跨端",
      "status": "已上线",
      "cn_status": "同步上线",
      "launch_date_raw": "2026-01-22（全球公测）｜Steam 2026-10-14 追加",
      "launch_date": "2026-01-22",
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": -22.6,
      "reddit_daily": 11,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "对标监控（供给充足）",
      "priority": "P2",
      "note": "与已收录《明日方舟 / Arknights》是不同作品；2026-01-22 全球公测（PC/PS5/iOS/Android，国服同刻），Steam 版 2026-10-14 追加。cn_guide_score=5：17173 阵容构建与武器选择、GameKee 干员配队 wiki、NGA 养成速查+毕业面板、TapTap 攻略区完整；gap_level=低：arknightsendfield.wiki 武器调校/装备/日常、Game8 新手攻略、Epic 角色榜与工厂指南均已覆盖",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-30",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -22.6,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 12.6,
            "raw": 7.5,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 7.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 11,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 11,
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
          "weight": 20,
          "weighted": 0.0,
          "value": -22.6,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 80,
          "weight": 15,
          "weighted": 12.0,
          "value": 11,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 90,
          "weight": 15,
          "weighted": 13.5,
          "value": 11,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -281,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 40.5,
      "prev_total": 37.5,
      "delta": 3.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 40.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 28.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 27.0,
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
      "trends_level": 12.6,
      "trends_level_raw": 7.5,
      "trends_level_note": "7d 均值 7.5 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 7,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 11,
      "gap_score": 0.0,
      "launch_days": -281,
      "guide_posts": 40,
      "guide_hits": 11,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "cooling",
        "label": "不投入",
        "rank": 6,
        "water": 12.6,
        "rise": -22.6,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 12.6 · 7d -22.6%"
      }
    },
    {
      "id": "azur-promilia",
      "seq": 26,
      "name_cn": "蓝色星原：旅谣",
      "name_en": "Azur Promilia",
      "publisher": "蛮啾网络（韩国 NEXON）",
      "type": "跨端",
      "status": "测试中",
      "cn_status": "国服先行",
      "launch_date_raw": "亚洲区 2026 年内｜英文版 2027 夏季（官方窗口）",
      "launch_date": null,
      "cn_guide_score": 3,
      "gap_level": "高",
      "trends_7d": null,
      "reddit_daily": 4,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "蛮啾网络研发并全球自发，韩国由 NEXON 代理；亚洲区多轮 CBT（国服「旅迹测试」2026-10-07 结束），英文版 OBT 官方定于 2027 夏季、亚洲区本体 2026 年内。cn_guide_score=3：TapTap 三测开荒强度榜/配队/常驻自选、游侠角色技能，但均为测试版，缺掉落表与公测全流程；gap_level=高：Game8 仅有发售时间页，无英文角色/配装/掉落 wiki",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 2.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 1.15,
            "raw": 0.7,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.7 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 4,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 45,
          "weight": 15,
          "weighted": 6.75,
          "value": 4,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 80.0,
          "weight": 20,
          "weighted": 16.0,
          "value": 8.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 50.0,
          "weight": 15,
          "weighted": 7.5,
          "value": 3,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 46.8,
      "prev_total": 46.8,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 46.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 40.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 31.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 25.0,
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 1.15,
      "trends_level_raw": 0.7,
      "trends_level_note": "7d 均值 0.7 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 14,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 8.0,
      "launch_days": null,
      "guide_posts": 2,
      "guide_hits": 1,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 1.15,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "honor-of-kings-world",
      "seq": 27,
      "name_cn": "王者荣耀世界",
      "name_en": "Honor of Kings: World",
      "publisher": "腾讯天美/Level Infinite",
      "type": "跨端",
      "status": "未上线",
      "cn_status": "国服先行",
      "launch_date_raw": "未公布（国服 PC 2026-04-10 / 移动端 2026-04-17 已上线）",
      "launch_date": null,
      "cn_guide_score": 5,
      "gap_level": "高",
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "腾讯天美研发，海外预计 Level Infinite 发行（未官宣）；国服 PC 2026-04-10、移动端 2026-04-17 已上线，海外仅 gamescom 线下试玩、档期未公布（德媒预估 2027，非官方）。cn_guide_score=5：17173 开服保姆攻略/终极攻略/装备属性与最佳搭配，游侠配装与强度提升，角色/装备/副本掉落齐全；gap_level=高：仅 thegameswiki 与 MuMu 零散指南，无 Game8/IGN 完整攻略",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 6.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.06,
            "raw": 0.0,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.0 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 40.0,
          "weight": 20,
          "weighted": 8.0,
          "value": 4.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 5,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 54.5,
      "prev_total": 53.0,
      "delta": 1.5,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 54.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 39.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 39.5,
          "action_engine": "暂不投入",
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.06,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 20,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 4.0,
      "launch_days": null,
      "guide_posts": 10,
      "guide_hits": 6,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 0.06,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "lost-castle-2",
      "seq": 28,
      "name_cn": "失落城堡 2",
      "name_en": "Lost Castle 2",
      "publisher": "Hunter Studio/雷霆游戏（国服手游）",
      "type": "PC/手游",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "2026-06-10（Steam 1.0）｜国服手游 2026-10-21 公测",
      "launch_date": "2026-06-10",
      "cn_guide_score": 4,
      "gap_level": "中",
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做机制/成就攻略",
      "priority": "P2",
      "note": "Hunter Studio 自研、Steam 自发（EA 2024-07-25，1.0 2026-06-10）；国服手游由雷霆游戏发行，2026-10-21 公测。cn_guide_score=4：TapTap 武器/装备攻略与提灯召唤流 build、游侠近战武器及附魔推荐，缺系统化全掉落表；gap_level=中：Game8 有 EA 评测、allthings.how 全成就指南、Steam 社区指南，但无 Game8 wiki/Fandom 完整数据库",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.09,
            "raw": 0.1,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.1 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 75.0,
          "weight": 15,
          "weighted": 11.25,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -142,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 61.2,
      "prev_total": 59.8,
      "delta": 1.4,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 61.2,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 46.2,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 46.2,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 31.2,
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.09,
      "trends_level_raw": 0.1,
      "trends_level_note": "7d 均值 0.1 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 19,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": -142,
      "guide_posts": 0,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 0.09,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "renjian-yixiang",
      "seq": 29,
      "name_cn": "人间异想计划",
      "name_en": "Ordinary Oddness",
      "publisher": "腾讯",
      "type": "PC/主机",
      "status": "未上线",
      "cn_status": "未知",
      "launch_date_raw": "未公布",
      "launch_date": null,
      "cn_guide_score": 1,
      "gap_level": "中",
      "trends_7d": null,
      "reddit_daily": 23,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P1",
      "note": "腾讯开放世界 RPG，前网易制作人带队，2026-10-21 22 分钟实机首曝，登陆 PS5/Xbox/PC；英文名为暂定拼音，官方公布后需复核。需人工补：国内攻略成熟度 / 海外供给缺口 / 上线档期",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.73,
            "raw": 0.4,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.9,
            "anchor_high": "video games",
            "anchor_high_raw": 59.5,
            "note": "7d 均值 0.4 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）"
          }
        },
        "reddit": {
          "available": true,
          "value": 23,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "error": null,
          "tier": "P1"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 90,
          "weight": 15,
          "weighted": 13.5,
          "value": 23,
          "origin": "Reddit",
          "kind": "P1 主源（.rss）",
          "stale": false,
          "note": ""
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 10.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 15,
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
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 50.0,
      "prev_total": 50.0,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 9,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 50.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 36.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 35.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 21.5,
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
        "P1·Reddit",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.73,
      "trends_level_raw": 0.4,
      "trends_level_note": "7d 均值 0.4 · 热锚「video games」59.5 单锚点定标（两锚跨度 14.5 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 16,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 59.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": null,
      "guide_posts": 0,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 0.73,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "aniimo",
      "seq": 30,
      "name_cn": "伊莫",
      "name_en": "Aniimo",
      "publisher": "米哈游",
      "type": "手游",
      "status": "未上线",
      "cn_status": "未知",
      "launch_date_raw": "未公布",
      "launch_date": null,
      "cn_guide_score": 1,
      "gap_level": "中",
      "trends_7d": -1.8,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P1",
      "note": "候选来源：趣加 FunPlus｜FunPlus《伊莫》全球同步开服，米哈游新作发布预告！｜2026-09-24 08:08｜http://www.bing.com/news/apiclick.aspx?ref=FexRss&aid=&tid=6ada43390b194fd9b11d7ec7d70924d0&url=https%3a%2f%2fm.sohu.com%2fa%2f1080206921_122004016&c=15403086876617453334&mkt=en-us\n需人工补：国内攻略成熟度 / 海外供给缺口 / 上线档期",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -1.8,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 133.65,
            "raw": 47.6,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 26.9,
            "anchor_high": "video games",
            "anchor_high_raw": 35.6,
            "note": "7d 均值 47.6 · 热锚「video games」35.6 单锚点定标（两锚跨度 8.7 < 15.0）"
          }
        },
        "reddit": {
          "available": false,
          "value": 25,
          "origin": "Reddit",
          "kind": "stale（沿用本款上次有效值）",
          "stale": true,
          "error": "预算接近用尽（预留给其余源），跳过调用"
        },
        "x_twitter": {
          "available": true,
          "value": 11,
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
          "weight": 20,
          "weighted": 3.0,
          "value": -1.8,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "note": ""
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "预算接近用尽（预留给其余源），跳过调用"
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 90,
          "weight": 15,
          "weighted": 13.5,
          "value": 11,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 11 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": 0.0,
          "origin": "Reddit 社区帖（自动·近一年）",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "cn_maturity",
          "label": "国内攻略成熟度",
          "score": 0,
          "weight": 15,
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
          "score": 10.0,
          "weight": 15,
          "weighted": 1.5,
          "value": null,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "无确定档期"
        }
      ],
      "total": 33.0,
      "prev_total": 33.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 8,
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
        "Reddit（stale）",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Reddit（沿用上次值）",
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [
        "reddit"
      ],
      "trends_level": 133.65,
      "trends_level_raw": 47.6,
      "trends_level_note": "7d 均值 47.6 · 热锚「video games」35.6 单锚点定标（两锚跨度 8.7 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 3,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 26.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 35.6,
      "x_state": 11,
      "gap_score": 0.0,
      "launch_days": null,
      "guide_posts": 41,
      "guide_hits": 35,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 0,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "steady",
        "label": "稳定长尾",
        "rank": 4,
        "water": 133.65,
        "rise": -1.8,
        "trend": "flat",
        "water_band": "head",
        "note": "水位 133.7 · 7d -1.8% · 头部"
      }
    },
    {
      "id": "neverness-to-everness",
      "seq": 31,
      "name_cn": "异环",
      "name_en": "Neverness to Everness",
      "publisher": "完美世界/Hotta Studio",
      "type": "PC/主机/手游",
      "status": "已上线",
      "cn_status": "同步上线",
      "launch_date_raw": "2026-04-29",
      "launch_date": "2026-04-29",
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "对标监控（供给充足）",
      "priority": "P2",
      "note": "2026-04-29 全球同步公测（PC/移动/PS5/Mac/Epic）；海外攻略生态已成熟，Reddit 实测约 24 篇，供给缺口机会已过，主要看版本节点声量",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-30",
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 4.73,
            "raw": 1.7,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 26.9,
            "anchor_high": "video games",
            "anchor_high_raw": 35.6,
            "note": "7d 均值 1.7 · 热锚「video games」35.6 单锚点定标（两锚跨度 8.7 < 15.0）"
          }
        },
        "reddit": {
          "available": false,
          "value": 25,
          "origin": "Reddit",
          "kind": "stale（沿用本款上次有效值）",
          "stale": true,
          "error": "预算接近用尽（预留给其余源），跳过调用"
        },
        "x_twitter": {
          "available": true,
          "value": 12,
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
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 25,
          "origin": "Reddit",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "预算接近用尽（预留给其余源），跳过调用"
        },
        {
          "key": "x_official",
          "label": "X 官方公告",
          "score": 100,
          "weight": 15,
          "weighted": 15.0,
          "value": 12,
          "origin": "Bing News RSS",
          "kind": "Bing News RSS 命中 12 条",
          "stale": false,
          "note": ""
        },
        {
          "key": "supply_gap",
          "label": "海外供给不足",
          "score": 20,
          "weight": 20,
          "weighted": 4.0,
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
          "weight": 15,
          "weighted": 11.25,
          "value": 4,
          "origin": "TapTap/B站/NGA 人工评估",
          "kind": "P3 兜底",
          "stale": false,
          "note": ""
        },
        {
          "key": "launch_window",
          "label": "上线窗口近",
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -184,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 45.2,
      "prev_total": 45.2,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 2,
      "ranking_eligible": false,
      "ranking_note": "观察期（第 2/3 天）",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 45.2,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 30.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 30.2,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
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
        "Reddit（stale）",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Fallback: Reddit（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends",
        "reddit"
      ],
      "trends_level": 4.73,
      "trends_level_raw": 1.7,
      "trends_level_note": "7d 均值 1.7 · 热锚「video games」35.6 单锚点定标（两锚跨度 8.7 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 10,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 26.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 35.6,
      "x_state": 12,
      "gap_score": 2,
      "launch_days": -184,
      "overseas_supply": null,
      "guide_posts": null,
      "guide_hits": null,
      "guide_saturated": false,
      "guide_supply_kind": "none",
      "keywords_count": 0,
      "cn_media_count": 1,
      "cn_media_titles": [
        {
          "source": "cn_media_youxichaguan",
          "label": "游戏茶馆",
          "title": "完美世界2026年Q3盈利5.06亿元 《异环》海外收入超国内",
          "url": "https://youxichaguan.com/archives/216642",
          "published": "2026-10-29",
          "hit": "异环"
        }
      ],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 4.73,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    }
  ]
};
