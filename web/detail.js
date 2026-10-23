/* ==========================================================================
   xinxicha · 游戏详情页（detail.html）
   评分分解 / 回退演练 / P1 信号明细 / 基础信息 / 关联关键词
   ========================================================================== */

'use strict';

(function () {
  let GAMES = null;
  let KEYWORDS = null;

  const SIGNAL_ROWS = [
    ['trends', 'Google Trends 上升', 'trends_7d'],
    ['reddit', 'Reddit 讨论量', 'reddit_daily'],
    ['x_twitter', 'X/Twitter 官方公告', 'x_state'],
  ];
  const SOURCE_LABEL = { trends: 'Trends', reddit: 'Reddit', x_twitter: 'X' };

  function esc(text) { return XC.escapeHtml(text); }
  function num(value) { return XC.isNum(value); }

  function kpi(label, value, unit, sub, cls) {
    return '<div class="kpi ' + (cls || '') + '">' +
      '<div class="kpi-label">' + esc(label) + '</div>' +
      '<div class="kpi-value">' + esc(value) + (unit ? '<span class="kpi-unit">' + esc(unit) + '</span>' : '') + '</div>' +
      (sub ? '<div class="kpi-sub">' + sub + '</div>' : '') +
      '</div>';
  }

  function kv(key, value) {
    return '<li><span class="kv-key">' + esc(key) + '</span><span class="kv-val">' + esc(value || '—') + '</span></li>';
  }

  /* ---------- 概况 ---------- */

  function renderGame(game) {
    XC.$('detail-root').hidden = false;
    XC.$('game-name').innerHTML = esc(game.name_cn) +
      ' <span class="game-name-en" style="font-weight:400">' + esc(game.name_en || '') + '</span> ' +
      XC.prioTag(game.priority);
    XC.$('detail-head').textContent = game.name_cn + ' · ' + (game.name_en || '') + ' · 评分分解与回退演练';

    const list = (GAMES.games || []).slice().sort(function (a, b) { return a.seq - b.seq; });
    let index = -1;
    list.forEach(function (item, position) { if (item.id === game.id) index = position; });
    const prev = index > 0 ? list[index - 1] : null;
    const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null;
    XC.$('game-nav').innerHTML =
      '<a href="index.html">← 返回总览</a>' +
      (prev ? ' · <a href="detail.html?id=' + encodeURIComponent(prev.id) + '">← ' + esc(prev.name_cn) + '</a>' : '') +
      (next ? ' · <a href="detail.html?id=' + encodeURIComponent(next.id) + '">' + esc(next.name_cn) + ' →</a>' : '');
  }

  /* 权重从评分分项里取：避免这里再写一份，调 config.json 后页面显示不同步 */
  function weightOf(game, key) {
    const hit = (game.components || []).filter(function (item) { return item.key === key; })[0];
    return hit ? XC.fmtInt(hit.weight) + '%' : '—';
  }

  function renderGameKpi(game) {
    const days = game.launch_days;
    const dayText = num(days) ? (days > 0 ? XC.fmtInt(days) : '已上线') : '—';
    XC.$('game-kpi').innerHTML = [
      kpi('信息差总分', XC.fmt(game.total, 1), '', '基础分门槛 ' + XC.fmtInt(20) + ' 分' + (game.base_score_applied ? '（已应用）' : ''), 'kpi-good'),
      kpi('上线倒计时', dayText, num(days) && days > 0 ? '天' : '', esc(game.launch_date_raw || game.launch_date || '未公布'), num(days) && days >= 0 && days <= 7 ? 'kpi-good' : ''),
      kpi('海外供给缺口分', XC.fmt(game.gap_score, 1), '', '缺口等级 ' + esc(game.gap_level || '—') + ' · 权重 ' + weightOf(game, 'supply_gap'), ''),
      kpi('国内攻略成熟度', XC.fmtInt(game.cn_guide_score), ' / 5', '权重 ' + weightOf(game, 'cn_maturity'), ''),
      kpi('关联 Keywords', XC.fmtInt(game.keywords_count), '个', '英文 SEO 关键词', ''),
      kpi('置信度', esc(game.confidence || '—'), '', esc(game.ranking_note || ''), game.confidence === '低' ? 'kpi-bad' : (game.confidence === '中' ? 'kpi-warn' : 'kpi-good')),
    ].join('');
  }

  /* ---------- 评分分解 ---------- */

  function renderComponents(game) {
    XC.$('score-note').innerHTML = esc(game.action_engine || '') + ' · 置信度 ' + esc(game.confidence || '') +
      ' · ' + esc(game.action_basis || '');
    XC.$('comp-list').innerHTML = (game.components || []).map(function (comp) {
      const pct = XC.clamp(comp.score, 0, 100);
      const source = [comp.origin, comp.kind && comp.kind !== comp.origin ? comp.kind : '', comp.stale ? 'stale' : '', comp.note]
        .filter(function (part) { return part; }).join(' · ');
      return '<li class="comp-item">' +
        '<span class="comp-label">' + esc(comp.label) + '</span>' +
        '<span class="comp-bar"><span class="comp-fill' + (comp.stale ? ' is-stale' : '') +
          '" style="width:' + pct + '%"></span></span>' +
        '<span class="comp-val">' + XC.fmt(comp.score, 1) + ' × ' + XC.fmtInt(comp.weight) + '% = ' + XC.fmt(comp.weighted, 2) + '</span>' +
        '<span class="comp-src" title="' + esc(source) + '">' + esc(source) + '</span>' +
        '</li>';
    }).join('');
  }

  /* ---------- 回退演练 ---------- */

  function renderSim(game) {
    const bar = XC.$('sim-bar');
    bar.innerHTML = '<span class="filter-label">场景</span>';
    const chips = XC.el('div', { class: 'chips' });
    const scenarios = game.scenarios || [];
    let active = 'p1_all_dead';

    scenarios.forEach(function (scenario) {
      const button = XC.el('button', { class: 'chip', type: 'button', text: scenario.label, 'data-scenario': scenario.key });
      button.addEventListener('click', function () { active = scenario.key; paint(); });
      chips.append(button);
    });

    bar.append(chips);
    paint();

    function paint() {
      XC.$('sim-result').innerHTML = scenarios.map(function (scenario) {
        const sources = (scenario.stale_sources || []).map(function (key) {
          return '<span class="src src-stale">' + esc(SOURCE_LABEL[key] || key) + '</span>';
        }).join('');
        return '<div class="sim-card' + (scenario.key === active ? ' is-active' : '') + '">' +
          '<div class="sim-label">' + esc(scenario.label) + '</div>' +
          '<div class="sim-total">' + XC.fmt(scenario.total, 1) + '</div>' +
          '<div class="sim-meta">' + esc(scenario.action_engine || '') + ' · 置信 ' + esc(scenario.confidence || '') + '</div>' +
          '<div class="src-row">' + sources + '</div>' +
          '</div>';
      }).join('');
      chips.querySelectorAll('button').forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-scenario') === active ? 'true' : 'false');
      });
    }
  }

  /* ---------- 信号明细 ---------- */

  function renderSignals(game) {
    const signals = game.signals || {};
    XC.$('signal-note').innerHTML = '主源：' + esc((game.sources_used || []).join(' / ') || '无') +
      ' · 回退：' + esc((game.fallbacks || []).join(' / ') || '无');
    XC.$('signal-body').innerHTML = SIGNAL_ROWS.map(function (row) {
      const signal = signals[row[0]] || {};
      const value = game[row[2]];
      const valueText = value === null || value === undefined ? '—' : XC.fmt(value, Number.isInteger(Number(value)) ? 0 : 1);
      return '<tr>' +
        '<td class="col-first"><span class="cell-title">' + esc(row[1]) + '</span>' +
          '<div class="cell-sub">' + esc(row[0]) + '</div></td>' +
        '<td><span class="score-num" style="font-size:15px">' + esc(valueText) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(signal.origin || '—') + '</span>' +
          '<div class="cell-sub">' + esc(signal.kind || '') + '</div></td>' +
        '<td>' + XC.signalTag(signal) + (signal.stale ? '<div><span class="src src-stale">stale</span></div>' : '') + '</td>' +
        '<td><span class="cell-sub">' + esc(signal.error || '正常') + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 基础信息 ---------- */

  function guidePosts(game) {
    if (!num(game.guide_posts)) return '—';
    const posts = game.guide_saturated ? XC.fmtInt(game.guide_posts) + '+' : XC.fmtInt(game.guide_posts);
    const hits = num(game.guide_hits) ? '，其中攻略词 ' + XC.fmtInt(game.guide_hits) + ' 帖' : '';
    return posts + ' 帖（标题含游戏名）' + hits + ' · ' +
      (game.guide_supply_kind === 'cached' ? '周缓存' : '本周采集');
  }

  function renderBase(game) {
    const items = [
      kv('厂商 / 发行商', game.publisher),
      kv('游戏类型', game.type),
      kv('海外上线状态', game.status),
      kv('海外上线日期', game.launch_date_raw || game.launch_date || '未公布'),
      kv('距上线天数', num(game.launch_days) ? XC.fmtInt(game.launch_days) + ' 天' : '—'),
      kv('国内攻略成熟度', num(game.cn_guide_score) ? XC.fmtInt(game.cn_guide_score) + ' / 5' : '—'),
      kv('海外供给缺口等级', game.gap_level),
      kv('海外攻略供给量', num(game.overseas_supply) ? XC.fmt(game.overseas_supply, 1) + ' / 10' : '未采集（用人工缺口等级映射）'),
      kv('Reddit 社区帖（近一年）', guidePosts(game)),
      kv('信号来源说明', game.signal_source),
      kv('排序状态', game.ranking_note),
      kv('已跟踪天数', XC.fmtInt(game.days_tracked) + ' 天'),
      kv('上次运行时间', game.last_update),
      kv('备注', game.note),
    ];
    XC.$('base-body').innerHTML = items.join('');
  }

  /* ---------- 国内媒体提及（仅展示） ---------- */

  function safeUrl(url) {
    return /^https?:\/\//i.test(url || '') ? url : '#';
  }

  function renderCnMedia(game) {
    const titles = game.cn_media_titles || [];
    const meta = (GAMES && GAMES.cn_media) || {};
    const days = meta.window_days || 7;
    const sources = meta.sources || [];
    const okRows = sources.filter(function (row) { return row.ok; });
    const badRows = sources.filter(function (row) { return !row.ok && row.error; });
    XC.$('cnmedia-note').innerHTML = '近 ' + XC.fmtInt(days) + ' 日 · 命中 ' +
      XC.fmtInt(game.cn_media_count || 0) + ' 条' +
      (okRows.length ? ' · 源：' + esc(okRows.map(function (row) {
        return row.label + ' ' + XC.fmtInt(row.items) + ' 条';
      }).join(' · ')) : '') +
      (badRows.length ? ' · ' + esc(badRows.map(function (row) {
        return row.label + ' 抓取失败（' + (row.error || '未知') + '）';
      }).join('；')) : '');
    if (!titles.length) {
      XC.$('cnmedia-body').innerHTML = '<li><span class="cell-sub">近 ' + XC.fmtInt(days) +
        ' 日游戏茶馆 / 触乐未提及这款游戏（该面板仅作参考，不影响评分）。</span></li>';
      return;
    }
    XC.$('cnmedia-body').innerHTML = titles.map(function (item) {
      return '<li><span class="kv-key">' + esc(item.label || item.source) + '</span>' +
        '<span class="kv-val"><a href="' + esc(safeUrl(item.url)) + '" target="_blank" rel="noopener">' +
        esc(item.title) + '</a> <span class="cell-sub">' + esc(item.published || '') +
        (item.hit ? ' · 命中「' + esc(item.hit) + '」' : '') + '</span></span></li>';
    }).join('');
  }

  /* ---------- 关联关键词 ---------- */

  function renderKeywords(game) {
    const list = ((KEYWORDS && KEYWORDS.keywords) || []).filter(function (keyword) {
      return keyword.game_id === game.id;
    });
    XC.$('kw-note').textContent = list.length + ' 个关键词 · 已覆盖 ' +
      list.filter(function (keyword) { return keyword.covered === '是'; }).length + ' 个';
    if (!list.length) {
      XC.$('kw-body').innerHTML = '<tr><td colspan="7"><span class="cell-sub">该游戏暂未分配关键词，可在 Sheet3 关键词清单中补充。</span></td></tr>';
      return;
    }
    XC.$('kw-body').innerHTML = list.map(function (keyword) {
      return '<tr>' +
        '<td class="col-first"><span class="cell-title">' + esc(keyword.keyword) + '</span>' +
          '<div class="cell-sub">#' + XC.fmtInt(keyword.id) + '</div></td>' +
        '<td><span class="tag">' + esc(keyword.intent) + '</span></td>' +
        '<td><span class="prio">' + XC.fmtInt(keyword.competition) + '</span></td>' +
        '<td><span class="cell-sub">' + (num(keyword.trends_7d) ? XC.fmt(keyword.trends_7d, 1) : '—') + '</span></td>' +
        '<td>' + (keyword.covered === '是' ? '<span class="src src-p1">已覆盖</span>' : '<span class="src src-fallback">未覆盖</span>') + '</td>' +
        '<td><span class="cell-sub">' + esc(keyword.page_plan) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(keyword.note) + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 启动 ---------- */

  async function boot() {
    XC.initPage();
    try {
      const loaded = await Promise.all([
        XC.loadData('games', 'XC_GAMES'),
        XC.loadData('keywords', 'XC_KEYWORDS'),
      ]);
      GAMES = loaded[0];
      KEYWORDS = loaded[1];
    } catch (error) {
      XC.fail('empty-state', error);
      return;
    }
    XC.renderMeta(GAMES.meta);

    const id = XC.param('id');
    const game = (GAMES.games || []).filter(function (item) { return item.id === id; })[0];
    if (!game) {
      const box = XC.$('empty-state');
      box.hidden = false;
      box.innerHTML = '未找到游戏 <code>' + esc(id || '(缺少 id 参数)') + '</code>。' +
        '请从 <a href="index.html">总览</a> 选择一款游戏。';
      return;
    }

    renderGame(game);
    renderGameKpi(game);
    renderComponents(game);
    renderSim(game);
    renderSignals(game);
    renderBase(game);
    renderCnMedia(game);
    renderKeywords(game);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
