-- Cloudflare D1 Database Schema for ZehnBarter (MathArcade IR)
-- Persian Competitive Mental Math Speedrunning Platform

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  province TEXT DEFAULT 'tehran',
  elo_rating INTEGER DEFAULT 1200,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS runs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  mode TEXT NOT NULL,
  opm REAL NOT NULL,
  accuracy REAL NOT NULL,
  duration_ms INTEGER NOT NULL,
  total_answered INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  details_json TEXT, -- JSON array of per-problem telemetry: [{problem, answer, userAnswer, correct, latencyMs, op, difficulty}]
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_runs_mode_opm ON runs(mode, opm DESC);
CREATE INDEX IF NOT EXISTS idx_users_elo ON users(elo_rating DESC);
CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(user_id);
CREATE INDEX IF NOT EXISTS idx_runs_created_at ON runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_province ON users(province);
