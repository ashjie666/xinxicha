// Cloudflare Worker：候选「直接入库」接口。
//
// 作用：前端点「直接入库」→ 这里用仓库写权限把条目追加进 data/seed_games.json
// → 该提交命中 CI 的 push 触发路径 → 自动采集并重建页面。
//
// 部署（Cloudflare Dashboard → Workers & Pages → Create Worker → 粘贴本文件）：
//   1. Settings → Variables and Secrets 添加两个 Secret：
//      GITHUB_TOKEN   GitHub 细粒度 PAT，仅授权本仓库，权限 Contents: Read and write
//      ADD_GAME_TOKEN 自定义入库口令（前端弹窗里填同一个值，只存本机）
//   2. 部署后把 Worker 地址填到 web/discover.js 的 ADD_ENDPOINT
//
// 安全边界：GitHub token 只存在于 Worker Secret，永远不下发浏览器；前端只持有
// 用户自己填的口令。口令错误、id 重复、字段不合法都会被拒绝。

const OWNER = 'ashjie666';
const REPO = 'xinxicha';
const FILE = 'data/seed_games.json';
const BRANCH = 'main';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, CORS),
  });
}

function b64ToText(value) {
  const binary = atob(String(value || '').replace(/\s/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function textToB64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function pick(value, allowed, fallback) {
  return allowed.indexOf(value) >= 0 ? value : fallback;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== 'POST') {
      return json({ error: '只接受 POST' }, 405);
    }

    const token = String(request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '').trim();
    if (!env.ADD_GAME_TOKEN || token !== env.ADD_GAME_TOKEN) {
      return json({ error: '入库口令不正确' }, 401);
    }
    if (!env.GITHUB_TOKEN) {
      return json({ error: 'Worker 未配置 GITHUB_TOKEN' }, 500);
    }

    let payload;
    try {
      payload = await request.json();
    } catch (error) {
      return json({ error: '请求体不是合法 JSON' }, 400);
    }
    const game = payload && payload.game;
    if (!game || typeof game !== 'object') {
      return json({ error: '缺少 game 字段' }, 400);
    }

    const id = String(game.id || '').trim();
    const nameCn = String(game.name_cn || '').trim();
    const nameEn = String(game.name_en || '').trim();
    if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(id)) {
      return json({ error: 'id 只能是小写字母、数字与连字符（2-64 位）' }, 400);
    }
    if (!nameCn || !nameEn) {
      return json({ error: '中文名与英文名必填' }, 400);
    }

    const api = 'https://api.github.com/repos/' + OWNER + '/' + REPO + '/contents/' + FILE;
    const headers = {
      Authorization: 'Bearer ' + env.GITHUB_TOKEN,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'xinxicha-add-game',
    };

    // 写 GitHub 需要当前文件的 sha；并发时会被拒，重取一次即可
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const metaRes = await fetch(api + '?ref=' + BRANCH, { headers: headers });
      if (!metaRes.ok) {
        return json({ error: '读取 seed_games.json 失败：HTTP ' + metaRes.status }, 502);
      }
      const meta = await metaRes.json();

      let seed;
      try {
        seed = JSON.parse(b64ToText(meta.content));
      } catch (error) {
        return json({ error: 'seed_games.json 解析失败，请检查文件格式' }, 500);
      }

      const games = Array.isArray(seed.games) ? seed.games : [];
      if (games.some(function (item) { return item && item.id === id; })) {
        return json({ error: '监控名单里已有 id「' + id + '」，请改用不同的英文名或手动处理' }, 409);
      }

      // seq 由服务端重新计算，忽略前端传值，避免撞号
      const seq = games.reduce(function (max, item) {
        return Math.max(max, Number(item && item.seq) || 0);
      }, 0) + 1;

      games.push({
        id: id,
        seq: seq,
        name_cn: nameCn,
        name_en: nameEn,
        publisher: String(game.publisher || '').trim(),
        type: pick(String(game.type || ''), ['手游', 'PC/主机', '跨端', 'PC/手游'], '手游'),
        status: String(game.status || '未上线'),
        cn_status: pick(String(game.cn_status || ''), ['国服先行', '同步上线', '国际服先行', '未知'], '未知'),
        launch_date_raw: String(game.launch_date_raw || '未公布'),
        launch_date: game.launch_date || null,
        cn_guide_score: Math.min(5, Math.max(1, Number(game.cn_guide_score) || 1)),
        gap_level: pick(String(game.gap_level || ''), ['高', '中', '低'], '中'),
        trends_7d: null,
        reddit_daily: null,
        x_mentions: null,
        total_score: null,
        action_manual: String(game.action_manual || '待人工评估（信号未积累）'),
        priority: pick(String(game.priority || ''), ['P0', 'P1', 'P2'], 'P1'),
        note: String(game.note || '').slice(0, 2000),
        signal_source: 'P1: Trends+Reddit+X',
        confidence: '低',
        last_update: new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10),
      });
      seed.games = games;

      const putRes = await fetch(api, {
        method: 'PUT',
        headers: Object.assign({}, headers, { 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          message: 'feat(seed): 候选入库 ' + nameCn + '（' + nameEn + '）',
          content: textToB64(JSON.stringify(seed, null, 2) + '\n'),
          sha: meta.sha,
          branch: BRANCH,
        }),
      });

      if (putRes.status === 409 || putRes.status === 422) continue;
      if (!putRes.ok) {
        const detail = await putRes.text();
        return json({ error: '写入失败：HTTP ' + putRes.status + ' ' + detail.slice(0, 200) }, 502);
      }

      const result = await putRes.json();
      return json({
        ok: true,
        id: id,
        seq: seq,
        commit: result.commit && result.commit.sha,
      });
    }

    return json({ error: '并发冲突，请重试一次' }, 409);
  },
};
