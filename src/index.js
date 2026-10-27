/**
 * ZehnBarter (MathArcade IR) - Cloudflare Workers Edge Backend
 * Ultra-Low Latency Mental Math Speedrunning & Real-time Leaderboards
 */

import { renderAppHtml } from './views/app.html.js';
import { verifyRunTelemetry } from './anti-cheat.js';
import { calculateNewElo } from './elo.js';
import {
  initDb,
  getUser,
  upsertUser,
  updateUserElo,
  insertRun,
  syncBatchRuns,
  getLeaderboard,
  getUserAnalytics
} from './db.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // Set CORS headers for edge API compatibility
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 1. FRONTEND SINGLE PAGE APPLICATION ROUTE
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

      // 2. EDGE HEALTH & POP INSPECTION
      if (url.pathname === '/api/health') {
        const colo = request.cf?.colo || 'EDGE_DEV';
        return jsonResponse({
          status: 'ok',
          runtime: 'Cloudflare Workers Edge',
          colo,
          country: request.cf?.country || 'IR',
          timestamp: Date.now()
        }, corsHeaders);
      }

      // Ensure D1 is initialized (if D1 binding is present)
      if (env.DB) {
        // Execute lazily / cached
        try {
          await initDb(env.DB);
        } catch (dbInitErr) {
          console.warn('DB init note:', dbInitErr.message);
        }
      }

      // 3. USER PROFILE MANAGEMENT
      if (url.pathname === '/api/user/profile') {
        if (method === 'POST') {
          const body = await request.json();
          const { id, username, province } = body;
          if (!id || !username) {
            return jsonResponse({ error: 'Missing id or username' }, corsHeaders, 400);
          }

          if (env.DB) {
            const user = await upsertUser(env.DB, { id, username, province });
            return jsonResponse({ success: true, user }, corsHeaders);
          } else {
            return jsonResponse({ success: true, user: { id, username, province, elo_rating: 1200 } }, corsHeaders);
          }
        }
      }

      // 4. GET USER PROFILE
      if (url.pathname === '/api/me') {
        const userId = url.searchParams.get('user_id');
        if (!userId) {
          return jsonResponse({ error: 'Missing user_id parameter' }, corsHeaders, 400);
        }

        if (env.DB) {
          const user = await getUser(env.DB, userId);
          return jsonResponse({ user: user || { id: userId, username: 'Anonymous', elo_rating: 1200 } }, corsHeaders);
        } else {
          return jsonResponse({ user: { id: userId, username: 'Anonymous', elo_rating: 1200 } }, corsHeaders);
        }
      }

      // 5. ANTI-CHEAT VERIFIED RUN SUBMISSION
      if (url.pathname === '/api/runs/submit' && method === 'POST') {
        const payload = await request.json();

        // Server-Side Anti-Cheat Sanity Check
        const antiCheatResult = verifyRunTelemetry(payload);
        if (!antiCheatResult.valid) {
          return jsonResponse({
            error: 'Suspicious run telemetry rejected by anti-cheat filter',
            reason: antiCheatResult.reason
          }, corsHeaders, 400);
        }

        const runId = payload.id || 'run_' + crypto.randomUUID();
        const userId = payload.userId || 'usr_guest';
        const username = payload.username || 'محاسب_ناشناس';
        const province = payload.province || 'tehran';

        let currentElo = 1200;
        if (env.DB) {
          let user = await getUser(env.DB, userId);
          if (!user) {
            user = await upsertUser(env.DB, { id: userId, username, province, elo_rating: 1200 });
          }
          currentElo = user ? user.elo_rating : 1200;
        }

        // Dynamic Elo Calculation
        const eloCalc = calculateNewElo(currentElo, payload);

        // Persist to Cloudflare D1
        if (env.DB) {
          await insertRun(env.DB, {
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

          await updateUserElo(env.DB, userId, eloCalc.newElo);
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

      // 6. BATCH OFFLINE RUNS SYNC
      if (url.pathname === '/api/runs/sync' && method === 'POST') {
        const body = await request.json();
        const runs = body.runs || [];

        if (!Array.isArray(runs) || runs.length === 0) {
          return jsonResponse({ synced: 0 }, corsHeaders);
        }

        // Filter valid runs using anti-cheat
        const validRuns = runs.filter(r => verifyRunTelemetry(r).valid);

        if (env.DB && validRuns.length > 0) {
          await syncBatchRuns(env.DB, validRuns);
        }

        return jsonResponse({
          success: true,
          received: runs.length,
          synced: validRuns.length
        }, corsHeaders);
      }

      // 7. REAL-TIME LEADERBOARD ROUTE
      if (url.pathname === '/api/leaderboard' && method === 'GET') {
        const mode = url.searchParams.get('mode') || 'all';
        const period = url.searchParams.get('period') || 'all';
        const province = url.searchParams.get('province') || '';

        let leaderboard = [];

        if (env.DB) {
          leaderboard = await getLeaderboard(env.DB, { mode, period, province, limit: 50 });
        } else {
          // Mock data for preview when DB is not yet populated
          leaderboard = [
            { id: 'run_1', username: 'آرش_تهرانی', province: 'tehran', elo_rating: 1840, opm: 84.5, accuracy: 98, mode: 'blitz_30' },
            { id: 'run_2', username: 'سارا_اصفهان', province: 'isfahan', elo_rating: 1720, opm: 78.2, accuracy: 96, mode: 'blitz_30' },
            { id: 'run_3', username: 'امیر_شیراز', province: 'fars', elo_rating: 1650, opm: 74.0, accuracy: 95, mode: 'sprint_20' },
            { id: 'run_4', username: 'مریم_مشهد', province: 'khorasan_razavi', elo_rating: 1590, opm: 71.5, accuracy: 94, mode: 'dojo_tier1' },
            { id: 'run_5', username: 'کیان_تبریز', province: 'east_azerbaijan', elo_rating: 1540, opm: 68.0, accuracy: 92, mode: 'survival' }
          ];
        }

        return jsonResponse(leaderboard, {
          'Cache-Control': 'public, max-age=5, s-maxage=5',
          ...corsHeaders
        });
      }

      // 8. USER ANALYTICS & WEAKNESS HEATMAP
      if (url.pathname === '/api/user/analytics' && method === 'GET') {
        const userId = url.searchParams.get('user_id');
        if (!userId) {
          return jsonResponse({ error: 'Missing user_id parameter' }, corsHeaders, 400);
        }

        if (env.DB) {
          const analytics = await getUserAnalytics(env.DB, userId);
          return jsonResponse(analytics || { topWeaknesses: [], latencyHistogram: {} }, corsHeaders);
        } else {
          return jsonResponse({
            recentRunsCount: 5,
            totalProblemsAnalyzed: 120,
            user: { elo_rating: 1240 },
            latencyHistogram: { '<300ms': 25, '300-500ms': 48, '500-800ms': 30, '800-1200ms': 12, '>1200ms': 5 },
            topWeaknesses: [
              { problem: '7 × 8', attempts: 6, errors: 1, avgLatency: 1140, errorRate: 17 },
              { problem: '9 × 6', attempts: 5, errors: 0, avgLatency: 980, errorRate: 0 },
              { problem: '84 ÷ 7', attempts: 4, errors: 1, avgLatency: 1320, errorRate: 25 },
              { problem: '47 + 38', attempts: 5, errors: 0, avgLatency: 890, errorRate: 0 }
            ]
          }, corsHeaders);
        }
      }

      // 404 NOT FOUND
      return new Response('Not Found', { status: 404, headers: corsHeaders });

    } catch (err) {
      console.error('Unhandled Edge Error:', err);
      return jsonResponse({
        error: 'Internal Edge Runtime Error',
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
