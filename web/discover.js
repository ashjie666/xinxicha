/* ==========================================================================
   xinxicha · 新游候选发现层（discover.html）
   候选清单 / 扫描目标与命中 / 已在监控清单
   候选只提示、不入库、不参与评分
   ========================================================================== */

'use strict';

(function () {
  let DATA = null;
  let SEED_CTX = null;   // 当前弹窗对应的候选记录

  // 部署 Cloudflare Worker（worker/add-game.js）后填入其地址，例如
  // https://xinxicha-add-game.<your-name>.workers.dev 。留空则只保留复制/下载。
  const ADD_ENDPOINT = 'https://xinxicha-add-game.wonder-2012.workers.dev/';

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
    const rel = DATA.relevance || {};
    const candidates = DATA.candidates || [];
    const targets = DATA.targets || [];
    const failed = targets.filter(function (row) { return !row.ok; });
    const okCls = failed.length === 0 ? 'kpi-good' : (failed.length === targets.length ? 'kpi-bad' : 'kpi-warn');
    const candSub = (DATA.truncated ? '已按上限截断 · ' : '') + (rel.enabled
      ? '相关性剔除 ' + XC.fmtInt(counts.dropped_total || 0) + ' 条'
      : '已过滤已知 20 款');

    XC.$('kpi-grid').innerHTML = [
      kpi('新游候选', XC.fmtInt(candidates.length), '条', candSub, candidates.length ? 'kpi-good' : ''),
      kpi('扫描目标可用', XC.fmtInt(counts.targets_ok), ' / ' + XC.fmtInt(counts.targets),
        failed.length ? XC.fmtInt(failed.length) + ' 个目标未取到数据' : '全部目标正常', okCls),
      kpi('已在监控', XC.fmtInt(counts.known_games), '款', '标题命中即自动过滤', ''),
      kpi('数据生成', DATA.meta.generated_at_cst ? DATA.meta.generated_at_cst.slice(5, 16) : '—', '',
        'CST · ' + esc(DATA.meta.data_mode || '—'), ''),
    ].join('');

    const note = XC.$('kpi-note');
    if (note) note.textContent = '数据模式 ' + (DATA.meta.data_mode || '—') + ' · 生成于 ' + (DATA.meta.generated_at_cst || '—') + ' CST';

    const candNote = XC.$('cand-note');
    if (candNote && rel.enabled) {
      candNote.innerHTML += ' · 相关性过滤已启用（目标词 + ' + XC.fmtInt((rel.game_terms || []).length) + ' 个游戏类词）';
    }
  }

  /* ---------- 候选清单 ---------- */

  function kindTag(kind) {
    const isPub = kind === 'publisher';
    return '<span class="src ' + (isPub ? 'src-p1' : 'src-p2') + '">' + (isPub ? '厂商' : '品类') + '</span>';
  }

  function hitCell(record) {
    if (!record.hit_target && !record.hit_theme) return '<span class="cell-sub">未启用</span>';
    return esc(record.hit_target || '—') + '<span class="cell-sub"> + </span>' + esc(record.hit_theme || '—');
  }

  function renderCandidates() {
    const list = DATA.candidates || [];
    XC.$('cand-empty').hidden = list.length > 0;
    XC.$('cand-body').innerHTML = list.map(function (record, index) {
      const link = record.url
        ? '<a href="' + esc(record.url) + '" target="_blank" rel="noopener">' + esc(record.title) + '</a>'
        : esc(record.title);
      return '<tr>' +
        '<td class="col-first"><span class="cell-sub">' + esc(record.published || '时间未知') + '</span></td>' +
        '<td>' + link + (record.summary ? '<div class="cell-sub">' + esc(record.summary) + '</div>' : '') + '</td>' +
        '<td>' + kindTag(record.kind) + '<div class="cell-sub">' + esc(record.category || '—') + '</div></td>' +
        '<td>' + hitCell(record) + '</td>' +
        '<td><div class="cell-title">' + esc(record.query || '—') + '</div>' +
          '<div class="cell-sub">' + esc(record.target || '') + '</div></td>' +
        '<td data-label="操作"><button type="button" class="add-btn" data-index="' + index + '">加入监控</button></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 候选 → 加入监控：生成 seed_games.json 条目 ----------
     纯静态站没有写仓库的能力，所以这里不直接入库，而是生成一条可复制 /
     可下载的基线条目，由人工粘进 data/seed_games.json 后随提交生效。 */

  function slugify(text) {
    return String(text || '').toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function seedItem() {
    const record = SEED_CTX ? SEED_CTX.record : {};
    const seq = DATA.next_seq || ((DATA.known_games || []).length + 1);
    const nameEn = (XC.$('seed-name-en').value || '').trim();
    const nameCn = (XC.$('seed-name-cn').value || '').trim();
    const publisher = (XC.$('seed-publisher').value || '').trim();
    const source = [
      '候选来源：' + (record.target || '—'),
      record.title || '',
      record.published || '',
      record.url || '',
    ].filter(Boolean).join('｜');
    return {
      id: slugify(nameEn) || ('new-game-' + seq),
      seq: seq,
      name_cn: nameCn,
      name_en: nameEn,
      publisher: publisher,
      type: XC.$('seed-type').value,
      status: '未上线',
      cn_status: '未知',
      launch_date_raw: '未公布',
      launch_date: null,
      cn_guide_score: 1,
      gap_level: '中',
      trends_7d: null,
      reddit_daily: null,
      x_mentions: null,
      total_score: null,
      action_manual: '待人工评估（信号未积累）',
      priority: XC.$('seed-priority').value,
      note: source + '\n需人工补：国内攻略成熟度 / 海外供给缺口 / 上线档期',
      signal_source: 'P1: Trends+Reddit+X',
      confidence: '低',
      last_update: (DATA.meta.generated_at_cst || '').slice(0, 10),
    };
  }

  function refreshSeed() {
    const item = seedItem();
    XC.$('seed-json').textContent = JSON.stringify(item, null, 2);

    const status = XC.$('seed-status');
    if (!item.name_cn || !item.name_en) {
      status.textContent = '补全中文名与英文名后即可复制';
      return;
    }
    const dup = (DATA.known_games || []).some(function (game) { return game.id === item.id; });
    status.textContent = dup ? 'id 已存在于监控清单，请改用不同的英文名' : '就绪：复制后粘到 games 数组末尾';
  }

  function openSeed(index) {
    const record = (DATA.candidates || [])[index];
    if (!record) return;
    SEED_CTX = { record: record };
    XC.$('seed-name-cn').value = '';
    XC.$('seed-name-en').value = '';
    XC.$('seed-publisher').value = record.kind === 'publisher' ? (record.target || '') : '';
    XC.$('seed-type').value = '手游';
    XC.$('seed-priority').value = 'P1';
    XC.$('seed-source').textContent = '来源：' + (record.target || '—') + ' · ' +
      (record.published || '时间未知') + ' · ' + (record.title || '');
    XC.$('seed-token').value = localStorage.getItem('xc_add_token') || '';
    XC.$('seed-push-status').textContent = '';
    XC.$('seed-push').disabled = false;
    XC.$('seed-push').textContent = '直接入库';
    refreshSeed();

    const dialog = XC.$('seed-dialog');
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute('open', '');
    XC.$('seed-name-cn').focus();
  }

  function copySeed() {
    const text = XC.$('seed-json').textContent;
    const done = function (ok) {
      XC.$('seed-status').textContent = ok ? '已复制到剪贴板' : '复制被浏览器拒绝，已选中 JSON，请按 Ctrl+C';
      if (!ok) selectSeed();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
    } else {
      done(fallbackCopy(text));
    }
  }

  function fallbackCopy(text) {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (error) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }

  async function pushSeed() {
    const status = XC.$('seed-push-status');
    const button = XC.$('seed-push');
    const item = seedItem();
    if (!item.name_cn || !item.name_en) {
      status.textContent = '先补全中文名与英文名';
      return;
    }

    let token = (XC.$('seed-token').value || '').trim();
    if (!token) {
      token = localStorage.getItem('xc_add_token') || '';
      XC.$('seed-token').value = token;
    }
    if (!token) {
      status.textContent = '请填写入库口令';
      XC.$('seed-token').focus();
      return;
    }
    localStorage.setItem('xc_add_token', token);

    button.disabled = true;
    status.textContent = '正在写入…';
    try {
      const response = await fetch(ADD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ game: item }),
      });
      const data = await response.json().catch(function () { return {}; });
      if (!response.ok) throw new Error(data.error || ('HTTP ' + response.status));
      status.textContent = '已入库（seq ' + data.seq + '）· CI 重建后进入监控名单';
      button.textContent = '已入库';
    } catch (error) {
      status.textContent = '入库失败：' + error.message + '（可改用复制方式）';
      button.disabled = false;
    }
  }

  function selectSeed() {
    const node = XC.$('seed-json');
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function downloadSeed() {
    const item = seedItem();
    const blob = new Blob([JSON.stringify(item, null, 2) + '\n'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'seed-' + (item.id || 'game') + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        '<td>' + XC.fmtInt(row.dropped_target) + ' / ' + XC.fmtInt(row.dropped_theme) + '</td>' +
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

  function bindSeed() {
    XC.$('cand-body').addEventListener('click', function (event) {
      const button = event.target.closest ? event.target.closest('.add-btn') : null;
      if (!button) return;
      openSeed(Number(button.getAttribute('data-index')));
    });
    ['seed-name-cn', 'seed-name-en', 'seed-publisher'].forEach(function (id) {
      XC.$(id).addEventListener('input', refreshSeed);
    });
    ['seed-type', 'seed-priority'].forEach(function (id) {
      XC.$(id).addEventListener('change', refreshSeed);
    });
    XC.$('seed-copy').addEventListener('click', copySeed);
    XC.$('seed-download').addEventListener('click', downloadSeed);

    if (ADD_ENDPOINT) {
      XC.$('seed-push-wrap').hidden = false;
      XC.$('seed-push').addEventListener('click', pushSeed);
    }
  }

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
    bindSeed();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
