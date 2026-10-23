# XINXICHA · 中国游戏厂商海外信息差监控（MVP 站点）实施计划

## Context（为什么做、要达成什么）

用户上传了一份 7 sheet 的规格表《中国游戏厂商海外信息差监控MVP表格(含回退逻辑)》：字段字典 F01–F16、20 款目标游戏、50 个英文 SEO 关键词、12 条每日任务（T01–T12）、10 个自动化模块、4 周路线图，以及**一套 P1→P2→P3 数据源回退逻辑 + 6 条失败处理规则 + 6 项评分权重**。用户要求"按这个文件建一个网站"。

目标产物：把这份**离线表格变成可运行的在线看板站**——本地 `L:\site\XINXICHA`，服务器子路径 `/xinxicha/`，纳入 `L:\site` 站点家族（复用 gameqker 的统一设计体系与 wordseeker 的数据双轨/多页工程约定）。看板要真实体现"含回退逻辑"：每个分数都标注它走了哪个源、是否 stale、是否降级，并在数据源全部不可用时优雅降级而非报错。

**本阶段只做本地**：不新增线上操作（不上传、不建仓库、不改导航页线上副本）。线上部署列在文末"待用户授权"部分。

## 关键裁决（必须先定，否则前后端永远对不上）

**规格内部矛盾**：`sheet1` 的 F13 公式为 `F07*0.2+F09*0.2+F10*0.2+F11*0.2+F12*0.2`（5 项各 20%），`sheet7` 为 6 项 `30/20/15/15/10/10`。**采用 sheet7**（含"上线窗口近/国内攻略成熟度"，且与 F14 阈值口径一致），并在 ops 页标注 sheet1 旧公式已废弃。

**评分引擎（唯一的权威实现，`collector/scoring.py`）**，6 个 0–100 分项 × 权重：

| 分项 | 权重 | 取分规则 |
|---|---|---|
| Trends 上升 | 30% | 7 日变化率 Δ<0→0；0–5%→30；5–20%→60；>20%→100 |
| Reddit 讨论 | 20% | 单日新增 0 条→0；1–2→40；3–5→70；>5→100 |
| X 官方公告 | 15% | 官方发公告→100；仅玩家求助帖→60；无→0 |
| 海外供给不足 | 15% | `F09 = 10 - F08`，`F09×10`（供给越少分越高；2026-10-23 由原 `(F09-5)/4*100` 改为线性，原式只在 F09>5 时非零，30 款实测 25 款压在 0/100 两端） |
| 国内攻略成熟度 | 10% | `F07` 1–5 → `(F07-1)/4*100`（国内素材越多越可翻译） |
| 上线窗口近 | 10% | 距上线 ≤7 天→100；≤30→70；≤90→40；已上线→20；未公布/更远→10 |

阈值 → 建议动作（F14）：`≥80 抢首发攻略 / 60–79 做数据表占位 / 40–59 监控不投入 / <40 暂不投入`；与 sheet2 的人工定性建议（如"做发售期专题"）**分列展示**，标注"规则引擎"vs"人工定性"。

**回退规则（6 条原文即实现，`collector/scoring.py` + `collector/state.py`）**：① 单次失败保留上次有效值并标 `stale`；② 连续 3 次失败 → 该源降级、不再优先调用；③ P1 全失败 → 页面显式显示"今日海外信号不足，建议人工复核"；④ 新游戏无历史 → 基础分 20，跑满 3 天才参与排名；⑤ 回退源数据用黄色 `Fallback: xxx` 标签；⑥ 每日运行日志记录每款游戏走主源还是备用源。语义固定：**缺失源记 0 分、不重分配权重、只加 stale 标记**。

**"回退演练"不做双实现**：Python 采集时预计算「Trends 失活 / Reddit 失活 / X 失活 / P1 全失败」4 个变体（20×4 条，体积可忽略）写进 `ops.json.scenarios`；前端只做**查表切换**，零公式重复。

**权重单一来源**：`config.json` 是唯一权威；emit 时把 `config.scoring` 原样投影为 `ops.json.scoring` 供前端显示与演练读权重。

## 文件布局

