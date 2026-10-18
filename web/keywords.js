/* ==========================================================================
   xinxicha · 关键词矩阵页（keywords.html）
   50 个英文 SEO 关键词：按游戏 / 意图 / 覆盖情况筛选，支持排序与搜索
   ========================================================================== */

'use strict';

(function () {
  let KEYWORDS = null;
  let GAMES = null;
  let NAME_BY_ID = {};

  const view = { game: 'all', intent: 'all', covered: 'all', q: '', sortKey: 'competition', sortDir: 'desc' };

  function esc(text) { return XC.escapeHtml(text); }
  function num(value) { return XC.isNum(value); }

  function kpi(label, value, unit, sub, cls) {
    return '<div class="kpi ' + (cls || '') + '">' +
      '<div class="kpi-label">' + esc(label) + '</div>' +
      '<div class="kpi-value">' + esc(value) + (unit ? '<span class="kpi-unit">' + esc(unit) + '</span>' : '') + '</div>' +
      (sub ? '<div class="kpi-sub">' + sub + '</div>' : '') +
      '</div>';
  }

  function compare(a, b) {
    const va = a[view.sortKey];
    const vb = b[view.sortKey];
    const missingA = va === null || va === undefined || va === '';
    const missingB = vb === null || vb === undefined || vb === '';
    let result;
    if (missingA && missingB) result = 0;
    else if (missingA) result = 1;
    else if (missingB) result = -1;
    else if (typeof va === 'number' && typeof vb === 'number') result = va - vb;
    else result = String(va).localeCompare(String(vb), 'zh-Hans-CN');
    return view.sortDir === 'asc' ? result : -result;
  }

  /* ---------- KPI ---------- */

  function renderKpi() {
    const meta = (KEYWORDS && KEYWORDS.meta && KEYWORDS.meta.counts) || {};
    const list = (KEYWORDS && KEYWORDS.keywords) || [];
    const high = list.filter(function (keyword) { return Number(keyword.competition) >= 4; }).length;
    const games = Object.keys((KEYWORDS && KEYWORDS.by_game) || {}).filter(function (key) { return key !== 'all'; }).length;
    const avg = list.length ? list.reduce(function (sum, keyword) { return sum + (Number(keyword.competition) || 0); }, 0) / list.length : 0;

    XC.$('kw-kpi').innerHTML = [
      kpi('关键词总数', XC.fmtInt(meta.keywords), '个', '规格表 Sheet3 基线', ''),
      kpi('已覆盖', XC.fmtInt(meta.covered), '个', '已发布页面并回填', meta.covered ? 'kpi-good' : ''),
      kpi('未覆盖', XC.fmtInt(meta.not_covered), '个', '待创作/待占位', 'kpi-warn'),
      kpi('高竞争词', XC.fmtInt(high), '个', '竞争度 ≥ 4', ''),
      kpi('平均竞争度', XC.fmt(avg, 1), ' / 5', '越低越好抢', ''),
      kpi('覆盖游戏', XC.fmtInt(games), '款', '词表已分配游戏', ''),
    ].join('');
    XC.$('kw-note').textContent = '数据模式 ' + (KEYWORDS.meta.data_mode || '—') + ' · 生成于 ' + (KEYWORDS.meta.generated_at_cst || '—') + ' CST';
  }

  /* ---------- 表格 ---------- */

  function renderTable() {
    const all = (KEYWORDS && KEYWORDS.keywords) || [];
    const list = all.filter(function (keyword) {
      if (view.game !== 'all' && keyword.game_cn !== view.game) return false;
      if (view.intent !== 'all' && keyword.intent !== view.intent) return false;
      if (view.covered !== 'all' && (keyword.covered || '否') !== view.covered) return false;
      if (view.q) {
        const haystack = [keyword.keyword, keyword.page_plan, keyword.note, keyword.game_cn].join(' ').toLowerCase();
        if (haystack.indexOf(view.q) < 0) return false;
      }
      return true;
    }).sort(compare);

    XC.$('result-count').textContent = '显示 ' + list.length + ' / ' + all.length + ' 个关键词';
    XC.$('empty-state').hidden = list.length > 0;

    XC.$('kw-body').innerHTML = list.map(function (keyword) {
      const gameId = keyword.game_id || '';
      const name = keyword.game_cn || NAME_BY_ID[gameId] || '未分配';
      const diff = Number(keyword.competition);
      const cls = diff >= 4 ? 'lv-midlow' : (diff >= 3 ? 'lv-mid' : 'lv-high');
      return '<tr>' +
        '<td class="col-first"><span class="cell-title">' + esc(keyword.keyword) + '</span>' +
          '<div class="cell-sub">#' + XC.fmtInt(keyword.id) + '</div></td>' +
        '<td>' + (gameId
          ? '<a href="detail.html?id=' + encodeURIComponent(gameId) + '">' + esc(name) + '</a>'
          : '<span class="cell-sub">' + esc(name) + '</span>') + '</td>' +
        '<td><span class="tag">' + esc(keyword.intent) + '</span></td>' +
        '<td><span class="lv ' + cls + '">' + XC.fmtInt(diff) + '</span></td>' +
        '<td><span class="cell-sub">' + (num(keyword.trends_7d) ? XC.fmt(keyword.trends_7d, 1) : '—') + '</span></td>' +
        '<td>' + (keyword.covered === '是'
          ? '<span class="src src-p1">已覆盖</span>'
          : '<span class="src src-fallback">未覆盖</span>') + '</td>' +
        '<td><span class="cell-sub">' + esc(keyword.page_plan) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(keyword.note) + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 筛选 ---------- */

  function uniq(values) {
    const seen = [];
    values.forEach(function (value) { if (value && seen.indexOf(value) < 0) seen.push(value); });
    return seen;
  }

  function chipRow(containerId, values, key) {
    const box = XC.$(containerId);
    box.innerHTML = ['all'].concat(values).map(function (value) {
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
    [['filter-game', 'game'], ['filter-intent', 'intent'], ['filter-covered', 'covered']].forEach(function (pair) {
      XC.$(pair[0]).querySelectorAll('button').forEach(function (button) {
        button.setAttribute('aria-pressed', button.getAttribute('data-value') === view[pair[1]] ? 'true' : 'false');
      });
    });
  }

  function setupControls() {
    const list = (KEYWORDS && KEYWORDS.keywords) || [];
    chipRow('filter-game', uniq(list.map(function (keyword) { return keyword.game_cn; })), 'game');
    chipRow('filter-intent', uniq(list.map(function (keyword) { return keyword.intent; })), 'intent');
    chipRow('filter-covered', ['是', '否'], 'covered');

    XC.$('search').addEventListener('input', function (event) {
      view.q = event.target.value.trim().toLowerCase();
      renderTable();
    });

    XC.$('reset').addEventListener('click', function () {
      view.game = 'all';
      view.intent = 'all';
      view.covered = 'all';
      view.q = '';
      XC.$('search').value = '';
      syncChips();
      renderTable();
    });

    document.querySelectorAll('.th-btn').forEach(function (button) {
      const key = button.getAttribute('data-sort-key');
      if (key === view.sortKey) button.setAttribute('data-dir', view.sortDir);
      button.addEventListener('click', function () {
        if (view.sortKey === key) view.sortDir = view.sortDir === 'desc' ? 'asc' : 'desc';
        else { view.sortKey = key; view.sortDir = 'desc'; }
        document.querySelectorAll('.th-btn').forEach(function (other) { other.removeAttribute('data-dir'); });
        button.setAttribute('data-dir', view.sortDir);
        renderTable();
      });
    });
  }

  /* ---------- 启动 ---------- */

  async function boot() {
    XC.initPage();
    try {
      const loaded = await Promise.all([
        XC.loadData('keywords', 'XC_KEYWORDS'),
        XC.loadData('games', 'XC_GAMES'),
      ]);
      KEYWORDS = loaded[0];
      GAMES = loaded[1];
    } catch (error) {
      XC.fail('empty-state', error);
      return;
    }
    (GAMES.games || []).forEach(function (game) { NAME_BY_ID[game.id] = game.name_cn; });
    XC.renderMeta(KEYWORDS.meta);
    renderKpi();
    setupControls();
    renderTable();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
