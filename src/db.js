/**
 * Cloudflare D1 Database Layer for ZehnBarter
 */

export async function initDb(db) {
  if (!db) return;
  // Ensure tables and indexes exist
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        province TEXT DEFAULT 'tehran',
        elo_rating INTEGER DEFAULT 1200,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS runs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        mode TEXT NOT NULL,
        opm REAL NOT NULL,
        accuracy REAL NOT NULL,
        duration_ms INTEGER NOT NULL,
        total_answered INTEGER DEFAULT 0,
        correct_count INTEGER DEFAULT 0,
        details_json TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_runs_mode_opm ON runs(mode, opm DESC)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_users_elo ON users(elo_rating DESC)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(user_id)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_runs_created_at ON runs(created_at DESC)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_users_province ON users(province)`)
  ]);
}

export async function getUser(db, userId) {
  if (!db || !userId) return null;
  return await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
}

export async function getUserByUsername(db, username) {
  if (!db || !username) return null;
  return await db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE').bind(username).first();
}

export async function upsertUser(db, { id, username, province = 'tehran', elo_rating = 1200 }) {
  if (!db) return null;
  const existing = await getUser(db, id);

  if (existing) {
    await db.prepare(`
      UPDATE users 
      SET username = ?, province = ?, elo_rating = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(username, province, elo_rating, id).run();
    return await getUser(db, id);
  } else {
    // Check if username taken by someone else
    const taken = await getUserByUsername(db, username);
    const finalUsername = taken ? `${username}_${Math.floor(100 + Math.random() * 900)}` : username;
    
    await db.prepare(`
      INSERT INTO users (id, username, province, elo_rating)
      VALUES (?, ?, ?, ?)
    `).bind(id, finalUsername, province, elo_rating).run();
    return await getUser(db, id);
  }
}

export async function updateUserElo(db, userId, newElo) {
  if (!db || !userId) return;
  await db.prepare(`
    UPDATE users SET elo_rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).bind(newElo, userId).run();
}

export async function insertRun(db, runData) {
  if (!db) return null;
  const {
    id,
    userId,
    mode,
    opm,
    accuracy,
    durationMs,
    totalAnswered = 0,
    correctCount = 0,
    details = []
  } = runData;

  const detailsJson = JSON.stringify(details);

  await db.prepare(`
    INSERT INTO runs (id, user_id, mode, opm, accuracy, duration_ms, total_answered, correct_count, details_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    userId,
    mode,
    opm,
    accuracy,
    durationMs,
    totalAnswered,
    correctCount,
    detailsJson
  ).run();

  return id;
}

export async function syncBatchRuns(db, runs) {
  if (!db || !Array.isArray(runs) || runs.length === 0) return { inserted: 0 };
  
  const statements = runs.map(r => {
    return db.prepare(`
      INSERT OR IGNORE INTO runs (id, user_id, mode, opm, accuracy, duration_ms, total_answered, correct_count, details_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))
    `).bind(
      r.id,
      r.userId,
      r.mode,
      r.opm,
      r.accuracy,
      r.durationMs,
      r.totalAnswered || 0,
      r.correctCount || 0,
      JSON.stringify(r.details || []),
      r.createdAt ? new Date(r.createdAt).toISOString() : null
    );
  });

  await db.batch(statements);
  return { inserted: statements.length };
}

export async function getLeaderboard(db, { mode = 'all', period = 'all', province = '', limit = 50 }) {
  if (!db) return [];

  let query = `
    SELECT 
      r.id,
      r.mode,
      r.opm,
      r.accuracy,
      r.duration_ms,
      r.created_at,
      u.id as user_id,
      u.username,
      u.elo_rating,
      u.province
    FROM runs r
    JOIN users u ON r.user_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (mode && mode !== 'all') {
    query += ` AND r.mode = ?`;
    params.push(mode);
  }

  if (province && province !== 'all' && province.trim() !== '') {
    query += ` AND u.province = ?`;
    params.push(province);
  }

  if (period === 'today') {
    query += ` AND r.created_at >= datetime('now', 'start of day')`;
  } else if (period === 'weekly') {
    query += ` AND r.created_at >= datetime('now', '-7 days')`;
  }

  query += ` ORDER BY r.opm DESC, r.accuracy DESC LIMIT ?`;
  params.push(Math.min(limit, 100));

  const stmt = db.prepare(query);
  const result = await stmt.bind(...params).all();
  return result.results || [];
}

export async function getUserAnalytics(db, userId) {
  if (!db || !userId) return null;

  const user = await getUser(db, userId);
  if (!user) return null;

  // Fetch last 30 runs
  const runsRes = await db.prepare(`
    SELECT id, mode, opm, accuracy, duration_ms, details_json, created_at
    FROM runs
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 30
  `).bind(userId).all();

  const runs = runsRes.results || [];

  // Weakness heatmap aggregation: group by operator and fact family
  const bottlenecks = {};
  const latencyBins = { '<300ms': 0, '300-500ms': 0, '500-800ms': 0, '800-1200ms': 0, '>1200ms': 0 };
  let totalProblems = 0;

  for (const run of runs) {
    if (!run.details_json) continue;
    try {
      const details = JSON.parse(run.details_json);
      for (const item of details) {
        totalProblems++;
        const key = `${item.a || ''} ${item.op || ''} ${item.b || ''}`.trim() || item.problem;
        if (!bottlenecks[key]) {
          bottlenecks[key] = {
            problem: key,
            op: item.op,
            attempts: 0,
            errors: 0,
            totalLatency: 0,
            avgLatency: 0
          };
        }
        bottlenecks[key].attempts++;
        if (!item.correct) bottlenecks[key].errors++;
        if (typeof item.latencyMs === 'number') {
          bottlenecks[key].totalLatency += item.latencyMs;

          // Bin distribution
          const l = item.latencyMs;
          if (l < 300) latencyBins['<300ms']++;
          else if (l < 500) latencyBins['300-500ms']++;
          else if (l < 800) latencyBins['500-800ms']++;
          else if (l < 1200) latencyBins['800-1200ms']++;
          else latencyBins['>1200ms']++;
        }
      }
    } catch {
      // Ignore JSON parse error in legacy runs
    }
  }

  // Calculate averages and sort bottlenecks by slowest/most error-prone
  const slowestProblems = Object.values(bottlenecks)
    .filter(b => b.attempts >= 1)
    .map(b => ({
      ...b,
      avgLatency: Math.round(b.totalLatency / b.attempts),
      errorRate: Math.round((b.errors / b.attempts) * 100)
    }))
    .sort((a, b) => b.avgLatency - a.avgLatency)
    .slice(0, 10);

  return {
    user,
    recentRunsCount: runs.length,
    totalProblemsAnalyzed: totalProblems,
    latencyHistogram: latencyBins,
    topWeaknesses: slowestProblems,
    recentRuns: runs.map(r => ({
      id: r.id,
      mode: r.mode,
      opm: r.opm,
      accuracy: r.accuracy,
      durationMs: r.duration_ms,
      createdAt: r.created_at
    }))
  };
}
