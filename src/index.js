/**
 * mathgame - Cloudflare Workers Edge Backend
 * Authentication, Daily Challenges, Unified Math Engine, Anti-Cheat, & Leaderboards
 */

import { renderAppHtml } from './views/app.html.js';
import { verifyRunTelemetry } from './anti-cheat.js';
import { calculateNewElo } from './elo.js';
import {
  initDb,
  getUser,
  registerUser,
  loginUser,
  upsertGuestUser,
  updateUserElo,
  insertRun,
  syncBatchRuns,
  getLeaderboard,
  getUserAnalytics,
  generateDailyChallenge
} from './db.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // Database instance supports both env.DB and env.mathgame
    const db = env.DB || env.mathgame;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. FRONTEND APP ROUTE
      if (method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
        const html = renderAppHtml();
        return new Response(html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=60',
            ...corsHeaders
          }
        });
      }

      // 2. EDGE HEALTH
      if (url.pathname === '/api/health') {
        const colo = request.cf?.colo || 'EDGE_DEV';
        return jsonResponse({
          status: 'ok',
          colo,
          timestamp: Date.now()
        }, corsHeaders);
      }

      // Ensure D1 is initialized
      if (db) {
        try {
          await initDb(db);
        } catch (dbInitErr) {
          // ignore already created tables
        }
      }

      // 3. AUTHENTICATION: REGISTER
      if (url.pathname === '/api/auth/register' && method === 'POST') {
        const body = await request.json();
        const { username, password, province } = body;

        if (!username || !password) {
          return jsonResponse({ error: 'نام کاربری و رمز عبور الزامی است' }, corsHeaders, 400);
        }

        try {
          if (db) {
            const user = await registerUser(db, { username, password, province });
            return jsonResponse({ success: true, user }, corsHeaders);
          } else {
            return jsonResponse({
              success: true,
              user: { id: 'usr_' + Date.now(), username, province: province || 'tehran', elo_rating: 1200 }
            }, corsHeaders);
          }
        } catch (authErr) {
          return jsonResponse({ error: authErr.message }, corsHeaders, 400);
        }
      }

      // 4. AUTHENTICATION: LOGIN
      if (url.pathname === '/api/auth/login' && method === 'POST') {
        const body = await request.json();
        const { username, password } = body;

        if (!username) {
          return jsonResponse({ error: 'نام کاربری الزامی است' }, corsHeaders, 400);
        }

        try {
          if (db) {
            const user = await loginUser(db, { username, password });
            return jsonResponse({ success: true, user }, corsHeaders);
          } else {
            return jsonResponse({
              success: true,
              user: { id: 'usr_guest', username, province: 'tehran', elo_rating: 1200 }
            }, corsHeaders);
          }
        } catch (loginErr) {
          return jsonResponse({ error: loginErr.message }, corsHeaders, 400);
        }
      }

      // 5. DAILY CHALLENGE ENDPOINT
      if (url.pathname === '/api/daily/today' && method === 'GET') {
        // Today's UTC/Iran date key
        const todayStr = new Date().toISOString().split('T')[0];
        const challenge = generateDailyChallenge(todayStr);

        let topDaily = [];
        if (db) {
          topDaily = await getLeaderboard(db, { mode: `daily_${todayStr}`, limit: 10 });
        }

        return jsonResponse({
          success: true,
          challenge,
          topDaily
        }, corsHeaders);
      }

      // 6. GET CURRENT USER PROFILE
      if (url.pathname === '/api/me') {
        const userId = url.searchParams.get('user_id');
        if (!userId) {
          return jsonResponse({ error: 'کاربر نامشخص است' }, corsHeaders, 400);
        }

        if (db) {
          const user = await getUser(db, userId);
          return jsonResponse({ user: user || { id: userId, username: 'کاربر مهمان', elo_rating: 1200 } }, corsHeaders);
        } else {
          return jsonResponse({ user: { id: userId, username: 'کاربر مهمان', elo_rating: 1200 } }, corsHeaders);
        }
      }

      // 7. SUBMIT RUN TELEMETRY
      if (url.pathname === '/api/runs/submit' && method === 'POST') {
        const payload = await request.json();

        // Anti-Cheat Sanity Check
        const antiCheatResult = verifyRunTelemetry(payload);
        if (!antiCheatResult.valid) {
          return jsonResponse({
            error: 'رکورد نامعتبر تشخیص داده شد',
            reason: antiCheatResult.reason
          }, corsHeaders, 400);
        }

        const runId = payload.id || 'run_' + crypto.randomUUID();
        const userId = payload.userId || 'usr_guest';
        const username = payload.username || 'کاربر مهمان';
        const province = payload.province || 'tehran';

        let currentElo = 1200;
        if (db) {
          let user = await getUser(db, userId);
          if (!user) {
            user = await upsertGuestUser(db, { id: userId, username, province, elo_rating: 1200 });
          }
          currentElo = user ? user.elo_rating : 1200;
        }

        // Dynamic Elo Calculation
        const eloCalc = calculateNewElo(currentElo, payload);

        // Persist to Cloudflare D1
        if (db) {
          await insertRun(db, {
            id: runId,
            userId,
            mode: payload.mode || 'blitz_30',
            opm: payload.opm || 0,
            accuracy: payload.accuracy || 0,
            durationMs: payload.durationMs || 0,
            totalAnswered: payload.totalAnswered || 0,
            correctCount: payload.correctCount || 0,
            details: payload.details || []
          });

          await updateUserElo(db, userId, eloCalc.newElo);
        }

        return jsonResponse({
          success: true,
          runId,
          newElo: eloCalc.newElo,
          delta: eloCalc.delta,
          performanceRating: eloCalc.performanceRating,
          rank: eloCalc.rank
        }, corsHeaders);
      }

      // 8. BATCH SYNC OFFLINE RUNS
      if (url.pathname === '/api/runs/sync' && method === 'POST') {
        const body = await request.json();
        const runs = body.runs || [];

        if (!Array.isArray(runs) || runs.length === 0) {
          return jsonResponse({ synced: 0 }, corsHeaders);
        }

        const validRuns = runs.filter(r => verifyRunTelemetry(r).valid);

        if (db && validRuns.length > 0) {
          await syncBatchRuns(db, validRuns);
        }

        return jsonResponse({
          success: true,
          received: runs.length,
          synced: validRuns.length
        }, corsHeaders);
      }

      // 9. LEADERBOARD
      if (url.pathname === '/api/leaderboard' && method === 'GET') {
        const mode = url.searchParams.get('mode') || 'all';
        const period = url.searchParams.get('period') || 'all';
        const province = url.searchParams.get('province') || '';

        let leaderboard = [];

        if (db) {
          leaderboard = await getLeaderboard(db, { mode, period, province, limit: 50 });
        } else {
          leaderboard = [
            { id: 'run_1', username: 'آرش_تهرانی', province: 'tehran', elo_rating: 1840, opm: 84.5, accuracy: 98, mode: 'blitz_30' },
            { id: 'run_2', username: 'سارا_اصفهان', province: 'isfahan', elo_rating: 1720, opm: 78.2, accuracy: 96, mode: 'blitz_30' },
            { id: 'run_3', username: 'امیر_شیراز', province: 'fars', elo_rating: 1650, opm: 74.0, accuracy: 95, mode: 'sprint_20' }
          ];
        }

        return jsonResponse(leaderboard, {
          'Cache-Control': 'public, max-age=5, s-maxage=5',
          ...corsHeaders
        });
      }

      // 10. USER ANALYTICS
      if (url.pathname === '/api/user/analytics' && method === 'GET') {
        const userId = url.searchParams.get('user_id');
        if (!userId) {
          return jsonResponse({ error: 'شناسه کاربر الزامی است' }, corsHeaders, 400);
        }

        if (db) {
          const analytics = await getUserAnalytics(db, userId);
          return jsonResponse(analytics || { topWeaknesses: [], latencyHistogram: {} }, corsHeaders);
        } else {
          return jsonResponse({
            recentRunsCount: 5,
            totalProblemsAnalyzed: 100,
            user: { elo_rating: 1240 },
            latencyHistogram: { '<300ms': 20, '300-500ms': 45, '500-800ms': 25, '800-1200ms': 8, '>1200ms': 2 },
            topWeaknesses: [
              { problem: '7 × 8', attempts: 6, errors: 1, avgLatency: 1100, errorRate: 17 },
              { problem: '9 × 6', attempts: 5, errors: 0, avgLatency: 950, errorRate: 0 }
            ]
          }, corsHeaders);
        }
      }

      return new Response('صفحه یا درخواست یافت نشد', { status: 404, headers: corsHeaders });

    } catch (err) {
      console.error('Edge Error:', err);
      return jsonResponse({
        error: 'خطای سرور',
        message: err.message
      }, corsHeaders, 500);
    }
  }
};

function jsonResponse(data, headers = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...headers
    }
  });
}
