/**
 * Cloudflare D1 Database Layer for mathgame
 * Supports User Authentication, Daily Challenges, Runs Telemetry, and Leaderboards
 */

export async function hashPassword(password) {
  if (!password) return null;
  const encoder = new TextEncoder();
  const data = encoder.encode(password + ':mathgame_salt_edge_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function initDb(db) {
  if (!db) return;
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE COLLATE NOCASE,
        password_hash TEXT,
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
    db.prepare(`
      CREATE TABLE IF NOT EXISTS daily_challenges (
        date_key TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        questions_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_runs_mode_opm ON runs(mode, opm DESC)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_users_elo ON users(elo_rating DESC)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(user_id)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_runs_created_at ON runs(created_at DESC)`),
    db.prepare(`CREATE INDEX IF NOT EXISTS idx_users_province ON users(province)`)
  ]);

  // Safe migration for existing databases missing password_hash column
  try {
    await db.prepare('ALTER TABLE users ADD COLUMN password_hash TEXT').run();
  } catch (e) {
    // Column already exists
  }
}

export async function getUser(db, userId) {
  if (!db || !userId) return null;
  const user = await db.prepare('SELECT id, username, province, elo_rating, created_at FROM users WHERE id = ?').bind(userId).first();
  return user || null;
}

export async function getUserByUsername(db, username) {
  if (!db || !username) return null;
  return await db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE').bind(username.trim()).first();
}

export async function registerUser(db, { username, password, province = 'tehran' }) {
  if (!db || !username) throw new Error('نام کاربری الزامی است');
  const cleanUsername = username.trim();
  if (cleanUsername.length < 3) throw new Error('نام کاربری باید حداقل ۳ کاراکتر باشد');

  const existing = await getUserByUsername(db, cleanUsername);
  if (existing) {
    throw new Error('این نام کاربری قبلاً ثبت شده است');
  }

  const userId = 'usr_' + crypto.randomUUID().substring(0, 12);
  const passwordHash = password ? await hashPassword(password) : null;

  await db.prepare(`
    INSERT INTO users (id, username, password_hash, province, elo_rating)
    VALUES (?, ?, ?, ?, 1200)
  `).bind(userId, cleanUsername, passwordHash, province).run();

  return {
    id: userId,
    username: cleanUsername,
    province,
    elo_rating: 1200
  };
}

export async function loginUser(db, { username, password }) {
  if (!db || !username) throw new Error('نام کاربری الزامی است');
  const user = await getUserByUsername(db, username.trim());
  if (!user) {
    throw new Error('کاربری با این نام یافت نشد');
  }

  if (user.password_hash) {
    if (!password) throw new Error('رمز عبور الزامی است');
    const inputHash = await hashPassword(password);
    if (inputHash !== user.password_hash) {
      throw new Error('رمز عبور اشتباه است');
    }
  }

  return {
    id: user.id,
    username: user.username,
    province: user.province || 'tehran',
    elo_rating: user.elo_rating || 1200
  };
}

export async function upsertGuestUser(db, { id, username, province = 'tehran', elo_rating = 1200 }) {
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
    JSON.stringify(details)
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
    if (mode === 'daily') {
      query += ` AND r.mode LIKE 'daily_%'`;
    } else {
      query += ` AND r.mode = ?`;
      params.push(mode);
    }
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

  const runsRes = await db.prepare(`
    SELECT id, mode, opm, accuracy, duration_ms, details_json, created_at
    FROM runs
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 30
  `).bind(userId).all();

  const runs = runsRes.results || [];

  const bottlenecks = {};
  const latencyBins = { '<300ms': 0, '300-500ms': 0, '500-800ms': 0, '800-1200ms': 0, '>1200ms': 0 };
  let totalProblems = 0;

  for (const run of runs) {
    if (!run.details_json) continue;
    try {
      const details = JSON.parse(run.details_json);
      for (const item of details) {
        totalProblems++;
        const key = item.problem || `${item.a || ''} ${item.op || ''} ${item.b || ''}`.trim();
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

          const l = item.latencyMs;
          if (l < 300) latencyBins['<300ms']++;
          else if (l < 500) latencyBins['300-500ms']++;
          else if (l < 800) latencyBins['500-800ms']++;
          else if (l < 1200) latencyBins['800-1200ms']++;
          else latencyBins['>1200ms']++;
        }
      }
    } catch {
      // ignore
    }
  }

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

/**
 * Deterministic daily challenge generator based on date string (e.g. '2026-10-28')
 * Generates 25 questions identical for all players on this date worldwide!
 */
export function generateDailyChallenge(dateStr = '2026-10-28') {
  // Simple deterministic LCG pseudo-random generator
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  function nextRnd(min, max) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return min + (seed % (max - min + 1));
  }

  const questions = [];
  const ops = ['+', '-', '×', '÷'];

  for (let i = 1; i <= 25; i++) {
    const op = ops[nextRnd(0, 3)];
    let a, b, answer, expression;

    if (op === '+') {
      a = nextRnd(15, 85);
      b = nextRnd(12, 75);
      answer = a + b;
      expression = `${a} + ${b}`;
    } else if (op === '-') {
      a = nextRnd(30, 99);
      b = nextRnd(10, a - 2);
      answer = a - b;
      expression = `${a} − ${b}`;
    } else if (op === '×') {
      a = nextRnd(3, 12);
      b = nextRnd(3, 12);
      answer = a * b;
      expression = `${a} × ${b}`;
    } else { // '÷'
      b = nextRnd(2, 9);
      const q = nextRnd(2, 12);
      a = b * q;
      answer = q;
      expression = `${a} ÷ ${b}`;
    }

    questions.push({
      id: i,
      a,
      b,
      op,
      answer,
      expression,
      expectedLen: Math.abs(answer).toString().length
    });
  }

  return {
    date: dateStr,
    title: `چالش روزانه ${dateStr}`,
    totalQuestions: 25,
    questions
  };
}
