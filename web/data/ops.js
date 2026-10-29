window.XC_OPS = {
  "meta": {
    "site": "xinxicha",
    "title": "中国游戏厂商海外信息差监控",
    "subtitle": "20 款国产游戏 × 50 个英文 SEO 关键词 · 每日巡检 · 含 P1→P2→P3 回退逻辑",
    "schema_version": 1,
    "generated_at_cst": "2026-10-29 10:24:02",
    "data_mode": "live",
    "spec_sha": "9cd00c7db5c7eaadc02f7596ffc2cb436a7f30f71b359e7206365c9016898d5d",
    "network": false,
    "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
    "alert": null,
    "duration_sec": 1718.2,
    "counts": {
      "tasks": 12,
      "automation": 10,
      "roadmap": 5
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
  "scoring": {
    "weights": {
      "trends_rise": 20,
      "reddit": 15,
      "x_official": 15,
      "supply_gap": 20,
      "cn_maturity": 15,
      "launch_window": 15
    },
    "thresholds": [
      [
        80,
        "抢首发攻略"
      ],
      [
        60,
        "做数据表占位"
      ],
      [
        40,
        "监控不投入"
      ],
      [
        0,
        "暂不投入"
      ]
    ],
    "bands": {
      "trends_7d": [
        [
          -100,
          -20,
          0
        ],
        [
          -20,
          0,
          15
        ],
        [
          0,
          5,
          30
        ],
        [
          5,
          20,
          60
        ],
        [
          20,
          null,
          100
        ]
      ],
      "reddit_daily": [
        [
          0,
          1,
          0
        ],
        [
          1,
          3,
          25
        ],
        [
          3,
          5,
          45
        ],
        [
          5,
          10,
          60
        ],
        [
          10,
          20,
          80
        ],
        [
          20,
          25,
          90
        ],
        [
          25,
          null,
          100
        ]
      ],
      "launch_window_points": [
        [
          180,
          30
        ],
        [
          80,
          100
        ],
        [
          30,
          70
        ],
        [
          0,
          45
        ],
        [
          -60,
          10
        ]
      ],
      "launch_window_after_min": 0,
      "launch_window_fallback": {
        "unknown": 10
      },
      "x_official": [
        [
          0,
          1,
          0
        ],
        [
          1,
          4,
          25
        ],
        [
          4,
          7,
          45
        ],
        [
          7,
          10,
          65
        ],
        [
          10,
          11,
          80
        ],
        [
          11,
          12,
          90
        ],
        [
          12,
          null,
          100
        ]
      ]
    },
    "base_score_new_game": 20,
    "min_days_for_ranking": 3,
    "gap_level_to_gap_score": {
      "高": 9,
      "中": 6,
      "低": 2
    },
    "confidence_rules": {
      "高": "全部 P1 源正常",
      "中": "部分 P1 失败走 P2 回退",
      "低": "P1 全部失败仅 P3 兜底"
    },
    "note": "2026-10-22 由规格表的 30/20/15/15/10/10 调整为 20/15/15/20/15/15：业务重心从「海外声量」转向「可下手的机会窗口」，人工基线三项合计由 35% 提到 50%，纯声量两项由 50% 降到 35%。上线窗口同期由「7 天内最高」的阶梯改为折线：提前 80 天是关键词占位峰值（100 分），越临近上线竞争越饱和、逐段递减，上线 60 天后归零（原实现 >90 天仍给 40 分，与「长期埋伏最低」文案不符）。离线用当日在库 29 款复核：总分区间 20–62.5 → 21.5–68.8，「做数据表占位」5→7 款，前四名不变；代价是人工字段仅 5 档、约四分之一款有确定档期，唯一取值数 24→22，区分度略降。规格表「MVP字段表」F13 的 5×20% 旧公式仍为废弃状态"
  },
  "trends_anchor": {
    "enabled": true,
    "low": "mobile game",
    "high": "video games",
    "min_span": 15,
    "note": "搜索水位（展示用，不参与评分；另出「水位名次」列以保证每款可区分）：Google Trends 每批都把本批最高值归一成 100（整数），批内分辨率下限＝最高词的 1%，故跨批次、跨游戏比较必须靠同批锚点校准。做法＝把「游戏词 + 冷锚点 low + 热锚点 high」放进同一批请求（pytrends 单批上限 5 词，故每批装 collection.trends_batch_size 个游戏词 + 两个锚点；2026-10-20 起由 prefetch_trends 批量预取，请求数由每款 1 次降到约 N/批），按 7 日序列均值做双锚折线定标：冷锚以下用「50 × 游戏均值 ÷ 冷锚均值」铺在 0-50，冷锚到热锚之间用「50 + 50 ×（游戏均值 − 冷锚均值）÷（热锚均值 − 冷锚均值）」映射到 50-100，越界不截断（高于热锚保留 >100 并注明）。用折线而非单段线性的原因：单段线性会把所有低于冷锚的款统一压成 0（run #22 实测 8 款挤 0.0、8 款挤 100.0）。冷锚均值必须 > 0 才能充当 50 分界：批内被压成 0 的锚点会让折线退化成「所有游戏都落在 50.0」的假分界（2026-10-20 run #23 实测 13 款并列 50.0），故冷锚均值 ≤ 0 时自动降级为「单锚点比例定标」（优先热锚）；热锚缺失、冷锚缺失、两锚均值跨度 < min_span 同样降级。取不到留空「—」并写明原因，不做 stale 兜底（逐款水位各异，借源级上次值会张冠李戴）。刻意不另发锚点批次：2026-10-20 实测请求数 21→42 会撞 Google 窗口配额，把占 30% 权重的变化率分项打到 13/21 款 stale。量级选型（run #23 实测教训）：热锚若比所有游戏都热，就会成为批内归一化基准、把弱游戏的相对值压到整数下限（当轮 13 款 game_mean=0、trends_rise stale 14/21），故把 low 由 gacha game 上调为 mobile game，让冷锚均值稳定 > 0、弱游戏不再落进 50.0 假分界；high= gaming 量级过大、自己反而成为批内归一化基准（run #24 实测热锚批内均值 40.1、冷锚仅 2.4），把弱游戏的相对值压到整数下限，连带其 7 日首点为 0 使变化率不可算 —— trends_rise（占 30% 权重）stale 随锚点量级上升（无锚点 4/21 → 单锚同批 6/21 → 双锚 gaming 14/21），即「为展示水位塞进同批的锚点词」正在损伤评分链路；故 high 由 gaming 下调为 video games（量级更接近游戏群，备选 Steam），代价是冷/热跨度收窄、部分强游戏可能越过热锚（已注明不截断，run #24 后待 CI 复核）。批内分辨率下限是硬约束：低于「本批最高词 1%」的款在数值上必然并列 0，差异由「水位名次」列的次键（Trends 7d → Reddit 24h → 游戏名）体现。"
  },
  "weights_table": [
    {
      "key": "trends_rise",
      "signal": "Google Trends 上升",
      "weight": 20,
      "weight_text": "20%",
      "desc": "海外需求最直接信号，搜索量飙升=玩家关注度激增"
    },
    {
      "key": "reddit",
      "signal": "Reddit 讨论量",
      "weight": 15,
      "weight_text": "15%",
      "desc": "真实玩家提问和讨论，反映新手问题和内容缺口"
    },
    {
      "key": "x_official",
      "signal": "X/Twitter 官方公告",
      "weight": 15,
      "weight_text": "15%",
      "desc": "上线/测试/维护/版本更新等官方信号"
    },
    {
      "key": "supply_gap",
      "signal": "海外供给不足",
      "weight": 20,
      "weight_text": "20%",
      "desc": "英文攻略站少=竞争小=有机会窗口"
    },
    {
      "key": "cn_maturity",
      "signal": "国内攻略成熟度",
      "weight": 15,
      "weight_text": "15%",
      "desc": "国内已有结构化攻略=可转化为英文内容的素材多"
    },
    {
      "key": "launch_window",
      "signal": "上线窗口近",
      "weight": 15,
      "weight_text": "15%",
      "desc": "提前 80 天是关键词占位峰值（100 分），越临近上线竞争越饱和、逐段递减，上线 60 天后归零"
    }
  ],
  "components_order": [
    "trends_rise",
    "reddit",
    "x_official",
    "supply_gap",
    "cn_maturity",
    "launch_window"
  ],
  "component_labels": {
    "trends_rise": "Trends 上升",
    "reddit": "Reddit 讨论量",
    "x_official": "X 官方公告",
    "supply_gap": "海外供给不足",
    "cn_maturity": "国内攻略成熟度",
    "launch_window": "上线窗口近"
  },
  "scenarios": [
    {
      "key": "trends_dead",
      "label": "Google Trends 失活",
      "dead": [
        "trends"
      ]
    },
    {
      "key": "reddit_dead",
      "label": "Reddit 失活",
      "dead": [
        "reddit"
      ]
    },
    {
      "key": "x_dead",
      "label": "X/Twitter 失活",
      "dead": [
        "x_twitter"
      ]
    },
    {
      "key": "p1_all_dead",
      "label": "P1 全部失败",
      "dead": [
        "trends",
        "reddit",
        "x_twitter"
      ]
    }
  ],
  "tasks": [
    {
      "id": "T01",
      "stage": "早晨(9:00)",
      "name": "Google Trends 数据拉取",
      "steps": "1. 打开pytrends或Google Trends网页\n2. 对Sheet3中50个关键词批量查询7日搜索趋势\n3. 记录每个关键词的7日变化率(上升/下降/平稳)\n4. 变化率>20%标记为\"上升\"\n5. 将数据写入Sheet3的\"Google Trends 7日变化\"列",
      "tools": "pytrends / Google Trends",
      "eta": "15分钟",
      "status": "",
      "note": "优先跑pytrends；限流时走Google Search回退；连续3次失败降级该源",
      "fallback": "【P1主源】pytrends / Google Trends API\n【回退条件】限流/无数据/关键词匹配不到\n【P2回退】Google Search 结果数估算搜索量\n  → 用Google搜关键词，统计搜索结果条数作为代理指标\n【P3兜底】手动估算 + 标记\"数据不足\"\n  → 在备注中标注\"Fallback: Google Search\"或\"Manual Estimate\""
    },
    {
      "id": "T02",
      "stage": "早晨(9:15)",
      "name": "Reddit 监控",
      "steps": "1. 访问r/gaming、r/mobilegaming、r/MMORPG、r/ActionGames\n2. 搜索20款目标游戏名称\n3. 统计过去24小时提及次数和新帖数\n4. 记录到表格对应字段\n5. 有新帖讨论时标记\"活跃\"",
      "tools": "Reddit网页 / F5Bot邮件",
      "eta": "10分钟",
      "status": "",
      "note": "优先Reddit API；受限走Discord回退；注意API速率限制",
      "fallback": "【P1主源】Reddit JSON API / F5Bot邮件\n【回退条件】API受限/无新帖/返回空\n【P2回退】Discord公开频道 / 官方论坛\n  → 查目标游戏的Discord服务器#general和#guide频道\n  → 查Reddit旧帖活跃度(过去30天发帖数)\n【P3兜底】手动浏览 Reddit网页版\n  → 备注标注\"Fallback: Discord/Forum\""
    },
    {
      "id": "T03",
      "stage": "早晨(9:25)",
      "name": "X/Twitter 监控",
      "steps": "1. 搜索20款目标游戏英文名的推文\n2. 关注官方账号是否发更新/维护公告\n3. 统计玩家求助帖数量\n4. 记录到表格",
      "tools": "X网页 / Apify / Nitter",
      "eta": "10分钟",
      "status": "",
      "note": "优先Apify/Nitter；不稳定走RSS回退；官方发推=重要信号",
      "fallback": "【P1主源】X/Twitter API / Apify Actor / Nitter\n【回退条件】限流/Nitter不稳定/API门槛高\n【P2回退】RSS订阅 / 厂商官网公告页\n  → 订阅官方Discord公告频道\n  → 爬取官网News/公告页面\n【P3兜底】手动检查官方Twitter/X主页\n  → 备注标注\"Fallback: RSS/Official Site\""
    },
    {
      "id": "T04",
      "stage": "上午(9:35)",
      "name": "国内信号扫描",
      "steps": "1. 刷TapTap新游预约/测试公告\n2. 看B站相关游戏区是否有新攻略视频\n3. 关注NGA/米游社等论坛新版本帖\n4. 更新\"国内攻略成熟度\"评分\n5. 记录到表格",
      "tools": "TapTap / B站 / NGA / 米游社",
      "eta": "15分钟",
      "status": "",
      "note": "重点看结构化内容；页面结构变化时走手动评估回退",
      "fallback": "【P1主源】TapTap / B站 / NGA / 米游社\n【回退条件】页面结构变化/反爬限制\n【P2回退】微博热搜 / 微信公众号 / 抖音游戏区\n  → 搜游戏名+攻略/攻略视频\n【P3兜底】手动搜索 + 社区人工评估\n  → 备注标注\"Fallback: 手动评估\""
    },
    {
      "id": "T05",
      "stage": "上午(9:50)",
      "name": "海外上线状态更新",
      "steps": "1. 检查20款游戏的海外上线状态是否有变化\n2. 查看官网/TapTap海外版/Steam页面\n3. 更新\"海外上线状态\"和\"海外上线日期\"\n4. 如有变化触发通知",
      "tools": "官网 / TapTap / Steam",
      "eta": "10分钟",
      "status": "",
      "note": "状态变化=重要信号；多源交叉验证避免误报",
      "fallback": "【P1主源】官网 / TapTap海外版 / Steam页面\n【回退条件】页面无法访问/结构变化\n【P2回退】Discord官方频道 / 预约页更新\n  → 查Discord公告栏是否更新上线信息\n【P3兜底】手动确认 + 标记待验证\n  → 备注标注\"Fallback: Discord/手动\""
    },
    {
      "id": "T06",
      "stage": "上午(10:00)",
      "name": "信息差评分计算",
      "steps": "1. 根据T01-T05收集的数据更新各字段\n2. 计算每款游戏的\"信息差总分\"\n3. 根据分数更新\"建议动作\"\n4. 按分数排序，找出今日TOP5机会",
      "tools": "Excel公式 / 脚本",
      "eta": "10分钟",
      "status": "",
      "note": "P1全失败时页面显示告警；新游戏需跑满3天再排名",
      "fallback": "【评分逻辑】\n权重: Google Trends 30% + Reddit 20% + X公告 15% + 海外供给不足 15% + 国内攻略成熟 10% + 上线窗口近 10%\n【回退规则】\n  · 单次失败不置0: 保留上次有效值，标记stale\n  · 连续3次失败: 降级该数据源，改用备用源\n  · P1全部失败: 显示\"海外信号不足，建议人工复核\"\n  · 新游戏无历史数据: 给基础分，跑满3天后再排名"
    },
    {
      "id": "T07",
      "stage": "上午(10:10)",
      "name": "竞品网站扫描",
      "steps": "1. Google搜核心英文关键词\n2. 看前10结果有哪些站点\n3. 检查Game8/IGN/Fextralife/Beebom等是否已覆盖\n4. 更新\"海外攻略供给量\"评分\n5. 记录新出现的竞争站点",
      "tools": "Google网页",
      "eta": "15分钟",
      "status": "",
      "note": "前10无大站=窗口期信号；用Bing/DuckDuckGo做备选",
      "fallback": "【P1主源】Google搜索英文关键词\n【回退条件】Google不可用\n【P2回退】Bing搜索 / DuckDuckGo\n  → 用Bing搜同样关键词对比结果\n【P3兜底】手动检查主要攻略站\n  → 直接访问Game8/IGN/Fextralife/Beebom查看"
    },
    {
      "id": "T08",
      "stage": "上午(10:25)",
      "name": "内容机会识别",
      "steps": "1. 查看今日分数最高的5-10款游戏\n2. 对照Sheet3关键词表看哪些词还没覆盖\n3. 列出今日应优先创作的3-5个页面主题\n4. 记录到\"今日写作清单\"",
      "tools": "本表 + 网站后台",
      "eta": "10分钟",
      "status": "",
      "note": "输出今日写作任务清单；结合GSC数据优先高潜词",
      "fallback": "【主源】本表数据 + 网站后台\n【回退条件】后台不可用\n【回退】用Google Search Console数据替代\n  → 查索引量和点击率判断页面表现"
    },
    {
      "id": "T09",
      "stage": "下午",
      "name": "内容创作/更新",
      "steps": "1. 根据T08的写作清单创作英文攻略页面\n2. 优先做：新手攻略 > 数据表 > 角色/武器介绍 > 任务攻略\n3. 每页包含：标题(含关键词) + 正文 + 截图 + FAQ\n4. 发布并记录URL",
      "tools": "CMS/建站后台",
      "eta": "60-120分钟",
      "status": "",
      "note": "核心工作：把国内信息差转化为英文内容",
      "fallback": "【主源】CMS/建站后台\n【说明】此步骤为人工创作，无数据源回退需求\n【注意】优先做分数最高的游戏对应关键词页面"
    },
    {
      "id": "T10",
      "stage": "傍晚(17:00)",
      "name": "SEO检查与提交",
      "steps": "1. 检查今日发布页面的Title Tag、Meta Description\n2. 确认关键词自然出现在H1/H2中\n3. 用Google Search Console提交新URL\n4. 更新\"是否已覆盖\"状态",
      "tools": "Google Search Console",
      "eta": "10分钟",
      "status": "",
      "note": "确保新页面被快速收录；GSC数据有延迟属正常",
      "fallback": "【P1主源】Google Search Console\n【回退条件】GSC数据延迟(通常2-3天)\n【P2回退】网站自建分析后台\n  → 用GA4/自建埋点数据辅助判断\n【P3兜底】手动检查页面收录情况\n  → site:yourdomain.com 关键词 搜索"
    },
    {
      "id": "T11",
      "stage": "每周一次(周日)",
      "name": "周报汇总",
      "steps": "1. 汇总本周所有分数变化\n2. 标记新出现的机会游戏\n3. 标记已错过的窗口\n4. 更新目标游戏清单(新增/淘汰)\n5. 调整关键词清单",
      "tools": "本表",
      "eta": "30分钟",
      "status": "",
      "note": "每周日做一次；特别标注走回退源的游戏和数据质量",
      "fallback": "【主源】本表数据\n【说明】周报汇总，综合本周所有数据源结果\n【注意】特别标注哪些游戏走了回退源，评估数据质量"
    },
    {
      "id": "T12",
      "stage": "按需",
      "name": "突发信号响应",
      "steps": "1. 收到通知时立即检查\n2. 评估是否需要紧急发文\n3. 如确认机会，跳过T09直接创作\n4. 发文后更新表格状态",
      "tools": "通知渠道 + CMS",
      "eta": "30-60分钟",
      "status": "",
      "note": "突发信号可能是定档/测试/版本更新；优先级最高",
      "fallback": "【主源】通知渠道(Telegram/邮件/飞书)\n【回退条件】通知渠道不可用\n【P2回退】定期检查邮件/社交媒体\n  → 主动查看官方Twitter/Discord是否有突发公告\n【注意】突发信号优先级最高，可跳过前面步骤直接执行"
    }
  ],
  "automation": [
    {
      "module": "Google Trends拉取",
      "plan": "Python + pytrends库",
      "tool": "pytrends",
      "difficulty": "中",
      "priority": "P0",
      "desc": "每日定时跑脚本，输出CSV写入表格",
      "source_priority": "P1(最高)",
      "fallback_target": "Google Search结果数",
      "failure_policy": "单次失败保留上值+标stale；3次失败降级；限流等1小时重试"
    },
    {
      "module": "Reddit监控",
      "plan": "Python + praw库 或 F5Bot邮件",
      "tool": "praw / F5Bot",
      "difficulty": "中",
      "priority": "P0",
      "desc": "订阅子版块关键词，新帖邮件通知",
      "source_priority": "P1(最高)",
      "fallback_target": "Discord频道/F5Bot",
      "failure_policy": "API受限走Discord公开接口；邮件通知兜底"
    },
    {
      "module": "X/Twitter监控",
      "plan": "Apify Actor 或 自建Nitter",
      "tool": "Apify",
      "difficulty": "中高",
      "priority": "P1",
      "desc": "官方API门槛高，Apify最省事",
      "source_priority": "P1(最高)",
      "fallback_target": "RSS订阅/官网公告",
      "failure_policy": "Nitter不稳定走RSS；无RSS时手动检查"
    },
    {
      "module": "国内信号扫描",
      "plan": "Python + requests + BeautifulSoup",
      "tool": "requests",
      "difficulty": "中",
      "priority": "P1",
      "desc": "爬TapTap/B站列表页，正则匹配游戏名",
      "source_priority": "P2(兜底)",
      "fallback_target": "微博/公众号/抖音",
      "failure_policy": "反爬时走手动搜索；页面结构变化时更新正则"
    },
    {
      "module": "评分计算",
      "plan": "Excel公式 或 Python pandas",
      "tool": "Excel/Python",
      "difficulty": "低",
      "priority": "P0",
      "desc": "最简单：Excel公式自动算",
      "source_priority": "P0(核心)",
      "fallback_target": "无(本地计算)",
      "failure_policy": "数据不足时用上次有效值+权重衰减；P1全失败告警"
    },
    {
      "module": "页面自动生成",
      "plan": "Python + Jinja2 模板引擎",
      "tool": "Jinja2",
      "difficulty": "中高",
      "priority": "P2",
      "desc": "数据驱动生成静态HTML页",
      "source_priority": "P2(兜底)",
      "fallback_target": "手动更新/模板",
      "failure_policy": "数据源不可用时生成占位页+标注\"待更新\""
    },
    {
      "module": "调度器",
      "plan": "GitHub Actions Cron 或 Linux crontab",
      "tool": "GitHub Actions",
      "difficulty": "低",
      "priority": "P0",
      "desc": "每日9:00北京时间自动触发",
      "source_priority": "P0(核心)",
      "fallback_target": "备用调度器",
      "failure_policy": "主调度器失败走备用crontab；失败重试3次"
    },
    {
      "module": "通知推送",
      "plan": "Telegram Bot / 邮件 / 飞书Webhook",
      "tool": "Telegram Bot",
      "difficulty": "低",
      "priority": "P1",
      "desc": "分数>80或状态变化时推送",
      "source_priority": "P1(重要)",
      "fallback_target": "备用通知渠道",
      "failure_policy": "Telegram失败走邮件；邮件失败走飞书"
    },
    {
      "module": "数据存储",
      "plan": "SQLite(轻量) 或 Supabase(云端)",
      "tool": "SQLite",
      "difficulty": "低",
      "priority": "P0",
      "desc": "MVP阶段SQLite足够",
      "source_priority": "P0(核心)",
      "fallback_target": "备用数据库",
      "failure_policy": "SQLite损坏走备份恢复；Supabase失败写本地"
    },
    {
      "module": "建站前端",
      "plan": "Next.js / Astro / Hugo",
      "tool": "Next.js",
      "difficulty": "中",
      "priority": "P1",
      "desc": "静态生成+每日重建",
      "source_priority": "P2(展示)",
      "fallback_target": "静态占位页",
      "failure_policy": "构建失败保留上次成功版本；CI失败发通知"
    }
  ],
  "roadmap": [
    {
      "stage": "第1周：基础设施",
      "time": "Day1-7",
      "goal": "搭建数据采集管道",
      "tasks": "1. 注册域名+建站(Next.js/Astro)\n2. 搭建SQLite数据库\n3. 写Google Trends抓取脚本\n4. 写Reddit监控脚本\n5. 配置GitHub Actions定时任务\n6. 搭建Telegram通知Bot",
      "deliverable": "可运行的每日采集脚本 + 基础站点",
      "acceptance": "脚本能成功跑完一次全流程，数据写入数据库"
    },
    {
      "stage": "第2周：数据填充",
      "time": "Day8-14",
      "goal": "完成20款游戏+50关键词初始化",
      "tasks": "1. 手动填入20款游戏基础信息\n2. 填入50个关键词\n3. 手动跑一次完整评分\n4. 验证评分逻辑正确性\n5. 写10篇基础攻略页(针对P0游戏)",
      "deliverable": "完整数据表 + 10篇基础内容",
      "acceptance": "表中有20行游戏数据+50行关键词数据，评分正常"
    },
    {
      "stage": "第3周：自动化运行",
      "time": "Day15-21",
      "goal": "每日自动跑+人工补充内容",
      "tasks": "1. 每日9点自动采集运行\n2. 人工查看TOP5机会\n3. 每日创作2-3篇攻略\n4. 每周日做周报汇总\n5. 根据数据调整关键词",
      "deliverable": "7天运行日志 + 15-20篇新内容",
      "acceptance": "自动采集无报错运行7天，内容持续增长"
    },
    {
      "stage": "第4周：优化迭代",
      "time": "Day22-30",
      "goal": "看数据调策略",
      "tasks": "1. 分析Google Analytics流量数据\n2. 看哪些页面有搜索流量\n3. 淘汰低效关键词，新增高潜词\n4. 优化已有页面SEO\n5. 评估是否扩展第2款游戏",
      "deliverable": "优化后的站点 + 月度报告",
      "acceptance": "有明确流量增长或至少稳定收录"
    },
    {
      "stage": "第2个月：扩展",
      "time": "Month2",
      "goal": "扩展第二战场",
      "tasks": "1. 根据第1个月数据选第二款游戏\n2. 扩展关键词到100个\n3. 扩展游戏监控到30款\n4. 优化变现(广告/联盟)\n5. 考虑增加自动发文",
      "deliverable": "扩展后的站点 + 变现接入",
      "acceptance": "两个游戏方向都有稳定流量"
    }
  ],
  "fallback_sources": [
    {
      "priority": "P1(最高)",
      "source": "Google Trends",
      "purpose": "海外搜索热度变化",
      "condition": "限流/无数据/关键词匹配不到",
      "target": "Google Search结果数估算",
      "weight": "30%",
      "policy": "单次失败保留上值+标stale；3次失败降级；限流等1小时重试后标记Fallback"
    },
    {
      "priority": "P1(最高)",
      "source": "Reddit",
      "purpose": "玩家讨论、问题类型",
      "condition": "无新帖/API受限/返回空",
      "target": "Discord公开频道/F5Bot",
      "weight": "20%",
      "policy": "API受限走Discord公开接口；邮件通知兜底；标记Fallback: Reddit"
    },
    {
      "priority": "P1(最高)",
      "source": "X/Twitter",
      "purpose": "官方公告、测试、维护、上线",
      "condition": "限流/Nitter不稳定/API门槛高",
      "target": "RSS订阅/厂商官网公告",
      "weight": "15%",
      "policy": "Nitter不稳定走RSS；无RSS时手动检查主页；标记Fallback: X"
    },
    {
      "priority": "P2(兜底)",
      "source": "Google Search结果数",
      "purpose": "英文供给是否不足(代理指标)",
      "condition": "Google不可用",
      "target": "Bing/DuckDuckGo",
      "weight": "15%",
      "policy": "备选搜索引擎；仅作为海外供给缺口代理指标"
    },
    {
      "priority": "P2(兜底)",
      "source": "Discord/官方社区",
      "purpose": "预约、测试、开服状态",
      "condition": "公开频道不可用",
      "target": "厂商官网/Steam页面",
      "weight": "—",
      "policy": "交叉验证用；不单独作为热度信号"
    },
    {
      "priority": "P2(兜底)",
      "source": "厂商官网/预约页/Steam",
      "purpose": "上线状态、版本更新",
      "condition": "页面结构变化需维护",
      "target": "Discord公告频道",
      "weight": "—",
      "policy": "状态确认用；页面爬取失败时手动更新"
    },
    {
      "priority": "P3(补充)",
      "source": "Sensor Tower/游戏社日历",
      "purpose": "新品发现、下载/收入信号",
      "condition": "非实时/需付费",
      "target": "手动搜索+行业报告",
      "weight": "—",
      "policy": "仅用于发现新游戏；不用于实时热度判断"
    },
    {
      "priority": "P3(补充)",
      "source": "TapTap/B站/微博/公众号",
      "purpose": "国内攻略成熟度",
      "condition": "页面反爬/结构变化",
      "target": "手动搜索+社区评估",
      "weight": "—",
      "policy": "作为国内供给信号；结构化内容存在=可翻译素材多"
    },
    {
      "priority": "P3(补充)",
      "source": "RSS/新闻聚合",
      "purpose": "官方公告兜底",
      "condition": "信息较泛/延迟高",
      "target": "手动检查",
      "weight": "—",
      "policy": "最后兜底源；信息泛但覆盖广"
    }
  ],
  "fallback_rules": [
    "1. 单次失败不直接置0：保留上一次有效值，但标记为stale(数据陈旧)",
    "2. 连续3次失败：降级该数据源，后续不再优先调用，改用备用源",
    "3. P1全部失败( Trends+Reddit+X均不可用)：页面显示\"今日海外信号不足，建议人工复核\"",
    "4. 新游戏没有历史数据：先给基础分(20分)，等跑满3天有趋势数据后再参与排名",
    "5. 回退源数据用黄色标签标注：Fallback: Google Search / Fallback: Discord / Fallback: RSS",
    "6. 每日运行日志记录：哪些游戏走了主源，哪些走了备用源，方便评估数据质量"
  ],
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
  "failure_policy": {
    "keep_last_value_on_single_failure": true,
    "degrade_after_consecutive_failures": 3,
    "retry_after_rate_limit_minutes": 60,
    "p1_all_dead_alert": "今日海外信号不足，建议人工复核"
  },
  "sources": [
    {
      "key": "trends",
      "priority": "P1",
      "label": "Google Trends",
      "weight_key": "trends_rise",
      "signal": "海外搜索热度变化",
      "fallback": "Google Search 结果数估算（P2）",
      "enabled": true,
      "mode": "optional-pytrends"
    },
    {
      "key": "reddit",
      "priority": "P1",
      "label": "Reddit",
      "weight_key": "reddit",
      "signal": "玩家讨论、问题类型",
      "fallback": "Discord 公开频道 / F5Bot（P2）",
      "enabled": true,
      "mode": "public-json-api"
    },
    {
      "key": "x_twitter",
      "priority": "P1",
      "label": "X/Twitter",
      "weight_key": "x_official",
      "signal": "官方公告、测试、维护、上线",
      "fallback": "RSS 订阅 / 厂商官网公告（P2）",
      "enabled": true,
      "mode": "rss-fallback（Bing News RSS，免凭据；P1 不可达时的 P2 回退）"
    },
    {
      "key": "search_count",
      "priority": "P2",
      "label": "Google Search 结果数",
      "weight_key": "supply_gap",
      "signal": "英文供给是否不足（代理指标）",
      "fallback": "Bing / DuckDuckGo（P2 备选）",
      "enabled": false,
      "mode": "html-scrape（默认关闭：结果数抓取不稳定）"
    },
    {
      "key": "official",
      "priority": "P2",
      "label": "厂商官网 / 预约页 / Steam",
      "weight_key": null,
      "signal": "上线状态、版本更新",
      "fallback": "Discord 公告频道（P2）",
      "enabled": true,
      "mode": "manual-baseline"
    },
    {
      "key": "cn_signal",
      "priority": "P3",
      "label": "TapTap / B站 / 微博 / 公众号",
      "weight_key": "cn_maturity",
      "signal": "国内攻略成熟度",
      "fallback": "手动搜索 + 社区评估",
      "enabled": true,
      "mode": "manual-baseline"
    },
    {
      "key": "rss",
      "priority": "P3",
      "label": "RSS / 新闻聚合",
      "weight_key": null,
      "signal": "官方公告兜底",
      "fallback": "手动检查",
      "enabled": true,
      "mode": "bing-news-rss（免凭据，复用 P2 新闻聚合抓取）"
    },
    {
      "key": "reddit_guides",
      "priority": "P2",
      "label": "Reddit 攻略贴（近一年）",
      "weight_key": "supply_gap",
      "signal": "海外攻略供给量（自动）",
      "fallback": "人工 gap_level 评估",
      "enabled": true,
      "mode": "reddit-rss 搜索（周更 + 款级缓存）"
    },
    {
      "key": "cn_media_youxichaguan",
      "priority": "P3",
      "label": "游戏茶馆 RSS",
      "weight_key": null,
      "signal": "国内媒体报道提及（近 7 日）",
      "fallback": "无（仅展示，不参与评分）",
      "enabled": true,
      "mode": "cn-rss（仅展示，不参与评分）"
    },
    {
      "key": "cn_media_chuapp",
      "priority": "P3",
      "label": "触乐 RSS",
      "weight_key": null,
      "signal": "国内媒体报道提及（近 7 日）",
      "fallback": "无（仅展示，不参与评分）",
      "enabled": true,
      "mode": "cn-rss（仅展示，不参与评分）"
    }
  ],
  "health": [
    {
      "key": "trends",
      "label": "Google Trends",
      "priority": "P1",
      "enabled": true,
      "manual": false,
      "signal": "海外搜索热度变化",
      "fallback": "Google Search 结果数估算（P2）",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "正常",
      "last_success_at": "2026-10-29 10:23:56",
      "last_attempt_at": "2026-10-29 10:23:56",
      "last_error": null
    },
    {
      "key": "reddit",
      "label": "Reddit",
      "priority": "P1",
      "enabled": true,
      "manual": false,
      "signal": "玩家讨论、问题类型",
      "fallback": "Discord 公开频道 / F5Bot（P2）",
      "consecutive_failures": 1,
      "degraded": false,
      "stale": true,
      "status": "失败 1 次（保留上值 · stale）",
      "last_success_at": "2026-10-29 10:23:23",
      "last_attempt_at": "2026-10-29 10:23:54",
      "last_error": "Reddit: HTTP 429"
    },
    {
      "key": "x_twitter",
      "label": "X/Twitter",
      "priority": "P1",
      "enabled": true,
      "manual": false,
      "signal": "官方公告、测试、维护、上线",
      "fallback": "RSS 订阅 / 厂商官网公告（P2）",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "正常",
      "last_success_at": "2026-10-29 10:23:56",
      "last_attempt_at": "2026-10-29 10:23:56",
      "last_error": null
    },
    {
      "key": "search_count",
      "label": "Google Search 结果数",
      "priority": "P2",
      "enabled": false,
      "manual": false,
      "signal": "英文供给是否不足（代理指标）",
      "fallback": "Bing / DuckDuckGo（P2 备选）",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "未启用",
      "last_success_at": null,
      "last_attempt_at": null,
      "last_error": null
    },
    {
      "key": "official",
      "label": "厂商官网 / 预约页 / Steam",
      "priority": "P2",
      "enabled": true,
      "manual": true,
      "signal": "上线状态、版本更新",
      "fallback": "Discord 公告频道（P2）",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "人工基线 · 待自动化",
      "last_success_at": null,
      "last_attempt_at": null,
      "last_error": null
    },
    {
      "key": "cn_signal",
      "label": "TapTap / B站 / 微博 / 公众号",
      "priority": "P3",
      "enabled": true,
      "manual": true,
      "signal": "国内攻略成熟度",
      "fallback": "手动搜索 + 社区评估",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "人工基线 · 待自动化",
      "last_success_at": null,
      "last_attempt_at": null,
      "last_error": null
    },
    {
      "key": "rss",
      "label": "RSS / 新闻聚合",
      "priority": "P3",
      "enabled": true,
      "manual": false,
      "signal": "官方公告兜底",
      "fallback": "手动检查",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "正常",
      "last_success_at": "2026-10-29 10:23:56",
      "last_attempt_at": "2026-10-29 10:23:56",
      "last_error": null
    },
    {
      "key": "reddit_guides",
      "label": "Reddit 攻略贴（近一年）",
      "priority": "P2",
      "enabled": true,
      "manual": false,
      "signal": "海外攻略供给量（自动）",
      "fallback": "人工 gap_level 评估",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "正常",
      "last_success_at": "2026-10-23 12:37:14",
      "last_attempt_at": "2026-10-23 12:37:14",
      "last_error": null
    },
    {
      "key": "cn_media_youxichaguan",
      "label": "游戏茶馆 RSS",
      "priority": "P3",
      "enabled": true,
      "manual": false,
      "signal": "国内媒体报道提及（近 7 日）",
      "fallback": "无（仅展示，不参与评分）",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "正常",
      "last_success_at": "2026-10-29 10:24:02",
      "last_attempt_at": "2026-10-29 10:24:02",
      "last_error": null
    },
    {
      "key": "cn_media_chuapp",
      "label": "触乐 RSS",
      "priority": "P3",
      "enabled": true,
      "manual": false,
      "signal": "国内媒体报道提及（近 7 日）",
      "fallback": "无（仅展示，不参与评分）",
      "consecutive_failures": 0,
      "degraded": false,
      "stale": false,
      "status": "正常",
      "last_success_at": "2026-10-29 10:24:02",
      "last_attempt_at": "2026-10-29 10:24:02",
      "last_error": null
    }
  ],
  "run_log": {
    "meta": {
      "site": "xinxicha",
      "title": "中国游戏厂商海外信息差监控",
      "subtitle": "20 款国产游戏 × 50 个英文 SEO 关键词 · 每日巡检 · 含 P1→P2→P3 回退逻辑",
      "schema_version": 1,
      "generated_at_cst": "2026-10-29 10:24:02",
      "data_mode": "live",
      "spec_sha": "9cd00c7db5c7eaadc02f7596ffc2cb436a7f30f71b359e7206365c9016898d5d",
      "network": false,
      "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
      "alert": null,
      "duration_sec": 1718.2,
      "counts": {
        "days": 12,
        "games_logged": 30
      },
      "trends_anchor": {
        "enabled": true,
        "low": "mobile game",
        "high": "video games",
        "min_span": 15,
        "note": "搜索水位（展示用，不参与评分；另出「水位名次」列以保证每款可区分）：Google Trends 每批都把本批最高值归一成 100（整数），批内分辨率下限＝最高词的 1%，故跨批次、跨游戏比较必须靠同批锚点校准。做法＝把「游戏词 + 冷锚点 low + 热锚点 high」放进同一批请求（pytrends 单批上限 5 词，故每批装 collection.trends_batch_size 个游戏词 + 两个锚点；2026-10-20 起由 prefetch_trends 批量预取，请求数由每款 1 次降到约 N/批），按 7 日序列均值做双锚折线定标：冷锚以下用「50 × 游戏均值 ÷ 冷锚均值」铺在 0-50，冷锚到热锚之间用「50 + 50 ×（游戏均值 − 冷锚均值）÷（热锚均值 − 冷锚均值）」映射到 50-100，越界不截断（高于热锚保留 >100 并注明）。用折线而非单段线性的原因：单段线性会把所有低于冷锚的款统一压成 0（run #22 实测 8 款挤 0.0、8 款挤 100.0）。冷锚均值必须 > 0 才能充当 50 分界：批内被压成 0 的锚点会让折线退化成「所有游戏都落在 50.0」的假分界（2026-10-20 run #23 实测 13 款并列 50.0），故冷锚均值 ≤ 0 时自动降级为「单锚点比例定标」（优先热锚）；热锚缺失、冷锚缺失、两锚均值跨度 < min_span 同样降级。取不到留空「—」并写明原因，不做 stale 兜底（逐款水位各异，借源级上次值会张冠李戴）。刻意不另发锚点批次：2026-10-20 实测请求数 21→42 会撞 Google 窗口配额，把占 30% 权重的变化率分项打到 13/21 款 stale。量级选型（run #23 实测教训）：热锚若比所有游戏都热，就会成为批内归一化基准、把弱游戏的相对值压到整数下限（当轮 13 款 game_mean=0、trends_rise stale 14/21），故把 low 由 gacha game 上调为 mobile game，让冷锚均值稳定 > 0、弱游戏不再落进 50.0 假分界；high= gaming 量级过大、自己反而成为批内归一化基准（run #24 实测热锚批内均值 40.1、冷锚仅 2.4），把弱游戏的相对值压到整数下限，连带其 7 日首点为 0 使变化率不可算 —— trends_rise（占 30% 权重）stale 随锚点量级上升（无锚点 4/21 → 单锚同批 6/21 → 双锚 gaming 14/21），即「为展示水位塞进同批的锚点词」正在损伤评分链路；故 high 由 gaming 下调为 video games（量级更接近游戏群，备选 Steam），代价是冷/热跨度收窄、部分强游戏可能越过热锚（已注明不截断，run #24 后待 CI 复核）。批内分辨率下限是硬约束：低于「本批最高词 1%」的款在数值上必然并列 0，差异由「水位名次」列的次键（Trends 7d → Reddit 24h → 游戏名）体现。"
      },
      "scoring_note": "2026-10-22 由规格表的 30/20/15/15/10/10 调整为 20/15/15/20/15/15：业务重心从「海外声量」转向「可下手的机会窗口」，人工基线三项合计由 35% 提到 50%，纯声量两项由 50% 降到 35%。上线窗口同期由「7 天内最高」的阶梯改为折线：提前 80 天是关键词占位峰值（100 分），越临近上线竞争越饱和、逐段递减，上线 60 天后归零（原实现 >90 天仍给 40 分，与「长期埋伏最低」文案不符）。离线用当日在库 29 款复核：总分区间 20–62.5 → 21.5–68.8，「做数据表占位」5→7 款，前四名不变；代价是人工字段仅 5 档、约四分之一款有确定档期，唯一取值数 24→22，区分度略降。规格表「MVP字段表」F13 的 5×20% 旧公式仍为废弃状态",
      "days_tracked": 12
    },
    "days": [
      {
        "date": "2026-10-18",
        "runs": [
          {
            "at": "2026-10-18 17:58:14",
            "network": false,
            "probe_detail": "不可达（3s 探测超时被拒）",
            "data_mode": "fallback",
            "duration_sec": 6.1,
            "alert": "今日海外信号不足，建议人工复核",
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "x_twitter": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 18:11:03",
            "network": false,
            "probe_detail": "--offline 强制离线",
            "data_mode": "fallback",
            "duration_sec": 0.0,
            "alert": "今日海外信号不足，建议人工复核",
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "x_twitter": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 18:28:28",
            "network": false,
            "probe_detail": "--offline 强制离线",
            "data_mode": "fallback",
            "duration_sec": 0.0,
            "alert": "今日海外信号不足，建议人工复核",
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "x_twitter": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "未配置 X/Twitter 凭据（Nitter 已大面积失效）"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 18:35:52",
            "network": false,
            "probe_detail": "--offline 强制离线",
            "data_mode": "fallback",
            "duration_sec": 0.0,
            "alert": "今日海外信号不足，建议人工复核",
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "x_twitter": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Fallback: RSS/厂商官网公告"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "网络不可达，跳过调用"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 20:31:58",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 4.9,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 20:48:04",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 0.4,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "P1 主源（未安装 pytrends）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "未安装 pytrends（可选依赖）：ModuleNotFoundError",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 21:28:18",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 0.6,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 20
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "网络不可达，跳过调用",
                  "reddit": "网络不可达，跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 21:34:08",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 11.9,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 16,
                "failed": 4,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 0,
                "failed": 20,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Discord/F5Bot",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 403",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 21:43:58",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 16.4,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 16,
                "failed": 4,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 1,
                "failed": 19,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: .json/合规UA:HTTP 403 | .rss/合规UA:HTTP 429",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 21:57:23",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 70.2,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 15,
                "failed": 5,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 3,
                "failed": 17,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 22:35:51",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1275.3,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 15,
                "failed": 5,
                "skipped": 0
              },
              "reddit": {
                "attempted": 15,
                "ok": 14,
                "failed": 1,
                "skipped": 5
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-18 23:03:40",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 856.0,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 16,
                "failed": 4,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 24.5,
          "phantom-blade-zero": 20.0,
          "roco-kingdom-world": 23.5,
          "star-valley": 21.0,
          "project-origin": 20.0,
          "project-mugen-neverness": 20.0,
          "naruto-mobile-global": 26.0,
          "the-outcast": 21.0,
          "where-winds-meet": 20.0,
          "last-asylum-plague": 20.0,
          "clash-of-critters": 20.0,
          "flamb-merge-cook": 20.0,
          "tasty-travels-merge-game": 20.0,
          "genshin-impact": 20.0,
          "honkai-star-rail": 20.0,
          "wuthering-waves": 20.0,
          "honor-of-kings": 20.0,
          "arknights": 20.0,
          "afk-journey": 20.0,
          "rise-of-kingdoms": 20.0
        }
      },
      {
        "date": "2026-10-19",
        "runs": [
          {
            "at": "2026-10-19 00:26:08",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 615.6,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 15,
                "failed": 5,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-19 01:26:24",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 616.0,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 16,
                "failed": 4,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-19 03:24:36",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 615.7,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 14,
                "failed": 6,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-19 09:46:33",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 629.7,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 13,
                "failed": 7,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 2 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 4 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-19 21:03:00",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1682.9,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 13,
                "failed": 7,
                "skipped": 0
              },
              "reddit": {
                "attempted": 19,
                "ok": 19,
                "failed": 0,
                "skipped": 1
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 2 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 4 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 无有效数据",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-19 21:16:25",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 611.5,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 13,
                "failed": 7,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内非零数据点 3 个，少于 3 个不计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 2 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内非零数据点 1 个，少于 3 个不计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 4 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内非零数据点 1 个，少于 3 个不计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内非零数据点 0 个，少于 3 个不计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 无相关新闻"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-19 22:18:23",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 619.3,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 15,
                "failed": 5,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内有效数据点不足 2 个）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 33.5,
          "phantom-blade-zero": 27.2,
          "roco-kingdom-world": 32.5,
          "star-valley": 30.0,
          "project-origin": 27.5,
          "project-mugen-neverness": 28.0,
          "naruto-mobile-global": 35.0,
          "the-outcast": 34.5,
          "where-winds-meet": 25.8,
          "last-asylum-plague": 20.0,
          "clash-of-critters": 20.0,
          "flamb-merge-cook": 20.0,
          "tasty-travels-merge-game": 20.0,
          "genshin-impact": 24.5,
          "honkai-star-rail": 38.0,
          "wuthering-waves": 20.0,
          "honor-of-kings": 20.0,
          "arknights": 38.0,
          "afk-journey": 20.0,
          "rise-of-kingdoms": 20.0
        }
      },
      {
        "date": "2026-10-20",
        "runs": [
          {
            "at": "2026-10-20 01:01:59",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 614.8,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 13,
                "failed": 7,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内有效数据点不足 2 个）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 02:05:43",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 614.0,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 14,
                "failed": 6,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 02:42:15",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 611.1,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 20,
                "ok": 8,
                "failed": 12,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内有效数据点不足 2 个）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 03:19:46",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1687.1,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 8,
                "failed": 13,
                "skipped": 0
              },
              "reddit": {
                "attempted": 19,
                "ok": 19,
                "failed": 0,
                "skipped": 2
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 09:47:07",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 648.5,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 17,
                "failed": 4,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 10:53:07",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 683.0,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 8,
                "failed": 13,
                "skipped": 0
              },
              "trends_level": {
                "attempted": 10,
                "ok": 9,
                "failed": 1,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日内有效数据点不足 2 个）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 11:29:29",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 639.8,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 15,
                "failed": 6,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 12:03:35",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 640.6,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 7,
                "failed": 14,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 12:25:10",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 640.4,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 7,
                "failed": 14,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 12:53:11",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 646.1,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 13,
                "failed": 8,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 14:06:07",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 638.9,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 15,
                "failed": 6,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 16:57:01",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1683.1,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 13,
                "failed": 8,
                "skipped": 0
              },
              "reddit": {
                "attempted": 19,
                "ok": 19,
                "failed": 0,
                "skipped": 2
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 17:39:27",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 638.5,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 17,
                "failed": 4,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日窗口首点无搜索量，无法计算变化率）",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 19:12:06",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 636.9,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 12,
                "failed": 9,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-20 20:23:02",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 640.8,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 0,
                "failed": 21,
                "skipped": 0
              },
              "reddit": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 59.5,
          "phantom-blade-zero": 53.2,
          "roco-kingdom-world": 58.5,
          "star-valley": 56.0,
          "project-origin": 53.5,
          "project-mugen-neverness": 52.0,
          "naruto-mobile-global": 59.5,
          "the-outcast": 54.5,
          "where-winds-meet": 46.8,
          "last-asylum-plague": 43.2,
          "clash-of-critters": 32.8,
          "flamb-merge-cook": 41.2,
          "tasty-travels-merge-game": 41.8,
          "genshin-impact": 47.0,
          "honkai-star-rail": 47.0,
          "wuthering-waves": 44.5,
          "honor-of-kings": 44.5,
          "arknights": 47.0,
          "afk-journey": 35.0,
          "rise-of-kingdoms": 47.0,
          "hunger": 51.0
        }
      },
      {
        "date": "2026-10-21",
        "runs": [
          {
            "at": "2026-10-21 10:05:23",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1699.4,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 7,
                "failed": 14,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 1
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 59.5,
          "phantom-blade-zero": 53.2,
          "roco-kingdom-world": 58.5,
          "star-valley": 49.5,
          "project-origin": 53.5,
          "project-mugen-neverness": 52.0,
          "naruto-mobile-global": 59.5,
          "the-outcast": 59.0,
          "where-winds-meet": 46.8,
          "last-asylum-plague": 43.2,
          "clash-of-critters": 32.8,
          "flamb-merge-cook": 39.8,
          "tasty-travels-merge-game": 41.8,
          "genshin-impact": 51.5,
          "honkai-star-rail": 54.5,
          "wuthering-waves": 53.5,
          "honor-of-kings": 49.0,
          "arknights": 47.0,
          "afk-journey": 36.5,
          "rise-of-kingdoms": 47.0,
          "hunger": 51.0
        }
      },
      {
        "date": "2026-10-22",
        "runs": [
          {
            "at": "2026-10-22 10:05:17",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1710.3,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 21,
                "ok": 12,
                "failed": 9,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 1
              },
              "x_twitter": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 21,
                "ok": 21,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-22 15:57:43",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1370.5,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 29,
                "ok": 9,
                "failed": 20,
                "skipped": 0
              },
              "reddit": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 62.5,
          "phantom-blade-zero": 60.8,
          "roco-kingdom-world": 58.5,
          "star-valley": 60.5,
          "project-origin": 53.5,
          "project-mugen-neverness": 52.0,
          "naruto-mobile-global": 61.0,
          "the-outcast": 56.0,
          "where-winds-meet": 26.8,
          "last-asylum-plague": 43.2,
          "clash-of-critters": 37.2,
          "flamb-merge-cook": 39.8,
          "tasty-travels-merge-game": 43.2,
          "genshin-impact": 51.5,
          "honkai-star-rail": 50.0,
          "wuthering-waves": 49.0,
          "honor-of-kings": 49.0,
          "arknights": 47.0,
          "afk-journey": 36.5,
          "rise-of-kingdoms": 51.5,
          "hunger": 55.5,
          "sword-x-staff": 44.5,
          "wenjian-changsheng": 58.5,
          "tides-of-annihilation": 48.0,
          "arknights-endfield": 43.0,
          "azur-promilia": 43.5,
          "honor-of-kings-world": 61.0,
          "lost-castle-2": 48.2,
          "renjian-yixiang": 20.0
        }
      },
      {
        "date": "2026-10-23",
        "runs": [
          {
            "at": "2026-10-23 01:08:56",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1713.3,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 29,
                "ok": 12,
                "failed": 17,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 19,
                "failed": 1,
                "skipped": 9
              },
              "x_twitter": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-23 10:04:54",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1488.2,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 29,
                "ok": 13,
                "failed": 16,
                "skipped": 0
              },
              "reddit": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 29,
                "ok": 29,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-23 10:23:12",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 915.7,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 14,
                "failed": 16,
                "skipped": 0
              },
              "reddit": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-23 12:37:14",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "fallback",
            "duration_sec": 1824.0,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 30
              },
              "reddit": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 30
              },
              "x_twitter": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 30
              },
              "rss": {
                "attempted": 0,
                "ok": 0,
                "failed": 0,
                "skipped": 30
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "X（stale）"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Fallback: X（沿用上次值）"
                ],
                "detail": {
                  "trends": "预算不足，跳过调用",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "预算不足，跳过调用"
                }
              }
            ]
          },
          {
            "at": "2026-10-23 13:23:04",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1709.8,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 14,
                "failed": 16,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 10
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-23 13:45:21",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 914.6,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 13,
                "failed": 17,
                "skipped": 0
              },
              "reddit": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-23 19:23:10",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1157.4,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 13,
                "failed": 17,
                "skipped": 0
              },
              "reddit": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 55.8,
          "phantom-blade-zero": 84.8,
          "roco-kingdom-world": 62.8,
          "star-valley": 59.0,
          "project-origin": 47.0,
          "project-mugen-neverness": 63.1,
          "naruto-mobile-global": 60.5,
          "the-outcast": 49.5,
          "where-winds-meet": 38.2,
          "last-asylum-plague": 41.8,
          "clash-of-critters": 27.0,
          "flamb-merge-cook": 50.8,
          "tasty-travels-merge-game": 53.8,
          "genshin-impact": 45.0,
          "honkai-star-rail": 54.5,
          "wuthering-waves": 48.2,
          "honor-of-kings": 44.2,
          "arknights": 45.0,
          "afk-journey": 37.0,
          "rise-of-kingdoms": 53.0,
          "hunger": 46.5,
          "sword-x-staff": 39.8,
          "wenjian-changsheng": 62.8,
          "tides-of-annihilation": 47.8,
          "arknights-endfield": 42.0,
          "azur-promilia": 47.5,
          "honor-of-kings-world": 54.5,
          "lost-castle-2": 61.2,
          "renjian-yixiang": 47.0,
          "aniimo": 31.5
        }
      },
      {
        "date": "2026-10-24",
        "runs": [
          {
            "at": "2026-10-24 10:09:36",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1689.1,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 14,
                "failed": 16,
                "skipped": 0
              },
              "reddit": {
                "attempted": 19,
                "ok": 19,
                "failed": 0,
                "skipped": 11
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 55.6,
          "phantom-blade-zero": 83.1,
          "roco-kingdom-world": 62.8,
          "star-valley": 59.0,
          "project-origin": 47.0,
          "project-mugen-neverness": 61.7,
          "naruto-mobile-global": 60.5,
          "the-outcast": 51.0,
          "where-winds-meet": 41.2,
          "last-asylum-plague": 41.8,
          "clash-of-critters": 27.0,
          "flamb-merge-cook": 50.8,
          "tasty-travels-merge-game": 53.8,
          "genshin-impact": 48.0,
          "honkai-star-rail": 54.5,
          "wuthering-waves": 48.2,
          "honor-of-kings": 44.2,
          "arknights": 45.0,
          "afk-journey": 39.2,
          "rise-of-kingdoms": 53.0,
          "hunger": 46.5,
          "sword-x-staff": 41.2,
          "wenjian-changsheng": 62.8,
          "tides-of-annihilation": 47.8,
          "arknights-endfield": 42.0,
          "azur-promilia": 49.0,
          "honor-of-kings-world": 54.5,
          "lost-castle-2": 61.2,
          "renjian-yixiang": 50.0,
          "aniimo": 31.5
        }
      },
      {
        "date": "2026-10-25",
        "runs": [
          {
            "at": "2026-10-25 09:59:54",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1688.6,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 13,
                "failed": 17,
                "skipped": 0
              },
              "reddit": {
                "attempted": 19,
                "ok": 19,
                "failed": 0,
                "skipped": 11
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 57.0,
          "phantom-blade-zero": 83.0,
          "roco-kingdom-world": 62.8,
          "star-valley": 56.0,
          "project-origin": 47.0,
          "project-mugen-neverness": 61.8,
          "naruto-mobile-global": 63.5,
          "the-outcast": 51.0,
          "where-winds-meet": 44.2,
          "last-asylum-plague": 41.8,
          "clash-of-critters": 27.0,
          "flamb-merge-cook": 52.2,
          "tasty-travels-merge-game": 53.8,
          "genshin-impact": 55.5,
          "honkai-star-rail": 53.0,
          "wuthering-waves": 51.2,
          "honor-of-kings": 44.2,
          "arknights": 48.0,
          "afk-journey": 37.0,
          "rise-of-kingdoms": 53.0,
          "hunger": 49.5,
          "sword-x-staff": 41.2,
          "wenjian-changsheng": 62.8,
          "tides-of-annihilation": 46.2,
          "arknights-endfield": 42.0,
          "azur-promilia": 49.0,
          "honor-of-kings-world": 54.5,
          "lost-castle-2": 61.2,
          "renjian-yixiang": 50.0,
          "aniimo": 30.0
        }
      },
      {
        "date": "2026-10-26",
        "runs": [
          {
            "at": "2026-10-26 10:14:03",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1713.2,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 14,
                "failed": 16,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 19,
                "failed": 1,
                "skipped": 10
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 56.9,
          "phantom-blade-zero": 84.4,
          "roco-kingdom-world": 62.8,
          "star-valley": 56.0,
          "project-origin": 47.0,
          "project-mugen-neverness": 70.9,
          "naruto-mobile-global": 72.5,
          "the-outcast": 51.0,
          "where-winds-meet": 53.2,
          "last-asylum-plague": 41.8,
          "clash-of-critters": 30.0,
          "flamb-merge-cook": 52.2,
          "tasty-travels-merge-game": 53.8,
          "genshin-impact": 62.0,
          "honkai-star-rail": 62.0,
          "wuthering-waves": 57.2,
          "honor-of-kings": 47.2,
          "arknights": 55.5,
          "afk-journey": 39.2,
          "rise-of-kingdoms": 56.0,
          "hunger": 55.5,
          "sword-x-staff": 41.2,
          "wenjian-changsheng": 62.8,
          "tides-of-annihilation": 47.8,
          "arknights-endfield": 43.5,
          "azur-promilia": 49.0,
          "honor-of-kings-world": 54.5,
          "lost-castle-2": 59.8,
          "renjian-yixiang": 50.0,
          "aniimo": 33.0
        }
      },
      {
        "date": "2026-10-27",
        "runs": [
          {
            "at": "2026-10-27 10:11:45",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1722.9,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 14,
                "failed": 16,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 10
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          },
          {
            "at": "2026-10-27 15:54:38",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1512.1,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 13,
                "failed": 17,
                "skipped": 0
              },
              "reddit": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 56.8,
          "phantom-blade-zero": 82.8,
          "roco-kingdom-world": 62.8,
          "star-valley": 56.0,
          "project-origin": 47.0,
          "project-mugen-neverness": 74.0,
          "naruto-mobile-global": 66.5,
          "the-outcast": 49.5,
          "where-winds-meet": 51.8,
          "last-asylum-plague": 41.8,
          "clash-of-critters": 30.0,
          "flamb-merge-cook": 49.2,
          "tasty-travels-merge-game": 53.8,
          "genshin-impact": 62.0,
          "honkai-star-rail": 56.0,
          "wuthering-waves": 51.2,
          "honor-of-kings": 45.8,
          "arknights": 65.0,
          "afk-journey": 37.0,
          "rise-of-kingdoms": 63.5,
          "hunger": 55.5,
          "sword-x-staff": 41.2,
          "wenjian-changsheng": 61.2,
          "tides-of-annihilation": 50.8,
          "arknights-endfield": 40.5,
          "azur-promilia": 49.0,
          "honor-of-kings-world": 54.5,
          "lost-castle-2": 61.2,
          "renjian-yixiang": 50.0,
          "aniimo": 33.0
        }
      },
      {
        "date": "2026-10-28",
        "runs": [
          {
            "at": "2026-10-28 10:23:19",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1716.3,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 4,
                "failed": 26,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 20,
                "failed": 0,
                "skipped": 10
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "Trends（stale）",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 限流/异常：The request failed: Google returned a response with code 429",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 56.6,
          "phantom-blade-zero": 84.1,
          "roco-kingdom-world": 62.8,
          "star-valley": 56.0,
          "project-origin": 47.0,
          "project-mugen-neverness": 73.9,
          "naruto-mobile-global": 66.5,
          "the-outcast": 51.0,
          "where-winds-meet": 53.2,
          "last-asylum-plague": 41.8,
          "clash-of-critters": 28.5,
          "flamb-merge-cook": 49.2,
          "tasty-travels-merge-game": 53.8,
          "genshin-impact": 63.5,
          "honkai-star-rail": 54.5,
          "wuthering-waves": 48.2,
          "honor-of-kings": 51.8,
          "arknights": 57.0,
          "afk-journey": 42.2,
          "rise-of-kingdoms": 63.5,
          "hunger": 54.0,
          "sword-x-staff": 41.2,
          "wenjian-changsheng": 61.2,
          "tides-of-annihilation": 50.8,
          "arknights-endfield": 40.5,
          "azur-promilia": 49.0,
          "honor-of-kings-world": 54.5,
          "lost-castle-2": 59.8,
          "renjian-yixiang": 50.0,
          "aniimo": 33.0
        }
      },
      {
        "date": "2026-10-29",
        "runs": [
          {
            "at": "2026-10-29 10:24:02",
            "network": false,
            "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
            "data_mode": "live",
            "duration_sec": 1718.2,
            "alert": null,
            "calls": {
              "trends": {
                "attempted": 30,
                "ok": 16,
                "failed": 14,
                "skipped": 0
              },
              "reddit": {
                "attempted": 20,
                "ok": 19,
                "failed": 1,
                "skipped": 10
              },
              "x_twitter": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              },
              "rss": {
                "attempted": 30,
                "ok": 30,
                "failed": 0,
                "skipped": 0
              }
            },
            "games": [
              {
                "id": "monster-hunter-outlanders",
                "name_cn": "怪物猎人：旅人",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "phantom-blade-zero",
                "name_cn": "影之刃零",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "roco-kingdom-world",
                "name_cn": "洛克王国：世界",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "star-valley",
                "name_cn": "星布谷地",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-origin",
                "name_cn": "源初之结",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "project-mugen-neverness",
                "name_cn": "无限大",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "naruto-mobile-global",
                "name_cn": "火影忍者手游",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "the-outcast",
                "name_cn": "异人之下",
                "used": [
                  "Trends（stale）",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Trends（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "where-winds-meet",
                "name_cn": "燕云十六声",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "last-asylum-plague",
                "name_cn": "Last Asylum: Plague",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "clash-of-critters",
                "name_cn": "Clash of Critters",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 10 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "flamb-merge-cook",
                "name_cn": "Flambé: Merge & Cook",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tasty-travels-merge-game",
                "name_cn": "Tasty Travels",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 0 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "genshin-impact",
                "name_cn": "原神",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honkai-star-rail",
                "name_cn": "崩坏：星穹铁道",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wuthering-waves",
                "name_cn": "鸣潮",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings",
                "name_cn": "王者荣耀国际服",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights",
                "name_cn": "明日方舟",
                "used": [
                  "P1·Trends",
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "afk-journey",
                "name_cn": "剑与远征：启程",
                "used": [
                  "P1·Reddit",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 4 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "正常",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "rise-of-kingdoms",
                "name_cn": "万国觉醒",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "Reddit: HTTP 429",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "hunger",
                "name_cn": "HUNGER",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "sword-x-staff",
                "name_cn": "杖剑传说",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "wenjian-changsheng",
                "name_cn": "问剑长生",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "tides-of-annihilation",
                "name_cn": "湮灭之潮",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "arknights-endfield",
                "name_cn": "明日方舟：终末地",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "azur-promilia",
                "name_cn": "蓝色星原：旅谣",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "honor-of-kings-world",
                "name_cn": "王者荣耀世界",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "lost-castle-2",
                "name_cn": "失落城堡 2",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 1 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "renjian-yixiang",
                "name_cn": "人间异想计划",
                "used": [
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Google Search",
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 12 条"
                ],
                "detail": {
                  "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              },
              {
                "id": "aniimo",
                "name_cn": "伊莫",
                "used": [
                  "P1·Trends",
                  "Reddit（stale）",
                  "P2·X"
                ],
                "fallbacks": [
                  "Fallback: Reddit（沿用上次值）",
                  "Bing News RSS 命中 11 条"
                ],
                "detail": {
                  "trends": "正常",
                  "reddit": "预算接近用尽（预留给其余源），跳过调用",
                  "x_twitter": "正常"
                }
              }
            ]
          }
        ],
        "totals": {
          "monster-hunter-outlanders": 76.5,
          "phantom-blade-zero": 84.0,
          "roco-kingdom-world": 62.8,
          "star-valley": 56.0,
          "project-origin": 45.5,
          "project-mugen-neverness": 61.8,
          "naruto-mobile-global": 60.5,
          "the-outcast": 51.0,
          "where-winds-meet": 44.2,
          "last-asylum-plague": 44.8,
          "clash-of-critters": 24.0,
          "flamb-merge-cook": 50.8,
          "tasty-travels-merge-game": 53.8,
          "genshin-impact": 45.0,
          "honkai-star-rail": 54.5,
          "wuthering-waves": 48.2,
          "honor-of-kings": 47.2,
          "arknights": 48.0,
          "afk-journey": 37.8,
          "rise-of-kingdoms": 54.5,
          "hunger": 54.0,
          "sword-x-staff": 41.2,
          "wenjian-changsheng": 61.2,
          "tides-of-annihilation": 52.2,
          "arknights-endfield": 37.5,
          "azur-promilia": 49.0,
          "honor-of-kings-world": 53.0,
          "lost-castle-2": 59.8,
          "renjian-yixiang": 50.0,
          "aniimo": 33.0
        }
      }
    ]
  }
};
