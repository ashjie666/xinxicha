window.XC_GAMES = {
  "meta": {
    "site": "xinxicha",
    "title": "中国游戏厂商海外信息差监控",
    "subtitle": "20 款国产游戏 × 50 个英文 SEO 关键词 · 每日巡检 · 含 P1→P2→P3 回退逻辑",
    "schema_version": 1,
    "generated_at_cst": "2026-10-27 10:11:45",
    "data_mode": "live",
    "spec_sha": "9cd00c7db5c7eaadc02f7596ffc2cb436a7f30f71b359e7206365c9016898d5d",
    "network": false,
    "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
    "alert": null,
    "duration_sec": 1722.9,
    "counts": {
      "games": 30,
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
        "matched": 1,
        "error": null
      },
      {
        "key": "cn_media_chuapp",
        "label": "触乐",
        "ok": true,
        "items": 15,
        "matched": 0,
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
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "抢首发攻略",
      "priority": "P0",
      "note": "国际服先上线，国服2027+，时间窗口最干净",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 2.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 3.13,
            "raw": 1.1,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 26.5,
            "anchor_high": "video games",
            "anchor_high_raw": 36.1,
            "note": "7d 均值 1.1 · 热锚「video games」36.1 单锚点定标（两锚跨度 9.6 < 15.0）"
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
          "score": 46.7,
          "weight": 15,
          "weighted": 7.0,
          "value": 2,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "距上线 2 天"
        }
      ],
      "total": 56.8,
      "prev_total": 56.9,
      "delta": -0.1,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 56.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 41.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 41.8,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 26.8,
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
      "trends_level": 3.13,
      "trends_level_raw": 1.1,
      "trends_level_note": "7d 均值 1.1 · 热锚「video games」36.1 单锚点定标（两锚跨度 9.6 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 16,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 26.5,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 36.1,
      "x_state": 12,
      "gap_score": 8.0,
      "launch_days": 2,
      "guide_posts": 27,
      "guide_hits": 1,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 13,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": true,
      "opportunity": {
        "key": "unknown",
        "label": "象限未知",
        "rank": 7,
        "water": 3.13,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
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
      "trends_7d": 189.4,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做发售期专题",
      "priority": "P0",
      "note": "PC/PS5买断，发售期爆发，长尾有限",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 2.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 189.4,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 65.06,
            "raw": 23.5,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 26.5,
            "anchor_high": "video games",
            "anchor_high_raw": 36.1,
            "note": "7d 均值 23.5 · 热锚「video games」36.1 单锚点定标（两锚跨度 9.6 < 15.0）"
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
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 189.4,
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
          "score": 46.7,
          "weight": 15,
          "weighted": 7.0,
          "value": 2,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "距上线 2 天"
        }
      ],
      "total": 82.8,
      "prev_total": 84.4,
      "delta": -1.6,
      "action_engine": "抢首发攻略",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
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
          "total": 67.8,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 69.2,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 34.2,
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
      "trends_level": 65.06,
      "trends_level_raw": 23.5,
      "trends_level_note": "7d 均值 23.5 · 热锚「video games」36.1 单锚点定标（两锚跨度 9.6 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 4,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 26.5,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 36.1,
      "x_state": 11,
      "gap_score": 8.0,
      "launch_days": 2,
      "guide_posts": 26,
      "guide_hits": 1,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 7,
      "cn_media_count": 1,
      "cn_media_titles": [
        {
          "source": "cn_media_youxichaguan",
          "label": "游戏茶馆",
          "title": "第一个因《影之刃零》放假的公司出现了，还是他们",
          "url": "https://youxichaguan.com/archives/215607",
          "published": "2026-10-26",
          "hit": "影之刃零"
        }
      ],
      "stale": false,
      "opportunity": {
        "key": "differentiate",
        "label": "差异化切入",
        "rank": 2,
        "water": 65.06,
        "rise": 189.4,
        "trend": "rising",
        "water_band": "high",
        "note": "水位 65.1 · 7d +189.4%"
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
      "last_update": "2026-10-27",
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
            "value": 0.01,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
      "days_tracked": 10,
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
      "trends_level": 0.01,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 26,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
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
        "water": 0.01,
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
      "reddit_daily": 8,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "生活模拟类，海外未上线，提前建内容库",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
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
            "value": 1.4,
            "raw": 1.2,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 1.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 8,
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
          "value": -5.5,
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
          "value": 8,
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
      "days_tracked": 10,
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
          "total": 47.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 41.0,
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
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 1.4,
      "trends_level_raw": 1.2,
      "trends_level_note": "7d 均值 1.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 19,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
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
        "water": 1.4,
        "rise": -5.5,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 1.4 · 7d -5.5% · stale"
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
      "last_update": "2026-10-27",
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
            "value": 0.35,
            "raw": 0.3,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.3 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
      "total": 47.0,
      "prev_total": 47.0,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 47.0,
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
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.35,
      "trends_level_raw": 0.3,
      "trends_level_note": "7d 均值 0.3 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 24,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
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
        "water": 0.35,
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
      "trends_7d": 3.9,
      "reddit_daily": 13,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "都市开放世界RPG，定档明确",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 3.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 8.68,
            "raw": 7.7,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 7.7 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 30,
          "weight": 20,
          "weighted": 6.0,
          "value": 3.9,
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
          "score": 100.0,
          "weight": 15,
          "weighted": 15.0,
          "value": 80,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "距上线 80 天"
        }
      ],
      "total": 68.0,
      "prev_total": 70.9,
      "delta": -2.9,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 62.0,
          "action_engine": "做数据表占位",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 56.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 53.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 35.0,
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
      "trends_level": 8.68,
      "trends_level_raw": 7.7,
      "trends_level_note": "7d 均值 7.7 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 10,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": 80,
      "guide_posts": 0,
      "guide_hits": 0,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 8.68,
        "rise": 3.9,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 8.7 · 7d +3.9%"
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
      "trends_7d": 4.9,
      "reddit_daily": 7,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "占关键词建预约站",
      "priority": "P1",
      "note": "国内运营10年攻略极成熟，海外刚宣布",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 4.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 3.94,
            "raw": 3.5,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 3.5 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 7,
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
          "score": 30,
          "weight": 20,
          "weighted": 6.0,
          "value": 4.9,
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
          "value": 7,
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
      "total": 66.5,
      "prev_total": 72.5,
      "delta": -6.0,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
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
          "total": 57.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 51.5,
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
      "trends_level": 3.94,
      "trends_level_raw": 3.5,
      "trends_level_note": "7d 均值 3.5 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 13,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
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
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 3.94,
        "rise": 4.9,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 3.9 · 7d +4.9%"
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
      "last_update": "2026-10-27",
      "overseas_supply": 4.0,
      "signals": {
        "trends": {
          "available": false,
          "value": -34.8,
          "origin": "Google Trends",
          "kind": "stale（沿用本款上次有效值）",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.46,
            "raw": 0.4,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.4 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "value": -34.8,
          "origin": "Google Trends",
          "kind": "stale（沿用上次有效值）",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））"
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
      "total": 49.5,
      "prev_total": 51.0,
      "delta": -1.5,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 49.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 34.5,
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
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.46,
      "trends_level_raw": 0.4,
      "trends_level_note": "7d 均值 0.4 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 22,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 11,
      "gap_score": 6.0,
      "launch_days": null,
      "guide_posts": 3,
      "guide_hits": 2,
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
        "water": 0.46,
        "rise": -34.8,
        "trend": "falling",
        "water_band": "low",
        "note": "水位 0.5 · 7d -34.8% · stale"
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
      "trends_7d": 6.3,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "补英文攻略",
      "priority": "P2",
      "note": "海外已上线但英文攻略深度不够",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 6.3,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 16.42,
            "raw": 14.5,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 14.5 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 60,
          "weight": 20,
          "weighted": 12.0,
          "value": 6.3,
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
          "value": -347,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 51.8,
      "prev_total": 53.2,
      "delta": -1.4,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 39.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 36.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 38.2,
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
      "trends_level": 16.42,
      "trends_level_raw": 14.5,
      "trends_level_note": "7d 均值 14.5 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 7,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 11,
      "gap_score": 0.0,
      "launch_days": -347,
      "guide_posts": 52,
      "guide_hits": 18,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 2,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "occupy",
        "label": "优先占位",
        "rank": 1,
        "water": 16.42,
        "rise": 6.3,
        "trend": "rising",
        "water_band": "low",
        "note": "水位 16.4 · 7d +6.3%"
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
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做赛季攻略",
      "priority": "P2",
      "note": "8月收入环比增37%，赛季制更新频繁",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 6.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 1.68,
            "raw": 1.5,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 1.5 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "value": -258,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 41.8,
      "prev_total": 41.8,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
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
          "total": 26.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 26.8,
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
      "trends_level": 1.68,
      "trends_level_raw": 1.5,
      "trends_level_note": "7d 均值 1.5 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 18,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
      "gap_score": 4.0,
      "launch_days": -258,
      "guide_posts": 9,
      "guide_hits": 4,
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
        "water": 1.68,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
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
      "trends_7d": 1.2,
      "reddit_daily": 5,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做新手攻略",
      "priority": "P2",
      "note": "MAU增长明显，英文供给仍在建立",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 1.2,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 6.78,
            "raw": 6.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 6.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 30,
          "weight": 20,
          "weighted": 6.0,
          "value": 1.2,
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
          "value": 5,
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
          "value": -160,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 30.0,
      "prev_total": 30.0,
      "delta": 0.0,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 24.0,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 21.0,
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
      "trends_level": 6.78,
      "trends_level_raw": 6.0,
      "trends_level_note": "7d 均值 6.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 11,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
      "gap_score": 0.0,
      "launch_days": -160,
      "guide_posts": 33,
      "guide_hits": 31,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 2,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 6.78,
        "rise": 1.2,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 6.8 · 7d +1.2%"
      }
    },
    {
      "id": "flamb-merge-cook",
      "seq": 12,
      "name_cn": "Flambé: Merge & Cook",
      "name_en": "Flambé: Merge & Cook",
      "reddit_query": "Flambé Merge",
      "publisher": "柠檬微趣",
      "type": "手游休闲",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "2025-05-08",
      "launch_date": "2025-05-08",
      "cn_guide_score": 2,
      "gap_level": "中",
      "trends_7d": null,
      "reddit_daily": 22,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做关卡攻略",
      "priority": "P2",
      "note": "合成+模拟经营，海外收入创新高",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.0,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": true,
          "value": 22,
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
          "score": 0,
          "weight": 20,
          "weighted": 0.0,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "note": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 90,
          "weight": 15,
          "weighted": 13.5,
          "value": 22,
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
          "value": -537,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 49.2,
      "prev_total": 52.2,
      "delta": -3.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
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
          "total": 35.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 37.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 23.8,
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
        "Bing News RSS 命中 10 条"
      ],
      "stale_sources": [
        "trends"
      ],
      "trends_level": 0.0,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 30,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 10,
      "gap_score": 10.0,
      "launch_days": -537,
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
        "water": 0.0,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
    },
    {
      "id": "tasty-travels-merge-game",
      "seq": 13,
      "name_cn": "Tasty Travels",
      "name_en": "Tasty Travels: Merge Game",
      "reddit_query": "Tasty Travels",
      "publisher": "点点互动",
      "type": "手游休闲",
      "status": "已上线",
      "cn_status": "国际服先行",
      "launch_date_raw": "2024-04-11",
      "launch_date": "2024-04-11",
      "cn_guide_score": 2,
      "gap_level": "中",
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做资源攻略",
      "priority": "P2",
      "note": "合并+旅行经营类，攻略内容少",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 0.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 0.0,
            "raw": 0.0,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 34.5,
            "anchor_high": "video games",
            "anchor_high_raw": 47.1,
            "note": "7d 均值 0.0 · 热锚「video games」47.1 单锚点定标（两锚跨度 12.6 < 15.0），游戏词低于本批分辨率下限"
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
          "note": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））"
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
          "value": -929,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 53.8,
      "prev_total": 53.8,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 53.8,
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
          "total": 38.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 23.8,
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
      "trends_level": 0.0,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 热锚「video games」47.1 单锚点定标（两锚跨度 12.6 < 15.0），游戏词低于本批分辨率下限",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 29,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 34.5,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 47.1,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": -929,
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
        "water": 0.0,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
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
      "launch_date_raw": "2020-09-28",
      "launch_date": "2020-09-28",
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": 30.2,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争激烈不建议",
      "priority": "P3",
      "note": "搜索量大但英文站已饱和",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 30.2,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 110.05,
            "raw": 51.9,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 34.5,
            "anchor_high": "video games",
            "anchor_high_raw": 47.1,
            "note": "7d 均值 51.9 · 热锚「video games」47.1 单锚点定标（两锚跨度 12.6 < 15.0）"
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
          "score": 100,
          "weight": 20,
          "weighted": 20.0,
          "value": 30.2,
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
          "value": -2220,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 62.0,
      "prev_total": 62.0,
      "delta": 0.0,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 42.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 47.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 50.0,
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
        "Bing News RSS 命中 10 条"
      ],
      "stale_sources": [],
      "trends_level": 110.05,
      "trends_level_raw": 51.9,
      "trends_level_note": "7d 均值 51.9 · 热锚「video games」47.1 单锚点定标（两锚跨度 12.6 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 3,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 34.5,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 47.1,
      "x_state": 10,
      "gap_score": 0.0,
      "launch_days": -2220,
      "guide_posts": 61,
      "guide_hits": 12,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "differentiate",
        "label": "差异化切入",
        "rank": 2,
        "water": 110.05,
        "rise": 30.2,
        "trend": "rising",
        "water_band": "head",
        "note": "水位 110.0 · 7d +30.2% · 头部"
      }
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
      "launch_date_raw": "2023-04-26",
      "launch_date": "2023-04-26",
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": 3.5,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争激烈不建议",
      "priority": "P3",
      "note": "同上",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 6.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 3.5,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 11.47,
            "raw": 10.2,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 10.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 30,
          "weight": 20,
          "weighted": 6.0,
          "value": 3.5,
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
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -1280,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 56.0,
      "prev_total": 62.0,
      "delta": -6.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
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
          "total": 41.0,
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
          "total": 23.0,
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
        "Bing News RSS 命中 10 条"
      ],
      "stale_sources": [],
      "trends_level": 11.47,
      "trends_level_raw": 10.2,
      "trends_level_note": "7d 均值 10.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 8,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 10,
      "gap_score": 4.0,
      "launch_days": -1280,
      "guide_posts": 28,
      "guide_hits": 6,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 11.47,
        "rise": 3.5,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 11.5 · 7d +3.5%"
      }
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
      "launch_date_raw": "2024-05-23",
      "launch_date": "2024-05-23",
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": 4.9,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "做差异化内容",
      "priority": "P3",
      "note": "Steam在线稳定但大站已覆盖",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 8.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 4.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 17.66,
            "raw": 15.6,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 15.6 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 30,
          "weight": 20,
          "weighted": 6.0,
          "value": 4.9,
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
          "score": 20.0,
          "weight": 20,
          "weighted": 4.0,
          "value": 2.0,
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
          "value": -887,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 51.2,
      "prev_total": 57.2,
      "delta": -6.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
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
          "total": 36.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 36.2,
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
      "trends_level": 17.66,
      "trends_level_raw": 15.6,
      "trends_level_note": "7d 均值 15.6 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 6,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
      "gap_score": 2.0,
      "launch_days": -887,
      "guide_posts": 22,
      "guide_hits": 10,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 17.66,
        "rise": 4.9,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 17.7 · 7d +4.9%"
      }
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
      "launch_date_raw": "2024-06-20",
      "launch_date": "2024-06-20",
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": 2.6,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "赛事/英雄更新压力大",
      "priority": "P3",
      "note": "下载增长明显但英文攻略站已有",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 2.6,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 3.66,
            "raw": 3.2,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 3.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 30,
          "weight": 20,
          "weighted": 6.0,
          "value": 2.6,
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
          "value": -859,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 45.8,
      "prev_total": 47.2,
      "delta": -1.4,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 39.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 30.8,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 32.2,
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
      "trends_level": 3.66,
      "trends_level_raw": 3.2,
      "trends_level_note": "7d 均值 3.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 14,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 11,
      "gap_score": 0.0,
      "launch_days": -859,
      "guide_posts": 31,
      "guide_hits": 11,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "watch",
        "label": "只监控",
        "rank": 5,
        "water": 3.66,
        "rise": 2.6,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 3.7 · 7d +2.6%"
      }
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
      "launch_date_raw": "2020-01-16",
      "launch_date": "2020-01-16",
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": 22.9,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争激烈",
      "priority": "P3",
      "note": "英文社区成熟，攻略站多",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 22.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 42.04,
            "raw": 37.2,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 37.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "value": 22.9,
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
          "value": -2476,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 65.0,
      "prev_total": 55.5,
      "delta": 9.5,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 45.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 50.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 50.0,
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
      "trends_level": 42.04,
      "trends_level_raw": 37.2,
      "trends_level_note": "7d 均值 37.2 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 5,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
      "gap_score": 0.0,
      "launch_days": -2476,
      "guide_posts": 17,
      "guide_hits": 11,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "occupy",
        "label": "优先占位",
        "rank": 1,
        "water": 42.04,
        "rise": 22.9,
        "trend": "rising",
        "water_band": "low",
        "note": "水位 42.0 · 7d +22.9%"
      }
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
      "launch_date_raw": "2024-03-27",
      "launch_date": "2024-03-27",
      "cn_guide_score": 4,
      "gap_level": "低",
      "trends_7d": null,
      "reddit_daily": 3,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "竞争较激烈",
      "priority": "P3",
      "note": "莉莉丝发行能力强但英文供给充足",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 8.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 2.21,
            "raw": 2.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 2.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 20.0,
          "weight": 20,
          "weighted": 4.0,
          "value": 2.0,
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
          "value": -944,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 37.0,
      "prev_total": 39.2,
      "delta": -2.2,
      "action_engine": "暂不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 37.0,
          "action_engine": "暂不投入",
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
          "total": 22.0,
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
      "trends_level": 2.21,
      "trends_level_raw": 2.0,
      "trends_level_note": "7d 均值 2.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 17,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
      "gap_score": 2.0,
      "launch_days": -944,
      "guide_posts": 11,
      "guide_hits": 8,
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
        "water": 2.21,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
      }
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
      "launch_date_raw": "2018-09-20",
      "launch_date": "2018-09-20",
      "cn_guide_score": 5,
      "gap_level": "低",
      "trends_7d": 7.9,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "老牌产品增长平稳",
      "priority": "P3",
      "note": "英文市场成熟，增量有限",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "高",
      "last_update": "2026-10-27",
      "overseas_supply": 6.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 7.9,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 3.5,
            "raw": 3.1,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 3.1 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "score": 60,
          "weight": 20,
          "weighted": 12.0,
          "value": 7.9,
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
          "score": 0.0,
          "weight": 15,
          "weighted": 0.0,
          "value": -2959,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 63.5,
      "prev_total": 56.0,
      "delta": 7.5,
      "action_engine": "做数据表占位",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 10,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 51.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "trends"
          ]
        },
        {
          "key": "reddit_dead",
          "label": "Reddit 失活",
          "total": 48.5,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 50.0,
          "action_engine": "监控不投入",
          "confidence": "中",
          "stale_sources": [
            "x_twitter"
          ]
        },
        {
          "key": "p1_all_dead",
          "label": "P1 全部失败",
          "total": 23.0,
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
      "trends_level": 3.5,
      "trends_level_raw": 3.1,
      "trends_level_note": "7d 均值 3.1 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 15,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 11,
      "gap_score": 4.0,
      "launch_days": -2959,
      "guide_posts": 10,
      "guide_hits": 5,
      "guide_saturated": false,
      "guide_supply_kind": "cached",
      "keywords_count": 1,
      "cn_media_count": 0,
      "cn_media_titles": [],
      "stale": false,
      "opportunity": {
        "key": "occupy",
        "label": "优先占位",
        "rank": 1,
        "water": 3.5,
        "rise": 7.9,
        "trend": "rising",
        "water_band": "low",
        "note": "水位 3.5 · 7d +7.9%"
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
      "trends_7d": 12.7,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P2",
      "note": "2026-10-19 Steam 开启测试（末日搜打撤生存）；厂商 / 国服状态 / 上线档期均待确认 —— 本条来自新游候选发现层的人工确认",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 4.0,
      "signals": {
        "trends": {
          "available": true,
          "value": 12.7,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 365.11,
            "raw": 40.3,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 8.1,
            "anchor_high": "video games",
            "anchor_high_raw": 11.0,
            "note": "7d 均值 40.3 · 热锚「video games」11.0 单锚点定标（两锚跨度 3.0 < 15.0）"
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
          "score": 60,
          "weight": 20,
          "weighted": 12.0,
          "value": 12.7,
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
      "prev_total": 55.5,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 8,
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
        "Reddit（stale）",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Reddit（沿用上次值）",
        "Bing News RSS 命中 12 条"
      ],
      "stale_sources": [
        "reddit"
      ],
      "trends_level": 365.11,
      "trends_level_raw": 40.3,
      "trends_level_note": "7d 均值 40.3 · 热锚「video games」11.0 单锚点定标（两锚跨度 3.0 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 1,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 8.1,
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
      "stale": true,
      "opportunity": {
        "key": "differentiate",
        "label": "差异化切入",
        "rank": 2,
        "water": 365.11,
        "rise": 12.7,
        "trend": "rising",
        "water_band": "head",
        "note": "水位 365.1 · 7d +12.7% · 头部"
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
      "trends_7d": null,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P1",
      "note": "吉比特自研、雷霆游戏发行；欧美版（Sword x Staff）2026-05-19 已上线，上线首月同时位于 10+ 区域 App Store 游戏畅销榜 Top50（美国均值 44、最高 26）；韩国/东南亚版计划 2026Q4 上线。cn_guide_score=4：17173 有全职业七转配装/技能替换攻略、九游攻略大全、游戏狗阵容推荐；gap_level=低：英文侧已有独立 wiki（sword-x-staff.wiki）与 BlueStacks 技能/Fantomon 攻略，供给较充分",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": false,
          "value": null,
          "origin": "Google Trends",
          "kind": "Fallback: Google Search",
          "stale": true,
          "error": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
          "level": {
            "value": 4.29,
            "raw": 0.5,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 8.1,
            "anchor_high": "video games",
            "anchor_high_raw": 11.0,
            "note": "7d 均值 0.5 · 热锚「video games」11.0 单锚点定标（两锚跨度 3.0 < 15.0）"
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
          "value": -161,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 41.2,
      "prev_total": 41.2,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 6,
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
          "total": 26.2,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 26.2,
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
      "trends_level": 4.29,
      "trends_level_raw": 0.5,
      "trends_level_note": "7d 均值 0.5 · 热锚「video games」11.0 单锚点定标（两锚跨度 3.0 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 12,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 8.1,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 11.0,
      "x_state": 12,
      "gap_score": 0.0,
      "launch_days": -161,
      "guide_posts": 24,
      "guide_hits": 23,
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
        "water": 4.29,
        "rise": null,
        "trend": null,
        "water_band": null,
        "note": "无 Trends 7d 变化率：无法判断时机"
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
      "last_update": "2026-10-27",
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
            "value": 0.01,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
      "days_tracked": 6,
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
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
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
      "trends_level": 0.01,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 28,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
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
        "water": 0.01,
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
      "reddit_daily": 8,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "成都蛇夫座·日蚀边缘工作室（Eclipse Glow Games）研发自发，腾讯为主要投资方；PC/PS5/Xbox 买断单机，全球同步、无分区服；目前仅公布与线下试玩，暂无发售日（媒体预估 2026 秋—2027，非官方）。cn_guide_score=2：游侠只有攻略汇总与试玩向内容，无角色/配装/掉落/全流程；gap_level=高：仅粉丝 wiki 与 IGN 试玩，无 Game8/Fandom 完整攻略",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
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
            "value": 0.39,
            "raw": 0.3,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.3 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": false,
          "value": 8,
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
          "value": 8,
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
      "total": 47.8,
      "prev_total": 47.8,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 6,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 47.8,
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
          "total": 34.2,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
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
        "Reddit（stale）",
        "P2·X"
      ],
      "fallbacks": [
        "Fallback: Google Search",
        "Fallback: Reddit（沿用上次值）",
        "Bing News RSS 命中 11 条"
      ],
      "stale_sources": [
        "trends",
        "reddit"
      ],
      "trends_level": 0.39,
      "trends_level_raw": 0.3,
      "trends_level_note": "7d 均值 0.3 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 23,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 11,
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
        "water": 0.39,
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
      "trends_7d": -4.0,
      "reddit_daily": 19,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "对标监控（供给充足）",
      "priority": "P2",
      "note": "与已收录《明日方舟 / Arknights》是不同作品；2026-01-22 全球公测（PC/PS5/iOS/Android，国服同刻），Steam 版 2026-10-14 追加。cn_guide_score=5：17173 阵容构建与武器选择、GameKee 干员配队 wiki、NGA 养成速查+毕业面板、TapTap 攻略区完整；gap_level=低：arknightsendfield.wiki 武器调校/装备/日常、Game8 新手攻略、Epic 角色榜与工厂指南均已覆盖",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -4.0,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 9.17,
            "raw": 8.1,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 8.1 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": false,
          "value": 19,
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
          "value": -4.0,
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
          "value": 19,
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
          "value": -278,
          "origin": "官网/游戏日历",
          "kind": "P3 兜底",
          "stale": false,
          "note": "已上线"
        }
      ],
      "total": 43.5,
      "prev_total": 43.5,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 6,
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
          "total": 31.5,
          "action_engine": "暂不投入",
          "confidence": "中",
          "stale_sources": [
            "reddit"
          ]
        },
        {
          "key": "x_dead",
          "label": "X/Twitter 失活",
          "total": 30.0,
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
      "trends_level": 9.17,
      "trends_level_raw": 8.1,
      "trends_level_note": "7d 均值 8.1 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 9,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 11,
      "gap_score": 0.0,
      "launch_days": -278,
      "guide_posts": 40,
      "guide_hits": 11,
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
        "water": 9.17,
        "rise": -4.0,
        "trend": "flat",
        "water_band": "low",
        "note": "水位 9.2 · 7d -4.0%"
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
      "reddit_daily": 6,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "提前占词占位",
      "priority": "P1",
      "note": "蛮啾网络研发并全球自发，韩国由 NEXON 代理；亚洲区多轮 CBT（国服「旅迹测试」2026-10-07 结束），英文版 OBT 官方定于 2027 夏季、亚洲区本体 2026 年内。cn_guide_score=3：TapTap 三测开荒强度榜/配队/常驻自选、游侠角色技能，但均为测试版，缺掉落表与公测全流程；gap_level=高：Game8 仅有发售时间页，无英文角色/配装/掉落 wiki",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
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
            "value": 0.89,
            "raw": 0.8,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.8 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
          }
        },
        "reddit": {
          "available": false,
          "value": 6,
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
          "note": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 60,
          "weight": 15,
          "weighted": 9.0,
          "value": 6,
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
      "total": 49.0,
      "prev_total": 49.0,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 6,
      "ranking_eligible": true,
      "ranking_note": "正式排名",
      "scenarios": [
        {
          "key": "trends_dead",
          "label": "Google Trends 失活",
          "total": 49.0,
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
          "total": 34.0,
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
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
      "trends_level": 0.89,
      "trends_level_raw": 0.8,
      "trends_level_note": "7d 均值 0.8 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 21,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
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
        "water": 0.89,
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
      "last_update": "2026-10-27",
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
            "value": 0.01,
            "raw": 0.0,
            "stale": false,
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
      "prev_total": 54.5,
      "delta": 0.0,
      "action_engine": "监控不投入",
      "action_basis": "规则引擎",
      "base_score_applied": false,
      "days_tracked": 6,
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
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
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
      "trends_level": 0.01,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 27,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
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
        "water": 0.01,
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
      "last_update": "2026-10-27",
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
            "mode": "dual",
            "anchor_low": "mobile game",
            "anchor_low_raw": 44.3,
            "anchor_high": "video games",
            "anchor_high_raw": 60.5,
            "note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）"
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
          "value": -139,
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
      "days_tracked": 6,
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
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
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
      "trends_level": 0.02,
      "trends_level_raw": 0.0,
      "trends_level_note": "7d 均值 0.0 · 冷锚「mobile game」44.3 / 热锚「video games」60.5 → 双锚折线定标（冷锚为 50 分界）",
      "trends_level_stale": false,
      "trends_level_mode": "dual",
      "trends_level_rank": 25,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 44.3,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 60.5,
      "x_state": 12,
      "gap_score": 10.0,
      "launch_days": -139,
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
      "reddit_daily": 22,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P1",
      "note": "腾讯开放世界 RPG，前网易制作人带队，2026-10-21 22 分钟实机首曝，登陆 PS5/Xbox/PC；英文名为暂定拼音，官方公布后需复核。需人工补：国内攻略成熟度 / 海外供给缺口 / 上线档期",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
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
            "value": 1.4,
            "raw": 0.7,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 34.9,
            "anchor_high": "video games",
            "anchor_high_raw": 47.6,
            "note": "7d 均值 0.7 · 热锚「video games」47.6 单锚点定标（两锚跨度 12.7 < 15.0）"
          }
        },
        "reddit": {
          "available": false,
          "value": 22,
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
          "note": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））"
        },
        {
          "key": "reddit",
          "label": "Reddit 讨论量",
          "score": 90,
          "weight": 15,
          "weighted": 13.5,
          "value": 22,
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
      "days_tracked": 6,
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
          "action_engine": "人工复核（P1 全部不可用）",
          "confidence": "低",
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
      "trends_level": 1.4,
      "trends_level_raw": 0.7,
      "trends_level_note": "7d 均值 0.7 · 热锚「video games」47.6 单锚点定标（两锚跨度 12.7 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 20,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 34.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 47.6,
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
        "water": 1.4,
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
      "trends_7d": -4.6,
      "reddit_daily": 25,
      "x_mentions": null,
      "total_score": null,
      "action_manual": "待人工评估（信号未积累）",
      "priority": "P1",
      "note": "候选来源：趣加 FunPlus｜FunPlus《伊莫》全球同步开服，米哈游新作发布预告！｜2026-09-24 08:08｜http://www.bing.com/news/apiclick.aspx?ref=FexRss&aid=&tid=6ada43390b194fd9b11d7ec7d70924d0&url=https%3a%2f%2fm.sohu.com%2fa%2f1080206921_122004016&c=15403086876617453334&mkt=en-us\n需人工补：国内攻略成熟度 / 海外供给缺口 / 上线档期",
      "signal_source": "P1: Trends+Reddit+X",
      "confidence": "中",
      "last_update": "2026-10-27",
      "overseas_supply": 10.0,
      "signals": {
        "trends": {
          "available": true,
          "value": -4.6,
          "origin": "Google Trends",
          "kind": "P1 主源",
          "stale": false,
          "error": null,
          "tier": "P1",
          "level": {
            "value": 128.78,
            "raw": 61.3,
            "stale": false,
            "mode": "single-high",
            "anchor_low": "mobile game",
            "anchor_low_raw": 34.9,
            "anchor_high": "video games",
            "anchor_high_raw": 47.6,
            "note": "7d 均值 61.3 · 热锚「video games」47.6 单锚点定标（两锚跨度 12.7 < 15.0）"
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
          "value": -4.6,
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
      "days_tracked": 5,
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
      "trends_level": 128.78,
      "trends_level_raw": 61.3,
      "trends_level_note": "7d 均值 61.3 · 热锚「video games」47.6 单锚点定标（两锚跨度 12.7 < 15.0）",
      "trends_level_stale": false,
      "trends_level_mode": "single-high",
      "trends_level_rank": 2,
      "trends_anchor_low": "mobile game",
      "trends_anchor_low_raw": 34.9,
      "trends_anchor_high": "video games",
      "trends_anchor_high_raw": 47.6,
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
        "water": 128.78,
        "rise": -4.6,
        "trend": "flat",
        "water_band": "head",
        "note": "水位 128.8 · 7d -4.6% · 头部"
      }
    }
  ]
};
