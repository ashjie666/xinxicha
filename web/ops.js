/* ==========================================================================
   xinxicha · 运维与回退逻辑页（ops.html）
   评分权重 / 分档阈值 / 回退规则与回退源表 / 任务清单 / 自动化 / 路线图
   数据源清单与健康表 / 失败处理策略 / 每日运行日志 / 字段字典
   ========================================================================== */

'use strict';

(function () {
  let OPS = null;

  const BAND_CAPTIONS = {
    trends_7d: 'Google Trends 7 日变化率（%）',
    reddit_daily: 'Reddit 过去 24 小时新帖数（条）',
    launch_window_days: '距海外上线天数',
  };
  const DICT_LABELS = {
    launch_window_fallback: { live: '已上线或当日上线', unknown: '未公布档期' },
    x_official: { official: '官方账号发推 / 公告', player_only: '仅玩家讨论', none: '无提及' },
  };

  function esc(text) { return XC.escapeHtml(text); }

  function kv(key, value) {
    return '<li><span class="kv-key">' + esc(key) + '</span><span class="kv-val">' + esc(value) + '</span></li>';
  }

  /* ---------- 评分模型 ---------- */

  function renderWeights() {
    XC.$('weights-body').innerHTML = (OPS.weights_table || []).map(function (row) {
      return '<tr>' +
        '<td class="col-first"><span class="cell-title">' + esc(row.signal) + '</span>' +
          '<div class="cell-sub">' + esc(row.key) + '</div></td>' +
        '<td><span class="prio">' + esc(row.weight_text) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.desc) + '</span></td>' +
        '</tr>';
    }).join('');
    XC.$('scoring-note').textContent = OPS.scoring ? OPS.scoring.note : '';
  }

  function renderThresholds() {
    const scoring = OPS.scoring || {};
    const items = (scoring.thresholds || []).map(function (pair) {
      return kv('总分 ≥ ' + pair[0], pair[1]);
    });
    items.push(kv('新游戏基础分', XC.fmtInt(scoring.base_score_new_game) + ' 分（低于基础分一律抬到基础分）'));
    items.push(kv('参与正式排名门槛', '跑满 ' + XC.fmtInt(scoring.min_days_for_ranking) + ' 天'));
    (scoring.confidence_rules ? Object.keys(scoring.confidence_rules) : []).forEach(function (level) {
      items.push(kv('置信度 ' + level, scoring.confidence_rules[level]));
    });
    XC.$('threshold-body').innerHTML = items.join('');
  }

  function bandText(low, high, score) {
    const upper = high === null || high === undefined ? '∞' : high;
    return '区间 [' + low + ', ' + upper + ') → ' + score + ' 分';
  }

  function renderBands() {
    const bands = (OPS.scoring && OPS.scoring.bands) || {};
    const items = [];
    Object.keys(BAND_CAPTIONS).forEach(function (key) {
      (bands[key] || []).forEach(function (triple) {
        items.push(kv(BAND_CAPTIONS[key], bandText(triple[0], triple[1], triple[2])));
      });
    });
    Object.keys(DICT_LABELS).forEach(function (key) {
      const labels = DICT_LABELS[key];
      Object.keys(bands[key] || {}).forEach(function (name) {
        items.push(kv(labels[name] || name, XC.fmtInt(bands[key][name]) + ' 分'));
      });
    });
    items.push(kv('海外供给缺口', '缺口分 = 10 - 海外供给量（或人工缺口等级映射：高 9 / 中 6 / 低 2）；得分 = (缺口分 - 5) / 4 × 100，区间裁剪到 0-100'));
    items.push(kv('国内攻略成熟度', '得分 = (国内成熟度 - 1) / 4 × 100（1-5 分制线性映射）'));
    items.push(kv('缺失源处理', '源不可用且无历史值 → 记 0 分，不重分配权重；有历史值 → 沿用上次有效值并标 stale'));
    XC.$('bands-body').innerHTML = items.join('');
  }

  /* ---------- 回退规则与回退源 ---------- */

  function renderRules() {
    XC.$('rules-body').innerHTML = (OPS.fallback_rules || []).map(function (text) {
      const clean = String(text).replace(/^\d+\.\s*/, '');
      return '<li style="margin:4px 0">' + esc(clean) + '</li>';
    }).join('');
  }

  function renderFallbackSources() {
    XC.$('fallback-sources-body').innerHTML = (OPS.fallback_sources || []).map(function (row) {
      const cls = String(row.priority || '').indexOf('P1') === 0 ? 'src-p1'
        : (String(row.priority || '').indexOf('P2') === 0 ? 'src-p2' : 'src-p3');
      return '<tr>' +
        '<td class="col-first"><span class="src ' + cls + '">' + esc(row.priority) + '</span></td>' +
        '<td><span class="cell-title">' + esc(row.source) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.purpose) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.condition) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.target) + '</span></td>' +
        '<td><span class="prio">' + esc(row.weight) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.policy) + '</span></td>' +
        '</tr>';
    }).join('');
  }

  /* ---------- 任务 / 自动化 / 路线图 ---------- */

  function steps(list) {
    return '<ul class="tl-steps">' + String(list || '').split('\n').map(function (line) {
      const text = line.replace(/^\s*\d+\.\s*/, '').trim();
      return text ? '<li>' + esc(text) + '</li>' : '';
    }).join('') + '</ul>';
  }

  function renderTasks() {
    XC.$('tasks-body').innerHTML = (OPS.tasks || []).map(function (task) {
      return '<div class="tl-item">' +
        '<div class="tl-time">' + esc(task.stage) + '</div>' +
        '<div class="tl-card">' +
          '<div class="tl-head"><span class="tl-name">' + esc(task.name) + '</span>' +
            '<span class="tl-id">' + esc(task.id) + '</span>' +
            '<span class="tl-eta">' + esc(task.tools) + ' · ' + esc(task.eta) + '</span></div>' +
          steps(task.steps) +
          (task.note ? '<div class="cell-sub">' + esc(task.note) + '</div>' : '') +
          (task.fallback ? '<div class="tl-fallback">' + esc(task.fallback) + '</div>' : '') +
        '</div></div>';
    }).join('');
  }

  function renderAutomation() {
    XC.$('automation-body').innerHTML = (OPS.automation || []).map(function (row) {
      return '<tr>' +
        '<td class="col-first"><span class="cell-title">' + esc(row.module) + '</span></td>' +
        '<td><div class="cell-title">' + esc(row.plan) + '</div><div class="cell-sub">' + esc(row.tool) + '</div></td>' +
        '<td><span class="cell-sub">' + esc(row.difficulty) + '</span></td>' +
        '<td><span class="prio">' + esc(row.priority) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.desc) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.source_priority) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(row.fallback_target) + '</span>' +
          (row.failure_policy ? '<div class="src-row"><span class="src src-stale">' + esc(row.failure_policy) + '</span></div>' : '') +
        '</td>' +
        '</tr>';
    }).join('');
  }

  function renderRoadmap() {
    XC.$('roadmap-body').innerHTML = (OPS.roadmap || []).map(function (stage) {
      return '<div class="tl-item">' +
        '<div class="tl-time">' + esc(stage.time) + '</div>' +
        '<div class="tl-card">' +
          '<div class="tl-head"><span class="tl-name">' + esc(stage.stage) + '</span>' +
            '<span class="tl-eta">目标：' + esc(stage.goal) + '</span></div>' +
          steps(stage.tasks) +
          '<div class="src-row">' +
            '<span class="src src-p2">交付物：' + esc(stage.deliverable) + '</span>' +
            '<span class="src src-p1">验收：' + esc(stage.acceptance) + '</span>' +
          '</div>' +
        '</div></div>';
    }).join('');
  }

  /* ---------- 数据源 / 健康 / 策略 ---------- */

  function renderSources() {
    XC.$('sources-body').innerHTML = (OPS.sources || []).map(function (source) {
      const cls = source.priority === 'P1' ? 'src-p1' : (source.priority === 'P2' ? 'src-p2' : 'src-p3');
      return '<tr>' +
        '<td class="col-first"><span class="cell-title">' + esc(source.label) + '</span>' +
          '<div class="cell-sub">' + esc(source.key) + (source.weight_key ? ' · 权重键 ' + esc(source.weight_key) : '') + '</div></td>' +
        '<td><span class="src ' + cls + '">' + esc(source.priority) + '</span>' +
          (source.enabled ? '' : '<div><span class="src src-none">未启用</span></div>') + '</td>' +
        '<td><span class="cell-sub">' + esc(source.signal) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(source.fallback) + '</span></td>' +
        '<td><span class="cell-sub">' + esc(source.mode) + '</span></td>' +
        '</tr>';
    }).join('');
  }

  function renderSignalNotes() {
    XC.$('signal-notes-body').innerHTML = (OPS.signal_notes || []).map(function (line) {
      const parts = String(line).split(':');
      if (parts.length > 1) return kv(parts[0], parts.slice(1).join('：'));
      return '<li><span class="kv-val">' + esc(line) + '</span></li>';
    }).join('');
  }

  function renderHealth() {
    const policy = OPS.failure_policy || {};
    XC.$('health-note').textContent = '连续 ' + XC.fmtInt(policy.degrade_after_consecutive_failures) +
      ' 次失败即降级 · 限流后 ' + XC.fmtInt(policy.retry_after_rate_limit_minutes) + ' 分钟重试';
    XC.$('health-body').innerHTML = XC.healthRowsHtml(OPS.health);

    const items = [
      kv('单次失败', policy.keep_last_value_on_single_failure ? '保留上次有效值，标记 stale' : '直接置 0'),
      kv('连续失败', '满 ' + XC.fmtInt(policy.degrade_after_consecutive_failures) + ' 次降级该源，后续改用备用源'),
      kv('限流重试', '等 ' + XC.fmtInt(policy.retry_after_rate_limit_minutes) + ' 分钟后重试，重试仍失败标 Fallback'),
      kv('P1 全部失败', policy.p1_all_dead_alert),
    ];
    XC.$('policy-body').innerHTML = items.join('');
  }

  /* ---------- 运行日志 ---------- */

  function callsText(calls) {
    const keys = calls ? Object.keys(calls) : [];
    if (!keys.length) return '未发起网络调用';
    return keys.map(function (key) {
      const bucket = calls[key] || {};
      return key + ' 成功' + XC.fmtInt(bucket.ok) + '/失败' + XC.fmtInt(bucket.failed) + '/跳过' + XC.fmtInt(bucket.skipped);
    }).join(' · ');
  }

  function totalsText(totals) {
    const values = Object.keys(totals || {}).map(function (key) { return totals[key]; });
    if (!values.length) return '—';
    return '最高 ' + XC.fmt(Math.max.apply(null, values), 1) + ' · 均分 ' +
      XC.fmt(values.reduce(function (a, b) { return a + b; }, 0) / values.length, 1);
  }

  function renderRun(run) {
    return '<div class="run-item">' +
      '<div class="run-head">' +
        '<span class="run-at">' + esc(run.at) + '</span>' +
        '<span class="run-mode">模式 ' + esc(run.data_mode) + ' · 网络 ' + (run.network ? '可达' : '不可达') +
          ' · ' + XC.fmt(run.duration_sec, 1) + 's · ' + esc(callsText(run.calls)) + '</span>' +
        (run.alert ? '<span class="run-alert">' + esc(run.alert) + '</span>' : '<span class="run-mode">无告警</span>') +
      '</div>' +
      '<ul class="run-games">' + (run.games || []).map(function (game) {
        return '<li><span class="cell-title">' + esc(game.name_cn) + '</span> ' +
          '<span class="run-src">主源：' + esc((game.used || []).join(' / ') || '无') +
          ' · 回退：' + esc((game.fallbacks || []).join(' / ') || '无') + '</span></li>';
      }).join('') + '</ul>' +
      '</div>';
  }

  function renderLog() {
    const log = OPS.run_log || {};
    const meta = log.meta || {};
    XC.$('log-note').textContent = '已记录 ' + XC.fmtInt(meta.days_tracked) + ' 天（满 ' +
      XC.fmtInt((OPS.scoring || {}).min_days_for_ranking) + ' 天参与正式排名）· 保留最近 30 天';
    const days = (log.days || []).slice().reverse();
    if (!days.length) {
      XC.$('log-body').innerHTML = '<p class="cell-sub">暂无运行记录，先跑一次 <code>run.ps1</code>。</p>';
      return;
    }
    XC.$('log-body').innerHTML = days.map(function (day) {
      const runs = (day.runs || []).slice().reverse();
      return '<div class="panel-head" style="padding:4px 0"><h3 class="panel-title" style="font-size:13px">' +
        esc(day.date) + '</h3><span class="panel-note">' + runs.length + ' 次巡检 · 当日快照 ' +
        esc(totalsText(day.totals)) + '</span></div>' + runs.map(renderRun).join('');
    }).join('');
  }

  /* ---------- 字段字典 ---------- */

  function renderFields() {
    XC.$('field-body').innerHTML = (OPS.field_dict || []).map(function (field) {
      return '<div class="field-item">' +
        '<div><span class="field-code">' + esc(field.code) + '</span>' +
          '<span class="field-name">' + esc(field.name) + '</span></div>' +
        '<div class="field-desc">' + esc(field.desc) + '</div>' +
        '<div class="field-meta">' + esc(field.type) + ' · 更新 ' + esc(field.freq) +
          ' · 来源 ' + esc(field.source) + '</div>' +
        (field.rule ? '<div class="field-meta">规则：' + esc(field.rule) + '</div>' : '') +
        '</div>';
    }).join('');
  }

  /* ---------- 启动 ---------- */

  async function boot() {
    XC.initPage();
    try {
      OPS = await XC.loadData('ops', 'XC_OPS');
    } catch (error) {
      XC.fail('empty-state', error);
      return;
    }
    XC.renderMeta(OPS.meta);
    renderWeights();
    renderThresholds();
    renderBands();
    renderRules();
    renderFallbackSources();
    renderTasks();
    renderAutomation();
    renderRoadmap();
    renderSources();
    renderSignalNotes();
    renderHealth();
    renderLog();
    renderFields();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