```
L:\site\XINXICHA\
  config.json                  # 唯一权威：权重/阈值/枚举/fallback_chain/熔断参数/源定义
  run.ps1                     # 一键：采集 → 本地预览（端口 8323，需检测占用）
  collector\                   # 采集与计算（不进 web，不部署）
    __init__.py  update.py     # 入口 python -m collector.update（--probe/--dry-run/--offline/--no-cache/--budget-seconds）
    scoring.py                 # 评分引擎 + 回退规则 + 场景预计算
    sources.py                 # P1→P2→P3 探测与降级链
    emit.py                    # 生成 web/data/*.json 与 *.js 双轨 + meta（data_mode/generated_at_cst/schema_version/spec_sha）
    state.py                   # data/source_state.json：连续失败计数、last_success_at、stale 表
    http.py                    # stdlib urllib（原子写、超时、缓存）
  tools\import_spec.py         # 一次性幂等：_spec → data/seed_*.json（人工基线层）
  data\                        # seed_games.json / seed_keywords.json / seed_ops.json / source_state.json / cache\
  web\                         # 部署产物（↔ /www/wwwroot/sites/xinxicha/）
    index.html  detail.html  keywords.html  ops.html
    styles.css  core.js  app.js
    data\games.json|js  keywords.json|js  ops.json|js  log.json|js
```

- **人工字段白名单**（照抄 gameqker `DYNAMIC_KEYS` 思路）：`优先级/备注/信号来源/可信度/国内攻略成熟度/海外供给缺口评估` 由 seed 提供，采集器**绝不改写**；只写 `trends_7d / reddit / x_twitter / overseas_supply / 上线状态日期 / 分项分 / 总分 / 建议动作(引擎) / 分项来源标签 / stale / last_updated`。
- 规格基线只读 `data/seed_*.json`（由 `tools/import_spec.py` 从解包的 `_spec` 生成，幂等），不在代码里写字面量；导入后删除 `_spec` 临时目录（原始 xlsx 保持不动）。
- 站点命名：品牌 `xinxicha`，主题 key `xinxicha:theme`，数据全局 `window.XC_GAMES / XC_KEYWORDS / XC_OPS / XC_LOG`。

## 复用的既有实现（不要另起炉灶）

