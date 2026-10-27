/**
 * ZehnBarter (MathArcade IR) - Self-contained Ultra-Low Latency SPA
 * Persian & English Competitive Mental Math Speedrunning Platform
 */

export function renderAppHtml() {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>ذهن‌برتر | ZehnBarter - لیگ محاسبات ذهنی سریع ایران</title>
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            arcade: {
              bg: '#020617',
              surface: '#0f172a',
              card: '#1e293b',
              border: '#334155',
              cyan: '#06b6d4',
              emerald: '#10b981',
              crimson: '#f43f5e',
              amber: '#f59e0b',
              purple: '#a855f7'
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
    }
    input, textarea {
      user-select: text;
      -webkit-user-select: text;
    }
    body {
      font-family: 'Vazirmatn', system-ui, sans-serif;
      background-color: #020617;
      color: #f8fafc;
      overflow-x: hidden;
      min-height: 100vh;
    }
    .num-font {
      font-family: 'JetBrains Mono', monospace;
      font-variant-numeric: tabular-nums;
    }
    /* Subtle arcade grid overlay */
    .arcade-grid {
      background-size: 40px 40px;
      background-image: 
        linear-gradient(to right, rgba(51, 65, 85, 0.12) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(51, 65, 85, 0.12) 1px, transparent 1px);
    }
    /* Animations */
    @keyframes hit-glow {
      0% { border-color: #10b981; box-shadow: 0 0 25px rgba(16, 185, 129, 0.6); transform: scale(1.015); }
      100% { border-color: #334155; box-shadow: none; transform: scale(1); }
    }
    @keyframes miss-shake {
      0%, 100% { transform: translateX(0); border-color: #f43f5e; box-shadow: 0 0 25px rgba(244, 63, 94, 0.6); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    .animate-hit {
      animation: hit-glow 0.16s ease-out;
    }
    .animate-miss {
      animation: miss-shake 0.22s ease-in-out;
    }
    @keyframes pulse-fire {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.7)); }
      50% { transform: scale(1.12); filter: drop-shadow(0 0 16px rgba(239, 68, 68, 0.9)); }
    }
    .streak-fire {
      animation: pulse-fire 0.7s infinite alternate ease-in-out;
    }
    /* Custom scrollbars */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #090d16;
    }
    ::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #475569;
    }
  </style>
