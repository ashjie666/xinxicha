/* ==========================================================================
   xinxicha · 新游候选发现层（discover.html）
   候选清单 / 扫描目标与命中 / 已在监控清单
   候选只提示、不入库、不参与评分
   ========================================================================== */

'use strict';

(function () {
  let DATA = null;

  function esc(text) { return XC.escapeHtml(text); }

  /* ---------- 关键指标 ---------- */

  function kpi(label, value, unit, sub, cls) {
    return '<div class="kpi ' + (cls || '') + '">' +
      '<div class="kpi-label">' + esc(label) + '</div>' +
      '<div class="kpi-value">' + esc(value) + (unit ? '<span class="kpi-unit">' + esc(unit) + '</span>' : '') + '</div>' +
      (sub ? '<div class="kpi-sub">' + sub + '</div>' : '') +
      '</div>';
  }

  function renderKpi() {
    const counts = (DATA.meta && DATA.meta.counts) || {};
    const candidates = DATA.candidates || [];
    const targets = DATA.targets || [];
    const failed = targets.filter(function (row) { return !row.ok; });
    const okCls = failed.length === 0 ? 'kpi-good' : (failed.length === targets.length ? 'kpi-bad' : 'kpi-warn');

    XC.$('kpi-grid').innerHTML = [
      kpi('新游候选', XC.fmtInt(candidates.length), '条',
        DATA.truncated ? '已按上限截断' : '已过滤已知 20 款', candidates.length ? 'kpi-good' : ''),
      kpi('扫描目标可用', XC.fmtInt(counts.targets_ok), ' / ' + XC.fmtInt(counts.targets),
        failed.length ? XC.fmtInt(failed.length) + ' 个目标未取到数据' : '全部目标正常', okCls),
      kpi('已在监控', XC.fmtInt(counts.known_games), '款', '标题命中即自动过滤', ''),
      kpi('数据生成', DATA.meta.generated_at_cst ? DATA.meta.generated_at_cst.slice(5, 16) : '—', '',
        'CST · ' + esc(DATA.meta.data_mode || '—'), ''),
    ].join('');

    const note = XC.$('kpi-note');
    if (note) note.textContent = '数据模式 ' + (DATA.meta.data_mode || '—') + ' · 生成于 ' + (DATA.meta.generated_at_cst || '—') + ' CST';
  }

  /* ---------- 候选清单 ---------- */

  function kindTag(kind) {
    const isPub = kind === 'publisher';
    return '<span class="src ' + (isPub ? 'src-p1' : 'src-p2') + '">' + (isPub ? '厂商' : '品类') + '</span>';
  }

  function renderCandidates() {
    const list = DATA.candidates || [];
    XC.$('cand-empty').hidden = list.length > 0;
    XC.$('cand-body').innerHTML = list.map(function (record) {
      const link = record.url
        ? '<a href="' + esc(record.url) + '" target="_blank" rel="noopener">' + esc(record.title) + '</a>'
        : esc(record.title);
      return '<tr>' +
        '<td class="col-first"><span class="cell-sub">' + esc(record.published || '时间未知') + '</span></td>' +
        '<td>' + link + (record.summary ? '<div class="cell-sub">' + esc(record.summary) + '</div>' : '') + '</td>' +
        '<td>' + kindTag(record.kind) + '<div class="cell-sub">' + esc(record.category || '—') + '</div></td>' +
        '<td><div class="cell-title">' + esc(record.query || '—') + '</div>' +
          '<div class="cell-sub">' + esc(record.target || '') + '</div></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 扫描目标与命中 ---------- */

  function renderTargets() {
    XC.$('target-body').innerHTML = (DATA.targets || []).map(function (row) {
      const status = row.ok
        ? '<span class="src src-p1">OK</span>'
        : '<span class="src src-none">' + esc(row.error || '失败') + '</span>';
      return '<tr>' +
        '<td class="col-first">' + kindTag(row.kind) +
          '<span class="cell-title"> ' + esc(row.label || '—') + '</span></td>' +
        '<td><span class="cell-sub">' + (row.kind === 'publisher' ? '厂商' : '品类') + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.category || '—') + '</span></td>' +
        '<td><span class="cell-title">' + esc(row.query || '—') + '</span></td>' +
        '<td>' + XC.fmtInt(row.hits) + '</td>' +
        '<td>' + XC.fmtInt(row.new) + '</td>' +
        '<td>' + status + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 已在监控 ---------- */

  function renderKnown() {
    const list = DATA.known_games || [];
    XC.$('known-chips').innerHTML = list.map(function (game) {
      return '<span class="chip chip-quiet">' + esc(game.name_cn) +
        (game.name_en && game.name_en !== game.name_cn ? ' · ' + esc(game.name_en) : '') + '</span>';
    }).join('');
  }

  /* ---------- 启动 ---------- */

  async function boot() {
    XC.initPage();
    try {
      DATA = await XC.loadData('discover', 'XC_DISCOVER');
    } catch (error) {
      XC.fail('cand-empty', error);
      return;
    }
    XC.renderMeta(DATA.meta);
    renderKpi();
    renderCandidates();
    renderTargets();
    renderKnown();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
