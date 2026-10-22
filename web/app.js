/* ==========================================================================
   xinxicha · 总览页（index.html）
   关键指标 / 今日 TOP5 机会 / 回退演练 / 20 款评分表 / 数据源健康
   ========================================================================== */

'use strict';

(function () {
  let GAMES = null;
  let KEYWORDS = null;
  let OPS = null;

  const SORT_COMPONENT = {
    c_trends: 'trends_rise',
    c_reddit: 'reddit',
    c_x: 'x_official',
    c_gap: 'supply_gap',
    c_cn: 'cn_maturity',
    c_launch: 'launch_window',
  };
  const PRIORITY_ORDER = { P0: 0, P1: 1, P2: 2 };
  const SOURCE_LABEL = { trends: 'Trends', reddit: 'Reddit', x_twitter: 'X' };

  const view = { priority: 'all', status: 'all', q: '', sortKey: 'opportunity', sortDir: 'asc' };

  /* ---------- 工具 ---------- */

  function esc(text) { return XC.escapeHtml(text); }

  function num(value) { return XC.isNum(value); }

  function componentOf(game, key) {
    const list = game.components || [];
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].key === key) return list[i];
    }
    return null;
  }

  function sortValue(game, key) {
    if (SORT_COMPONENT[key]) {
      const comp = componentOf(game, SORT_COMPONENT[key]);
      return comp ? comp.score : null;
    }
    /* 机会象限按 rank 排序（1 = 机会最大），同 rank 再用总分降序打破 */
    if (key === 'opportunity') return game.opportunity ? game.opportunity.rank : null;
    return game[key];
  }

  function compareGames(a, b) {
    const va = sortValue(a, view.sortKey);
    const vb = sortValue(b, view.sortKey);
    const missingA = va === null || va === undefined || va === '';
    const missingB = vb === null || vb === undefined || vb === '';
    let result;
    if (missingA && missingB) result = 0;
    else if (missingA) result = 1;   /* 缺值永远排最后 */
    else if (missingB) result = -1;
    else if (view.sortKey === 'priority') result = (PRIORITY_ORDER[va] || 9) - (PRIORITY_ORDER[vb] || 9);
    else if (view.sortKey === 'opportunity') result = (va - vb) || ((b.total || 0) - (a.total || 0));
    else if (typeof va === 'number' && typeof vb === 'number') result = va - vb;
    else result = String(va).localeCompare(String(vb), 'zh-Hans-CN');
    return view.sortDir === 'asc' ? result : -result;
  }

  function p1Available(games) {
    const keys = ['trends', 'reddit', 'x_twitter'];
    let available = 0;
    keys.forEach(function (key) {
      for (let i = 0; i < games.length; i += 1) {
        const signal = games[i].signals && games[i].signals[key];
        if (signal && signal.available) { available += 1; break; }
      }
    });
    return available;
  }

  /* ---------- 关键指标 ---------- */

  function kpi(label, value, unit, sub, cls) {
    return '<div class="kpi ' + (cls || '') + '">' +
      '<div class="kpi-label">' + esc(label) + '</div>' +
      '<div class="kpi-value">' + esc(value) + (unit ? '<span class="kpi-unit">' + esc(unit) + '</span>' : '') + '</div>' +
      (sub ? '<div class="kpi-sub">' + sub + '</div>' : '') +
      '</div>';
  }

  function renderKpi() {
    const games = GAMES.games || [];
    const totals = games.map(function (game) { return game.total; }).filter(num);
    const best = Math.max.apply(null, totals);
    const mean = totals.length ? totals.reduce(function (sum, value) { return sum + value; }, 0) / totals.length : 0;
    const bestGame = games.filter(function (game) { return game.total === best; })[0];
    const p1 = p1Available(games);
    const upcoming = games.filter(function (game) { return num(game.launch_days) && game.launch_days >= 0; })
      .sort(function (a, b) { return a.launch_days - b.launch_days; })[0];
    const counts = (GAMES.meta && GAMES.meta.counts) || {};
    const kw = (KEYWORDS && KEYWORDS.meta && KEYWORDS.meta.counts) || {};

    const p1Cls = p1 === 3 ? 'kpi-good' : (p1 === 0 ? 'kpi-bad' : 'kpi-warn');
    const p1Sub = p1 === 3 ? 'P1 主源正常' : (p1 === 0 ? 'P1 全部失败，今日信号不足' : '部分失败，已走回退');

    XC.$('kpi-grid').innerHTML = [
      kpi('监控游戏', XC.fmtInt(counts.games), '款', 'P0 ' + XC.fmtInt(counts.p0) + ' · P1 ' + XC.fmtInt(counts.p1_priority) + ' · P2 其余', ''),
      kpi('今日最高分', XC.fmt(best, 1), '', bestGame ? esc(bestGame.name_cn) : '—', 'kpi-good'),
      kpi('平均分', XC.fmt(mean, 1), '', XC.fmtInt(totals.length) + ' 款加权均值', ''),
      kpi('P1 主源可用', XC.fmtInt(p1), ' / 3', p1Sub, p1Cls),
      kpi('最近上线', upcoming ? XC.fmtInt(upcoming.launch_days) : '—', '天',
        upcoming ? esc(upcoming.name_cn) + ' · ' + esc(upcoming.launch_date) : '暂无排期游戏', upcoming && upcoming.launch_days <= 7 ? 'kpi-good' : ''),
      kpi('关键词缺口', XC.fmtInt(kw.not_covered), ' / ' + XC.fmtInt(kw.keywords),
        '已覆盖 ' + XC.fmtInt(kw.covered) + ' · 高竞争 ' + XC.fmtInt(kw.high_competition), 'kpi-warn'),
    ].join('');

    XC.$('kpi-note').textContent = '数据模式 ' + (GAMES.meta.data_mode || '—') + ' · 生成于 ' + (GAMES.meta.generated_at_cst || '—') + ' CST';
  }

  /* ---------- 今日 TOP5 ---------- */

  function renderOpps() {
    const top = (GAMES.games || []).slice().sort(function (a, b) { return (b.total || 0) - (a.total || 0); }).slice(0, 5);
    XC.$('opp-grid').innerHTML = top.map(function (game) {
      const cls = game.priority === 'P0' ? 'is-p0' : (game.priority === 'P1' ? 'is-p1' : '');
      const days = num(game.launch_days) ? (game.launch_days >= 0 ? ' · 剩 ' + XC.fmtInt(game.launch_days) + ' 天' : ' · 已上线') : '';
      const rank = game.ranking_eligible ? '' : '<span class="badge badge-base">' + esc(game.ranking_note || '观察期') + '</span>';
      return '<a class="opp-card ' + cls + '" href="detail.html?id=' + encodeURIComponent(game.id) + '">' +
        '<div class="opp-head"><span class="opp-name">' + esc(game.name_cn) + '</span>' +
          '<span class="opp-name-en">' + esc(game.name_en || '') + '</span>' +
          '<span class="opp-score">' + XC.fmt(game.total, 1) + '</span></div>' +
        '<div class="opp-meta">' + esc(game.status || '') + days + ' · 缺口分 ' + XC.fmt(game.gap_score, 1) + ' · 关键词 ' + XC.fmtInt(game.keywords_count) + '</div>' +
        '<div class="opp-foot">' + XC.prioTag(game.priority) + XC.confBadge(game.confidence) + rank + '</div>' +
        '</a>';
    }).join('');
    XC.$('opp-note').textContent = '按信息差总分降序 · 观察期游戏按基础分展示，跑满 3 天才计入正式排名';
  }

  /* ---------- 回退演练 ---------- */

  function setupSim() {
    const games = (GAMES.games || []).slice();
    const bar = XC.$('sim-bar');
    const select = XC.el('select', { id: 'sim-game', class: 'chip' });
    games.forEach(function (game) { select.append(XC.el('option', { value: game.id, text: game.name_cn })); });

    const scenarios = OPS.scenarios || [];
    let active = 'p1_all_dead';
    const chips = XC.el('div', { class: 'chips' });
    scenarios.forEach(function (scenario) {
      const button = XC.el('button', { class: 'chip', type: 'button', text: scenario.label, 'data-scenario': scenario.key });
      button.addEventListener('click', function () { active = scenario.key; paint(); });
      chips.append(button);
    });

    bar.append(XC.el('span', { class: 'filter-label', text: '游戏' }), select, chips);
    select.addEventListener('change', paint);

    function paint() {
      const game = games.filter(function (item) { return item.id === select.value; })[0];
      const list = (game && game.scenarios) || [];
      XC.$('sim-result').innerHTML = list.map(function (scenario) {
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

    paint();
  }

  /* ---------- 20 款评分表 ---------- */

  /* 枚举型 value 的中文标签：x_official 无凭据时走 Bing News RSS 回退，产出的是档位而非数字 */
  const ENUM_VALUE_LABEL = { official: '官方公告', player_only: '有新闻提及', none: '无提及' };

  function componentCell(comp) {
    if (!comp) return '<span class="cell-sub">—</span>';
    const raw = comp.value;
    let value;
    if (raw === null || raw === undefined) value = '—';
    else if (Object.prototype.hasOwnProperty.call(ENUM_VALUE_LABEL, raw)) value = ENUM_VALUE_LABEL[raw];
    else value = Number.isInteger(Number(raw)) ? String(raw) : XC.fmt(raw, 1);
    return '<div class="score-cell">' +
      '<span class="score-num" style="font-size:15px">' + esc(value) + '</span>' +
      '<span class="score-bar"><span class="score-bar-fill ' + (comp.stale ? 'lv-c' : 'lv-b') +
        '" style="width:' + XC.clamp(comp.score, 0, 100) + '%"></span></span>' +
      '<span class="cell-sub">分 ' + XC.fmtInt(comp.score) + ' · 权重 ' + XC.fmtInt(comp.weight) + '%</span>' +
      '</div>';
  }

  /* 海外上线倒计时：数据层按当日算好 launch_days（负数＝已上线天数）。
     90 天内高亮，提示「临近上线、攻略窗口要开了」；未公布档期不显示。 */
  function countdownTag(game) {
    const days = game.launch_days;
    if (!num(days)) return '';
    if (days < 0) return '<div class="cell-sub">已上线 ' + XC.fmtInt(-days) + ' 天</div>';
    const text = days === 0 ? '今日上线' : '倒计时 ' + XC.fmtInt(days) + ' 天';
    return '<div class="cdown' + (days < 90 ? ' cdown-hot' : '') + '">' + text + '</div>';
  }

  function launchCell(game) {
    if (!game.launch_date) {
      return '<span class="cell-sub">' + esc(game.launch_date_raw || '未公布') + '</span>';
    }
    const days = game.launch_days;
    const sub = num(days) ? (days >= 0 ? '剩 ' + XC.fmtInt(days) + ' 天' : '已上线 ' + XC.fmtInt(-days) + ' 天') : '';
    return '<div class="cell-title">' + esc(game.launch_date) + '</div><div class="cell-sub">' + esc(sub) + '</div>';
  }

  /* 搜索水位：展示用现状指标（7 日序列均值经冷/热锚点折线定标，冷锚为 50 分界，越界不截断），不参与评分 */
  function levelCell(game) {
    const value = game.trends_level;
    const note = game.trends_level_note || '水位不可用';
    if (!num(value)) {
      return '<div class="cell-title">—</div><div class="cell-sub">' + esc(note) + '</div>';
    }
    return '<div class="score-cell">' +
      '<span class="score-num" style="font-size:15px">' + esc(XC.fmt(value, 1)) + '</span>' +
      '<span class="score-bar"><span class="score-bar-fill ' + (game.trends_level_stale ? 'lv-c' : 'lv-b') +
        '" style="width:' + XC.clamp(value, 0, 100) + '%"></span></span>' +
      '<span class="cell-sub">' + esc(note) + '</span>' +
      '</div>';
  }

  /* 水位名次：1 = 水位最高；同值已由后端按次键唯一化，故每款名次不重复 */
  function rankCell(game) {
    const rank = game.trends_level_rank;
    if (!num(rank)) return '<span class="cell-sub">未取到水位</span>';
    return '<div class="cell-title" style="font-size:15px">#' + XC.fmtInt(rank) + '</div>';
  }

  function sourceCell(game) {
    const parts = [];
    (game.sources_used || []).slice(0, 2).forEach(function (text) {
      parts.push('<span class="src src-p1">' + esc(text) + '</span>');
    });
    (game.fallbacks || []).slice(0, 2).forEach(function (text) {
      parts.push('<span class="src src-fallback">' + esc(text) + '</span>');
    });
    if (game.stale) parts.push('<span class="src src-stale">stale</span>');
    if (!parts.length) parts.push('<span class="src src-none">无信号</span>');
    return '<div class="src-row">' + parts.join('') + '</div>';
  }

  /* 机会象限：水位（需求规模）× Trends 7d（时机），仅展示与排序，不进总分。
     缺水位或变化率时为「象限未知」，不按上次有效值硬塞进某一格。 */
  function oppCell(game) {
    const opp = game.opportunity;
    if (!opp || !opp.key) return '<span class="cell-sub">—</span>';
    return '<span class="opp opp-' + esc(opp.key) + '">' + esc(opp.label) + '</span>' +
      '<div class="cell-sub">' + esc(opp.note || '') + '</div>';
  }

  function renderTable() {
    const games = (GAMES.games || []).filter(function (game) {
      if (view.priority !== 'all' && game.priority !== view.priority) return false;
      if (view.status !== 'all' && game.status !== view.status) return false;
      if (view.q) {
        const haystack = [game.name_cn, game.name_en, game.publisher, game.note].join(' ').toLowerCase();
        if (haystack.indexOf(view.q) < 0) return false;
      }
      return true;
    }).sort(compareGames);

    XC.$('result-count').textContent = '显示 ' + games.length + ' / ' + (GAMES.games || []).length + ' 款';
    XC.$('empty-state').hidden = games.length > 0;

    XC.$('game-body').innerHTML = games.map(function (game) {
      return '<tr>' +
        '<td class="col-first"><a href="detail.html?id=' + encodeURIComponent(game.id) + '">' +
          '<span class="game-name">' + esc(game.name_cn) + '</span></a>' +
          '<div class="game-name-en">' + esc(game.name_en || '') + '</div>' +
          '<div class="cell-sub">' + esc(game.publisher || '') + ' · ' + esc(game.type || '') + '</div></td>' +
        '<td>' + XC.prioTag(game.priority) + '<div class="cell-sub">#' + XC.fmtInt(game.seq) + '</div></td>' +
        '<td>' + oppCell(game) + '</td>' +
        '<td><div class="cell-title">' + esc(game.status || '—') + '</div>' +
          '<div class="cell-sub">' + esc(game.launch_date_raw || '') + '</div>' +
          countdownTag(game) + '</td>' +
        '<td><div class="cell-title">' + esc(game.cn_status || '—') + '</div></td>' +
        '<td>' + launchCell(game) + '</td>' +
        '<td>' + levelCell(game) + '</td>' +
        '<td>' + rankCell(game) + '</td>' +
        '<td>' + componentCell(componentOf(game, 'trends_rise')) + '</td>' +
        '<td>' + componentCell(componentOf(game, 'reddit')) + '</td>' +
        '<td>' + componentCell(componentOf(game, 'x_official')) + '</td>' +
        '<td>' + componentCell(componentOf(game, 'supply_gap')) + '</td>' +
        '<td>' + componentCell(componentOf(game, 'cn_maturity')) + '</td>' +
        '<td>' + componentCell(componentOf(game, 'launch_window')) + '</td>' +
        '<td>' + XC.scoreCell(game.total, game.delta) + '</td>' +
        '<td>' + XC.actionBadge(game.action_engine) + '</td>' +
        '<td>' + XC.confBadge(game.confidence) +
          (game.base_score_applied ? '<div><span class="badge badge-base">基础分 20</span></div>' : '') + '</td>' +
        '<td>' + sourceCell(game) + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 筛选与排序 ---------- */

  function chipRow(containerId, values, key) {
    const box = XC.$(containerId);
    const options = ['all'].concat(values);
    box.innerHTML = options.map(function (value) {
      const label = value === 'all' ? '全部' : value;
      return '<button class="chip" type="button" data-value="' + esc(value) + '" aria-pressed="' +
        (String(view[key]) === String(value) ? 'true' : 'false') + '">' + esc(label) + '</button>';
    }).join('');
    box.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function () {
        view[key] = button.getAttribute('data-value');
        syncChips();
        renderTable();
      });
    });
  }

  function syncChips() {
    [['filter-priority', 'priority'], ['filter-status', 'status']].forEach(function (pair) {
      XC.$(pair[0]).querySelectorAll('button').forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-value') === view[pair[1]] ? 'true' : 'false');
      });
    });
  }

  function uniq(values) {
    const seen = [];
    values.forEach(function (value) { if (value && seen.indexOf(value) < 0) seen.push(value); });
    return seen;
  }

  function setupControls() {
    const games = GAMES.games || [];
    chipRow('filter-priority', uniq(games.map(function (game) { return game.priority; })), 'priority');
    chipRow('filter-status', uniq(games.map(function (game) { return game.status; })), 'status');

    XC.$('search').addEventListener('input', function (event) {
      view.q = event.target.value.trim().toLowerCase();
      renderTable();
    });

    XC.$('reset').addEventListener('click', function () {
      view.priority = 'all';
      view.status = 'all';
      view.q = '';
      XC.$('search').value = '';
      syncChips();
      renderTable();
    });

    document.querySelectorAll('.th-btn').forEach(function (button) {
      const key = button.getAttribute('data-sort-key');
      if (key === view.sortKey) button.setAttribute('data-dir', view.sortDir);
      button.addEventListener('click', function () {
        if (view.sortKey === key) {
          view.sortDir = view.sortDir === 'desc' ? 'asc' : 'desc';
        } else {
          view.sortKey = key;
          /* 机会象限 rank 1 最优，切到该列时默认升序；其余列沿用降序 */
          view.sortDir = key === 'opportunity' ? 'asc' : 'desc';
        }
        document.querySelectorAll('.th-btn').forEach(function (other) { other.removeAttribute('data-dir'); });
        button.setAttribute('data-dir', view.sortDir);
        renderTable();
      });
    });
  }

  /* ---------- 数据源健康 ---------- */

  function renderHealth() {
    XC.$('health-body').innerHTML = XC.healthRowsHtml(OPS.health);
  }

  /* ---------- 新游候选入口（发现层缺失时静默，不影响总览） ---------- */

  async function loadDiscover() {
    try {
      const data = await XC.loadData('discover', 'XC_DISCOVER');
      const chip = XC.$('cand-chip');
      if (!chip) return;
      const counts = (data.meta && data.meta.counts) || {};
      const count = XC.isNum(counts.candidates) ? counts.candidates : (data.candidates || []).length;
      chip.textContent = '新游候选 ' + XC.fmtInt(count);
      chip.hidden = false;
    } catch (error) {
      /* 发现层数据缺失不阻断总览 */
    }
  }

  /* ---------- 启动 ---------- */

  async function boot() {
    XC.initPage();
    try {
      const loaded = await Promise.all([
        XC.loadData('games', 'XC_GAMES'),
        XC.loadData('keywords', 'XC_KEYWORDS'),
        XC.loadData('ops', 'XC_OPS'),
      ]);
      GAMES = loaded[0];
      KEYWORDS = loaded[1];
      OPS = loaded[2];
    } catch (error) {
      XC.fail('empty-state', error);
      return;
    }
    XC.renderMeta(GAMES.meta);
    renderKpi();
    renderOpps();
    setupSim();
    setupControls();
    renderTable();
    renderHealth();
    loadDiscover();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
