/* ==========================================================================
   xinxicha · 中国游戏厂商海外信息差监控 · 共享前端层
   数据双轨加载（json 优先、file:// 回退到内联 js 全局）、主题、格式化与标签工具
   ========================================================================== */

'use strict';

const XC = (function () {
  const THEME_KEY = 'xinxicha:theme';
  const MODE_LABEL = { live: '实时', fallback: '回退', sample: '示例' };

  /* ---------- DOM ---------- */

  function $(id) { return document.getElementById(id); }

  function el(tag, props, children) {
    const node = document.createElement(tag);
    const settings = props || {};
    for (const key in settings) {
      const value = settings[key];
      if (value === null || value === undefined) continue;
      if (key === 'class') node.className = value;
      else if (key === 'text') node.textContent = value;
      else if (key === 'html') node.innerHTML = value;
      else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
      else node.setAttribute(key, value);
    }
    for (const child of children || []) {
      if (child === null || child === undefined || child === false) continue;
      node.append(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
  }

  function escapeHtml(text) {
    return String(text === null || text === undefined ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function pad2(value) { return String(value).padStart(2, '0'); }

  function param(name) {
    const match = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.search);
    if (!match) return '';
    try { return decodeURIComponent(match[1].replace(/\+/g, ' ')); } catch (error) { return match[1]; }
  }

  /* ---------- 数值 ---------- */

  function isNum(value) { return value !== null && value !== undefined && value !== '' && isFinite(Number(value)); }

  function fmt(value, digits) {
    if (!isNum(value)) return '—';
    return Number(value).toFixed(digits === undefined ? 1 : digits);
  }

  function fmtInt(value) {
    if (!isNum(value)) return '—';
    return String(Math.round(Number(value)));
  }

  function clamp(value, low, high) {
    const num = Number(value);
    if (!isFinite(num)) return low;
    return Math.max(low, Math.min(high, num));
  }

  /* ---------- 主题 ---------- */

  function bindThemeToggle() {
    const button = $('theme-toggle');
    if (!button) return;
    button.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (error) { /* 隐私模式下忽略 */ }
    });
  }

  /* ---------- 数据加载：json 优先，file:// 下回退到内联全局 ---------- */

  async function loadData(name, globalName) {
    try {
      const response = await fetch('data/' + name + '.json?t=' + Date.now(), { cache: 'no-store' });
      if (response.ok) return await response.json();
    } catch (error) {
      /* file:// 下 fetch 必然失败，回退到内联数据 */
    }
    if (window[globalName]) return window[globalName];
    throw new Error('无法加载数据：' + name);
  }

  /* ---------- 元信息 / 数据模式 ---------- */

  function renderMeta(meta) {
    if (!meta) return;

    const chip = $('updated-at');
    if (chip) chip.textContent = '数据更新于 ' + (meta.generated_at_cst || '—') + ' (CST)';

    const modeChip = $('mode-chip');
    if (modeChip) {
      modeChip.textContent = '数据模式：' + (MODE_LABEL[meta.data_mode] || meta.data_mode || '未知');
      modeChip.hidden = false;
    }

    const alertChip = $('alert-chip');
    if (alertChip) {
      if (meta.alert) { alertChip.textContent = '今日告警：' + meta.alert; alertChip.hidden = false; }
      else { alertChip.hidden = true; }
    }

    const banner = $('mode-banner');
    if (banner) {
      const live = meta.data_mode === 'live';
      banner.className = 'mode-banner' + (live ? ' mode-banner-live' : '');
      banner.innerHTML = live
        ? '<strong>实时数据</strong> 海外网络可达，P1 主源（Google Trends / Reddit / X）正常调用；无法取数时按规则 1 沿用上次有效值并标 stale。生成于 ' +
          escapeHtml(meta.generated_at_cst || '—') + ' (CST)。'
        : '<strong>回退模式</strong> 今日海外网络不可达（' + escapeHtml(meta.probe_detail || '不可达') +
          '），P1 三项全部走回退链：有历史值则沿用并标 stale，无历史值记 0 分且不重分配权重，仅供人工复核参考。生成于 ' +
          escapeHtml(meta.generated_at_cst || '—') + ' (CST)。';
      banner.hidden = false;
    }

    const footer = $('footer-meta');
    if (footer) {
      footer.textContent = 'spec ' + (meta.spec_sha ? escapeHtml(meta.spec_sha.slice(0, 12)) : '—') +
        ' · schema v' + escapeHtml(meta.schema_version) +
        ' · 生成于 ' + escapeHtml(meta.generated_at_cst || '—') + ' CST' +
        ' · 巡检耗时 ' + fmt(meta.duration_sec, 1) + 's';
    }
  }

  /* ---------- 评分与标签 ---------- */

  function scoreClass(score) {
    if (!isNum(score)) return 'lv-d';
    const num = Number(score);
    if (num >= 80) return 'lv-a';
    if (num >= 60) return 'lv-b';
    if (num >= 40) return 'lv-c';
    return 'lv-d';
  }

  function deltaHtml(delta) {
    if (!isNum(delta)) return '<span class="delta-flat">— 无对比</span>';
    const num = Number(delta);
    if (num > 0) return '<span class="delta-up">↑ +' + fmt(num, 1) + '</span>';
    if (num < 0) return '<span class="delta-down">↓ ' + fmt(num, 1) + '</span>';
    return '<span class="delta-flat">→ 持平</span>';
  }

  function scoreCell(score, delta) {
    const num = isNum(score) ? fmt(score, 1) : '—';
    const pct = isNum(score) ? clamp(score, 0, 100) : 0;
    return '<div class="score-cell">' +
      '<span class="score-num">' + num + '</span>' +
      '<span class="score-bar"><span class="score-bar-fill ' + scoreClass(score) + '" style="width:' + pct + '%"></span></span>' +
      deltaHtml(delta) + '</div>';
  }

  function actionBadge(action) {
    if (!action) return '<span class="cell-sub">—</span>';
    const manual = action.indexOf('人工复核') === 0;
    return '<span class="badge ' + (manual ? 'badge-conf-low' : 'badge-auto') + '">' + escapeHtml(action) + '</span>';
  }

  function confBadge(conf) {
    const map = { '高': 'badge-conf-high', '中': 'badge-conf-mid', '低': 'badge-conf-low' };
    return '<span class="badge ' + (map[conf] || 'badge-conf-low') + '">置信 ' + escapeHtml(conf || '未知') + '</span>';
  }

  function signalTag(signal) {
    if (!signal) return '';
    if (signal.available) {
      const isP2 = signal.tier === 'P2';
      return '<span class="src ' + (isP2 ? 'src-p2' : 'src-p1') + '">' +
        escapeHtml(signal.origin || 'P1') + (isP2 ? ' · 回退' : ' · 主源') + '</span>';
    }
    if (signal.value !== null && signal.value !== undefined) {
      return '<span class="src src-stale">' + escapeHtml(signal.origin || '') + ' · stale 沿用上值</span>';
    }
    const kind = signal.kind || '不可用';
    return '<span class="src ' + (kind.indexOf('Fallback') === 0 ? 'src-fallback' : 'src-none') + '">' + escapeHtml(kind) + '</span>';
  }

  function prioTag(priority) {
    return '<span class="prio">' + escapeHtml(priority || '—') + '</span>';
  }

  /* ---------- 数据源健康表（总览与运维页共用） ---------- */

  function healthRowsHtml(rows) {
    return (rows || []).map(function (row) {
      let tag;
      if (!row.enabled) tag = '<span class="src src-none">未启用</span>';
      else if (row.degraded) tag = '<span class="src src-fallback">' + escapeHtml(row.status) + '</span>';
      else if (row.stale) tag = '<span class="src src-stale">' + escapeHtml(row.status) + '</span>';
      else tag = '<span class="src src-p1">' + escapeHtml(row.status) + '</span>';
      return '<tr>' +
        '<td class="col-first">' + prioTag(row.priority) + ' <span class="cell-title">' + escapeHtml(row.label) + '</span>' +
          '<div class="cell-sub">' + escapeHtml(row.signal || '') + '</div></td>' +
        '<td>' + tag + '</td>' +
        '<td><span class="cell-sub">' + escapeHtml(row.last_success_at || '—') + '</span></td>' +
        '<td><span class="cell-sub">' + escapeHtml(row.last_error || '—') + '</span></td>' +
        '<td><span class="cell-sub">' + escapeHtml(row.fallback || '—') + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 表格顶部镜像滚动条 ----------
     宽表横向溢出时，底部滚动条必须先滚到表格末尾才拖得到；这里在每张表上方
     再放一个只含滚动条的空条，与 .table-scroll 双向同步 scrollLeft。
     内容不溢出（窄表 / 窄屏卡片模式）时自动隐藏，不影响原布局。 */

  function bindTopScrollbars() {
    document.querySelectorAll('.table-scroll').forEach(function (box) {
      const previous = box.previousElementSibling;
      if (previous && previous.classList.contains('scroll-top')) return;

      const bar = el('div', { class: 'scroll-top', 'aria-hidden': 'true' }, [
        el('div', { class: 'scroll-top-track' }),
      ]);
      box.parentNode.insertBefore(bar, box);

      const track = bar.firstElementChild;
      const table = box.querySelector('table');

      function syncWidth() {
        const overflowX = getComputedStyle(box).overflowX;
        const scrollable = overflowX === 'auto' || overflowX === 'scroll';
        const width = table ? table.scrollWidth : box.scrollWidth;
        track.style.width = width + 'px';
        bar.hidden = !scrollable || !box.clientWidth || width <= box.clientWidth + 1;
        if (!bar.hidden) bar.scrollLeft = box.scrollLeft;
      }

      bar.addEventListener('scroll', function () {
        if (box.scrollLeft !== bar.scrollLeft) box.scrollLeft = bar.scrollLeft;
      });
      box.addEventListener('scroll', function () {
        if (bar.scrollLeft !== box.scrollLeft) bar.scrollLeft = box.scrollLeft;
      });

      if (window.ResizeObserver) {
        const observer = new ResizeObserver(syncWidth);
        observer.observe(box);
        if (table) observer.observe(table);
      }
      window.addEventListener('resize', syncWidth);
      syncWidth();
      setTimeout(syncWidth, 300); /* 数据/字体渲染后再校一次宽度 */
    });
  }

  /* ---------- 通用初始化 ---------- */

  function initPage() {
    bindThemeToggle();
    bindTopScrollbars();
    document.querySelectorAll('.year').forEach(function (node) { node.textContent = new Date().getFullYear(); });
  }

  function fail(containerId, error) {
    const box = $(containerId);
    if (!box) return;
    box.hidden = false;
    box.textContent = '数据加载失败：' + (error && error.message ? error.message : error);
    box.className = 'panel empty-state';
  }

  return {
    $: $, el: el, escapeHtml: escapeHtml, pad2: pad2, param: param,
    isNum: isNum, fmt: fmt, fmtInt: fmtInt, clamp: clamp,
    bindThemeToggle: bindThemeToggle, loadData: loadData, renderMeta: renderMeta,
    scoreClass: scoreClass, deltaHtml: deltaHtml, scoreCell: scoreCell,
    actionBadge: actionBadge, confBadge: confBadge, signalTag: signalTag, prioTag: prioTag,
    healthRowsHtml: healthRowsHtml, bindTopScrollbars: bindTopScrollbars, initPage: initPage, fail: fail,
  };
})();
