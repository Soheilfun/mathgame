/**
 * mathgame - Unified Competitive Mental Math Speedrunning SPA
 * Clean Persian UX, Real Authentication, Daily Challenges & Unified Game Arena
 */

export function renderAppHtml() {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>mathgame | لیگ محاسبات ذهنی سریع</title>
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            arcade: {
              bg: '#050814',
              surface: '#0b1120',
              card: '#111827',
              border: 'rgba(255, 255, 255, 0.08)'
            }
          },
          fontFamily: {
            vazir: ['Vazirmatn', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'Fira Code', 'monospace']
          }
        }
      }
    };
  </script>

  <!-- Google Fonts: Vazirmatn & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    * {
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      box-sizing: border-box;
    }

    input, textarea {
      user-select: text;
      -webkit-user-select: text;
    }

    body {
      font-family: 'Vazirmatn', system-ui, sans-serif;
      background-color: #030712;
      color: #f8fafc;
      overflow-x: hidden;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .num-font {
      font-family: 'JetBrains Mono', monospace;
      font-variant-numeric: tabular-nums;
    }

    /* Ambient Cyber Background */
    .bg-cyber {
      background-color: #030712;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 90% 20%, rgba(16, 185, 129, 0.06) 0%, transparent 40%),
        linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
    }

    /* Glass Panels */
    .glass-box {
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }

    .glass-hover {
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glass-hover:hover {
      border-color: rgba(6, 182, 212, 0.4);
      transform: translateY(-2px);
    }
    .glass-hover:active {
      transform: scale(0.98);
    }

    /* Hit & Miss Animations */
    @keyframes hit-glow {
      0% { border-color: #10b981; box-shadow: 0 0 30px rgba(16, 185, 129, 0.5); transform: scale(1.015); }
      100% { border-color: rgba(255, 255, 255, 0.08); box-shadow: none; transform: scale(1); }
    }
    @keyframes miss-shake {
      0%, 100% { transform: translateX(0); border-color: #f43f5e; box-shadow: 0 0 25px rgba(244, 63, 94, 0.5); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    .animate-hit { animation: hit-glow 0.16s ease-out; }
    .animate-miss { animation: miss-shake 0.22s ease-in-out; }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #030712; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
  </style>
</head>
<body class="bg-cyber text-slate-100 flex flex-col min-h-screen selection:bg-cyan-500 selection:text-slate-950">

  <!-- TOP HEADER -->
  <header class="border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      
      <!-- Brand Logo -->
      <button id="btnNavHome" class="flex items-center gap-2.5 group cursor-pointer text-right">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] shadow-md shadow-cyan-500/20">
          <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-mono font-black text-cyan-400 text-base">
            ⚡
          </div>
        </div>
        <div>
          <span class="font-mono font-black text-lg text-white tracking-tight">mathgame</span>
          <span class="text-xs text-slate-400 font-medium block">لیگ محاسبات ذهنی سریع</span>
        </div>
      </button>

      <!-- Center Online Status -->
      <div class="flex items-center gap-2 font-mono text-xs">
        <div id="badgeNetworkStatus" class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-white/[0.08] text-emerald-400">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span id="txtNetworkStatus">آنلاین</span>
        </div>
      </div>

      <!-- User Controls & Navigation -->
      <div class="flex items-center gap-2">
        <!-- Sound Toggle -->
        <button id="btnAudioToggle" title="قطع / وصل صدا" class="w-9 h-9 rounded-xl glass-box flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer">
          <span id="iconAudio" class="text-sm">🔊</span>
        </button>

        <!-- Leaderboard -->
        <button id="btnNavLeaderboard" title="جدول برترین‌ها" class="w-9 h-9 rounded-xl glass-box flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer">
          🏆
        </button>

        <!-- User / Auth Pill Button -->
        <button id="btnUserAuth" class="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-box hover:border-cyan-500/50 transition cursor-pointer">
          <span id="navUserBadge" class="text-sm">🌱</span>
          <span id="navUserName" class="text-xs font-bold text-slate-200">ورود / ثبت‌نام</span>
          <span id="navUserElo" class="text-[11px] font-mono text-cyan-400 font-semibold hidden">1200 ELO</span>
        </button>
      </div>

    </div>
  </header>

  <!-- MAIN APP CONTAINER -->
  <main class="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">

    <!-- ============================================== -->
    <!-- SCREEN 1: UNIFIED GAME HUB -->
    <!-- ============================================== -->
    <section id="viewHub" class="flex flex-col gap-6 max-w-3xl mx-auto w-full py-4">
      
      <!-- HERO PLAY CARD -->
      <div class="glass-box rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-6">
        
        <!-- Welcome & Elo Banner -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div class="space-y-1">
            <h1 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>سلام،</span>
              <span id="txtGreetingName" class="text-cyan-400">محاسب عزیز!</span>
            </h1>
            <p class="text-xs text-slate-400">یک حالت را انتخاب کنید و رکورد سرعت مغزتان را ارتقا دهید.</p>
          </div>

          <div class="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-white/[0.08]">
            <span id="heroRankBadge" class="text-2xl">🌱</span>
            <div class="text-right">
              <div class="text-[10px] text-slate-400">امتیاز ریتینگ ELO</div>
              <div id="heroEloNumber" class="num-font text-lg font-black text-cyan-400">1200</div>
            </div>
          </div>
        </div>

        <!-- DAILY CHALLENGE BANNER (Featured) -->
        <div id="boxDailyChallenge" class="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/60 border border-cyan-500/30 flex items-center justify-between gap-4 cursor-pointer hover:border-cyan-400/60 transition group">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl group-hover:scale-105 transition">
              📅
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-sm text-white">چالش روزانه امروز</span>
                <span class="text-[10px] bg-cyan-900/80 text-cyan-300 font-mono px-2 py-0.5 rounded-full border border-cyan-700/50" id="lblDailyDate">امروز</span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">۲۵ سوال مشترک برای تمام شرکت‌کنندگان سراسر ایران</p>
            </div>
          </div>
          <button class="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition cursor-pointer">
            شرکت در چالش
          </button>
        </div>

        <!-- UNIFIED PRESET SELECTOR (One Single Game, Different Flavors) -->
        <div class="space-y-3">
          <label class="block text-xs font-bold text-slate-300">حالت مسابقه را انتخاب کنید:</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5" id="presetPillsContainer">
            
            <button class="preset-pill p-3.5 rounded-2xl glass-box glass-hover text-right cursor-pointer ring-2 ring-cyan-500 bg-slate-900/90" data-preset="blitz_30">
              <div class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>⚡ مسابقه ۳۰ ثانیه‌ای</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-1">حداکثر سوال در ۳۰ ثانیه</div>
            </button>

            <button class="preset-pill p-3.5 rounded-2xl glass-box glass-hover text-right cursor-pointer" data-preset="blitz_60">
              <div class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>⏱️ ماراتن ۶۰ ثانیه‌ای</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-1">آزمون تمرکز و پایداری ذهن</div>
            </button>

            <button class="preset-pill p-3.5 rounded-2xl glass-box glass-hover text-right cursor-pointer" data-preset="sprint_20">
              <div class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>🎯 چالش ۲۰ سوال</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-1">حل سریع با ثبت دقیق زمان</div>
            </button>

            <button class="preset-pill p-3.5 rounded-2xl glass-box glass-hover text-right cursor-pointer" data-preset="mul_practice">
              <div class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>✖️ تمرین جدول ضرب</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-1">دریل تخصصی ضرب تک و دو رقمی</div>
            </button>

            <button class="preset-pill p-3.5 rounded-2xl glass-box glass-hover text-right cursor-pointer" data-preset="survival">
              <div class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>💀 حالت بقا</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-1">شروع ۵ ثانیه، هر خطا = باخت</div>
            </button>

            <button class="preset-pill p-3.5 rounded-2xl glass-box glass-hover text-right cursor-pointer" data-preset="custom">
              <div class="text-sm font-bold text-white flex items-center gap-1.5">
                <span>⚙️ تنظیمات دلخواه</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-1">انتخاب عملگرها و زمان دستی</div>
            </button>

          </div>
        </div>

        <!-- CUSTOM OPERATOR ACCORDION (shown when custom or for fine tuning) -->
        <div id="boxCustomSettings" class="hidden p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] space-y-3">
          <div class="text-xs font-bold text-slate-300">عملگرهای فعال:</div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-white/[0.04] cursor-pointer">
              <input type="checkbox" id="chkAdd" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800">
              <span>جمع (+)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-white/[0.04] cursor-pointer">
              <input type="checkbox" id="chkSub" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800">
              <span>تفریق (−)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-white/[0.04] cursor-pointer">
              <input type="checkbox" id="chkMul" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800">
              <span>ضرب (×)</span>
            </label>
            <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-white/[0.04] cursor-pointer">
              <input type="checkbox" id="chkDiv" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800">
              <span>تقسیم (÷)</span>
            </label>
          </div>
        </div>

        <!-- BIG START BUTTON -->
        <div class="pt-2">
          <button id="btnMainStart" class="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-lg shadow-xl shadow-cyan-500/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer">
            <span>شروع مسابقه</span>
            <span class="font-mono text-xl">⚡</span>
          </button>
        </div>

      </div>

    </section>

    <!-- ============================================== -->
    <!-- SCREEN 2: ACTIVE RUN ARENA (Unified & Fast) -->
    <!-- ============================================== -->
    <section id="viewRun" class="hidden flex flex-col items-center justify-center max-w-2xl mx-auto w-full py-4">
      
      <!-- Top Scoreboard Bar -->
      <div class="w-full glass-box rounded-3xl p-5 mb-5 shadow-2xl flex items-center justify-between gap-4">
        
        <div class="text-right">
          <span class="text-[11px] text-slate-400 block" id="lblArenaTimer">زمان</span>
          <div id="hudTimer" class="num-font text-2xl sm:text-3xl font-extrabold text-cyan-400">00:30.000</div>
        </div>

        <div class="text-center">
          <span class="text-[11px] text-slate-400 block">سرعت (OPM)</span>
          <div id="hudOpm" class="num-font text-2xl sm:text-3xl font-extrabold text-emerald-400">0.0</div>
        </div>

        <div class="text-center">
          <span class="text-[11px] text-slate-400 block">زنجیره (Streak)</span>
          <div class="flex items-center justify-center gap-1">
            <span id="hudStreak" class="num-font text-2xl sm:text-3xl font-black text-amber-400">0</span>
            <span id="hudMultiplier" class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">x1</span>
          </div>
        </div>

        <div class="text-left">
          <span class="text-[11px] text-slate-400 block" id="lblArenaCounter">درست</span>
          <div id="hudCounter" class="num-font text-2xl sm:text-3xl font-extrabold text-white">0</div>
        </div>

      </div>

      <!-- Problem Stage -->
      <div id="problemContainer" class="w-full glass-box rounded-3xl p-8 sm:p-14 flex flex-col items-center justify-center shadow-2xl relative min-h-[240px]">
        
        <div class="absolute top-4 left-5 text-xs font-mono text-slate-400" id="lblProblemIndex">#1</div>
        <div class="absolute top-4 right-5 text-xs font-mono text-cyan-400 font-bold" id="lblPresetNameTag">مسابقه ۳۰ ثانیه‌ای</div>

        <!-- Math Expression -->
        <div class="text-center space-y-4">
          <div id="txtProblemExpression" class="num-font text-5xl sm:text-7xl font-extrabold text-white tracking-widest leading-none">
            7 × 8
          </div>
          
          <!-- Answer Input Display -->
          <div id="boxInputDisplay" class="inline-flex items-center justify-center min-w-[160px] h-16 px-6 rounded-2xl bg-slate-950/90 border-2 border-cyan-500/40 font-mono text-3xl sm:text-4xl font-black text-cyan-400 tracking-wider shadow-inner">
            <span id="txtUserInputEcho" class="tabular-nums"></span>
            <span id="cursorBlink" class="w-3 h-8 bg-cyan-400 inline-block animate-pulse ml-1 rounded-sm"></span>
          </div>
        </div>

      </div>

      <!-- Touch Numpad Keyboard -->
      <div class="w-full max-w-sm mt-5 grid grid-cols-3 gap-2">
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="7">7</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="8">8</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="9">9</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="4">4</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="5">5</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="6">6</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="1">1</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="2">2</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="3">3</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-xl font-bold font-mono text-rose-400 active:scale-95 transition cursor-pointer" data-val="clear">C</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="0">0</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-box text-xl font-bold font-mono text-cyan-400 active:scale-95 transition cursor-pointer" data-val="minus">−</button>
      </div>

      <!-- Action Footer -->
      <div class="mt-4 flex items-center justify-between w-full max-w-sm text-xs text-slate-400 px-2">
        <button id="btnAbortRun" class="hover:text-rose-400 transition cursor-pointer">انصراف (Esc)</button>
        <button id="btnSkipProblem" class="hover:text-cyan-400 transition cursor-pointer">رد کردن سوال (Space)</button>
      </div>

    </section>

    <!-- ============================================== -->
    <!-- SCREEN 3: POST-RUN RESULTS & STATS -->
    <!-- ============================================== -->
    <section id="viewSummary" class="hidden flex flex-col gap-6 max-w-2xl mx-auto w-full py-4">
      
      <div class="glass-box rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <span class="text-xs font-bold text-emerald-400">کارنامه مسابقه</span>
            <h2 class="text-2xl font-black text-white mt-0.5" id="sumTitle">پایان مسابقه</h2>
          </div>
          <div class="text-right">
            <span class="text-xs text-slate-400 block">تغییر ریتینگ ELO</span>
            <span class="num-font text-lg font-black text-cyan-400" id="sumEloChange">+24</span>
          </div>
        </div>

        <!-- 4 Stats Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div class="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.04]">
            <span class="text-[11px] text-slate-400">سرعت (OPM)</span>
            <div class="num-font text-2xl font-black text-cyan-400 mt-1" id="sumOpm">54.0</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.04]">
            <span class="text-[11px] text-slate-400">دقت پاسخ‌ها</span>
            <div class="num-font text-2xl font-black text-emerald-400 mt-1" id="sumAccuracy">95%</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.04]">
            <span class="text-[11px] text-slate-400">زمان مسابقه</span>
            <div class="num-font text-2xl font-black text-amber-400 mt-1" id="sumDuration">30s</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.04]">
            <span class="text-[11px] text-slate-400">بیشترین زنجیره</span>
            <div class="num-font text-2xl font-black text-violet-400 mt-1" id="sumStreak">12</div>
          </div>
        </div>

        <!-- Bottleneck Insights -->
        <div class="space-y-2">
          <h4 class="text-xs font-bold text-slate-300">کندترین فکت‌های این مسابقه:</h4>
          <div id="boxBottlenecks" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <!-- Populated dynamically -->
          </div>
        </div>

        <!-- Actions -->
        <div class="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <button id="btnPlayAgain" class="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition cursor-pointer">
            تکرار همین مسابقه
          </button>
          <button id="btnReturnHub" class="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer">
            بازگشت به منوی اصلی
          </button>
        </div>

      </div>

    </section>

    <!-- ============================================== -->
    <!-- SCREEN 4: LEADERBOARD -->
    <!-- ============================================== -->
    <section id="viewLeaderboard" class="hidden flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <div class="glass-box rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
        <div class="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-white">🏆 جدول رده‌بندی برترین‌ها</h2>
            <p class="text-xs text-slate-400 mt-0.5">مشاهده سریع‌ترین رکوردهای سراسری، چالش روزانه و استانی</p>
          </div>
          <button id="btnBackFromLeaderboard" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer">
            بازگشت
          </button>
        </div>

        <!-- Filter Selectors -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">بخش رده‌بندی:</label>
            <select id="selLbMode" class="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white">
              <option value="all">همه حالت‌ها</option>
              <option value="daily">چالش‌های روزانه</option>
              <option value="blitz_30">مسابقه ۳۰ ثانیه‌ای</option>
              <option value="blitz_60">ماراتن ۶۰ ثانیه‌ای</option>
              <option value="sprint_20">چالش ۲۰ سوال</option>
              <option value="mul_practice">تمرین ضرب</option>
              <option value="survival">حالت بقا</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">بازه زمانی:</label>
            <select id="selLbPeriod" class="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white">
              <option value="all">همه‌زمان‌ها</option>
              <option value="weekly">هفتگی</option>
              <option value="today">امروز</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">استان:</label>
            <select id="selLbProvince" class="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white">
              <option value="all">سراسر کشور</option>
              <option value="tehran">تهران</option>
              <option value="isfahan">اصفهان</option>
              <option value="fars">فارس</option>
              <option value="khorasan_razavi">خراسان رضوی</option>
              <option value="east_azerbaijan">آذربایجان شرقی</option>
              <option value="khuzestan">خوزستان</option>
              <option value="gilan">گیلان</option>
              <option value="mazandaran">مازندران</option>
              <option value="alborz">البرز</option>
              <option value="kerman">کرمان</option>
              <option value="yazd">یزد</option>
              <option value="qom">قم</option>
            </select>
          </div>
        </div>

        <!-- Leaderboard Table -->
        <div class="overflow-x-auto rounded-2xl border border-white/[0.06]">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-950 text-slate-400 border-b border-white/[0.06]">
              <tr>
                <th class="p-3 text-center w-12">رتبه</th>
                <th class="p-3">نام کاربر</th>
                <th class="p-3 text-center">استان</th>
                <th class="p-3 text-center">ریتینگ ELO</th>
                <th class="p-3 text-center">سرعت (OPM)</th>
                <th class="p-3 text-center">دقت</th>
              </tr>
            </thead>
            <tbody id="tblLeaderboardBody" class="divide-y divide-white/[0.04] font-mono">
              <!-- Populated dynamically -->
            </tbody>
          </table>
        </div>

      </div>

    </section>

  </main>

  <!-- ============================================== -->
  <!-- MODAL: AUTHENTICATION (LOGIN / REGISTER) -->
  <!-- ============================================== -->
  <div id="modalAuth" class="hidden fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="glass-box rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-5 border border-white/[0.1]">
      
      <div class="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <!-- Auth Tabs -->
        <div class="flex items-center gap-4">
          <button id="tabAuthLogin" class="text-sm font-black text-cyan-400 pb-1 border-b-2 border-cyan-400 cursor-pointer">ورود</button>
          <button id="tabAuthRegister" class="text-sm font-bold text-slate-400 pb-1 cursor-pointer hover:text-white">ثبت‌نام</button>
        </div>
        <button id="btnCloseAuthModal" class="text-slate-400 hover:text-white text-lg cursor-pointer">✕</button>
      </div>

      <!-- Auth Form -->
      <form id="formAuth" class="space-y-4 text-xs">
        <div>
          <label class="block font-semibold text-slate-300 mb-1">نام کاربری:</label>
          <input type="text" id="iptAuthUsername" required maxlength="25" placeholder="مثال: آرش" class="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
        </div>

        <div>
          <label class="block font-semibold text-slate-300 mb-1">رمز عبور:</label>
          <input type="password" id="iptAuthPassword" required minlength="4" placeholder="حداقل ۴ رقم یا حرف" class="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
        </div>

        <!-- Province Selector (for registration) -->
        <div id="boxAuthProvince" class="hidden">
          <label class="block font-semibold text-slate-300 mb-1">استان سکونت:</label>
          <select id="selAuthProvince" class="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
            <option value="tehran">تهران</option>
            <option value="isfahan">اصفهان</option>
            <option value="fars">فارس</option>
            <option value="khorasan_razavi">خراسان رضوی</option>
            <option value="east_azerbaijan">آذربایجان شرقی</option>
            <option value="khuzestan">خوزستان</option>
            <option value="gilan">گیلان</option>
            <option value="mazandaran">مازندران</option>
            <option value="alborz">البرز</option>
            <option value="kerman">کرمان</option>
            <option value="yazd">یزد</option>
            <option value="qom">قم</option>
            <option value="other">سایر استان‌ها</option>
          </select>
        </div>

        <div id="authErrorMsg" class="hidden text-rose-400 text-xs font-medium py-1"></div>

        <button type="submit" id="btnAuthSubmit" class="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-lg shadow-cyan-500/20">
          ورود به حساب
        </button>
      </form>

      <!-- Logout button (when already logged in) -->
      <div id="boxLogoutSection" class="hidden pt-2 border-t border-white/[0.08] text-center">
        <button id="btnLogout" class="text-xs text-rose-400 hover:text-rose-300 font-bold cursor-pointer">
          خروج از حساب کاربری
        </button>
      </div>

    </div>
  </div>

  <!-- APPLICATION ENGINE JAVASCRIPT -->
  <script type="module">
    const PROVINCE_MAP = {
      tehran: 'تهران', isfahan: 'اصفهان', fars: 'فارس',
      khorasan_razavi: 'خراسان رضوی', east_azerbaijan: 'آذربایجان شرقی',
      khuzestan: 'خوزستان', gilan: 'گیلان', mazandaran: 'مازندران',
      alborz: 'البرز', kerman: 'کرمان', yazd: 'یزد', qom: 'قم', other: 'ایران'
    };

    const RANKS = [
      { minElo: 0, title: 'تازه‌کار', badge: '🌱' },
      { minElo: 1100, title: 'کارآموز', badge: '⚡' },
      { minElo: 1300, title: 'محاسب برتر', badge: '🔥' },
      { minElo: 1500, title: 'خبره', badge: '💎' },
      { minElo: 1700, title: 'استاد سرعت', badge: '👑' },
      { minElo: 1900, title: 'گرندمستر', badge: '🪐' },
      { minElo: 2100, title: 'نابغه ملی', badge: '🏆' },
    ];

    function getRank(elo) {
      let r = RANKS[0];
      for (const item of RANKS) {
        if (elo >= item.minElo) r = item;
      }
      return r;
    }

    const STATE = {
      user: null, // { id, username, province, elo_rating }
      authMode: 'login', // 'login' or 'register'
      settings: {
        audio: true,
        zenMode: true
      },
      currentPreset: 'blitz_30', // blitz_30, blitz_60, sprint_20, mul_practice, survival, daily, custom
      activeRun: null,
      dailyChallenge: null
    };

    // Load LocalStorage cache
    function loadStorage() {
      try {
        const storedUser = localStorage.getItem('mathgame_auth_user');
        if (storedUser) {
          STATE.user = JSON.parse(storedUser);
        } else {
          // Default anonymous guest
          const rNum = Math.floor(100 + Math.random() * 900);
          STATE.user = {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            username: 'کاربر_' + rNum,
            province: 'tehran',
            elo_rating: 1200,
            isGuest: true
          };
          saveStorage();
        }

        const s = localStorage.getItem('mathgame_settings');
        if (s) Object.assign(STATE.settings, JSON.parse(s));
      } catch (e) {}
    }

    function saveStorage() {
      try {
        localStorage.setItem('mathgame_auth_user', JSON.stringify(STATE.user));
        localStorage.setItem('mathgame_settings', JSON.stringify(STATE.settings));
      } catch (e) {}
    }

    // ==========================================
    // SYNTHETIC AUDIO & HAPTIC FEEDBACK
    // ==========================================
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }
    window.addEventListener('pointerdown', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });

    function playClick() {
      if (!STATE.settings.audio) return;
      try {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1500, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.022);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.026);
        if (navigator.vibrate) navigator.vibrate(12);
      } catch (e) {}
    }

    function playBuzz() {
      if (!STATE.settings.audio) return;
      try {
        initAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.12);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
        if (navigator.vibrate) navigator.vibrate([25, 20, 25]);
      } catch (e) {}
    }

    // ==========================================
    // DOM REFERENCES
    // ==========================================
    const DOM = {
      viewHub: document.getElementById('viewHub'),
      viewRun: document.getElementById('viewRun'),
      viewSummary: document.getElementById('viewSummary'),
      viewLeaderboard: document.getElementById('viewLeaderboard'),
      modalAuth: document.getElementById('modalAuth'),

      btnNavHome: document.getElementById('btnNavHome'),
      btnAudioToggle: document.getElementById('btnAudioToggle'),
      iconAudio: document.getElementById('iconAudio'),
      btnNavLeaderboard: document.getElementById('btnNavLeaderboard'),
      btnUserAuth: document.getElementById('btnUserAuth'),
      navUserName: document.getElementById('navUserName'),
      navUserBadge: document.getElementById('navUserBadge'),
      navUserElo: document.getElementById('navUserElo'),

      txtGreetingName: document.getElementById('txtGreetingName'),
      heroRankBadge: document.getElementById('heroRankBadge'),
      heroEloNumber: document.getElementById('heroEloNumber'),
      boxDailyChallenge: document.getElementById('boxDailyChallenge'),
      lblDailyDate: document.getElementById('lblDailyDate'),
      presetPills: document.querySelectorAll('.preset-pill'),
      boxCustomSettings: document.getElementById('boxCustomSettings'),
      chkAdd: document.getElementById('chkAdd'),
      chkSub: document.getElementById('chkSub'),
      chkMul: document.getElementById('chkMul'),
      chkDiv: document.getElementById('chkDiv'),
      btnMainStart: document.getElementById('btnMainStart'),

      hudTimer: document.getElementById('hudTimer'),
      hudOpm: document.getElementById('hudOpm'),
      hudStreak: document.getElementById('hudStreak'),
      hudMultiplier: document.getElementById('hudMultiplier'),
      hudCounter: document.getElementById('hudCounter'),
      lblArenaTimer: document.getElementById('lblArenaTimer'),
      lblArenaCounter: document.getElementById('lblArenaCounter'),
      lblPresetNameTag: document.getElementById('lblPresetNameTag'),
      lblProblemIndex: document.getElementById('lblProblemIndex'),
      problemContainer: document.getElementById('problemContainer'),
      txtProblemExpression: document.getElementById('txtProblemExpression'),
      txtUserInputEcho: document.getElementById('txtUserInputEcho'),
      boxInputDisplay: document.getElementById('boxInputDisplay'),
      btnAbortRun: document.getElementById('btnAbortRun'),
      btnSkipProblem: document.getElementById('btnSkipProblem'),

      sumTitle: document.getElementById('sumTitle'),
      sumEloChange: document.getElementById('sumEloChange'),
      sumOpm: document.getElementById('sumOpm'),
      sumAccuracy: document.getElementById('sumAccuracy'),
      sumDuration: document.getElementById('sumDuration'),
      sumStreak: document.getElementById('sumStreak'),
      boxBottlenecks: document.getElementById('boxBottlenecks'),
      btnPlayAgain: document.getElementById('btnPlayAgain'),
      btnReturnHub: document.getElementById('btnReturnHub'),

      selLbMode: document.getElementById('selLbMode'),
      selLbPeriod: document.getElementById('selLbPeriod'),
      selLbProvince: document.getElementById('selLbProvince'),
      tblLeaderboardBody: document.getElementById('tblLeaderboardBody'),
      btnBackFromLeaderboard: document.getElementById('btnBackFromLeaderboard'),

      tabAuthLogin: document.getElementById('tabAuthLogin'),
      tabAuthRegister: document.getElementById('tabAuthRegister'),
      btnCloseAuthModal: document.getElementById('btnCloseAuthModal'),
      formAuth: document.getElementById('formAuth'),
      iptAuthUsername: document.getElementById('iptAuthUsername'),
      iptAuthPassword: document.getElementById('iptAuthPassword'),
      boxAuthProvince: document.getElementById('boxAuthProvince'),
      selAuthProvince: document.getElementById('selAuthProvince'),
      authErrorMsg: document.getElementById('authErrorMsg'),
      btnAuthSubmit: document.getElementById('btnAuthSubmit'),
      boxLogoutSection: document.getElementById('boxLogoutSection'),
      btnLogout: document.getElementById('btnLogout')
    };

    function showScreen(name) {
      DOM.viewHub.classList.add('hidden');
      DOM.viewRun.classList.add('hidden');
      DOM.viewSummary.classList.add('hidden');
      DOM.viewLeaderboard.classList.add('hidden');

      if (name === 'hub') DOM.viewHub.classList.remove('hidden');
      else if (name === 'run') DOM.viewRun.classList.remove('hidden');
      else if (name === 'summary') DOM.viewSummary.classList.remove('hidden');
      else if (name === 'leaderboard') DOM.viewLeaderboard.classList.remove('hidden');
    }

    function updateNavAndProfile() {
      if (!STATE.user) return;
      const rank = getRank(STATE.user.elo_rating || 1200);

      DOM.navUserBadge.textContent = rank.badge;
      DOM.heroRankBadge.textContent = rank.badge;
      DOM.heroEloNumber.textContent = STATE.user.elo_rating || 1200;

      if (STATE.user.isGuest) {
        DOM.navUserName.textContent = 'ورود / ثبت‌نام';
        DOM.navUserElo.classList.add('hidden');
        DOM.txtGreetingName.textContent = STATE.user.username;
        DOM.boxLogoutSection.classList.add('hidden');
      } else {
        DOM.navUserName.textContent = STATE.user.username;
        DOM.navUserElo.textContent = (STATE.user.elo_rating || 1200) + ' ELO';
        DOM.navUserElo.classList.remove('hidden');
        DOM.txtGreetingName.textContent = STATE.user.username;
        DOM.boxLogoutSection.classList.remove('hidden');
      }
    }

    // ==========================================
    // UNIFIED PROBLEM GENERATOR
    // ==========================================
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getNextQuestion(preset, run) {
      // 1. Daily Challenge mode uses pre-seeded 25 questions
      if (preset === 'daily' && STATE.dailyChallenge?.questions) {
        const qIndex = run.totalAnswered;
        if (qIndex < STATE.dailyChallenge.questions.length) {
          const q = STATE.dailyChallenge.questions[qIndex];
          return {
            a: q.a, b: q.b, op: q.op, answer: q.answer,
            expression: q.expression,
            expectedLen: Math.abs(q.answer).toString().length
          };
        }
      }

      // 2. Multiplication Drill preset
      if (preset === 'mul_practice') {
        const a = rand(2, 12);
        const b = rand(2, 12);
        const ans = a * b;
        return {
          a, b, op: '×', answer: ans,
          expression: \`\${a} × \${b}\`,
          expectedLen: Math.abs(ans).toString().length
        };
      }

      // 3. General presets & Custom
      const ops = [];
      if (preset === 'custom') {
        if (DOM.chkAdd.checked) ops.push('+');
        if (DOM.chkSub.checked) ops.push('-');
        if (DOM.chkMul.checked) ops.push('×');
        if (DOM.chkDiv.checked) ops.push('÷');
      } else {
        ops.push('+', '-', '×', '÷');
      }
      if (ops.length === 0) ops.push('+');
      const op = ops[Math.floor(Math.random() * ops.length)];

      let a = 0, b = 0, answer = 0, expression = '';

      if (op === '+') {
        a = rand(10, 85); b = rand(8, 75);
        answer = a + b;
        expression = \`\${a} + \${b}\`;
      } else if (op === '-') {
        a = rand(25, 99); b = rand(6, a - 1);
        answer = a - b;
        expression = \`\${a} − \${b}\`;
      } else if (op === '×') {
        a = rand(2, 12); b = rand(2, 12);
        answer = a * b;
        expression = \`\${a} × \${b}\`;
      } else { // '÷'
        b = rand(2, 9);
        const q = rand(2, 12);
        a = b * q;
        answer = q;
        expression = \`\${a} ÷ \${b}\`;
      }

      return {
        a, b, op, answer, expression,
        expectedLen: Math.abs(answer).toString().length
      };
    }

    // ==========================================
    // UNIFIED ARENA ENGINE LOOP
    // ==========================================
    let animId = null;

    function startRun() {
      const preset = STATE.currentPreset;
      let timeLimitMs = null;
      let targetCount = null;
      let survivalMs = null;
      let presetTitle = 'مسابقه ۳۰ ثانیه‌ای';

      if (preset === 'blitz_30') {
        timeLimitMs = 30000;
        presetTitle = 'مسابقه ۳۰ ثانیه‌ای';
      } else if (preset === 'blitz_60') {
        timeLimitMs = 60000;
        presetTitle = 'ماراتن ۶۰ ثانیه‌ای';
      } else if (preset === 'sprint_20') {
        targetCount = 20;
        presetTitle = 'چالش ۲۰ سوال';
      } else if (preset === 'mul_practice') {
        timeLimitMs = 45000;
        presetTitle = 'تمرین جدول ضرب';
      } else if (preset === 'survival') {
        survivalMs = 5000;
        presetTitle = 'حالت بقا';
      } else if (preset === 'daily') {
        targetCount = 25;
        presetTitle = 'چالش روزانه';
      } else { // custom
        timeLimitMs = 45000;
        presetTitle = 'تنظیمات دلخواه';
      }

      DOM.lblPresetNameTag.textContent = presetTitle;

      STATE.activeRun = {
        preset,
        timeLimitMs,
        targetCount,
        survivalRemainingMs: survivalMs,
        startTime: performance.now(),
        lastProblemTime: performance.now(),
        lastSurvivalTick: performance.now(),
        durationMs: 0,
        totalAnswered: 0,
        correctCount: 0,
        wrongCount: 0,
        currentStreak: 0,
        maxStreak: 0,
        currentProblem: null,
        userTyped: '',
        telemetry: []
      };

      DOM.hudTimer.textContent = '00:00.000';
      DOM.hudOpm.textContent = '0.0';
      DOM.hudStreak.textContent = '0';
      DOM.hudMultiplier.textContent = 'x1';
      DOM.hudCounter.textContent = '0';
      DOM.txtUserInputEcho.textContent = '';

      if (targetCount) {
        DOM.lblArenaTimer.textContent = 'زمان مسابقه';
        DOM.lblArenaCounter.textContent = \`پیشرفت (از \${targetCount})\`;
      } else {
        DOM.lblArenaTimer.textContent = 'زمان باقی‌مانده';
        DOM.lblArenaCounter.textContent = 'پاسخ صحیح';
      }

      showScreen('run');
      nextProblem();

      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(arenaTick);
    }

    function arenaTick(timestamp) {
      if (!STATE.activeRun) return;
      const run = STATE.activeRun;
      const elapsed = performance.now() - run.startTime;
      run.durationMs = elapsed;

      // Handle Timer progression
      if (run.timeLimitMs) {
        const remaining = Math.max(0, run.timeLimitMs - elapsed);
        DOM.hudTimer.textContent = formatMs(remaining);
        if (remaining <= 0) {
          endRun();
          return;
        }
      } else if (run.survivalRemainingMs !== null) {
        const now = performance.now();
        const delta = now - run.lastSurvivalTick;
        run.lastSurvivalTick = now;
        run.survivalRemainingMs = Math.max(0, run.survivalRemainingMs - delta);
        DOM.hudTimer.textContent = formatMs(run.survivalRemainingMs);
        if (run.survivalRemainingMs <= 0) {
          endRun('پایان زمان در حالت بقا');
          return;
        }
      } else {
        // Target count: stopwatch timer
        DOM.hudTimer.textContent = formatMs(elapsed);
      }

      // Live OPM
      const minutes = elapsed / 60000;
      if (minutes > 0.008) {
        const opm = (run.correctCount / minutes);
        DOM.hudOpm.textContent = opm.toFixed(1);
      }

      animId = requestAnimationFrame(arenaTick);
    }

    function formatMs(ms) {
      const totalSec = Math.floor(ms / 1000);
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      const milli = Math.floor(ms % 1000);
      return \`\${String(m).padStart(2, '0')}:\${String(s).padStart(2, '0')}.\${String(milli).padStart(3, '0')}\`;
    }

    function nextProblem() {
      if (!STATE.activeRun) return;
      const run = STATE.activeRun;

      if (run.targetCount && run.correctCount >= run.targetCount) {
        endRun('آفرین! تمام سوالات حل شد.');
        return;
      }

      const problem = getNextQuestion(run.preset, run);
      if (!problem) {
        endRun();
        return;
      }

      run.currentProblem = problem;
      run.userTyped = '';
      run.lastProblemTime = performance.now();

      DOM.txtProblemExpression.textContent = problem.expression;
      DOM.txtUserInputEcho.textContent = '';
      DOM.lblProblemIndex.textContent = '#' + (run.totalAnswered + 1);

      DOM.boxInputDisplay.classList.remove('border-rose-500', 'text-rose-400');
      DOM.boxInputDisplay.classList.add('border-cyan-500/40', 'text-cyan-400');
    }

    function handleInputDigit(digit) {
      if (!STATE.activeRun) return;
      const run = STATE.activeRun;

      if (digit === 'clear') {
        run.userTyped = '';
        DOM.txtUserInputEcho.textContent = '';
        return;
      }

      if (digit === 'minus') {
        if (!run.userTyped.startsWith('-')) {
          run.userTyped = '-' + run.userTyped;
          DOM.txtUserInputEcho.textContent = run.userTyped;
        }
        return;
      }

      if (digit === 'backspace') {
        run.userTyped = run.userTyped.slice(0, -1);
        DOM.txtUserInputEcho.textContent = run.userTyped;
        return;
      }

      run.userTyped += digit;
      DOM.txtUserInputEcho.textContent = run.userTyped;
      playClick();

      // Zen auto-submit
      if (run.userTyped.length >= run.currentProblem.expectedLen) {
        evaluateCurrentInput();
      }
    }

    function evaluateCurrentInput() {
      if (!STATE.activeRun || !STATE.activeRun.currentProblem) return;
      const run = STATE.activeRun;
      const problem = run.currentProblem;
      const typed = parseInt(run.userTyped, 10);
      const latencyMs = Math.round(performance.now() - run.lastProblemTime);

      const isCorrect = (typed === problem.answer);
      run.totalAnswered++;

      run.telemetry.push({
        problem: problem.expression,
        a: problem.a, b: problem.b, op: problem.op,
        answer: problem.answer,
        userAnswer: typed,
        correct: isCorrect,
        latencyMs: Math.max(latencyMs, 10)
      });

      if (isCorrect) {
        run.correctCount++;
        run.currentStreak++;
        if (run.currentStreak > run.maxStreak) run.maxStreak = run.currentStreak;

        DOM.problemContainer.classList.remove('animate-hit', 'animate-miss');
        void DOM.problemContainer.offsetWidth;
        DOM.problemContainer.classList.add('animate-hit');

        if (run.survivalRemainingMs !== null) {
          run.survivalRemainingMs = Math.min(run.survivalRemainingMs + 1500, 10000);
        }

        updateStreakDisplay(run.currentStreak);

        if (run.targetCount) {
          DOM.hudCounter.textContent = \`\${run.correctCount} / \${run.targetCount}\`;
        } else {
          DOM.hudCounter.textContent = run.correctCount;
        }

        nextProblem();

      } else {
        run.wrongCount++;
        run.currentStreak = 0;
        updateStreakDisplay(0);

        DOM.problemContainer.classList.remove('animate-hit', 'animate-miss');
        void DOM.problemContainer.offsetWidth;
        DOM.problemContainer.classList.add('animate-miss');
        playBuzz();

        if (run.survivalRemainingMs !== null) {
          endRun(\`باخت در حالت بقا! پاسخ صحیح \${problem.answer} بود.\`);
          return;
        }

        DOM.boxInputDisplay.classList.remove('border-cyan-500/40', 'text-cyan-400');
        DOM.boxInputDisplay.classList.add('border-rose-500', 'text-rose-400');

        setTimeout(() => {
          if (STATE.activeRun) nextProblem();
        }, 160);
      }
    }

    function skipProblem() {
      if (!STATE.activeRun || !STATE.activeRun.currentProblem) return;
      const run = STATE.activeRun;
      run.totalAnswered++;
      run.wrongCount++;
      run.currentStreak = 0;
      updateStreakDisplay(0);
      playBuzz();
      nextProblem();
    }

    function updateStreakDisplay(s) {
      DOM.hudStreak.textContent = s;
      let mult = 'x1';
      if (s >= 25) mult = 'x4 🔥';
      else if (s >= 10) mult = 'x3 ⚡';
      else if (s >= 5) mult = 'x2';
      DOM.hudMultiplier.textContent = mult;
    }

    function endRun(customTitle = null) {
      if (!STATE.activeRun) return;
      if (animId) cancelAnimationFrame(animId);

      const run = STATE.activeRun;
      STATE.activeRun = null;

      const elapsed = Math.round(performance.now() - run.startTime);
      const minutes = elapsed / 60000;
      const opm = minutes > 0 ? parseFloat((run.correctCount / minutes).toFixed(1)) : 0;
      const accuracy = run.totalAnswered > 0 ? parseFloat(((run.correctCount / run.totalAnswered) * 100).toFixed(0)) : 0;

      DOM.sumTitle.textContent = customTitle || 'پایان مسابقه';
      DOM.sumOpm.textContent = opm.toFixed(1);
      DOM.sumAccuracy.textContent = accuracy + '%';
      DOM.sumDuration.textContent = (elapsed / 1000).toFixed(1) + 's';
      DOM.sumStreak.textContent = run.maxStreak;

      // Render bottlenecks
      renderBottlenecks(run.telemetry);

      showScreen('summary');

      // Submit to backend
      submitRun({
        userId: STATE.user.id,
        username: STATE.user.username,
        province: STATE.user.province,
        mode: run.preset === 'daily' ? \`daily_\${new Date().toISOString().split('T')[0]}\` : run.preset,
        durationMs: elapsed,
        totalAnswered: run.totalAnswered,
        correctCount: run.correctCount,
        wrongCount: run.wrongCount,
        opm,
        accuracy,
        details: run.telemetry,
        clientTimestamp: Date.now()
      });
    }

    function renderBottlenecks(telemetry) {
      DOM.boxBottlenecks.innerHTML = '';
      const map = {};
      telemetry.forEach(t => {
        if (!map[t.problem]) {
          map[t.problem] = { problem: t.problem, answer: t.answer, totalLatency: 0, count: 0, errors: 0 };
        }
        map[t.problem].count++;
        map[t.problem].totalLatency += t.latencyMs;
        if (!t.correct) map[t.problem].errors++;
      });

      const list = Object.values(map)
        .map(b => ({ ...b, avg: Math.round(b.totalLatency / b.count) }))
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 4);

      if (list.length === 0) {
        DOM.boxBottlenecks.innerHTML = '<div class="text-xs text-slate-400 py-2">داده‌ای ثبت نشد.</div>';
        return;
      }

      list.forEach(b => {
        const item = document.createElement('div');
        item.className = 'p-2.5 rounded-xl bg-slate-900 border border-white/[0.04] flex items-center justify-between text-xs';
        item.innerHTML = \`
          <span class="num-font font-bold text-white">\${b.problem} = \${b.answer}</span>
          <span class="num-font text-amber-400 font-semibold">\${b.avg}ms</span>
        \`;
        DOM.boxBottlenecks.appendChild(item);
      });
    }

    async function submitRun(payload) {
      try {
        const res = await fetch('/api/runs/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.newElo !== undefined) {
            STATE.user.elo_rating = data.newElo;
            saveStorage();
            updateNavAndProfile();
            const sign = data.delta >= 0 ? '+' : '';
            DOM.sumEloChange.textContent = \`\${sign}\${data.delta} (\${data.newElo})\`;
          }
        }
      } catch (e) {
        DOM.sumEloChange.textContent = 'ثبت شد (آفلاین)';
      }
    }

    // ==========================================
    // LEADERBOARD FETCH
    // ==========================================
    async function loadLeaderboard() {
      const mode = DOM.selLbMode.value;
      const period = DOM.selLbPeriod.value;
      const province = DOM.selLbProvince.value;

      DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400">در حال دریافت رده‌بندی...</td></tr>';

      try {
        const q = new URLSearchParams({ mode, period, province }).toString();
        const res = await fetch(\`/api/leaderboard?\${q}\`);
        if (res.ok) {
          const list = await res.json();
          renderLeaderboard(list);
        } else {
          DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400">خطا در بارگذاری جدول</td></tr>';
        }
      } catch (e) {
        DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400">عدم برقراری ارتباط (آفلاین)</td></tr>';
      }
    }

    function renderLeaderboard(list) {
      if (!list || list.length === 0) {
        DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="6" class="p-6 text-center text-slate-400">هنوز رکوردی ثبت نشده است. اولین نفر باشید!</td></tr>';
        return;
      }
      DOM.tblLeaderboardBody.innerHTML = '';
      list.forEach((item, idx) => {
        const tr = document.createElement('tr');
        tr.className = idx < 3 ? 'bg-cyan-950/20' : '';
        let rankStr = \`#\${idx + 1}\`;
        if (idx === 0) rankStr = '🥇 ۱';
        else if (idx === 1) rankStr = '🥈 ۲';
        else if (idx === 2) rankStr = '🥉 ۳';

        tr.innerHTML = \`
          <td class="p-3 text-center font-bold text-white">\${rankStr}</td>
          <td class="p-3 font-bold text-slate-200">\${item.username || 'کاربر مهمان'}</td>
          <td class="p-3 text-center text-slate-400">\${PROVINCE_MAP[item.province] || item.province || 'ایران'}</td>
          <td class="p-3 text-center text-cyan-400 font-bold">\${item.elo_rating || 1200}</td>
          <td class="p-3 text-center text-emerald-400 font-bold">\${item.opm.toFixed(1)}</td>
          <td class="p-3 text-center text-slate-300">\${item.accuracy.toFixed(0)}%</td>
        \`;
        DOM.tblLeaderboardBody.appendChild(tr);
      });
    }

    // ==========================================
    // DAILY CHALLENGE INIT
    // ==========================================
    async function initDailyChallenge() {
      try {
        const res = await fetch('/api/daily/today');
        if (res.ok) {
          const data = await res.json();
          STATE.dailyChallenge = data.challenge;
          DOM.lblDailyDate.textContent = data.challenge?.date || 'امروز';
        }
      } catch (e) {}
    }

    // ==========================================
    // AUTHENTICATION LOGIC (LOGIN / REGISTER)
    // ==========================================
    function setAuthTab(mode) {
      STATE.authMode = mode;
      DOM.authErrorMsg.classList.add('hidden');
      if (mode === 'login') {
        DOM.tabAuthLogin.className = 'text-sm font-black text-cyan-400 pb-1 border-b-2 border-cyan-400 cursor-pointer';
        DOM.tabAuthRegister.className = 'text-sm font-bold text-slate-400 pb-1 cursor-pointer hover:text-white';
        DOM.boxAuthProvince.classList.add('hidden');
        DOM.btnAuthSubmit.textContent = 'ورود به حساب';
      } else {
        DOM.tabAuthRegister.className = 'text-sm font-black text-cyan-400 pb-1 border-b-2 border-cyan-400 cursor-pointer';
        DOM.tabAuthLogin.className = 'text-sm font-bold text-slate-400 pb-1 cursor-pointer hover:text-white';
        DOM.boxAuthProvince.classList.remove('hidden');
        DOM.btnAuthSubmit.textContent = 'ایجاد حساب کاربری';
      }
    }

    DOM.tabAuthLogin.addEventListener('click', () => setAuthTab('login'));
    DOM.tabAuthRegister.addEventListener('click', () => setAuthTab('register'));

    DOM.formAuth.addEventListener('submit', async (e) => {
      e.preventDefault();
      DOM.authErrorMsg.classList.add('hidden');
      const username = DOM.iptAuthUsername.value.trim();
      const password = DOM.iptAuthPassword.value;
      const province = DOM.selAuthProvince.value;

      const endpoint = STATE.authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = { username, password, province };

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const data = await res.json();

        if (res.ok && data.success) {
          STATE.user = {
            id: data.user.id,
            username: data.user.username,
            province: data.user.province,
            elo_rating: data.user.elo_rating || 1200,
            isGuest: false
          };
          saveStorage();
          updateNavAndProfile();
          DOM.modalAuth.classList.add('hidden');
          DOM.formAuth.reset();
        } else {
          DOM.authErrorMsg.textContent = data.error || 'خطا در عملیات';
          DOM.authErrorMsg.classList.remove('hidden');
        }
      } catch (err) {
        DOM.authErrorMsg.textContent = 'خطای اتصال به سرور';
        DOM.authErrorMsg.classList.remove('hidden');
      }
    });

    DOM.btnLogout.addEventListener('click', () => {
      // Return to anonymous guest
      const rNum = Math.floor(100 + Math.random() * 900);
      STATE.user = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        username: 'کاربر_' + rNum,
        province: 'tehran',
        elo_rating: 1200,
        isGuest: true
      };
      saveStorage();
      updateNavAndProfile();
      DOM.modalAuth.classList.add('hidden');
    });

    // ==========================================
    // KEYBOARD INPUT & EVENT LISTENERS
    // ==========================================
    const PERSIAN_DIGITS = {
      '۰':'0', '۱':'1', '۲':'2', '۳':'3', '۴':'4',
      '۵':'5', '۶':'6', '۷':'7', '۸':'8', '۹':'9',
      '٠':'0', '١':'1', '٢':'2', '٣':'3', '٤':'4',
      '٥':'5', '٦':'6', '٧':'7', '٨':'8', '٩':'9',
      '−':'-', '-':'-'
    };

    window.addEventListener('keydown', (e) => {
      // Space to skip problem
      if (e.code === 'Space' && STATE.activeRun) {
        e.preventDefault();
        skipProblem();
        return;
      }

      // Esc to quit run
      if (e.key === 'Escape') {
        if (STATE.activeRun) {
          endRun();
          showScreen('hub');
        }
        DOM.modalAuth.classList.add('hidden');
        return;
      }

      if (!STATE.activeRun) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        evaluateCurrentInput();
        return;
      }

      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleInputDigit('backspace');
        return;
      }

      let ch = e.key;
      if (PERSIAN_DIGITS[ch] !== undefined) ch = PERSIAN_DIGITS[ch];

      if (ch >= '0' && ch <= '9') {
        e.preventDefault();
        handleInputDigit(ch);
      } else if (ch === '-') {
        e.preventDefault();
        handleInputDigit('minus');
      }
    });

    // Touch Numpad buttons
    document.querySelectorAll('.numpad-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const val = btn.getAttribute('data-val');
        handleInputDigit(val);
      });
    });

    // Preset Pill Selection
    DOM.presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.presetPills.forEach(p => p.classList.remove('ring-2', 'ring-cyan-500', 'bg-slate-900/90'));
        pill.classList.add('ring-2', 'ring-cyan-500', 'bg-slate-900/90');
        const preset = pill.getAttribute('data-preset');
        STATE.currentPreset = preset;

        if (preset === 'custom') {
          DOM.boxCustomSettings.classList.remove('hidden');
        } else {
          DOM.boxCustomSettings.classList.add('hidden');
        }
      });
    });

    // Daily Challenge Banner Click
    DOM.boxDailyChallenge.addEventListener('click', () => {
      STATE.currentPreset = 'daily';
      startRun();
    });

    // UI Buttons
    DOM.btnMainStart.addEventListener('click', () => startRun());
    DOM.btnPlayAgain.addEventListener('click', () => startRun());
    DOM.btnReturnHub.addEventListener('click', () => showScreen('hub'));
    DOM.btnAbortRun.addEventListener('click', () => {
      if (animId) cancelAnimationFrame(animId);
      STATE.activeRun = null;
      showScreen('hub');
    });
    DOM.btnSkipProblem.addEventListener('click', () => skipProblem());

    // Navigation & Auth Modals
    DOM.btnNavHome.addEventListener('click', () => showScreen('hub'));
    DOM.btnNavLeaderboard.addEventListener('click', () => {
      showScreen('leaderboard');
      loadLeaderboard();
    });
    DOM.btnBackFromLeaderboard.addEventListener('click', () => showScreen('hub'));
    DOM.selLbMode.addEventListener('change', () => loadLeaderboard());
    DOM.selLbPeriod.addEventListener('change', () => loadLeaderboard());
    DOM.selLbProvince.addEventListener('change', () => loadLeaderboard());

    DOM.btnUserAuth.addEventListener('click', () => {
      DOM.modalAuth.classList.remove('hidden');
      setAuthTab(STATE.user?.isGuest ? 'register' : 'login');
    });
    DOM.btnCloseAuthModal.addEventListener('click', () => DOM.modalAuth.classList.add('hidden'));

    DOM.btnAudioToggle.addEventListener('click', () => {
      STATE.settings.audio = !STATE.settings.audio;
      DOM.iconAudio.textContent = STATE.settings.audio ? '🔊' : '🔇';
      saveStorage();
    });

    // INIT
    loadStorage();
    updateNavAndProfile();
    initDailyChallenge();
  </script>
</body>
</html>`;
}
