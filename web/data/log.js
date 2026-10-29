window.XC_LOG = {
  "meta": {
    "site": "xinxicha",
    "title": "中国游戏厂商海外信息差监控",
    "subtitle": "20 款国产游戏 × 50 个英文 SEO 关键词 · 每日巡检 · 含 P1→P2→P3 回退逻辑",
    "schema_version": 1,
    "generated_at_cst": "2026-10-29 15:43:33",
    "data_mode": "live",
    "spec_sha": "9cd00c7db5c7eaadc02f7596ffc2cb436a7f30f71b359e7206365c9016898d5d",
    "network": false,
    "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
    "alert": null,
    "duration_sec": 1276.3,
    "counts": {
      "days": 12,
      "games_logged": 22
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
        },
        {
          "at": "2026-10-29 15:43:33",
          "network": false,
          "probe_detail": "P1 不可达（3s 探测超时被拒），P2 可达（Bing News RSS）",
          "data_mode": "live",
          "duration_sec": 1276.3,
          "alert": null,
          "calls": {
            "trends": {
              "attempted": 22,
              "ok": 10,
              "failed": 12,
              "skipped": 0
            },
            "reddit": {
              "attempted": 22,
              "ok": 22,
              "failed": 0,
              "skipped": 0
            },
            "x_twitter": {
              "attempted": 22,
              "ok": 22,
              "failed": 0,
              "skipped": 0
            },
            "rss": {
              "attempted": 22,
              "ok": 22,
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
                "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
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
                "P1·Trends",
                "P1·Reddit",
                "P2·X"
              ],
              "fallbacks": [
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
                "Bing News RSS 命中 10 条"
              ],
              "detail": {
                "trends": "Trends 数据不足（7 日峰值 2 低于可信下限 5（批内归一化截断，变化率不可信））",
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
                "Bing News RSS 命中 11 条"
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
                "P1·Trends",
                "P1·Reddit",
                "P2·X"
              ],
              "fallbacks": [
                "Bing News RSS 命中 12 条"
              ],
              "detail": {
                "trends": "正常",
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
                "Bing News RSS 命中 12 条"
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
                "trends": "Trends 数据不足（7 日峰值 3 低于可信下限 5（批内归一化截断，变化率不可信））",
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
                "Bing News RSS 命中 11 条"
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
                "Bing News RSS 命中 11 条"
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
            },
            {
              "id": "neverness-to-everness",
              "name_cn": "异环",
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
        "hunger": 54.0,
        "sword-x-staff": 44.2,
        "wenjian-changsheng": 62.8,
        "tides-of-annihilation": 49.2,
        "arknights-endfield": 37.5,
        "azur-promilia": 46.8,
        "honor-of-kings-world": 53.0,
        "lost-castle-2": 59.8,
        "renjian-yixiang": 50.0,
        "aniimo": 33.0,
        "neverness-to-everness": 45.2
      }
    }
  ]
};