- 设计体系与外壳：[styles.css](file:///L:/site/gameqker/web/styles.css)（`:root` 令牌、双主题、topbar/shell/panel/chip/badge/footer）+ [index.html](file:///L:/site/gameqker/web/index.html)（head 内联防 FOUC 脚本、`.site-nav`、`?v=` 版本号）
- 数据双轨加载与主题/图表层：[core.js](file:///L:/site/wordseeker/web/core.js) 的 `loadData(name, globalName)`（先 `fetch` 后回退 window 全局）
- json+js 双轨导出范式：[emit.py](file:///L:/site/wordseeker/collector/emit.py)
- 采集器骨架（离线 probe、原子写、stdlib 缓存、人工字段不改写）：[update.py](file:///L:/site/gameqker/collector/update.py)、[http.py](file:///L:/site/gameqker/collector/http.py)
- 运行范式与 Python 回退：[run.ps1](file:///L:/site/gameqker/run.ps1) 的 `Resolve-Python`（跳过 `WindowsApps` 占位、回退 `C:\Users\ash\.local\bin\python3.12.exe`）
- 多页深链范式：wordseeker `detail.html`（query 参数渲染单条 + 非法参数空态）

## 采集器：无网也必须体面（本机实测无 requests/pytrends，只有 stdlib）

- **先探后跑**：开局对 `steamcommunity.com` 做 3s 探测，不通即进离线分支；全流程预算 `<--budget-seconds 60>` 硬约束，**任何情况退出码 0**（顶层不 `throw`，run.ps1 里才判退出码）。
- 降级链（贴合规格 P1→P2→P3）：Trends（pytrends 未装/无网即跳过，标 P1 不可用）→ Reddit `search.json`（须自定义 UA，防 429）→ X 标"不可用"（Nitter 已大面积失效，只留 RSS/官网公告兜底）→ 供给量走 Steam `appdetails`/`appreviews`（JSON 稳定）→ P3 人工基线（seed）。
- **不把 Google/Bing/DDG 结果数抓 HTML 放进主链**（极脆），只在 config 里声明为目标源。
- 反刷屏：源级熔断（连败 3 次当天停打）、失败只累加计数、每日仅 1 行汇总告警；`--probe` 输出源健康表且不落盘。

## 页面与交互（`.site-nav` 站内用相对路径，跨站一律绝对 URL）

1. `index.html` 总览：6 KPI（今日更新 / P0-P1 机会数 / P1 源健康 / 走回退源数量 / 待覆盖关键词 / 最近上线窗口）+ 今日 TOP5 机会卡 + 20 款排序表（分项、总分、规则引擎建议、人工定性建议、可信度、源标签、stale）+ 信号源健康面板（P1/P2/P3 状态、连续失败次数、上次成功时间）+ 筛选/排序/搜索。
2. `detail.html?game=<id>`：单款 F01–F16 全字段展开 + 评分分解条形 + 关联关键词 + 该游戏回退历史（走了哪些源）+ 非法 id 空态。
3. `keywords.html`：50 词矩阵（按游戏/意图/竞争度筛选、是否已覆盖、内容页规划、覆盖缺口统计）。
4. `ops.html`：T01–T12 每日时间轴（含每条 P1/回退/P2/P3）+ 10 个自动化模块表 + 回退逻辑表 + 6 条失败处理规则 + 权重表（并标注 sheet1 旧公式废弃）+ 4 周路线图 + 每日运行日志 + **回退演练**（查表切换 scenarios）。

## 实施顺序与阶段验收（小步可验证）

| 阶段 | 内容 | 客观验收点 |
|---|---|---|
| 0 | `tools/import_spec.py` 固化基线 | `data/seed_*.json` 条数 20 / 50 / 12 / 10 正确，`spec_sha` 一致 |
| 1 | config + scoring + sources + state + update + emit（离线可跑） | `-UpdateOnly` 退出码 0；`web/data` 四组 json+js 齐全；`generated_at_cst` 真刷新（不看 mtime/HTTP 状态）；每款 total=20 基础分 + stale/fallback 标签；P1 全失败文案出现；连跑 3 次后某源进入降级 |
| 2 | `index.html` + `ops.html`（先锁死契约） | `http://localhost:8323/` 与 `/ops.html` 均 200、Console 无错、主题切换可逆；**`file://` 直开 index 仍能渲染**（走 .js 全局）；6 KPI / 20 行 / TOP5 / 演练切换正常 |
| 3 | 接 1–2 个稳定真实源（Steam + RSS 类） | `--probe` 显示该源 `last_success_at` 为今天；随后 `--offline` 重跑退出码 0 且出现 `Fallback:` 标签 |
| 4 | `detail.html` + `keywords.html` | 深链正确、非法 id 空态、返回保留筛选状态、50 词矩阵缺口统计与 seed 一致 |

**通用排障前置**：`.json/.js` 会因 `Last-Modified` 命中 304 → fetch 必须 `cache:'no-store'` **且**带 `?t=<时间戳>`；`?v=` 只对 css 生效；本机 PowerShell 禁跑脚本（实测报 `running scripts is disabled`）→ `run.ps1` 用 `powershell -ExecutionPolicy Bypass -File run.ps1` 调用，文档写明；临时 `.ps1` 一律纯 ASCII（无 BOM 会被按 GBK 解析）。

## 待用户授权后（本阶段不做）

- 上传 `web/` 到 `/www/wwwroot/sites/xinxicha/`（tar -czf + scp 原子换目录，md5 双向核对）。
- 导航页新增卡片 `href="/xinxicha/"`（**改本地镜像即线上文件**，须成对操作）。
- 四站顶栏 `.site-nav` 加"xinxiCha"互链：需改 11 个文件 + bump CSS `?v=` + push 各自仓库（gameseek/appseeker 的 CI `rsync --delete` 会覆盖阿里云手工改动）。
- 建 Git 仓库 + `.github/workflows/update.yml`（每日北京时间 09:00 跑采集；remote 只能走 `ssh://git@ssh.github.com:443/...`），并更新 `L:\site\site_memory.md`。
