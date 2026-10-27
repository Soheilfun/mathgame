/**
 * Comprehensive Local Simulation & Test Suite for mathgame
 * Tests Anti-Cheat, Elo System, Auth, Daily Challenge, and Worker API Endpoints
 */

import { verifyRunTelemetry } from '../src/anti-cheat.js';
import { calculateNewElo, getProblemDifficulty, getRankInfo } from '../src/elo.js';
import worker from '../src/index.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failed++;
  }
}

console.log('============================================');
console.log('🔬 1. TESTING ANTI-CHEAT VALIDATION ENGINE');
console.log('============================================');

const legitRun = {
  durationMs: 30000,
  totalAnswered: 25,
  correctCount: 24,
  wrongCount: 1,
  opm: 48.0,
  accuracy: 96.0,
  clientTimestamp: Date.now(),
  details: Array.from({ length: 25 }, (_, i) => ({
    problem: '6 × 7',
    a: 6,
    b: 7,
    op: '×',
    answer: 42,
    userAnswer: 42,
    correct: true,
    latencyMs: 1000 + Math.floor(Math.random() * 400) - 200
  }))
};

const legitCheck = verifyRunTelemetry(legitRun);
assert(legitCheck.valid === true, 'Legitimate human run passes anti-cheat');

const botSpeedRun = {
  durationMs: 1500,
  totalAnswered: 30,
  correctCount: 30,
  wrongCount: 0,
  opm: 1200,
  accuracy: 100,
  details: []
};
const botSpeedCheck = verifyRunTelemetry(botSpeedRun);
assert(botSpeedCheck.valid === false, 'Superhuman latency (<110ms) is rejected');

const tamperedRun = {
  durationMs: 30000,
  totalAnswered: 10,
  correctCount: 10,
  wrongCount: 0,
  opm: 20,
  accuracy: 100,
  details: [
    { a: 7, b: 8, op: '×', answer: 999, latencyMs: 800 }
  ]
};
const tamperedCheck = verifyRunTelemetry(tamperedRun);
assert(tamperedCheck.valid === false, 'Math result tampering is rejected');

const macroRun = {
  durationMs: 10000,
  totalAnswered: 20,
  correctCount: 20,
  wrongCount: 0,
  opm: 120,
  accuracy: 100,
  clientTimestamp: Date.now(),
  details: Array.from({ length: 20 }, () => ({
    a: 2,
    b: 3,
    op: '+',
    answer: 5,
    latencyMs: 500
  }))
};
const macroCheck = verifyRunTelemetry(macroRun);
assert(macroCheck.valid === false, 'Uniform latency (macro/bot) is rejected');

console.log('\n============================================');
console.log('⚡ 2. TESTING DYNAMIC ELO RATING SYSTEM');
console.log('============================================');

const startRank = getRankInfo(1200);
assert(startRank.titleFa === 'کارآموز', 'Elo 1200 corresponds to Apprentice / کارآموز');

const highPerfRun = {
  opm: 65,
  accuracy: 98,
  totalAnswered: 35,
  details: Array.from({ length: 35 }, () => ({ op: '×', a: 14, b: 14 }))
};
const eloGain = calculateNewElo(1200, highPerfRun);
assert(eloGain.delta > 0, `High performance yielded positive Elo delta (+${eloGain.delta})`);
assert(eloGain.newElo > 1200, `New Elo (${eloGain.newElo}) > Old Elo (1200)`);

const poorPerfRun = {
  opm: 20,
  accuracy: 60,
  totalAnswered: 20,
  details: Array.from({ length: 20 }, () => ({ op: '+', a: 2, b: 3 }))
};
const eloLoss = calculateNewElo(1400, poorPerfRun);
assert(eloLoss.delta < 0, `Poor performance yielded negative Elo delta (${eloLoss.delta})`);

console.log('\n============================================');
console.log('🌐 3. TESTING WORKER EDGE API ENDPOINTS');
console.log('============================================');

async function testWorkerRoutes() {
  const mockEnv = { DB: null };

  // Test 3.1: SPA HTML Serving
  const reqHome = new Request('http://localhost/', { method: 'GET' });
  const resHome = await worker.fetch(reqHome, mockEnv, {});
  const html = await resHome.text();
  assert(resHome.status === 200, 'GET / returns HTTP 200');
  assert(html.includes('mathgame'), 'GET / HTML contains title "mathgame"');
  assert(html.includes('Vazirmatn'), 'GET / HTML contains Vazirmatn font');

  // Test 3.2: Health Check
  const reqHealth = new Request('http://localhost/api/health', { method: 'GET' });
  const resHealth = await worker.fetch(reqHealth, mockEnv, {});
  const healthData = await resHealth.json();
  assert(healthData.status === 'ok', 'GET /api/health returns status ok');

  // Test 3.3: Submit Run via Worker API
  const reqSubmit = new Request('http://localhost/api/runs/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(legitRun)
  });
  const resSubmit = await worker.fetch(reqSubmit, mockEnv, {});
  const submitData = await resSubmit.json();
  assert(resSubmit.status === 200, 'POST /api/runs/submit returns HTTP 200');
  assert(submitData.success === true, 'POST /api/runs/submit reports success: true');
  assert(typeof submitData.newElo === 'number', 'POST /api/runs/submit calculates newElo');

  // Test 3.4: Leaderboard
  const reqLb = new Request('http://localhost/api/leaderboard?mode=blitz_30', { method: 'GET' });
  const resLb = await worker.fetch(reqLb, mockEnv, {});
  const lbData = await resLb.json();
  assert(resLb.status === 200, 'GET /api/leaderboard returns HTTP 200');
  assert(Array.isArray(lbData) && lbData.length > 0, 'GET /api/leaderboard returns array of players');

  // Test 3.5: Daily Challenge API
  const reqDaily = new Request('http://localhost/api/daily/today', { method: 'GET' });
  const resDaily = await worker.fetch(reqDaily, mockEnv, {});
  const dailyData = await resDaily.json();
  assert(resDaily.status === 200, 'GET /api/daily/today returns HTTP 200');
  assert(dailyData.success === true, 'GET /api/daily/today reports success: true');
  assert(dailyData.challenge?.questions?.length === 25, 'Daily challenge returns exactly 25 deterministic questions');

  // Test 3.6: User Auth (Register)
  const reqReg = new Request('http://localhost/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'ali_math', password: 'secret123Password', province: 'isfahan' })
  });
  const resReg = await worker.fetch(reqReg, mockEnv, {});
  const regData = await resReg.json();
  assert(resReg.status === 200, 'POST /api/auth/register returns HTTP 200');
  assert(regData.success === true, 'Registration succeeded');
  assert(regData.user?.username === 'ali_math', 'Registered user matches username');

  // Test 3.7: User Auth (Login)
  const reqLogin = new Request('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'ali_math', password: 'secret123Password' })
  });
  const resLogin = await worker.fetch(reqLogin, mockEnv, {});
  const loginData = await resLogin.json();
  assert(resLogin.status === 200, 'POST /api/auth/login returns HTTP 200');
  assert(loginData.success === true, 'Login succeeded');

  console.log('\n============================================');
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('============================================');

  if (failed > 0) {
    process.exit(1);
  }
}

testWorkerRoutes().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
