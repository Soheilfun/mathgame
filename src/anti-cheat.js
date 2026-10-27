/**
 * Anti-Cheat Sanity & Telemetry Verification Engine
 * Runs on Cloudflare Workers edge before recording runs to D1
 */

export function verifyRunTelemetry(run) {
  const {
    durationMs,
    totalAnswered,
    correctCount,
    wrongCount = 0,
    opm,
    accuracy,
    details = [],
    clientTimestamp
  } = run;

  // 1. Basic Type & Sanity Checks
  if (typeof durationMs !== 'number' || durationMs <= 500) {
    return { valid: false, reason: 'Invalid or implausibly short run duration' };
  }

  if (typeof totalAnswered !== 'number' || totalAnswered < 1) {
    return { valid: false, reason: 'Invalid total answered count' };
  }

  if (typeof correctCount !== 'number' || correctCount < 0 || correctCount > totalAnswered) {
    return { valid: false, reason: 'Inconsistent correct count' };
  }

  if (correctCount + wrongCount !== totalAnswered) {
    return { valid: false, reason: 'Sum of correct and wrong answers does not match total answered' };
  }

  // 2. Human Reaction Time Barrier (Physiological lower bound)
  // Absolute minimum physical cognitive processing + motor execution time per equation is ~110ms
  const avgLatency = durationMs / totalAnswered;
  if (avgLatency < 110) {
    return { valid: false, reason: `Sub-human average latency detected (${avgLatency.toFixed(1)}ms/op). Min allowed: 110ms` };
  }

  // 3. OPM & Accuracy Cross-Verification
  const expectedOpm = (correctCount / (durationMs / 60000));
  if (Math.abs(expectedOpm - opm) > 3.0) {
    return { valid: false, reason: `OPM mismatch: reported ${opm}, expected ${expectedOpm.toFixed(1)}` };
  }

  const expectedAccuracy = (correctCount / totalAnswered) * 100;
  if (Math.abs(expectedAccuracy - accuracy) > 1.0) {
    return { valid: false, reason: `Accuracy mismatch: reported ${accuracy}%, expected ${expectedAccuracy.toFixed(1)}%` };
  }

  // 4. Timestamp Validation (Prevent historical tampering or future timestamps)
  if (clientTimestamp) {
    const now = Date.now();
    const diff = Math.abs(now - clientTimestamp);
    // Allow up to 10 minutes clock drift or network buffering
    if (diff > 10 * 60 * 1000) {
      return { valid: false, reason: 'Client submission timestamp outside acceptable drift window' };
    }
  }

  // 5. Granular Telemetry Validation (Details Array)
  if (Array.isArray(details) && details.length > 0) {
    let sumLatency = 0;
    const latencies = [];

    for (let i = 0; i < details.length; i++) {
      const item = details[i];

      // Verify mathematical evaluation integrity
      const expectedAnswer = computeExpected(item.op, item.a, item.b);
      if (expectedAnswer !== null && item.answer !== undefined) {
        if (expectedAnswer !== item.answer) {
          return { valid: false, reason: `Mathematical tampering detected at problem #${i + 1}: ${item.a} ${item.op} ${item.b} != ${item.answer}` };
        }
      }

      if (typeof item.latencyMs === 'number') {
        if (item.latencyMs < 60) {
          return { valid: false, reason: `Individual problem #${i + 1} latency (${item.latencyMs}ms) violates human reflex threshold` };
        }
        sumLatency += item.latencyMs;
        latencies.push(item.latencyMs);
      }
    }

    // Check sum of latency vs reported duration (within 25% margin for UI render transitions)
    if (latencies.length === totalAnswered && sumLatency > 0) {
      const ratio = sumLatency / durationMs;
      if (ratio < 0.65 || ratio > 1.35) {
        return { valid: false, reason: `Telemetry latency sum (${sumLatency}ms) does not reconcile with total duration (${durationMs}ms)` };
      }
    }

    // 6. Bot / Macro Uniform Latency Detection
    // If a script uses a fixed sleep (e.g. sleep(250)), standard deviation across 15+ problems will be near 0
    if (latencies.length >= 15) {
      const mean = latencies.reduce((a, b) => a + b, 0) / latencies.length;
      const variance = latencies.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / latencies.length;
      const stdDev = Math.sqrt(variance);

      if (stdDev < 6.0) {
        return { valid: false, reason: `Unnatural latency uniformity detected (stdDev: ${stdDev.toFixed(2)}ms). Bot behavior flagged` };
      }
    }
  }

  return { valid: true };
}

function computeExpected(op, a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') return null;
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×':
    case '*': return a * b;
    case '÷':
    case '/': return b !== 0 ? Math.floor(a / b) : null;
    case '%': return b !== 0 ? a % b : null;
    case '^2': return a * a;
    case '^3': return a * a * a;
    default: return null;
  }
}
