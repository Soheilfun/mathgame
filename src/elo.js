/**
 * Dynamic Elo Rating System for Competitive Mental Math Speedrunning
 * Tailored for ZehnBarter (MathArcade IR)
 */

export const RANKS = [
  { minElo: 0, titleFa: 'تازه‌کار', titleEn: 'Novice', color: '#94a3b8', badge: '🌱' },
  { minElo: 1100, titleFa: 'کارآموز', titleEn: 'Apprentice', color: '#38bdf8', badge: '⚡' },
  { minElo: 1300, titleFa: 'محاسب برتر', titleEn: 'Adept', color: '#34d399', badge: '🔥' },
  { minElo: 1500, titleFa: 'خبره محاسبات', titleEn: 'Expert', color: '#fbbf24', badge: '💎' },
  { minElo: 1700, titleFa: 'استاد سرعت', titleEn: 'Master', color: '#f43f5e', badge: '👑' },
  { minElo: 1900, titleFa: 'گرندمستر ذهنی', titleEn: 'Grandmaster', color: '#a855f7', badge: '🪐' },
  { minElo: 2100, titleFa: 'نابغه ملی', titleEn: 'National Prodigy', color: '#ec4899', badge: '🏆' },
];

export function getRankInfo(elo) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (elo >= r.minElo) rank = r;
  }
  return rank;
}

/**
 * Computes problem difficulty rating and multiplier
 * @param {string} op Operator (+, -, ×, ÷, %, ^2, ^3)
 * @param {number} a Operand 1
 * @param {number} b Operand 2
 * @returns {{ difficulty: number, baseRating: number }}
 */
export function getProblemDifficulty(op, a, b) {
  let difficulty = 1.0;
  let baseRating = 1000;

  switch (op) {
    case '+':
    case '-': {
      const maxVal = Math.max(Math.abs(a || 5), Math.abs(b || 5));
      if (maxVal <= 9) {
        difficulty = 0.9;
        baseRating = 900;
      } else if (maxVal <= 99) {
        difficulty = 1.35;
        baseRating = 1250;
      } else {
        difficulty = 1.8;
        baseRating = 1550;
      }
      break;
    }
    case '×':
    case '*': {
      const opA = a || 5;
      const opB = b || 5;
      if (opA <= 9 && opB <= 9) {
        difficulty = 1.2;
        baseRating = 1150;
      } else if (opA <= 20 && opB <= 20) {
        difficulty = 1.7;
        baseRating = 1450;
      } else {
        difficulty = 2.4;
        baseRating = 1900;
      }
      break;
    }
    case '÷':
    case '/': {
      difficulty = 1.4;
      baseRating = 1280;
      break;
    }
    case '%': {
      difficulty = 1.6;
      baseRating = 1380;
      break;
    }
    case '^2':
    case '^3': {
      const val = a || 5;
      difficulty = val <= 15 ? 1.5 : 2.1;
      baseRating = val <= 15 ? 1400 : 1800;
      break;
    }
    default:
      difficulty = 1.0;
      baseRating = 1000;
  }

  return { difficulty, baseRating };
}

/**
 * Calculates updated Elo rating after a completed run
 * @param {number} currentElo Current user rating (e.g. 1200)
 * @param {object} runTelemetry { opm, accuracy, totalAnswered, correctCount, durationMs, details }
 * @returns {{ newElo: number, delta: number, performanceRating: number, rank: object }}
 */
export function calculateNewElo(currentElo, runTelemetry) {
  const { opm = 0, accuracy = 0, totalAnswered = 0, details = [] } = runTelemetry;

  if (totalAnswered < 5) {
    // Insufficient samples to alter rating
    return {
      newElo: currentElo,
      delta: 0,
      performanceRating: currentElo,
      rank: getRankInfo(currentElo)
    };
  }

  // Calculate average difficulty of problems faced
  let totalBaseRating = 0;
  let totalDiff = 0;

  if (details && details.length > 0) {
    for (const item of details) {
      const diffInfo = getProblemDifficulty(item.op || '+', item.a || 5, item.b || 5);
      totalBaseRating += diffInfo.baseRating;
      totalDiff += diffInfo.difficulty;
    }
  } else {
    totalBaseRating = 1200 * totalAnswered;
    totalDiff = 1.2 * totalAnswered;
  }

  const avgBaseRating = totalBaseRating / totalAnswered;
  const avgDiff = totalDiff / totalAnswered;

  // Performance Rating based on speed (OPM) and precision (Accuracy %)
  // Baseline: 35 OPM at 95% accuracy on difficulty 1.2 gives ~avgBaseRating
  const speedRatio = Math.min(Math.max(opm / 35, 0.25), 3.5);
  const accRatio = Math.pow(Math.max(accuracy / 100, 0.2), 2.2);

  const rawPerf = avgBaseRating * Math.pow(speedRatio, 0.6) * accRatio * (0.85 + 0.15 * avgDiff);
  const performanceRating = Math.round(Math.min(Math.max(rawPerf, 400), 2800));

  // Elo adjustment based on performance gap
  // High sensitivity for placement / calibration, smoothly bounded
  const gap = performanceRating - currentElo;
  let rawDelta = Math.round(gap / 14);

  // Cap delta to prevent single-game distortion (-35 to +45)
  const delta = Math.min(Math.max(rawDelta, -35), 45);
  const newElo = Math.max(currentElo + delta, 100);
  const rank = getRankInfo(newElo);

  return {
    newElo,
    delta,
    performanceRating,
    rank
  };
}
