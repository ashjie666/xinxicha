/* ==========================================================================
   xinxicha · 新游候选发现层（discover.html）
   候选清单 / 扫描目标与命中 / 已在监控清单
   候选只提示、不入库、不参与评分
   ========================================================================== */

'use strict';

(function () {
  let DATA = null;
  let SEED_CTX = null;   // 当前弹窗对应的候选记录

  // 部署 Cloudflare Worker（worker/add-game.js）后填入其地址。留空则只保留复制/下载。
  // 2026-10-27：workers.dev 在国内被 DNS 污染（解析到 108.160.165.173），
  // 浏览器直连必然 Failed to fetch，故改用绑定在 Worker 上的自定义域名。
  const ADD_ENDPOINT = 'https://add.mypetitplanet.fun/';

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
      ? '剔除 ' + XC.fmtInt(counts.dropped_total || 0) + ' 条（目标/档期/过期/扩展）'
      : '已过滤已知 ' + XC.fmtInt(counts.known_games || 0) + ' 款');

    XC.$('kpi-grid').innerHTML = [
      kpi('新游候选', XC.fmtInt(candidates.length), '条', candSub, candidates.length ? 'kpi-good' : ''),
      kpi('扫描目标可用', XC.fmtInt(counts.targets_ok), ' / ' + XC.fmtInt(counts.targets),
        failed.length ? XC.fmtInt(failed.length) + ' 个目标未取到数据' : '全部目标正常', okCls),
      kpi('已在监控', XC.fmtInt(counts.known_games), '款', '标题命中即自动过滤', ''),
      kpi('数据生成', DATA.meta.generated_at_cst ? DATA.meta.generated_at_cst.slice(5, 16) : '—', '',
        'CST · ' + esc(DATA.meta.data_mode || '—'), ''),
    ].join('');

    const publishers = targets.filter(function (row) { return row.kind === 'publisher'; }).length;
    const targetNote = XC.$('target-note');
    if (targetNote) {
      targetNote.textContent = '当前 ' + XC.fmtInt(targets.length) + ' 个检索目标（厂商 ' +
        XC.fmtInt(publishers) + ' + 品类 ' + XC.fmtInt(targets.length - publishers) +
        '），逐个走 Bing News RSS；「新增」= 已知游戏过滤 + 相关性过滤后的去重候选数，「过滤丢弃」= 未命中目标词 / 未命中档期词 / 超过 ' +
        XC.fmtInt(counts.max_age_days || 0) + ' 天的旧闻 / 命中扩展内容词（资料片、DLC 等）';
    }
    if (XC.$('footer-target-count')) XC.$('footer-target-count').textContent = XC.fmtInt(targets.length);
    if (XC.$('footer-known-count')) XC.$('footer-known-count').textContent = XC.fmtInt(counts.known_games);
    if (XC.$('footer-age-days')) XC.$('footer-age-days').textContent = XC.fmtInt(counts.max_age_days || 0);

    const note = XC.$('kpi-note');
    if (note) note.textContent = '数据模式 ' + (DATA.meta.data_mode || '—') + ' · 生成于 ' + (DATA.meta.generated_at_cst || '—') + ' CST';

    const candNote = XC.$('cand-note');
    if (candNote && rel.enabled) {
      candNote.innerHTML += ' · 相关性过滤已启用（目标词 + ' + XC.fmtInt((rel.launch_terms || []).length) + ' 个档期词，未命中档期词不展示）';
    }
  }

  /* ---------- 候选清单 ---------- */

  function kindTag(kind) {
    const isPub = kind === 'publisher';
    return '<span class="src ' + (isPub ? 'src-p1' : 'src-p2') + '">' + (isPub ? '厂商' : '品类') + '</span>';
  }

  function hitCell(record) {
    if (!record.hit_target && !record.hit_theme && !record.hit_launch) return '<span class="cell-sub">未启用</span>';
    /* 三段固定展示：目标词 + 游戏类词 + 上线词（未命中显示「—」，便于看出是否带档期信息） */
    return esc(record.hit_target || '—') +
      '<span class="cell-sub"> + </span>' + esc(record.hit_theme || '—') +
      '<span class="cell-sub"> + </span>' + esc(record.hit_launch || '—');
  }

  /* 入库成功后在本机记一笔，刷新或次日重抓同一候选时按钮直接显示「已入库」，避免重复推送。
     只存在浏览器 localStorage，不上传；按「标题 + 发布时间」作为候选的唯一键。 */
  const ADDED_KEY = 'xc_added_games';

  function addedMap() {
    try { return JSON.parse(localStorage.getItem(ADDED_KEY) || '{}') || {}; } catch (error) { return {}; }
  }

  function rowKey(record) {
    return (record.title || '') + '|' + (record.published || '');
  }

  function markAdded(record, seq) {
    const map = addedMap();
    map[rowKey(record)] = { seq: seq === undefined ? null : seq, at: new Date().toISOString().slice(0, 10) };
    try { localStorage.setItem(ADDED_KEY, JSON.stringify(map)); } catch (error) { /* 隐私模式忽略 */ }
  }

  function renderCandidates() {
    const list = DATA.candidates || [];
    const added = addedMap();
    XC.$('cand-empty').hidden = list.length > 0;
    XC.$('cand-body').innerHTML = list.map(function (record, index) {
      const link = record.url
        ? '<a href="' + esc(record.url) + '" target="_blank" rel="noopener">' + esc(record.title) + '</a>'
        : esc(record.title);
      const marked = added[rowKey(record)];
      const action = marked
        ? '<button type="button" class="add-btn" disabled title="已于 ' + esc(marked.at || '') +
          (marked.seq ? ' 入库，seq ' + esc(marked.seq) : ' 入库') + '">已入库</button>'
        : '<button type="button" class="add-btn" data-index="' + index + '">加入监控</button>';
      return '<tr>' +
        '<td class="col-first"><span class="cell-sub">' + esc(record.published || '时间未知') + '</span></td>' +
        '<td>' + link + (record.summary ? '<div class="cell-sub">' + esc(record.summary) + '</div>' : '') + '</td>' +
        '<td>' + kindTag(record.kind) + '<div class="cell-sub">' + esc(record.category || '—') + '</div></td>' +
        '<td>' + hitCell(record) + '</td>' +
        '<td><div class="cell-title">' + esc(record.query || '—') + '</div>' +
          '<div class="cell-sub">' + esc(record.target || '') + '</div></td>' +
        '<td data-label="操作">' + action + '</td>' +
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
    const known = DATA.known_games || [];
    const dupCn = item.name_cn && known.some(function (game) { return game.name_cn === item.name_cn; });
    if (dupCn) {
      status.textContent = '「' + item.name_cn + '」已在监控清单，无需重复入库';
      return;
    }
    if (!item.name_cn || !item.name_en) {
      status.textContent = '补全中文名与英文名后即可复制';
      return;
    }
    const dupId = known.some(function (game) { return game.id === item.id; });
    status.textContent = dupId
      ? 'id 已存在于监控清单，请改用不同的英文名'
      : '就绪：可复制或直接入库';
  }

  // 从一条候选记录里尽量预填：中文名（标题《》内）、厂商（摘要里「xx工作室/STUDIO」或已知厂商词）
  // 英文名不猜（它同时是 Trends/Reddit/X 的检索词，错了会污染信号），先给占位 id。
  // 行业报告/榜单类标题里的《》不是游戏名，避免误填
  const NOT_A_GAME = /(报告|白皮书|榜单|排行|数据|财报|季度|年度|观察|分析)/;

  function titleName(record) {
    // 标题里常把游戏名写在《》里；标题没有时退到摘要（首段通常也带书名号）
    const match = /《([^《》]{1,20})》/.exec((record.title || '') + ' ' + (record.summary || ''));
    if (!match || NOT_A_GAME.test(match[1])) return '';
    return match[1].trim();
  }
  function cleanStudio(value) {
    // 「腾讯游戏旗下的宇宙小狗工作室」→「宇宙小狗工作室」
    return value.replace(/^.*(?:的|旗下|由|来自)/, '').trim();
  }
  function pickPublisher(record) {
    const text = (record.summary || '') + ' ' + (record.title || '');
    const studio = /([\u4e00-\u9fa5A-Za-z·]{2,24}?(?:工作室群|工作室|STUDIO|Studio|GAMES|Games))/i.exec(text);
    if (studio) {
      const name = cleanStudio(studio[1]);
      if (name) return name;
    }
    const known = /(腾讯|网易|米哈游|莉莉丝|库洛|鹰角|三七互娱|吉比特|雷霆游戏|散爆|叠纸|完美世界|西山居|巨人网络)/.exec(text);
    return known ? known[1] : (record.target || '');
  }

  // 类型按摘要里的平台词推断：只提 PC/主机 相关词 → PC/主机；只提手游 → 手游；两者都有 → 跨端
  function pickType(record) {
    const text = (record.summary || '') + ' ' + (record.title || '');
    const pc = /(PS5|PS4|Xbox|Steam|主机|PC端|PC版|买断)/i.test(text);
    const mobile = /(手游|移动端|App Store|Google Play|iOS|安卓)/i.test(text);
    if (pc && mobile) return '跨端';
    if (pc) return 'PC/主机';
    return '手游';
  }

  function openSeed(index) {
    const record = (DATA.candidates || [])[index];
    if (!record) return;
    SEED_CTX = { record: record };

    const nameCn = titleName(record);
    const publisher = pickPublisher(record);

    XC.$('seed-name-cn').value = nameCn;
    XC.$('seed-name-en').value = '';
    XC.$('seed-publisher').value = publisher || '';
    XC.$('seed-type').value = pickType(record);
    XC.$('seed-priority').value = 'P1';
    XC.$('seed-source').textContent = '来源：' + (record.target || '—') + ' · ' +
      (record.published || '时间未知') + ' · ' + (record.title || '');
    XC.$('seed-token').value = localStorage.getItem('xc_add_token') || '';
    XC.$('seed-push-status').textContent = '';
    XC.$('seed-push').disabled = false;
    XC.$('seed-push').textContent = '直接入库';
    const marked = addedMap()[rowKey(record)];
    if (marked) {
      XC.$('seed-push-status').textContent = '该候选已于 ' + (marked.at || '') + ' 入库' +
        (marked.seq ? '（seq ' + marked.seq + '）' : '') + '，无需重复提交';
      XC.$('seed-push').disabled = true;
      XC.$('seed-push').textContent = '已入库';
    }
    refreshSeed();

    const dialog = XC.$('seed-dialog');
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute('open', '');
    if (nameCn) XC.$('seed-name-en').focus();
    else XC.$('seed-name-cn').focus();
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
      button.disabled = true;
      markAdded(SEED_CTX ? SEED_CTX.record : {}, data.seq);
      renderCandidates();
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
        '<td>' + XC.fmtInt(row.dropped_target) + ' / ' + XC.fmtInt(row.dropped_theme) + ' / ' +
          XC.fmtInt(row.dropped_old) + ' / ' + XC.fmtInt(row.dropped_extra) + '</td>' +
        '<td>' + XC.fmtInt(row.new) + '</td>' +
        '<td>' + status + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 已在监控 ---------- */

  function renderKnown() {
    /* seq = 入库顺序，倒序展示；序号最大的 3 款标「最近入库」 */
    const list = (DATA.known_games || []).slice().sort(function (a, b) {
      return (Number(b.seq) || 0) - (Number(a.seq) || 0);
    });
    const hasSeq = list.some(function (game) { return Number(game.seq) > 0; });
    XC.$('known-chips').innerHTML = list.map(function (game, index) {
      const recent = hasSeq && index < 3;
      return '<span class="chip chip-quiet' + (recent ? ' is-new' : '') + '">' +
        (recent ? '<span class="new-badge">最近入库</span>' : '') +
        esc(game.name_cn) +
        (game.name_en && game.name_en !== game.name_cn ? ' · ' + esc(game.name_en) : '') +
        (hasSeq ? '<span class="seq-tag">#' + esc(game.seq) + '</span>' : '') +
        '</span>';
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