</head>
<body class="arcade-grid text-slate-100 flex flex-col min-h-screen selection:bg-cyan-500 selection:text-slate-950">

  <!-- TOP APP BAR -->
  <header class="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
      
      <!-- Brand & Rank Badge -->
      <div class="flex items-center gap-3">
        <button id="btnNavHome" class="flex items-center gap-2.5 group text-left cursor-pointer">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-emerald-400 flex items-center justify-center font-extrabold text-slate-950 text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            ⚡
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-black text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-emerald-300 to-slate-100 bg-clip-text text-transparent">
                ذهن‌برتر
              </span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 uppercase tracking-widest">
                PRO
              </span>
            </div>
            <div class="text-[11px] text-slate-400 font-medium" id="txtSubTitle">
              لیگ محاسبات ذهنی سریع ایران
            </div>
          </div>
        </button>
      </div>

      <!-- Center Status / Edge PoP / Sync Pill -->
      <div class="hidden sm:flex items-center gap-2">
        <div id="badgeNetwork" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span id="txtEdgeStatus">لبه کلودفلر (Online)</span>
        </div>
        <div id="badgeSyncQueue" class="hidden items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-800 text-[11px] text-amber-300 font-mono">
          <span id="txtSyncCount">0</span> رکورد در صف
        </div>
      </div>

      <!-- Right Controls: Audio, User Profile, Language Toggle -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Sound Toggle -->
        <button id="btnAudioToggle" title="قطع/وصل صدا" class="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition">
          <span id="iconAudio" class="text-base">🔊</span>
        </button>

        <!-- User Profile Pill -->
        <button id="btnOpenProfile" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition">
          <span id="navUserBadge" class="text-sm">🌱</span>
          <div class="text-right">
            <div id="navUserName" class="text-xs font-bold text-slate-200 truncate max-w-[90px] sm:max-w-[120px]">کاربر مهمان</div>
            <div class="text-[10px] font-mono text-cyan-400 font-semibold" id="navUserElo">1200 ELO</div>
          </div>
        </button>

        <!-- Navigation Tabs -->
        <button id="btnNavLeaderboard" title="جدول برترین‌ها" class="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition">
          🏆
        </button>
        <button id="btnNavAnalytics" title="تحلیل عملکرد" class="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition">
          📊
        </button>

        <!-- Lang Switcher -->
        <button id="btnLangToggle" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 font-mono text-xs font-semibold text-slate-300">
          EN
        </button>
      </div>

    </div>
  </header>

  <!-- MAIN WRAPPER -->
  <main class="flex-1 max-w-6xl w-full mx-auto p-4 flex flex-col justify-center">

    <!-- SCREEN 1: GAME HUB (MODE SELECTOR & CONFIG) -->
    <section id="viewHub" class="flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <!-- HERO BANNER -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 p-6 sm:p-8">
        <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs font-medium">
              <span>🇮🇷 لیگ آنلاین سرعت ذهن و تمرکز</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              سرعتت رو به رخ بکش، <span class="bg-gradient-to-l from-emerald-400 to-cyan-400 bg-clip-text text-transparent">ذهن برتر شو!</span>
            </h1>
            <p class="text-slate-400 text-sm max-w-xl leading-relaxed">
              محاسبات ریاضی با نهایت سرعت در لبه شبکه کلودفلر، بدون افت فریم (۱۴۴ هرتز) و ورودی بدون اینتر (Zen Numpad).
            </p>
          </div>
          <div class="flex flex-row md:flex-col gap-3 justify-end">
            <button id="btnQuickStart" class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span>شروع بازی سریع</span>
              <span class="num-font text-lg">⚡</span>
            </button>
            <button id="btnTrainWeaknessHub" class="px-5 py-2.5 rounded-xl bg-slate-900/90 border border-amber-600/40 hover:border-amber-500 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer">
              <span>تمرین نقاط ضعف</span>
              <span>🎯</span>
            </button>
          </div>
        </div>
      </div>

      <!-- GAME MODES CARDS -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <!-- Mode 1: Speed Blitz -->
        <div class="mode-card cursor-pointer rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/70 p-5 flex flex-col justify-between transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10" data-mode="blitz">
          <div>
            <div class="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              ⏱️
            </div>
            <h3 class="font-bold text-lg text-white mb-1 group-hover:text-cyan-400 transition-colors">حمله سرعتی</h3>
            <p class="text-xs text-slate-400 mb-3">حداکثر عملیات صحیح در زمان مشخص (۳۰، ۶۰، ۱۲۰ ثانیه)</p>
          </div>
          <div class="flex items-center justify-between text-xs font-mono text-cyan-400 pt-3 border-t border-slate-800/80">
            <span>Speed Blitz</span>
            <span class="font-bold">۳۰s / ۶۰s</span>
          </div>
        </div>

        <!-- Mode 2: Target Sprint -->
        <div class="mode-card cursor-pointer rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/70 p-5 flex flex-col justify-between transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10" data-mode="sprint">
          <div>
            <div class="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 class="font-bold text-lg text-white mb-1 group-hover:text-emerald-400 transition-colors">دوی سرعتی</h3>
            <p class="text-xs text-slate-400 mb-3">حل ۲۰، ۵۰ یا ۱۰۰ معادله با ثبت میلی‌ثانیه‌ای زمان کل</p>
          </div>
          <div class="flex items-center justify-between text-xs font-mono text-emerald-400 pt-3 border-t border-slate-800/80">
            <span>Target Sprint</span>
            <span class="font-bold">۲۰ / ۵۰ سوال</span>
          </div>
        </div>

        <!-- Mode 3: Multiplication Dojo -->
        <div class="mode-card cursor-pointer rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/70 p-5 flex flex-col justify-between transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10" data-mode="dojo">
          <div>
            <div class="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🥋
            </div>
            <h3 class="font-bold text-lg text-white mb-1 group-hover:text-amber-400 transition-colors">ضرب‌خانه تخصصی</h3>
            <p class="text-xs text-slate-400 mb-3">دریل‌های جدول ضرب، اعداد دو رقمی و مسابقات جام جهانی</p>
          </div>
          <div class="flex items-center justify-between text-xs font-mono text-amber-400 pt-3 border-t border-slate-800/80">
            <span>Multiplication Dojo</span>
            <span class="font-bold">سطح ۱ تا ۴</span>
          </div>
        </div>

        <!-- Mode 4: Sudden Death / Survival -->
        <div class="mode-card cursor-pointer rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/70 p-5 flex flex-col justify-between transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-500/10" data-mode="survival">
          <div>
            <div class="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-800/50 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              💀
            </div>
            <h3 class="font-bold text-lg text-white mb-1 group-hover:text-rose-400 transition-colors">چالش بقا</h3>
            <p class="text-xs text-slate-400 mb-3">شروع با ۵ ثانیه! هر پاسخ درست ۱.۵+ ثانیه، ۱ غلط = باخت قطعی</p>
          </div>
          <div class="flex items-center justify-between text-xs font-mono text-rose-400 pt-3 border-t border-slate-800/80">
            <span>Sudden Death</span>
            <span class="font-bold">مرگ ناگهانی</span>
          </div>
        </div>

      </div>

      <!-- CONFIG PANEL & OPERATOR MATRIX -->
      <div class="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-6">
        
        <!-- Header row of config -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              <span>⚙️ تنظیمات مد و ماتریس عملگرها</span>
              <span id="lblActiveModeTitle" class="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-xs text-cyan-300 font-mono">حمله سرعتی (۳۰s)</span>
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">عملگرهای مورد نظر برای تمرین یا مسابقه را فعال یا غیرفعال کنید</p>
          </div>
          
          <!-- Mode Specific Option Dropdowns -->
          <div id="boxModeOptions" class="flex items-center gap-2">
            <!-- Dynamically injected based on selected mode -->
          </div>
        </div>

        <!-- Operators Matrix Checkboxes -->
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-2">عملگرهای فعال در بازی:</label>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            
            <label class="operator-pill flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition select-none">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="chkOpAdd" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0">
                <span class="text-sm font-medium">جمع (+)</span>
              </div>
              <span class="font-mono text-cyan-400 text-sm font-bold">+</span>
            </label>

            <label class="operator-pill flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition select-none">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="chkOpSub" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0">
                <span class="text-sm font-medium">تفریق (−)</span>
              </div>
              <span class="font-mono text-cyan-400 text-sm font-bold">−</span>
            </label>

            <label class="operator-pill flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition select-none">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="chkOpMul" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0">
                <span class="text-sm font-medium">ضرب (×)</span>
              </div>
              <span class="font-mono text-cyan-400 text-sm font-bold">×</span>
            </label>

            <label class="operator-pill flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition select-none">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="chkOpDiv" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0">
                <span class="text-sm font-medium">تقسیم (÷)</span>
              </div>
              <span class="font-mono text-cyan-400 text-sm font-bold">÷</span>
            </label>

            <label class="operator-pill flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition select-none">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="chkOpMod" class="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0">
                <span class="text-sm font-medium">باقیمانده (%)</span>
              </div>
              <span class="font-mono text-cyan-400 text-sm font-bold">%</span>
            </label>

            <label class="operator-pill flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition select-none">
              <div class="flex items-center gap-2">
                <input type="checkbox" id="chkOpPow" class="w-4 h-4 rounded text-cyan-500 bg-slate-800 border-slate-700 focus:ring-0">
                <span class="text-sm font-medium">توان (x², x³)</span>
              </div>
              <span class="font-mono text-cyan-400 text-sm font-bold">x²</span>
            </label>

          </div>
        </div>

        <!-- Input System & Ergonomics Toggle -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div class="space-y-0.5">
              <div class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>مود ذن نام‌پد (Zen Auto-Submit)</span>
                <span class="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-400 px-1 rounded font-mono">صفر تأخیر</span>
              </div>
              <div class="text-[11px] text-slate-400">ثبت خودکار به محض وارد کردن طول رقم پاسخ (بدون نیاز به زدن اینتر)</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" id="toggleZenMode" checked class="sr-only peer">
              <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div class="space-y-0.5">
              <div class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>کلید اینتر اختیاری (Enter-to-Submit)</span>
              </div>
              <div class="text-[11px] text-slate-400">تأیید دستی برای ارقام با طول متغیر به دلخواه کاربر</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" id="toggleEnterMode" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

        </div>

      </div>

    </section>

    <!-- SCREEN 2: ACTIVE RUN INTERFACE (144Hz Zero-Allocation Loop) -->
    <section id="viewRun" class="hidden flex flex-col items-center justify-center max-w-3xl mx-auto w-full py-2">
      
      <!-- TOP TELEMETRY HUD -->
      <div class="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 backdrop-blur-md shadow-2xl">
        <div class="grid grid-cols-4 items-center justify-between text-center gap-2">
          
          <!-- Timer -->
          <div class="space-y-0.5">
            <span class="text-[11px] font-medium text-slate-400">زمان</span>
            <div id="hudTimer" class="num-font text-xl sm:text-2xl font-bold text-cyan-400 tracking-wider">00:30.000</div>
          </div>

          <!-- Live OPM / CPM -->
          <div class="space-y-0.5">
            <span class="text-[11px] font-medium text-slate-400">عملیات در دقیقه (OPM)</span>
            <div id="hudOpm" class="num-font text-xl sm:text-2xl font-bold text-emerald-400">0.0</div>
          </div>

          <!-- Streak & Multiplier -->
          <div class="space-y-0.5">
            <span class="text-[11px] font-medium text-slate-400">زنجیره (Streak)</span>
            <div class="flex items-center justify-center gap-1.5">
              <span id="hudStreak" class="num-font text-xl sm:text-2xl font-black text-amber-400">0</span>
              <span id="hudMultiplier" class="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">x1</span>
            </div>
          </div>

          <!-- Accuracy / Count -->
          <div class="space-y-0.5">
            <span class="text-[11px] font-medium text-slate-400" id="hudProgressLabel">پاسخ‌های صحیح</span>
            <div id="hudCounter" class="num-font text-xl sm:text-2xl font-bold text-slate-200">0</div>
          </div>

        </div>

        <!-- DYNAMIC PACING GHOST BAR -->
        <div class="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
          <div class="flex items-center justify-between text-[11px] font-mono">
            <span class="text-slate-400 flex items-center gap-1">
              <span>👻 مقایسه با بهترین رکورد (PB Pace):</span>
              <span id="txtGhostTarget" class="text-slate-300 font-bold">45.0 OPM</span>
            </span>
            <span id="txtGhostDelta" class="text-emerald-400 font-bold">+0.0s برابر</span>
          </div>
          <div class="w-full h-2 rounded-full bg-slate-950 overflow-hidden relative">
            <!-- Center line -->
            <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 z-10"></div>
            <!-- Dynamic pace indicator -->
            <div id="barGhostFill" class="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-150 rounded-full" style="width: 50%;"></div>
          </div>
        </div>

      </div>

      <!-- PROBLEM CANVAS (FIXED BOUNDING BOX ZERO-LAYOUT-SHIFT) -->
      <div id="problemContainer" class="w-full relative rounded-3xl bg-slate-900 border-2 border-slate-800 p-8 sm:p-14 flex flex-col items-center justify-center shadow-2xl transition-all duration-100 min-h-[220px]">
        
        <!-- Subtle problem index tag -->
        <div class="absolute top-4 left-4 text-xs font-mono text-slate-400" id="lblProblemIndex">#1</div>
        <div class="absolute top-4 right-4 text-xs font-mono text-slate-400" id="lblOpCategory">MULTIPLICATION</div>

        <!-- Math Expression Display -->
        <div class="text-center space-y-3">
          <div id="txtProblemExpression" class="num-font text-4xl sm:text-6xl font-extrabold text-white tracking-widest leading-none">
            7 × 8
          </div>
          
          <!-- Answer Input Echo with Blinking Cursor -->
          <div class="inline-flex items-center justify-center min-w-[140px] px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700 font-mono text-3xl sm:text-4xl font-black text-cyan-400 tracking-wider">
            <span id="txtUserInputEcho" class="tabular-nums"></span>
            <span id="cursorBlink" class="w-2.5 h-8 bg-cyan-400 inline-block animate-pulse ml-1 rounded-sm"></span>
          </div>
        </div>

      </div>

      <!-- ON-SCREEN ARCADE NUMPAD (FOR TOUCH OR MOUSE) -->
      <div class="w-full max-w-sm mt-4 grid grid-cols-3 gap-2">
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="7">7</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="8">8</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="9">9</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="4">4</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="5">5</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="6">6</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="1">1</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="2">2</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="3">3</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-900/60 active:scale-95 text-lg font-bold font-mono text-rose-400 transition cursor-pointer" data-val="clear">C</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 active:scale-95 text-xl font-bold font-mono text-white transition cursor-pointer" data-val="0">0</button>
        <button class="numpad-btn py-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-900/60 active:scale-95 text-lg font-bold font-mono text-cyan-400 transition cursor-pointer" data-val="minus">−</button>
      </div>

      <!-- Quick Abort / Instructions footer -->
      <div class="mt-4 flex items-center justify-between w-full max-w-sm text-xs text-slate-400">
        <button id="btnAbortRun" class="hover:text-rose-400 transition cursor-pointer">انصراف (Esc)</button>
        <span class="font-mono">پشتیبانی کامل از ارقام فارسی ۱۲۳۴</span>
      </div>

    </section>

    <!-- SCREEN 3: POST-RUN SUMMARY & WEAKNESS HEATMAP -->
    <section id="viewSummary" class="hidden flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <!-- Performance Card -->
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold mb-1">
              <span>نتیجه رکوردگیری</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-white" id="sumTitle">پایان مسابقه</h2>
          </div>
          <!-- Elo Gain Banner -->
          <div class="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
            <div class="text-right">
              <div class="text-[11px] text-slate-400">امتیاز ریتینگ (ELO)</div>
              <div class="num-font text-lg font-black text-cyan-400" id="sumEloChange">+24 (1248)</div>
            </div>
            <div class="text-2xl" id="sumRankBadge">🌱</div>
          </div>
        </div>

        <!-- 4 Key Stats Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1">
            <span class="text-xs text-slate-400">سرعت عملیات (OPM)</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-cyan-400" id="sumOpm">52.4</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1">
            <span class="text-xs text-slate-400">دقت پاسخ‌ها (Accuracy)</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-emerald-400" id="sumAccuracy">96.2%</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1">
            <span class="text-xs text-slate-400">زمان کل</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-amber-400" id="sumDuration">30.0s</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-1">
            <span class="text-xs text-slate-400">بهترین زنجیره (Max Streak)</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-purple-400" id="sumMaxStreak">18</div>
          </div>
        </div>

        <!-- HISTOGRAM OF LATENCY -->
        <div class="space-y-2 mb-6">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-200">📊 توزیع زمان پاسخ‌دهی به تفکیک میلی‌ثانیه:</span>
            <span class="text-slate-400 font-mono">Millisecond Response Histogram</span>
          </div>
          <div class="h-28 w-full bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-end justify-between gap-3" id="boxHistogramBars">
            <!-- Dynamically populated bars -->
          </div>
        </div>

        <!-- BOTTLENECKS / WEAKNESS MATRIX -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <span>🚨 گلوگاه‌ها و محاسبات کند شما (Bottlenecks):</span>
            </h3>
            <span class="text-xs text-slate-400">میانگین تأخیر هر فکت</span>
          </div>
          
          <div id="boxBottlenecks" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            <!-- Bottleneck items rendered here -->
          </div>
        </div>

        <!-- ACTIONS ROW -->
        <div class="mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button id="btnPlayAgain" class="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 active:scale-95 transition cursor-pointer flex items-center gap-2">
            <span>تکرار همین مسابقه</span>
            <span class="font-mono">↺</span>
          </button>
          
          <button id="btnTrainWeaknessNow" class="px-5 py-3 rounded-xl bg-amber-950/70 border border-amber-700/60 hover:border-amber-500 text-amber-300 font-bold text-xs transition cursor-pointer flex items-center gap-1.5">
            <span>🎯 تمرین فوری نقاط ضعف این دست</span>
          </button>

          <button id="btnReturnHub" class="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer">
            بازگشت به منو
          </button>
        </div>

      </div>

    </section>

    <!-- SCREEN 4: GLOBAL & PROVINCIAL LEADERBOARDS -->
    <section id="viewLeaderboard" class="hidden flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>🏆 جدول برترین محاسبان ایران</span>
            </h2>
            <p class="text-xs text-slate-400 mt-1">رده‌بندی کشوری و استانی بر اساس بیشترین OPM و ریتینگ Elo</p>
          </div>
          <button id="btnBackFromLeaderboard" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer">
            بازگشت
          </button>
        </div>

        <!-- Filters Row: Mode, Period, Province -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
          
          <!-- Mode filter -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">حالت بازی:</label>
            <select id="selLbMode" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500">
              <option value="all">همه حالت‌ها</option>
              <option value="blitz_30">حمله سرعتی (۳۰s)</option>
              <option value="blitz_60">حمله سرعتی (۶۰s)</option>
              <option value="sprint_20">دوی ۲۰ سوال</option>
              <option value="sprint_50">دوی ۵۰ سوال</option>
              <option value="dojo_tier1">ضرب‌خانه: تک رقمی</option>
              <option value="dojo_tier2">ضرب‌خانه: ۱۱ تا ۱۹</option>
              <option value="dojo_tier3">ضرب‌خانه: دو رقمی در دو رقمی</option>
              <option value="survival">چالش بقا (مرگ ناگهانی)</option>
            </select>
          </div>

          <!-- Period filter -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">بازه زمانی:</label>
            <select id="selLbPeriod" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500">
              <option value="all">همه‌زمان‌ها (All-Time)</option>
              <option value="weekly">این هفته (Weekly)</option>
              <option value="today">امروز (Today)</option>
            </select>
          </div>

          <!-- Province filter -->
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">استان / منطقه:</label>
            <select id="selLbProvince" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500">
              <option value="all">سراسر ایران (کشوری)</option>
              <option value="tehran">تهران</option>
              <option value="isfahan">اصفهان</option>
              <option value="fars">فارس (شیراز)</option>
              <option value="khorasan_razavi">خراسان رضوی (مشهد)</option>
              <option value="east_azerbaijan">آذربایجان شرقی (تبریز)</option>
              <option value="khuzestan">خوزستان (اهواز)</option>
              <option value="gilan">گیلان (رشت)</option>
              <option value="mazandaran">مازندران (ساری)</option>
              <option value="alborz">البرز (کرج)</option>
              <option value="kerman">کرمان</option>
              <option value="yazd">یزد</option>
              <option value="qom">قم</option>
            </select>
          </div>

        </div>

        <!-- Table Container -->
        <div class="overflow-x-auto rounded-xl border border-slate-800">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-950 text-slate-400 border-b border-slate-800 font-medium">
              <tr>
                <th class="p-3 w-12 text-center">رتبه</th>
                <th class="p-3">نام کاربر</th>
                <th class="p-3 text-center">استان</th>
                <th class="p-3 text-center">ریتینگ ELO</th>
                <th class="p-3 text-center">سرعت (OPM)</th>
                <th class="p-3 text-center">دقت</th>
                <th class="p-3 text-center">مود</th>
              </tr>
            </thead>
            <tbody id="tblLeaderboardBody" class="divide-y divide-slate-800/60 font-mono">
              <!-- Populated dynamically -->
            </tbody>
          </table>
        </div>

      </div>

    </section>

    <!-- SCREEN 5: USER ANALYTICS & WEAKNESS DEEP DIVE -->
    <section id="viewAnalytics" class="hidden flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <div class="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div class="flex items-center justify-between border-b border-slate-800 pb-5">
          <div>
            <h2 class="text-2xl font-black text-white">📊 پرونده جامع آنالیز و نقاط ضعف</h2>
            <p class="text-xs text-slate-400 mt-1">بررسی الگوهای ذهنی، کندی فکت‌های محاسباتی و سیر پیشرفت ریتینگ</p>
          </div>
          <button id="btnBackFromAnalytics" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer">
            بازگشت
          </button>
        </div>

        <div id="analyticsContent" class="space-y-6 my-6">
          <!-- Populated dynamically via /api/users/:id/analytics -->
          <div class="text-center py-10 text-slate-400 text-sm">در حال دریافت داده‌های لبه...</div>
        </div>
      </div>

    </section>

  </main>

  <!-- MODAL: USER PROFILE & SETTINGS -->
  <div id="modalProfile" class="hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
      <div class="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 class="font-bold text-base text-white flex items-center gap-2">
          <span>👤 تنظیمات حساب کاربری</span>
        </h3>
        <button id="btnCloseProfileModal" class="text-slate-400 hover:text-white text-lg">✕</button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">نام کاربری در لیدربرد:</label>
          <input type="text" id="iptUsername" maxlength="20" placeholder="مثلاً: آرش_ریاضی" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">استان سکونت:</label>
          <select id="selProfileProvince" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500">
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

        <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
          <div class="flex justify-between text-slate-400">
            <span>شناسه اختصاصی:</span>
            <span class="font-mono text-cyan-400" id="txtProfileUserId">usr_...</span>
          </div>
          <div class="flex justify-between text-slate-400">
            <span>رتبه و ریتینگ فعلی:</span>
            <span class="font-mono text-emerald-400 font-bold" id="txtProfileElo">1200 ELO</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 pt-2">
        <button id="btnSaveProfile" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer">
          ذخیره تغییرات
        </button>
      </div>
    </div>
  </div>

  <!-- APPLICATION ENGINE SCRIPT (VANILLA ES-MODULE / ZERO GC RUNTIME) -->
  <script type="module">
    // ==========================================
    // 1. STATE & LOCAL ENGINE INITIALIZATION
    // ==========================================

    const PROVINCE_NAMES = {
      tehran: 'تهران',
      isfahan: 'اصفهان',
      fars: 'فارس',
      khorasan_razavi: 'خراسان رضوی',
      east_azerbaijan: 'آذربایجان شرقی',
      khuzestan: 'خوزستان',
      gilan: 'گیلان',
      mazandaran: 'مازندران',
      alborz: 'البرز',
      kerman: 'کرمان',
      yazd: 'یزد',
      qom: 'قم',
      other: 'ایران'
    };

    const STATE = {
      user: {
        id: '',
        username: '',
        province: 'tehran',
        elo: 1200
      },
      settings: {
        audio: true,
        zenMode: true,
        enterMode: false,
        lang: 'fa'
      },
      config: {
        mode: 'blitz', // blitz, sprint, dojo, survival
        subOption: '30', // e.g. 30s, 60s, 20q, 50q, tier1, tier2, etc.
        operators: {
          add: true,
          sub: true,
          mul: true,
          div: true,
          mod: false,
          pow: false
        },
        dojoTier: 1,
        dojoBounds: { minA: 1, maxA: 9, minB: 1, maxB: 9 }
      },
      pb: {
        blitz_30: 40.0,
        blitz_60: 42.0,
        sprint_20: 20000,
        sprint_50: 55000,
        survival: 25
      },
      activeRun: null,
      customWeaknessProblems: null
    };

    // Load LocalStorage cache
    function loadLocalState() {
      try {
        const storedUser = localStorage.getItem('zb_user');
        if (storedUser) {
          STATE.user = JSON.parse(storedUser);
        } else {
          // Generate new anonymous user
          const randomId = 'usr_' + Math.random().toString(36).substring(2, 10);
          const randomNum = Math.floor(100 + Math.random() * 900);
          STATE.user = {
            id: randomId,
            username: 'محاسب_' + randomNum,
            province: 'tehran',
            elo: 1200
          };
          saveLocalState();
        }

        const storedSettings = localStorage.getItem('zb_settings');
        if (storedSettings) {
          Object.assign(STATE.settings, JSON.parse(storedSettings));
        }

        const storedPb = localStorage.getItem('zb_pb');
        if (storedPb) {
          Object.assign(STATE.pb, JSON.parse(storedPb));
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }

    function saveLocalState() {
      try {
        localStorage.setItem('zb_user', JSON.stringify(STATE.user));
        localStorage.setItem('zb_settings', JSON.stringify(STATE.settings));
        localStorage.setItem('zb_pb', JSON.stringify(STATE.pb));
      } catch (e) {
        console.warn('LocalStorage write failed:', e);
      }
    }

    // ==========================================
    // 2. SYNTHETIC WEB AUDIO API ENGINE
    // ==========================================
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    // Cherry MX mechanical keyboard switch synthetic sound
    function playMechanicalClick() {
      if (!STATE.settings.audio) return;
      try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        // 1. Transient burst
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.022);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.028);

        // 2. Secondary micro pop
        const pop = ctx.createOscillator();
        const popGain = ctx.createGain();
        pop.type = 'sine';
        pop.frequency.setValueAtTime(450, now);
        pop.frequency.exponentialRampToValueAtTime(120, now + 0.015);
        popGain.gain.setValueAtTime(0.2, now);
        popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
        pop.connect(popGain);
        popGain.connect(ctx.destination);
        pop.start(now);
        pop.stop(now + 0.02);
      } catch (e) {
        // audio fail silent
      }
    }

    // Low error buzz
    function playErrorBuzz() {
      if (!STATE.settings.audio) return;
      try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(75, now + 0.12);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) {}
    }

    // Milestone streak chime
    function playStreakChime(multiplier) {
      if (!STATE.settings.audio) return;
      try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);
          gain.gain.setValueAtTime(0.18, now + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.18);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.2);
        });
      } catch (e) {}
    }

    // ==========================================
    // 3. MATH ENGINE & PROBLEM GENERATOR
    // ==========================================
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateProblem(config, customWeaknessList) {
      // If practicing weaknesses, pick one from queue
      if (customWeaknessList && customWeaknessList.length > 0) {
        const picked = customWeaknessList[Math.floor(Math.random() * customWeaknessList.length)];
        return {
          a: picked.a,
          b: picked.b,
          op: picked.op,
          answer: picked.answer,
          expression: picked.expression || picked.problem,
          expectedLen: Math.abs(picked.answer).toString().length + (picked.answer < 0 ? 1 : 0),
          category: 'WEAKNESS DRILL'
        };
      }

      // Dojo Mode
      if (config.mode === 'dojo') {
        const tier = config.dojoTier || 1;
        let a, b;
        if (tier === 1) { // 1x1 to 9x9
          a = getRandomInt(2, 9);
          b = getRandomInt(2, 9);
        } else if (tier === 2) { // Teens 11x11 to 19x19 or squares
          if (Math.random() > 0.4) {
            a = getRandomInt(11, 19);
            b = getRandomInt(11, 19);
          } else {
            a = getRandomInt(11, 30);
            b = a; // square
          }
        } else if (tier === 3) { // 2-digit x 2-digit Mental Math World Cup
          a = getRandomInt(11, 99);
          b = getRandomInt(11, 99);
        } else { // Custom bounds
          const bounds = config.dojoBounds || { minA: 2, maxA: 15, minB: 2, maxB: 15 };
          a = getRandomInt(bounds.minA, bounds.maxA);
          b = getRandomInt(bounds.minB, bounds.maxB);
        }

        const answer = a * b;
        return {
          a,
          b,
          op: '×',
          answer,
          expression: \`\${a} × \${b}\`,
          expectedLen: Math.abs(answer).toString().length + (answer < 0 ? 1 : 0),
          category: 'DOJO MULTIPLICATION'
        };
      }

      // Standard Matrix Modes (Blitz, Sprint, Survival)
      const ops = [];
      if (config.operators.add) ops.push('+');
      if (config.operators.sub) ops.push('-');
      if (config.operators.mul) ops.push('×');
      if (config.operators.div) ops.push('÷');
      if (config.operators.mod) ops.push('%');
      if (config.operators.pow) ops.push('^2');

      if (ops.length === 0) ops.push('+'); // fallback
      const op = ops[Math.floor(Math.random() * ops.length)];

      let a = 0, b = 0, answer = 0, expression = '', category = 'ARITHMETIC';

      switch (op) {
        case '+': {
          const type = Math.random();
          if (type < 0.4) { // 1-digit + 1-digit
            a = getRandomInt(2, 9);
            b = getRandomInt(2, 9);
          } else if (type < 0.8) { // 2-digit + 1 or 2 digit
            a = getRandomInt(12, 89);
            b = getRandomInt(5, 45);
          } else { // 2-digit + 2-digit
            a = getRandomInt(25, 95);
            b = getRandomInt(18, 98);
          }
          answer = a + b;
          expression = \`\${a} + \${b}\`;
          category = 'ADDITION';
          break;
        }
        case '-': {
          const type = Math.random();
          if (type < 0.4) {
            a = getRandomInt(5, 18);
            b = getRandomInt(2, a);
          } else {
            a = getRandomInt(25, 99);
            b = getRandomInt(12, a - 2);
          }
          answer = a - b;
          expression = \`\${a} − \${b}\`;
          category = 'SUBTRACTION';
          break;
        }
        case '×': {
          const type = Math.random();
          if (type < 0.6) {
            a = getRandomInt(2, 9);
            b = getRandomInt(2, 9);
          } else {
            a = getRandomInt(11, 19);
            b = getRandomInt(2, 9);
          }
          answer = a * b;
          expression = \`\${a} × \${b}\`;
          category = 'MULTIPLICATION';
          break;
        }
        case '÷': {
          b = getRandomInt(2, 9);
          const quotient = getRandomInt(2, 12);
          a = b * quotient;
          answer = quotient;
          expression = \`\${a} ÷ \${b}\`;
          category = 'DIVISION';
          break;
        }
        case '%': {
          b = getRandomInt(3, 9);
          a = getRandomInt(10, 50);
          answer = a % b;
          expression = \`\${a} mod \${b}\`;
          category = 'MODULO';
          break;
        }
        case '^2': {
          a = getRandomInt(2, 25);
          b = 2;
          answer = a * a;
          expression = \`\${a}²\`;
          category = 'SQUARE POWER';
          break;
        }
      }

      const expectedLen = Math.abs(answer).toString().length + (answer < 0 ? 1 : 0);

      return {
        a,
        b,
        op,
        answer,
        expression,
        expectedLen,
        category
      };
    }

    // ==========================================
    // 4. ZERO-ALLOCATION DOM & ACTIVE RUN LOOP
    // ==========================================
    const DOM = {
      // Screens
      viewHub: document.getElementById('viewHub'),
      viewRun: document.getElementById('viewRun'),
      viewSummary: document.getElementById('viewSummary'),
      viewLeaderboard: document.getElementById('viewLeaderboard'),
      viewAnalytics: document.getElementById('viewAnalytics'),
      modalProfile: document.getElementById('modalProfile'),

      // Top Nav
      btnNavHome: document.getElementById('btnNavHome'),
      navUserName: document.getElementById('navUserName'),
      navUserElo: document.getElementById('navUserElo'),
      navUserBadge: document.getElementById('navUserBadge'),
      btnOpenProfile: document.getElementById('btnOpenProfile'),
      btnAudioToggle: document.getElementById('btnAudioToggle'),
      iconAudio: document.getElementById('iconAudio'),
      btnLangToggle: document.getElementById('btnLangToggle'),
      btnNavLeaderboard: document.getElementById('btnNavLeaderboard'),
      btnNavAnalytics: document.getElementById('btnNavAnalytics'),
      badgeNetwork: document.getElementById('badgeNetwork'),
      txtEdgeStatus: document.getElementById('txtEdgeStatus'),
      badgeSyncQueue: document.getElementById('badgeSyncQueue'),
      txtSyncCount: document.getElementById('txtSyncCount'),

      // Hub Buttons & Selectors
      btnQuickStart: document.getElementById('btnQuickStart'),
      btnTrainWeaknessHub: document.getElementById('btnTrainWeaknessHub'),
      modeCards: document.querySelectorAll('.mode-card'),
      lblActiveModeTitle: document.getElementById('lblActiveModeTitle'),
      boxModeOptions: document.getElementById('boxModeOptions'),
      toggleZenMode: document.getElementById('toggleZenMode'),
      toggleEnterMode: document.getElementById('toggleEnterMode'),
      chkOpAdd: document.getElementById('chkOpAdd'),
      chkOpSub: document.getElementById('chkOpSub'),
      chkOpMul: document.getElementById('chkOpMul'),
      chkOpDiv: document.getElementById('chkOpDiv'),
      chkOpMod: document.getElementById('chkOpMod'),
      chkOpPow: document.getElementById('chkOpPow'),

      // Active Run HUD
      hudTimer: document.getElementById('hudTimer'),
      hudOpm: document.getElementById('hudOpm'),
      hudStreak: document.getElementById('hudStreak'),
      hudMultiplier: document.getElementById('hudMultiplier'),
      hudCounter: document.getElementById('hudCounter'),
      hudProgressLabel: document.getElementById('hudProgressLabel'),
      txtGhostTarget: document.getElementById('txtGhostTarget'),
      txtGhostDelta: document.getElementById('txtGhostDelta'),
      barGhostFill: document.getElementById('barGhostFill'),

      // Problem Canvas
      problemContainer: document.getElementById('problemContainer'),
      txtProblemExpression: document.getElementById('txtProblemExpression'),
      txtUserInputEcho: document.getElementById('txtUserInputEcho'),
      lblProblemIndex: document.getElementById('lblProblemIndex'),
      lblOpCategory: document.getElementById('lblOpCategory'),
      btnAbortRun: document.getElementById('btnAbortRun'),

      // Summary Screen
      sumTitle: document.getElementById('sumTitle'),
      sumEloChange: document.getElementById('sumEloChange'),
      sumRankBadge: document.getElementById('sumRankBadge'),
      sumOpm: document.getElementById('sumOpm'),
      sumAccuracy: document.getElementById('sumAccuracy'),
      sumDuration: document.getElementById('sumDuration'),
      sumMaxStreak: document.getElementById('sumMaxStreak'),
      boxHistogramBars: document.getElementById('boxHistogramBars'),
      boxBottlenecks: document.getElementById('boxBottlenecks'),
      btnPlayAgain: document.getElementById('btnPlayAgain'),
      btnTrainWeaknessNow: document.getElementById('btnTrainWeaknessNow'),
      btnReturnHub: document.getElementById('btnReturnHub'),

      // Leaderboard Screen
      selLbMode: document.getElementById('selLbMode'),
      selLbPeriod: document.getElementById('selLbPeriod'),
      selLbProvince: document.getElementById('selLbProvince'),
      tblLeaderboardBody: document.getElementById('tblLeaderboardBody'),
      btnBackFromLeaderboard: document.getElementById('btnBackFromLeaderboard'),

      // Analytics Screen
      analyticsContent: document.getElementById('analyticsContent'),
      btnBackFromAnalytics: document.getElementById('btnBackFromAnalytics'),

      // Profile Modal
      btnCloseProfileModal: document.getElementById('btnCloseProfileModal'),
      iptUsername: document.getElementById('iptUsername'),
      selProfileProvince: document.getElementById('selProfileProvince'),
      txtProfileUserId: document.getElementById('txtProfileUserId'),
      txtProfileElo: document.getElementById('txtProfileElo'),
      btnSaveProfile: document.getElementById('btnSaveProfile')
    };

    // Navigation Helper
    function showScreen(name) {
      DOM.viewHub.classList.add('hidden');
      DOM.viewRun.classList.add('hidden');
      DOM.viewSummary.classList.add('hidden');
      DOM.viewLeaderboard.classList.add('hidden');
      DOM.viewAnalytics.classList.add('hidden');

      if (name === 'hub') DOM.viewHub.classList.remove('hidden');
      else if (name === 'run') DOM.viewRun.classList.remove('hidden');
      else if (name === 'summary') DOM.viewSummary.classList.remove('hidden');
      else if (name === 'leaderboard') DOM.viewLeaderboard.classList.remove('hidden');
      else if (name === 'analytics') DOM.viewAnalytics.classList.remove('hidden');
    }

    // Update Profile HUD
    function updateProfileHud() {
      DOM.navUserName.textContent = STATE.user.username;
      DOM.navUserElo.textContent = STATE.user.elo + ' ELO';
      DOM.txtProfileUserId.textContent = STATE.user.id;
      DOM.txtProfileElo.textContent = STATE.user.elo + ' ELO';
      DOM.iptUsername.value = STATE.user.username;
      DOM.selProfileProvince.value = STATE.user.province || 'tehran';
    }

    // ==========================================
    // 5. RUN LIFECYCLE & 144Hz TIMER LOOP
    // ==========================================
    let animFrameId = null;

    function startRun(customProblems = null) {
      const modeKey = \`\${STATE.config.mode}_\${STATE.config.subOption}\`;
      const targetPb = STATE.pb[modeKey] || 40.0;
      DOM.txtGhostTarget.textContent = (typeof targetPb === 'number' && targetPb < 100) ? targetPb.toFixed(1) + ' OPM' : '40.0 OPM';

      STATE.activeRun = {
        mode: modeKey,
        modeCategory: STATE.config.mode,
        subOption: STATE.config.subOption,
        startTime: performance.now(),
        lastProblemTime: performance.now(),
        durationMs: 0,
        timeLimitMs: STATE.config.mode === 'blitz' ? parseInt(STATE.config.subOption, 10) * 1000 : null,
        targetQuestions: STATE.config.mode === 'sprint' ? parseInt(STATE.config.subOption, 10) : null,
        survivalRemainingMs: STATE.config.mode === 'survival' ? 5000 : null,
        lastSurvivalTick: performance.now(),
        totalAnswered: 0,
        correctCount: 0,
        wrongCount: 0,
        currentStreak: 0,
        maxStreak: 0,
        currentProblem: null,
        userTyped: '',
        telemetry: [],
        customProblemsQueue: customProblems ? [...customProblems] : null
      };

      // Reset DOM displays
      DOM.hudTimer.textContent = '00:00.000';
      DOM.hudOpm.textContent = '0.0';
      DOM.hudStreak.textContent = '0';
      DOM.hudMultiplier.textContent = 'x1';
      DOM.hudMultiplier.className = 'text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300';
      DOM.hudCounter.textContent = '0';
      DOM.txtUserInputEcho.textContent = '';
      DOM.barGhostFill.style.width = '50%';
      DOM.txtGhostDelta.textContent = '+0.0s برابر';
      DOM.txtGhostDelta.className = 'text-emerald-400 font-bold';

      if (STATE.config.mode === 'sprint') {
        DOM.hudProgressLabel.textContent = \`پیشرفت (از \${STATE.config.subOption})\`;
      } else {
        DOM.hudProgressLabel.textContent = 'پاسخ‌های صحیح';
      }

      showScreen('run');
      nextProblem();

      // Launch 144Hz RAF loop
      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(runLoopTick);
    }

    function runLoopTick(timestamp) {
      if (!STATE.activeRun) return;

      const run = STATE.activeRun;
      const elapsed = performance.now() - run.startTime;
      run.durationMs = elapsed;

      // Update Timer based on Mode
      if (run.modeCategory === 'blitz') {
        const remaining = Math.max(0, run.timeLimitMs - elapsed);
        DOM.hudTimer.textContent = formatMs(remaining);
        if (remaining <= 0) {
          endRun();
          return;
        }
      } else if (run.modeCategory === 'survival') {
        const now = performance.now();
        const delta = now - run.lastSurvivalTick;
        run.lastSurvivalTick = now;
        run.survivalRemainingMs = Math.max(0, run.survivalRemainingMs - delta);
        DOM.hudTimer.textContent = formatMs(run.survivalRemainingMs);
        if (run.survivalRemainingMs <= 0) {
          endRun();
          return;
        }
      } else {
        DOM.hudTimer.textContent = formatMs(elapsed);
      }

      // Update OPM
      const minutes = elapsed / 60000;
      if (minutes > 0.01) {
        const liveOpm = (run.correctCount / minutes);
        DOM.hudOpm.textContent = liveOpm.toFixed(1);

        // Update Ghost Bar comparison
        const currentExpectedCount = (40.0 / 60) * (elapsed / 1000);
        const diff = run.correctCount - currentExpectedCount;
        const fillPercent = Math.min(Math.max(50 + diff * 5, 5), 95);
        DOM.barGhostFill.style.width = fillPercent + '%';

        if (diff >= 0) {
          DOM.txtGhostDelta.textContent = \`+\${(diff * 1.2).toFixed(1)}s جلوتر\`;
          DOM.txtGhostDelta.className = 'text-emerald-400 font-bold';
        } else {
          DOM.txtGhostDelta.textContent = \`\${(diff * 1.2).toFixed(1)}s عقب‌تر\`;
          DOM.txtGhostDelta.className = 'text-rose-400 font-bold';
        }
      }

      animFrameId = requestAnimationFrame(runLoopTick);
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

      // Check sprint condition
      if (run.targetQuestions && run.correctCount >= run.targetQuestions) {
        endRun();
        return;
      }

      const problem = generateProblem(STATE.config, run.customProblemsQueue);
      run.currentProblem = problem;
      run.userTyped = '';
      run.lastProblemTime = performance.now();

      // Zero-allocation DOM updates
      DOM.txtProblemExpression.textContent = problem.expression;
      DOM.txtUserInputEcho.textContent = '';
      DOM.lblProblemIndex.textContent = '#' + (run.totalAnswered + 1);
      DOM.lblOpCategory.textContent = problem.category;
    }

    // Input Evaluator (Zen & Keypad)
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

      // Append digit
      run.userTyped += digit;
      DOM.txtUserInputEcho.textContent = run.userTyped;

      // Auto-submit in Zen Mode when length matches expected answer length!
      if (STATE.settings.zenMode && !STATE.settings.enterMode) {
        if (run.userTyped.length >= run.currentProblem.expectedLen) {
          evaluateCurrentInput();
        }
      }
    }

    function evaluateCurrentInput() {
      if (!STATE.activeRun) return;
      const run = STATE.activeRun;
      const problem = run.currentProblem;
      const typedNum = parseInt(run.userTyped, 10);
      const now = performance.now();
      const latencyMs = Math.round(now - run.lastProblemTime);

      const isCorrect = (typedNum === problem.answer);
      run.totalAnswered++;

      // Record telemetry
      run.telemetry.push({
        problem: problem.expression,
        a: problem.a,
        b: problem.b,
        op: problem.op,
        answer: problem.answer,
        userAnswer: typedNum,
        correct: isCorrect,
        latencyMs: Math.max(latencyMs, 10)
      });

      if (isCorrect) {
        run.correctCount++;
        run.currentStreak++;
        if (run.currentStreak > run.maxStreak) run.maxStreak = run.currentStreak;

        // Visual flash (CSS animation, zero layout shift)
        DOM.problemContainer.classList.remove('animate-hit', 'animate-miss');
        void DOM.problemContainer.offsetWidth;
        DOM.problemContainer.classList.add('animate-hit');

        playMechanicalClick();

        // Survival mode bonus
        if (run.modeCategory === 'survival') {
          run.survivalRemainingMs = Math.min(run.survivalRemainingMs + 1500, 10000);
        }

        // Multiplier progression
        updateStreakDisplay(run.currentStreak);
        DOM.hudCounter.textContent = run.correctCount;
        nextProblem();

      } else {
        run.wrongCount++;
        run.currentStreak = 0;

        DOM.problemContainer.classList.remove('animate-hit', 'animate-miss');
        void DOM.problemContainer.offsetWidth;
        DOM.problemContainer.classList.add('animate-miss');

        playErrorBuzz();
        updateStreakDisplay(0);

        if (run.modeCategory === 'survival') {
          // One error terminates survival run immediately
          endRun();
          return;
        }

        // Clear input for retry
        run.userTyped = '';
        DOM.txtUserInputEcho.textContent = '';
      }
    }

    function updateStreakDisplay(streak) {
      DOM.hudStreak.textContent = streak;
      let multText = 'x1';
      let multClass = 'text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300';

      if (streak >= 50) {
        multText = 'x5 MAX';
        multClass = 'text-xs font-mono font-black px-1.5 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300 streak-fire';
        if (streak === 50) playStreakChime(5);
      } else if (streak >= 25) {
        multText = 'x4';
        multClass = 'text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300';
        if (streak === 25) playStreakChime(4);
      } else if (streak >= 10) {
        multText = 'x3';
        multClass = 'text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300';
        if (streak === 10) playStreakChime(3);
      } else if (streak >= 5) {
        multText = 'x2';
        multClass = 'text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300';
      }

      DOM.hudMultiplier.textContent = multText;
      DOM.hudMultiplier.className = multClass;
    }

    function endRun() {
      if (!STATE.activeRun) return;
      if (animFrameId) cancelAnimationFrame(animFrameId);

      const run = STATE.activeRun;
      STATE.activeRun = null;

      const elapsedMs = Math.round(performance.now() - run.startTime);
      const minutes = elapsedMs / 60000;
      const opm = minutes > 0 ? parseFloat((run.correctCount / minutes).toFixed(1)) : 0;
      const accuracy = run.totalAnswered > 0 ? parseFloat(((run.correctCount / run.totalAnswered) * 100).toFixed(1)) : 0;

      // Update PB if applicable
      if (run.modeCategory === 'blitz' && opm > (STATE.pb[run.mode] || 0)) {
        STATE.pb[run.mode] = opm;
        saveLocalState();
      }

      // Populate Post-Run Summary
      DOM.sumOpm.textContent = opm.toFixed(1);
      DOM.sumAccuracy.textContent = accuracy + '%';
      DOM.sumDuration.textContent = (elapsedMs / 1000).toFixed(1) + 's';
      DOM.sumMaxStreak.textContent = run.maxStreak;

      // Build Latency Histogram
      renderHistogram(run.telemetry);

      // Build Bottlenecks Matrix
      const bottlenecks = analyzeBottlenecks(run.telemetry);
      renderBottlenecks(bottlenecks);

      showScreen('summary');

      // Submit Run to Cloudflare Edge
      submitRunPayload({
        userId: STATE.user.id,
        username: STATE.user.username,
        province: STATE.user.province,
        mode: run.mode,
        durationMs: elapsedMs,
        totalAnswered: run.totalAnswered,
        correctCount: run.correctCount,
        wrongCount: run.wrongCount,
        opm,
        accuracy,
        details: run.telemetry,
        clientTimestamp: Date.now()
      });
    }

    function renderHistogram(telemetry) {
      const bins = { '<300ms': 0, '300-500ms': 0, '500-800ms': 0, '800-1200ms': 0, '>1200ms': 0 };
      telemetry.forEach(t => {
        const l = t.latencyMs;
        if (l < 300) bins['<300ms']++;
        else if (l < 500) bins['300-500ms']++;
        else if (l < 800) bins['500-800ms']++;
        else if (l < 1200) bins['800-1200ms']++;
        else bins['>1200ms']++;
      });

      const maxCount = Math.max(...Object.values(bins), 1);
      DOM.boxHistogramBars.innerHTML = '';

      const labels = [
        { key: '<300ms', label: 'کمتر از ۳۰۰ms', color: 'bg-emerald-500' },
        { key: '300-500ms', label: '۳۰۰ - ۵۰۰ms', color: 'bg-cyan-500' },
        { key: '500-800ms', label: '۵۰۰ - ۸۰۰ms', color: 'bg-amber-500' },
        { key: '800-1200ms', label: '۸۰۰ - ۱۲۰۰ms', color: 'bg-orange-500' },
        { key: '>1200ms', label: 'بیش از ۱.۲s', color: 'bg-rose-500' }
      ];

      labels.forEach(b => {
        const count = bins[b.key] || 0;
        const heightPct = Math.round((count / maxCount) * 85);
        const col = document.createElement('div');
        col.className = 'flex-1 flex flex-col items-center justify-end h-full gap-1';
        col.innerHTML = \`
          <span class="text-[10px] font-mono text-slate-300">\${count}</span>
          <div class="w-full \${b.color} rounded-t-md transition-all duration-300" style="height: \${Math.max(heightPct, 6)}%"></div>
          <span class="text-[9px] text-slate-400 font-mono truncate w-full text-center">\${b.key}</span>
        \`;
        DOM.boxHistogramBars.appendChild(col);
      });
    }

    function analyzeBottlenecks(telemetry) {
      const map = {};
      telemetry.forEach(t => {
        const key = t.problem;
        if (!map[key]) {
          map[key] = {
            problem: key,
            a: t.a,
            b: t.b,
            op: t.op,
            answer: t.answer,
            totalLatency: 0,
            count: 0,
            errors: 0
          };
        }
        map[key].count++;
        map[key].totalLatency += t.latencyMs;
        if (!t.correct) map[key].errors++;
      });

      return Object.values(map)
        .map(b => ({
          ...b,
          avgLatency: Math.round(b.totalLatency / b.count)
        }))
        .sort((a, b) => b.avgLatency - a.avgLatency)
        .slice(0, 6);
    }

    function renderBottlenecks(bottlenecks) {
      DOM.boxBottlenecks.innerHTML = '';
      if (!bottlenecks || bottlenecks.length === 0) {
        DOM.boxBottlenecks.innerHTML = '<div class="col-span-3 text-center text-xs text-slate-400 py-3">داده‌ای ثبت نشد</div>';
        return;
      }

      bottlenecks.forEach(b => {
        const isSlow = b.avgLatency > 750;
        const card = document.createElement('div');
        card.className = \`p-3 rounded-xl bg-slate-950 border \${isSlow ? 'border-amber-900/60' : 'border-slate-800'} flex items-center justify-between\`;
        card.innerHTML = \`
          <div>
            <div class="font-mono text-base font-bold text-white">\${b.problem} = \${b.answer}</div>
            <div class="text-[10px] text-slate-400">\${b.errors > 0 ? \`\${b.errors} خطای ثبت‌شده\` : 'بدون خطا'}</div>
          </div>
          <div class="text-right">
            <span class="num-font text-xs font-bold \${isSlow ? 'text-amber-400' : 'text-slate-300'}">\${b.avgLatency}ms</span>
            <div class="text-[9px] text-slate-400">میانگین</div>
          </div>
        \`;
        DOM.boxBottlenecks.appendChild(card);
      });

      // Stash for weakness practice
      STATE.customWeaknessProblems = bottlenecks;
    }

    // ==========================================
    // 6. CLOUDFLARE WORKERS API & OFFLINE QUEUE
    // ==========================================
    async function submitRunPayload(payload) {
      // Optimistic local Elo update
      const oldElo = STATE.user.elo;

      if (!navigator.onLine) {
        queueOfflineRun(payload);
        DOM.sumEloChange.textContent = \`ذخیره شد (آفلاین) - \${oldElo} ELO\`;
        return;
      }

      try {
        const res = await fetch('/api/runs/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const data = await res.json();
          if (data.newElo !== undefined) {
            STATE.user.elo = data.newElo;
            saveLocalState();
            updateProfileHud();

            const deltaText = data.delta >= 0 ? \`+\${data.delta}\` : \`\${data.delta}\`;
            DOM.sumEloChange.textContent = \`\${deltaText} (\${data.newElo} ELO)\`;
            if (data.rank) {
              DOM.sumRankBadge.textContent = data.rank.badge || '🌱';
              DOM.navUserBadge.textContent = data.rank.badge || '🌱';
            }
          }
        } else {
          // If edge rejected or error, store offline
          queueOfflineRun(payload);
        }
      } catch (err) {
        console.warn('Network error during run submit:', err);
        queueOfflineRun(payload);
      }
    }

    function queueOfflineRun(payload) {
      try {
        const queue = JSON.parse(localStorage.getItem('zb_offline_queue') || '[]');
        payload.id = 'run_' + Math.random().toString(36).substring(2, 12);
        queue.push(payload);
        localStorage.setItem('zb_offline_queue', JSON.stringify(queue));
        updateSyncQueueStatus();
      } catch (e) {}
    }

    async function syncOfflineQueue() {
      try {
        const queue = JSON.parse(localStorage.getItem('zb_offline_queue') || '[]');
        if (queue.length === 0) return;

        const res = await fetch('/api/runs/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ runs: queue })
        });

        if (res.ok) {
          localStorage.removeItem('zb_offline_queue');
          updateSyncQueueStatus();
        }
      } catch (e) {
        console.warn('Sync failed:', e);
      }
    }

    function updateSyncQueueStatus() {
      try {
        const queue = JSON.parse(localStorage.getItem('zb_offline_queue') || '[]');
        if (queue.length > 0) {
          DOM.badgeSyncQueue.classList.remove('hidden');
          DOM.badgeSyncQueue.classList.add('flex');
          DOM.txtSyncCount.textContent = queue.length;
        } else {
          DOM.badgeSyncQueue.classList.add('hidden');
          DOM.badgeSyncQueue.classList.remove('flex');
        }
      } catch (e) {}
    }

    // ==========================================
    // 7. LEADERBOARDS & ANALYTICS FETCHERS
    // ==========================================
    async function loadLeaderboard() {
      const mode = DOM.selLbMode.value;
      const period = DOM.selLbPeriod.value;
      const province = DOM.selLbProvince.value;

      DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">در حال دریافت داده‌های لبه کلودفلر...</td></tr>';

      try {
        const query = new URLSearchParams({ mode, period, province }).toString();
        const res = await fetch(\`/api/leaderboard?\${query}\`);
        if (res.ok) {
          const list = await res.json();
          renderLeaderboardTable(list);
        } else {
          DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">خطا در دریافت جدول رده‌بندی</td></tr>';
        }
      } catch (e) {
        DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">ارتباط با لبه برقرار نشد (حالت آفلاین)</td></tr>';
      }
    }

    function renderLeaderboardTable(list) {
      if (!list || list.length === 0) {
        DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">هنوز رکوردی در این بخش ثبت نشده است. اولین نفر باشید!</td></tr>';
        return;
      }

      DOM.tblLeaderboardBody.innerHTML = '';
      list.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.className = index < 3 ? 'bg-slate-900/40 hover:bg-slate-800/50 transition' : 'hover:bg-slate-900/30 transition';
        
        let rankBadge = \`#\${index + 1}\`;
        if (index === 0) rankBadge = '🥇 ۱';
        else if (index === 1) rankBadge = '🥈 ۲';
        else if (index === 2) rankBadge = '🥉 ۳';

        const provName = PROVINCE_NAMES[item.province] || item.province || 'ایران';

        tr.innerHTML = \`
          <td class="p-3 text-center font-bold text-white">\${rankBadge}</td>
          <td class="p-3 font-semibold text-slate-100 flex items-center gap-1.5">
            <span>\${item.username || 'کاربر مهمان'}</span>
          </td>
          <td class="p-3 text-center text-slate-400">\${provName}</td>
          <td class="p-3 text-center text-cyan-400 font-bold">\${item.elo_rating || 1200}</td>
          <td class="p-3 text-center text-emerald-400 font-bold">\${item.opm.toFixed(1)}</td>
          <td class="p-3 text-center text-slate-300">\${item.accuracy.toFixed(0)}%</td>
          <td class="p-3 text-center text-slate-400 text-[11px]">\${item.mode}</td>
        \`;
        DOM.tblLeaderboardBody.appendChild(tr);
      });
    }

    async function loadUserAnalytics() {
      DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">در حال تحلیل رکوردها...</div>';
      try {
        const res = await fetch(\`/api/user/analytics?user_id=\${STATE.user.id}\`);
        if (res.ok) {
          const data = await res.json();
          renderAnalyticsScreen(data);
        } else {
          DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">رکوردی برای این کاربر یافت نشد. ابتدا یک بازی انجام دهید!</div>';
        }
      } catch (e) {
        DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">خطا در برقراری ارتباط با سرور</div>';
      }
    }

    function renderAnalyticsScreen(data) {
      if (!data || !data.topWeaknesses) {
        DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">داده‌ای یافت نشد.</div>';
        return;
      }

      let html = \`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div class="text-xs text-slate-400">تعداد مسابقات بررسی‌شده</div>
            <div class="num-font text-2xl font-black text-cyan-400 mt-1">\${data.recentRunsCount}</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div class="text-xs text-slate-400">کل مسائل حل‌شده</div>
            <div class="num-font text-2xl font-black text-emerald-400 mt-1">\${data.totalProblemsAnalyzed}</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div class="text-xs text-slate-400">ریتینگ ELO فعلی</div>
            <div class="num-font text-2xl font-black text-purple-400 mt-1">\${data.user?.elo_rating || STATE.user.elo}</div>
          </div>
        </div>

        <div class="space-y-3 mt-6">
          <h3 class="font-bold text-sm text-white">کندترین ترکیبات و نقاط ضعف پرتکرار شما:</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      \`;

      data.topWeaknesses.forEach(w => {
        html += \`
          <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div class="font-mono text-base font-bold text-white">\${w.problem}</div>
              <div class="text-xs text-slate-400">\${w.attempts} بار تکرار - \${w.errorRate}% خطا</div>
            </div>
            <div class="text-right">
              <span class="num-font text-sm font-bold text-amber-400">\${w.avgLatency}ms</span>
              <div class="text-[10px] text-slate-400">میانگین زمان</div>
            </div>
          </div>
        \`;
      });

      html += \`
          </div>
        </div>
      \`;

      DOM.analyticsContent.innerHTML = html;
    }

    // ==========================================
    // 8. EVENT LISTENERS & PERSIAN NUMPAD MAPPING
    // ==========================================
    
    // Persian and Arabic Digits Normalization Map
    const DIGIT_NORMALIZER = {
      '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
      '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
      '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
      '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
      '−': '-', '-': '-'
    };

    window.addEventListener('keydown', (e) => {
      // Abort with Escape
      if (e.key === 'Escape') {
        if (STATE.activeRun) {
          endRun();
          showScreen('hub');
        }
        DOM.modalProfile.classList.add('hidden');
        return;
      }

      if (!STATE.activeRun) return;

      // Enter key for manual submission
      if (e.key === 'Enter') {
        e.preventDefault();
        evaluateCurrentInput();
        return;
      }

      // Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        handleInputDigit('backspace');
        return;
      }

      // Persian/Arabic or Standard Numpad/Digit Keys
      let char = e.key;
      if (DIGIT_NORMALIZER[char] !== undefined) {
        char = DIGIT_NORMALIZER[char];
      }

      if (char >= '0' && char <= '9') {
        e.preventDefault();
        handleInputDigit(char);
      } else if (char === '-') {
        e.preventDefault();
        handleInputDigit('minus');
      }
    });

    // Touch Numpad buttons click
    document.querySelectorAll('.numpad-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        handleInputDigit(val);
      });
    });

    // Hub Mode selection
    DOM.modeCards.forEach(card => {
      card.addEventListener('click', () => {
        const mode = card.getAttribute('data-mode');
        selectMode(mode);
      });
    });

    function selectMode(mode) {
      STATE.config.mode = mode;
      DOM.modeCards.forEach(c => {
        if (c.getAttribute('data-mode') === mode) {
          c.classList.add('ring-2', 'ring-cyan-500', 'bg-slate-800/90');
        } else {
          c.classList.remove('ring-2', 'ring-cyan-500', 'bg-slate-800/90');
        }
      });

      renderSubOptions(mode);
    }

    function renderSubOptions(mode) {
      DOM.boxModeOptions.innerHTML = '';

      if (mode === 'blitz') {
        DOM.lblActiveModeTitle.textContent = 'حمله سرعتی (Time Attack)';
        DOM.boxModeOptions.innerHTML = \`
          <button class="sub-btn px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-xs font-mono text-cyan-300 font-bold active-sub" data-sub="30">۳۰ ثانیه</button>
          <button class="sub-btn px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 font-bold" data-sub="60">۶۰ ثانیه</button>
          <button class="sub-btn px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 font-bold" data-sub="120">۱۲۰ ثانیه</button>
        \`;
        STATE.config.subOption = '30';
      } else if (mode === 'sprint') {
        DOM.lblActiveModeTitle.textContent = 'دوی سرعتی (Target Sprint)';
        DOM.boxModeOptions.innerHTML = \`
          <button class="sub-btn px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-xs font-mono text-emerald-300 font-bold active-sub" data-sub="20">۲۰ سوال</button>
          <button class="sub-btn px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 font-bold" data-sub="50">۵۰ سوال</button>
          <button class="sub-btn px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 font-bold" data-sub="100">۱۰۰ سوال</button>
        \`;
        STATE.config.subOption = '20';
      } else if (mode === 'dojo') {
        DOM.lblActiveModeTitle.textContent = 'ضرب‌خانه تخصصی (Multiplication Dojo)';
        DOM.boxModeOptions.innerHTML = \`
          <select id="selDojoTier" class="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-300 font-bold">
            <option value="1">سطح ۱: جدول تک‌رقمی (۱×۱ تا ۹×۹)</option>
            <option value="2">سطح ۲: اعداد ۱۱ تا ۱۹ و مربع‌ها</option>
            <option value="3">سطح ۳: جام جهانی (۲رقمی در ۲رقمی)</option>
          </select>
        \`;
        STATE.config.subOption = 'tier1';
        STATE.config.dojoTier = 1;

        const selTier = document.getElementById('selDojoTier');
        selTier?.addEventListener('change', (e) => {
          STATE.config.dojoTier = parseInt(e.target.value, 10);
          STATE.config.subOption = 'tier' + e.target.value;
        });
      } else if (mode === 'survival') {
        DOM.lblActiveModeTitle.textContent = 'چالش بقا (Sudden Death)';
        DOM.boxModeOptions.innerHTML = \`
          <span class="text-xs text-rose-400 font-mono font-bold">شروع: ۵ ثانیه | خطا = باخت</span>
        \`;
        STATE.config.subOption = 'survival';
      }

      // Hook sub-btn clicks
      DOM.boxModeOptions.querySelectorAll('.sub-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.boxModeOptions.querySelectorAll('.sub-btn').forEach(b => {
            b.className = 'sub-btn px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 font-bold';
          });
          btn.className = 'sub-btn px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-xs font-mono text-cyan-300 font-bold';
          STATE.config.subOption = btn.getAttribute('data-sub');
        });
      });
    }

    // Checkboxes configuration
    DOM.chkOpAdd.addEventListener('change', (e) => STATE.config.operators.add = e.target.checked);
    DOM.chkOpSub.addEventListener('change', (e) => STATE.config.operators.sub = e.target.checked);
    DOM.chkOpMul.addEventListener('change', (e) => STATE.config.operators.mul = e.target.checked);
    DOM.chkOpDiv.addEventListener('change', (e) => STATE.config.operators.div = e.target.checked);
    DOM.chkOpMod.addEventListener('change', (e) => STATE.config.operators.mod = e.target.checked);
    DOM.chkOpPow.addEventListener('change', (e) => STATE.config.operators.pow = e.target.checked);

    // Ergonomic toggles
    DOM.toggleZenMode.addEventListener('change', (e) => {
      STATE.settings.zenMode = e.target.checked;
      saveLocalState();
    });
    DOM.toggleEnterMode.addEventListener('change', (e) => {
      STATE.settings.enterMode = e.target.checked;
      saveLocalState();
    });

    // Audio toggle
    DOM.btnAudioToggle.addEventListener('click', () => {
      STATE.settings.audio = !STATE.settings.audio;
      DOM.iconAudio.textContent = STATE.settings.audio ? '🔊' : '🔇';
      saveLocalState();
    });

    // Lang toggle
    DOM.btnLangToggle.addEventListener('click', () => {
      const isFa = document.documentElement.lang === 'fa';
      if (isFa) {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        DOM.btnLangToggle.textContent = 'FA';
        DOM.txtSubTitle.textContent = 'Ultra-low Latency Mental Math Speedrunning';
      } else {
        document.documentElement.lang = 'fa';
        document.documentElement.dir = 'rtl';
        DOM.btnLangToggle.textContent = 'EN';
        DOM.txtSubTitle.textContent = 'لیگ محاسبات ذهنی سریع ایران';
      }
    });

    // Profile modal
    DOM.btnOpenProfile.addEventListener('click', () => {
      updateProfileHud();
      DOM.modalProfile.classList.remove('hidden');
    });
    DOM.btnCloseProfileModal.addEventListener('click', () => DOM.modalProfile.classList.add('hidden'));
    DOM.btnSaveProfile.addEventListener('click', async () => {
      const newName = DOM.iptUsername.value.trim();
      const prov = DOM.selProfileProvince.value;
      if (newName) {
        STATE.user.username = newName;
        STATE.user.province = prov;
        saveLocalState();
        updateProfileHud();

        // Sync with backend
        try {
          await fetch('/api/user/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(STATE.user)
          });
        } catch (e) {}

        DOM.modalProfile.classList.add('hidden');
      }
    });

    // Start Buttons
    DOM.btnQuickStart.addEventListener('click', () => startRun());
    DOM.btnPlayAgain.addEventListener('click', () => startRun());
    DOM.btnReturnHub.addEventListener('click', () => showScreen('hub'));
    DOM.btnAbortRun.addEventListener('click', () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      STATE.activeRun = null;
      showScreen('hub');
    });

    // Weakness Practice Buttons
    DOM.btnTrainWeaknessNow.addEventListener('click', () => {
      if (STATE.customWeaknessProblems && STATE.customWeaknessProblems.length > 0) {
        startRun(STATE.customWeaknessProblems);
      } else {
        startRun();
      }
    });
    DOM.btnTrainWeaknessHub.addEventListener('click', () => {
      if (STATE.customWeaknessProblems && STATE.customWeaknessProblems.length > 0) {
        startRun(STATE.customWeaknessProblems);
      } else {
        startRun();
      }
    });

    // Navigation Buttons
    DOM.btnNavHome.addEventListener('click', () => showScreen('hub'));
    DOM.btnNavLeaderboard.addEventListener('click', () => {
      showScreen('leaderboard');
      loadLeaderboard();
    });
    DOM.btnBackFromLeaderboard.addEventListener('click', () => showScreen('hub'));
    DOM.selLbMode.addEventListener('change', () => loadLeaderboard());
    DOM.selLbPeriod.addEventListener('change', () => loadLeaderboard());
    DOM.selLbProvince.addEventListener('change', () => loadLeaderboard());

    DOM.btnNavAnalytics.addEventListener('click', () => {
      showScreen('analytics');
      loadUserAnalytics();
    });
    DOM.btnBackFromAnalytics.addEventListener('click', () => showScreen('hub'));

    // Online/Offline detection & edge health
    window.addEventListener('online', () => {
      DOM.txtEdgeStatus.textContent = 'لبه کلودفلر (Online)';
      DOM.badgeNetwork.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono';
      syncOfflineQueue();
    });
    window.addEventListener('offline', () => {
      DOM.txtEdgeStatus.textContent = 'حافظه آفلاین (Offline)';
      DOM.badgeNetwork.className = 'flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-amber-400 font-mono';
    });

    // Check Cloudflare Edge PoP
    async function checkEdgeHealth() {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const info = await res.json();
          if (info.colo) {
            DOM.txtEdgeStatus.textContent = \`لبه \${info.colo} (\${info.durationMs || 1}ms)\`;
          }
        }
      } catch (e) {}
    }

    // Initialization
    loadLocalState();
    updateProfileHud();
    selectMode('blitz');
    updateSyncQueueStatus();
    checkEdgeHealth();

    // Auto-sync if online
    if (navigator.onLine) {
      syncOfflineQueue();
    }
  </script>
</body>
</html>`;
}
