/**
 * mathgame - Ultra-Low Latency Competitive Mental Math Platform
 * Designed with Neo-Arcade Glassmorphism, Zero-Allocation 144Hz Engine, and Persian Localization
 */

export function renderAppHtml() {
  return `<!DOCTYPE html>
<html lang="fa" dir="rtl" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>mathgame | لیگ محاسبات ذهنی سریع ایران</title>
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#ecfeff',
              100: '#cffafe',
              400: '#22d3ee',
              500: '#06b6d4',
              600: '#0891b2',
              900: '#164e63',
              950: '#083344'
            },
            accent: {
              emerald: '#10b981',
              cyan: '#06b6d4',
              amber: '#f59e0b',
              crimson: '#ff2d55',
              violet: '#a855f7'
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
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    :root {
      --bg-dark: #030712;
      --card-glass: rgba(15, 23, 42, 0.65);
      --border-glass: rgba(255, 255, 255, 0.08);
      --accent-cyan: #06b6d4;
      --accent-emerald: #10b981;
      --accent-rose: #ff2d55;
    }

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
      background-color: var(--bg-dark);
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

    /* Neo-Arcade Ambient Glow Grid */
    .ambient-grid {
      background-color: #030712;
      background-image: 
        radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
        radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px;
    }

    /* Luxury Glass Panel */
    .glass-card {
      background: var(--card-glass);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border-glass);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
    }

    .glass-interactive {
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .glass-interactive:hover {
      border-color: rgba(6, 182, 212, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px -5px rgba(6, 182, 212, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
    }
    .glass-interactive:active {
      transform: scale(0.98);
    }

    /* Zero-allocation Visual Feedback Animations */
    @keyframes hit-pulse {
      0% {
        border-color: #10b981;
        box-shadow: 0 0 35px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(16, 185, 129, 0.2);
        transform: scale(1.02);
      }
      100% {
        border-color: var(--border-glass);
        box-shadow: none;
        transform: scale(1);
      }
    }

    @keyframes miss-shake {
      0%, 100% { transform: translateX(0); border-color: #ff2d55; box-shadow: 0 0 30px rgba(255, 45, 85, 0.5); }
      15%, 45%, 75% { transform: translateX(-10px); }
      30%, 60%, 90% { transform: translateX(10px); }
    }

    .anim-hit {
      animation: hit-pulse 0.18s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .anim-miss {
      animation: miss-shake 0.25s ease-in-out;
    }

    @keyframes flame-pulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.8)); }
      50% { transform: scale(1.15); filter: drop-shadow(0 0 16px rgba(255, 45, 85, 1)); }
    }
    .flame-active {
      animation: flame-pulse 0.6s infinite alternate ease-in-out;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #030712; }
    ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #334155; }
  </style>
</head>
<body class="ambient-grid text-slate-100 flex flex-col min-h-screen selection:bg-cyan-500 selection:text-slate-950">

  <!-- TOP HIGH-END NAVIGATION BAR -->
  <header class="border-b border-white/[0.06] bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      
      <!-- Logo & League Brand -->
      <div class="flex items-center gap-3">
        <button id="btnNavHome" class="flex items-center gap-2.5 group cursor-pointer text-right">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-brand-500 to-emerald-400 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
            <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <span class="num-font text-lg font-black bg-gradient-to-br from-cyan-400 to-emerald-300 bg-clip-text text-transparent">MG</span>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="num-font font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                mathgame
              </span>
              <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300">
                EDGE
              </span>
            </div>
            <div class="text-[11px] text-slate-400 font-medium truncate" id="txtHeaderSubtitle">
              لیگ محاسبات ذهنی سریع ایران
            </div>
          </div>
        </button>
      </div>

      <!-- Edge PoP & Sync Indicator -->
      <div class="hidden sm:flex items-center gap-2 font-mono text-xs">
        <div id="badgeEdgeStatus" class="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/[0.08] text-emerald-400">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span id="txtEdgePoP">لبه کلودفلر (Online)</span>
        </div>
        <div id="badgeSyncQueue" class="hidden items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/60 text-amber-300">
          <span>⚡</span>
          <span id="txtSyncCount">0</span> در صف همگام‌سازی
        </div>
      </div>

      <!-- Action Icons: Audio, Profile, Leaderboard, Analytics, Lang -->
      <div class="flex items-center gap-2">
        <button id="btnAudioToggle" title="قطع / وصل صدا" class="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 transition cursor-pointer">
          <span id="iconAudio" class="text-sm">🔊</span>
        </button>

        <button id="btnOpenProfile" class="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card hover:border-cyan-500/50 transition cursor-pointer">
          <span id="navUserBadge" class="text-sm">🌱</span>
          <div class="text-right hidden sm:block">
            <div id="navUserName" class="text-xs font-bold text-slate-200 truncate max-w-[100px]">کاربر</div>
            <div class="text-[10px] font-mono text-cyan-400 font-semibold" id="navUserElo">1200 ELO</div>
          </div>
        </button>

        <button id="btnNavLeaderboard" title="جدول برترین‌ها" class="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 transition cursor-pointer">
          🏆
        </button>

        <button id="btnNavAnalytics" title="تحلیل عملکرد و نقاط ضعف" class="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/40 transition cursor-pointer">
          📊
        </button>

        <button id="btnLangToggle" class="px-2.5 py-1 rounded-xl glass-card text-xs font-mono font-bold text-slate-300 hover:text-white hover:border-cyan-500/40 transition cursor-pointer">
          EN
        </button>
      </div>

    </div>
  </header>

  <!-- MAIN VIEW CONTAINER -->
  <main class="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">

    <!-- ============================================== -->
    <!-- SCREEN 1: BENTO GRID HUB & CONTROLS -->
    <!-- ============================================== -->
    <section id="viewHub" class="flex flex-col gap-5 max-w-5xl mx-auto w-full py-2">
      
      <!-- HERO BENTO ROW -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Bento 1: Main Action Hero (8 cols) -->
        <div class="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <!-- Background ambient light inside card -->
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 space-y-3">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/40 text-cyan-300 text-xs font-medium">
              <span>🇮🇷 رقابت سراسری در لبه شبکه کلودفلر</span>
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span class="font-mono text-[11px]">144Hz Zero-Lag</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              سرعتت رو به رخ بکش، <span class="bg-gradient-to-r from-cyan-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">قهرمان محاسبات شو!</span>
            </h1>
            <p class="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
              سیستم فوق سریع ثبت ورودی بدون نیاز به کلید اینتر (Zen Auto-Submit)، فیلتر ضدتقلب هوشمند، و آنالیز فکت‌های کند مغز.
            </p>
          </div>

          <div class="relative z-10 pt-6 flex flex-wrap items-center gap-3">
            <button id="btnHeroStart" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer">
              <span>شروع مسابقه</span>
              <span class="num-font text-lg">⚡</span>
              <span class="text-xs font-mono font-normal opacity-75 hidden sm:inline">(Space)</span>
            </button>

            <button id="btnHeroWeakness" class="px-5 py-4 rounded-2xl glass-card glass-interactive text-amber-300 text-xs font-bold flex items-center gap-2 cursor-pointer">
              <span>🎯 تمرین نقاط ضعف</span>
            </button>
          </div>
        </div>

        <!-- Bento 2: Player Stats Summary (4 cols) -->
        <div class="lg:col-span-4 glass-card rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
              <span class="text-xs font-semibold text-slate-400">شناسنامه محاسب</span>
              <button id="btnEditProfilePencil" class="text-xs text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer">ویرایش</button>
            </div>
            
            <div class="flex items-center gap-3.5 mb-4">
              <div class="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-inner shadow-cyan-500/10" id="cardRankIcon">
                🌱
              </div>
              <div>
                <h3 class="font-extrabold text-base text-white truncate max-w-[160px]" id="cardUsername">کاربر مهمان</h3>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="text-xs font-mono font-bold text-cyan-400" id="cardElo">1200 ELO</span>
                  <span class="text-slate-600">•</span>
                  <span class="text-[11px] text-slate-400" id="cardRankName">کارآموز</span>
                </div>
              </div>
            </div>

            <div class="space-y-2 text-xs">
              <div class="flex justify-between p-2 rounded-xl bg-slate-950/60 border border-white/[0.04]">
                <span class="text-slate-400">استان ثبت‌شده:</span>
                <span class="text-slate-200 font-medium" id="cardProvince">تهران</span>
              </div>
              <div class="flex justify-between p-2 rounded-xl bg-slate-950/60 border border-white/[0.04]">
                <span class="text-slate-400">بهترین رکورد سرعت (PB):</span>
                <span class="num-font text-emerald-400 font-bold" id="cardBestPb">40.0 OPM</span>
              </div>
            </div>
          </div>

          <div class="pt-3 text-[10px] text-slate-400 text-center font-mono">
            پشتیبانی کامل از ارقام فارسی ۱۲۳۴۵
          </div>
        </div>

      </div>

      <!-- BENTO 3: GAME MODES SELECTOR -->
      <div class="space-y-3">
        <div class="flex items-center justify-between px-1">
          <h2 class="text-sm font-bold text-white flex items-center gap-2">
            <span>🎮 انتخاب حالت بازی:</span>
            <span id="lblModeActive" class="px-2.5 py-0.5 rounded-lg bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 font-mono text-xs">حمله سرعتی (۳۰s)</span>
          </h2>
          <div id="subOptionsToolbar" class="flex items-center gap-1.5">
            <!-- Dynamically populated buttons -->
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          <!-- Mode 1: Blitz -->
          <div class="mode-tile cursor-pointer glass-card glass-interactive rounded-2xl p-5 flex flex-col justify-between ring-2 ring-cyan-500 bg-slate-900/90" data-mode="blitz">
            <div>
              <div class="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-xl mb-3">
                ⏱️
              </div>
              <h3 class="font-bold text-base text-white">حمله سرعتی</h3>
              <p class="text-xs text-slate-400 mt-1 leading-relaxed">حداکثر عملیات در بازه مشخص (۳۰، ۶۰ یا ۱۲۰ ثانیه)</p>
            </div>
            <div class="flex items-center justify-between text-xs font-mono text-cyan-400 pt-3 border-t border-white/[0.06] mt-4">
              <span>Speed Blitz</span>
              <span class="font-bold">زمان محدود</span>
            </div>
          </div>

          <!-- Mode 2: Sprint -->
          <div class="mode-tile cursor-pointer glass-card glass-interactive rounded-2xl p-5 flex flex-col justify-between" data-mode="sprint">
            <div>
              <div class="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-xl mb-3">
                🎯
              </div>
              <h3 class="font-bold text-base text-white">دوی هدفی</h3>
              <p class="text-xs text-slate-400 mt-1 leading-relaxed">حل ۲۰، ۵۰ یا ۱۰۰ معادله با زمان‌سنج میلی‌ثانیه‌ای</p>
            </div>
            <div class="flex items-center justify-between text-xs font-mono text-emerald-400 pt-3 border-t border-white/[0.06] mt-4">
              <span>Target Sprint</span>
              <span class="font-bold">تعداد ثابت</span>
            </div>
          </div>

          <!-- Mode 3: Dojo -->
          <div class="mode-tile cursor-pointer glass-card glass-interactive rounded-2xl p-5 flex flex-col justify-between" data-mode="dojo">
            <div>
              <div class="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-xl mb-3">
                🥋
              </div>
              <h3 class="font-bold text-base text-white">ضرب‌خانه تخصصی</h3>
              <p class="text-xs text-slate-400 mt-1 leading-relaxed">دریل‌های جدول ضرب، اعداد ۱۱ تا ۱۹ و دو رقمی در دو رقمی</p>
            </div>
            <div class="flex items-center justify-between text-xs font-mono text-amber-400 pt-3 border-t border-white/[0.06] mt-4">
              <span>Multiplication</span>
              <span class="font-bold">سطوح ۱ تا ۴</span>
            </div>
          </div>

          <!-- Mode 4: Survival -->
          <div class="mode-tile cursor-pointer glass-card glass-interactive rounded-2xl p-5 flex flex-col justify-between" data-mode="survival">
            <div>
              <div class="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-xl mb-3">
                💀
              </div>
              <h3 class="font-bold text-base text-white">مرگ ناگهانی</h3>
              <p class="text-xs text-slate-400 mt-1 leading-relaxed">شروع با ۵ ثانیه! هر پاسخ ۱.۵+ ثانیه، ۱ خطا = پایان بازی</p>
            </div>
            <div class="flex items-center justify-between text-xs font-mono text-rose-400 pt-3 border-t border-white/[0.06] mt-4">
              <span>Sudden Death</span>
              <span class="font-bold">چالش بقا</span>
            </div>
          </div>

        </div>
      </div>

      <!-- BENTO 4: OPERATORS MATRIX & ERGONOMICS -->
      <div class="glass-card rounded-3xl p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div>
            <h3 class="font-bold text-sm text-white flex items-center gap-2">
              <span>⚙️ ماتریس عملگرها و تنظیمات ورودی</span>
            </h3>
            <p class="text-xs text-slate-400 mt-0.5">عملگرهای مورد نظرتان را برای این دست از مسابقه انتخاب کنید</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btnPresetAll" class="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 font-medium transition cursor-pointer">همه عملگرها</button>
            <button id="btnPresetMulOnly" class="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 font-medium transition cursor-pointer">فقط ضرب</button>
            <button id="btnPresetAddSub" class="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 font-medium transition cursor-pointer">جمع و تفریق</button>
          </div>
        </div>

        <!-- Chips Checkboxes -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          
          <label class="op-chip flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/40 cursor-pointer transition select-none">
            <div class="flex items-center gap-2">
              <input type="checkbox" id="chkOpAdd" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700">
              <span class="text-xs font-semibold">جمع (+)</span>
            </div>
            <span class="num-font text-cyan-400 font-bold">+</span>
          </label>

          <label class="op-chip flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/40 cursor-pointer transition select-none">
            <div class="flex items-center gap-2">
              <input type="checkbox" id="chkOpSub" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700">
              <span class="text-xs font-semibold">تفریق (−)</span>
            </div>
            <span class="num-font text-cyan-400 font-bold">−</span>
          </label>

          <label class="op-chip flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/40 cursor-pointer transition select-none">
            <div class="flex items-center gap-2">
              <input type="checkbox" id="chkOpMul" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700">
              <span class="text-xs font-semibold">ضرب (×)</span>
            </div>
            <span class="num-font text-cyan-400 font-bold">×</span>
          </label>

          <label class="op-chip flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/40 cursor-pointer transition select-none">
            <div class="flex items-center gap-2">
              <input type="checkbox" id="chkOpDiv" checked class="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700">
              <span class="text-xs font-semibold">تقسیم (÷)</span>
            </div>
            <span class="num-font text-cyan-400 font-bold">÷</span>
          </label>

          <label class="op-chip flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/40 cursor-pointer transition select-none">
            <div class="flex items-center gap-2">
              <input type="checkbox" id="chkOpMod" class="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700">
              <span class="text-xs font-semibold">باقیمانده (%)</span>
            </div>
            <span class="num-font text-cyan-400 font-bold">%</span>
          </label>

          <label class="op-chip flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/[0.06] hover:border-cyan-500/40 cursor-pointer transition select-none">
            <div class="flex items-center gap-2">
              <input type="checkbox" id="chkOpPow" class="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700">
              <span class="text-xs font-semibold">توان (x², x³)</span>
            </div>
            <span class="num-font text-cyan-400 font-bold">x²</span>
          </label>

        </div>

        <!-- Input Ergonomics -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          
          <div class="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white flex items-center gap-1.5">
                <span>مود ذن نام‌پد (Zen Auto-Submit)</span>
                <span class="text-[10px] bg-emerald-950 border border-emerald-700 text-emerald-400 px-1 rounded font-mono">حذف تاخیر</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">ثبت آنی به محض تکمیل طول رقم پاسخ بدون فشردن اینتر</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" id="toggleZenMode" checked class="sr-only peer">
              <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-center justify-between">
            <div>
              <div class="text-xs font-bold text-white">کلید اینتر دستی (Enter-to-Submit)</div>
              <div class="text-[11px] text-slate-400 mt-0.5">صرفاً با زدن اینتر پاسخ ارزیابی شود (مناسب افراد دقیق)</div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-2">
              <input type="checkbox" id="toggleEnterMode" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

        </div>

      </div>

    </section>

    <!-- ============================================== -->
    <!-- SCREEN 2: ACTIVE IMMERSION RUN INTERFACE -->
    <!-- ============================================== -->
    <section id="viewRun" class="hidden flex flex-col items-center justify-center max-w-3xl mx-auto w-full py-2">
      
      <!-- TOP TELEMETRY HUD -->
      <div class="w-full glass-card rounded-3xl p-5 mb-5 shadow-2xl space-y-4">
        
        <!-- Metrics Row -->
        <div class="grid grid-cols-4 items-center justify-between text-center gap-2">
          
          <div class="space-y-0.5">
            <span class="text-[11px] text-slate-400 font-medium">زمان</span>
            <div id="hudTimer" class="num-font text-2xl sm:text-3xl font-extrabold text-cyan-400 tracking-wider">00:30.000</div>
          </div>

          <div class="space-y-0.5">
            <span class="text-[11px] text-slate-400 font-medium">عملیات در دقیقه</span>
            <div id="hudOpm" class="num-font text-2xl sm:text-3xl font-extrabold text-emerald-400">0.0</div>
          </div>

          <div class="space-y-0.5">
            <span class="text-[11px] text-slate-400 font-medium">زنجیره (Streak)</span>
            <div class="flex items-center justify-center gap-1.5">
              <span id="hudStreak" class="num-font text-2xl sm:text-3xl font-black text-amber-400">0</span>
              <span id="hudMultiplier" class="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">x1</span>
            </div>
          </div>

          <div class="space-y-0.5">
            <span class="text-[11px] text-slate-400 font-medium" id="hudProgressLabel">پاسخ‌های صحیح</span>
            <div id="hudCounter" class="num-font text-2xl sm:text-3xl font-extrabold text-white">0</div>
          </div>

        </div>

        <!-- DYNAMIC PACING GHOST BAR -->
        <div class="pt-3 border-t border-white/[0.06] space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="text-slate-400 flex items-center gap-1.5">
              <span>👻 مقایسه با رکورد (PB):</span>
              <span id="txtGhostTarget" class="text-slate-200 font-bold">45.0 OPM</span>
            </span>
            <span id="txtGhostDelta" class="text-emerald-400 font-bold">+0.0s برابر</span>
          </div>
          <div class="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden relative border border-white/[0.06]">
            <!-- Center line -->
            <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600 z-10"></div>
            <!-- Ghost Fill bar -->
            <div id="barGhostFill" class="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-150 rounded-full" style="width: 50%;"></div>
          </div>
        </div>

      </div>

      <!-- PROBLEM STAGE (FIXED BOUNDING BOX ZERO LAYOUT SHIFT) -->
      <div id="problemContainer" class="w-full glass-card rounded-3xl p-8 sm:p-14 flex flex-col items-center justify-center shadow-2xl relative min-h-[260px] border-2 border-white/[0.08]">
        
        <!-- Category & Problem Index Tag -->
        <div class="absolute top-4 left-5 text-xs font-mono text-slate-400" id="lblProblemIndex">#1</div>
        <div class="absolute top-4 right-5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider" id="lblOpCategory">MULTIPLICATION</div>

        <!-- Expression -->
        <div class="text-center space-y-4">
          <div id="txtProblemExpression" class="num-font text-5xl sm:text-7xl font-extrabold text-white tracking-widest leading-none">
            7 × 8
          </div>
          
          <!-- Backlit Answer Input Box with Blinking Cursor -->
          <div id="boxInputDisplay" class="inline-flex items-center justify-center min-w-[160px] h-16 px-6 rounded-2xl bg-slate-950/90 border-2 border-cyan-500/40 font-mono text-3xl sm:text-4xl font-black text-cyan-400 tracking-wider shadow-inner shadow-cyan-500/10 transition-colors">
            <span id="txtUserInputEcho" class="tabular-nums"></span>
            <span id="cursorBlink" class="w-3 h-8 bg-cyan-400 inline-block animate-pulse ml-1 rounded-sm"></span>
          </div>
        </div>

      </div>

      <!-- ERGONOMIC NUMPAD KEYBOARD (DESKTOP & MOBILE COMPATIBLE) -->
      <div class="w-full max-w-sm mt-5 grid grid-cols-3 gap-2.5">
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="7">7</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="8">8</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="9">9</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="4">4</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="5">5</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="6">6</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="1">1</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="2">2</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="3">3</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-xl font-bold font-mono text-rose-400 active:scale-95 transition cursor-pointer" data-val="clear">C</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-2xl font-bold font-mono text-white active:scale-95 transition cursor-pointer" data-val="0">0</button>
        <button class="numpad-btn py-3.5 rounded-2xl glass-card text-xl font-bold font-mono text-cyan-400 active:scale-95 transition cursor-pointer" data-val="minus">−</button>
      </div>

      <!-- Footer Action & Skip Hint -->
      <div class="mt-4 flex items-center justify-between w-full max-w-sm text-xs text-slate-400 px-1">
        <button id="btnAbortRun" class="hover:text-rose-400 transition cursor-pointer">انصراف (Esc)</button>
        <button id="btnSkipProblem" class="hover:text-cyan-400 transition cursor-pointer">رد کردن سوال (Space)</button>
      </div>

    </section>

    <!-- ============================================== -->
    <!-- SCREEN 3: POST-RUN SUMMARY & WEAKNESS DRILL -->
    <!-- ============================================== -->
    <section id="viewSummary" class="hidden flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <div class="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        
        <!-- Header & Elo Gain -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-bold mb-1">
              <span>مسابقه به پایان رسید</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-white" id="sumTitle">کارنامه مسابقه mathgame</h2>
          </div>

          <div class="flex items-center gap-3.5 bg-slate-950/80 px-5 py-3 rounded-2xl border border-white/[0.08]">
            <div class="text-right">
              <div class="text-[11px] text-slate-400">تغییر ریتینگ ELO</div>
              <div class="num-font text-xl font-black text-cyan-400" id="sumEloChange">+24 (1248)</div>
            </div>
            <div class="text-3xl" id="sumRankBadge">🌱</div>
          </div>
        </div>

        <!-- 4 Key Stat Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div class="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.05] text-center space-y-1">
            <span class="text-xs text-slate-400">سرعت عملیات (OPM)</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-cyan-400" id="sumOpm">52.4</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.05] text-center space-y-1">
            <span class="text-xs text-slate-400">دقت پاسخ‌ها (Accuracy)</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-emerald-400" id="sumAccuracy">96.2%</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.05] text-center space-y-1">
            <span class="text-xs text-slate-400">زمان کل</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-amber-400" id="sumDuration">30.0s</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-950/70 border border-white/[0.05] text-center space-y-1">
            <span class="text-xs text-slate-400">بیشترین زنجیره (Max Streak)</span>
            <div class="num-font text-2xl sm:text-3xl font-extrabold text-violet-400" id="sumMaxStreak">18</div>
          </div>
        </div>

        <!-- REACTION TIME HISTOGRAM -->
        <div class="space-y-2.5 mb-6">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-slate-200">📊 توزیع زمانی پاسخ‌دهی (Latency Histogram):</span>
            <span class="text-slate-400 font-mono">Millisecond Response Curves</span>
          </div>
          <div class="h-32 w-full bg-slate-950/80 rounded-2xl p-4 border border-white/[0.06] flex items-end justify-between gap-3" id="boxHistogramBars">
            <!-- Dynamically populated bars -->
          </div>
        </div>

        <!-- BOTTLENECK COMBINATIONS -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <span>🚨 کندترین فکت‌های مغزی شما در این دست (Bottlenecks):</span>
            </h3>
            <span class="text-xs text-slate-400">میانگین تاخیر هر معادله</span>
          </div>
          
          <div id="boxBottlenecks" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            <!-- Bottleneck items rendered here -->
          </div>
        </div>

        <!-- ACTIONS ROW -->
        <div class="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <button id="btnPlayAgain" class="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 active:scale-95 transition cursor-pointer flex items-center gap-2">
            <span>تکرار همین مسابقه</span>
            <span class="font-mono">↺</span>
          </button>
          
          <button id="btnTrainWeaknessNow" class="px-5 py-3.5 rounded-2xl bg-amber-950/60 border border-amber-600/60 hover:border-amber-400 text-amber-300 font-bold text-xs transition cursor-pointer flex items-center gap-2">
            <span>🎯 تمرین فوری همین فکت‌های کند</span>
          </button>

          <button id="btnShareSummary" class="px-5 py-3.5 rounded-2xl glass-card hover:border-cyan-500/50 text-slate-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5">
            <span>📋 اشتراک‌گذاری رکورد</span>
          </button>

          <button id="btnReturnHub" class="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer">
            بازگشت به منو
          </button>
        </div>

      </div>

    </section>

    <!-- ============================================== -->
    <!-- SCREEN 4: GLOBAL & PROVINCIAL LEADERBOARD -->
    <!-- ============================================== -->
    <section id="viewLeaderboard" class="hidden flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <div class="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              <span>🏆 جدول برترین محاسبان mathgame</span>
            </h2>
            <p class="text-xs text-slate-400 mt-1">رده‌بندی کشوری و استانی بر مبنای بیشترین OPM و امتیاز ریتینگ Elo</p>
          </div>
          <button id="btnBackFromLeaderboard" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer">
            بازگشت
          </button>
        </div>

        <!-- Filters Row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">حالت مسابقه:</label>
            <select id="selLbMode" class="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500">
              <option value="all">همه حالت‌ها</option>
              <option value="blitz_30">حمله سرعتی (۳۰s)</option>
              <option value="blitz_60">حمله سرعتی (۶۰s)</option>
              <option value="sprint_20">دوی ۲۰ سوال</option>
              <option value="sprint_50">دوی ۵۰ سوال</option>
              <option value="dojo_tier1">ضرب‌خانه: جدول تک رقمی</option>
              <option value="dojo_tier2">ضرب‌خانه: اعداد ۱۱ تا ۱۹</option>
              <option value="dojo_tier3">ضرب‌خانه: دو رقمی در دو رقمی</option>
              <option value="survival">مرگ ناگهانی (Sudden Death)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">بازه زمانی:</label>
            <select id="selLbPeriod" class="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500">
              <option value="all">همه‌زمان‌ها (All-Time)</option>
              <option value="weekly">این هفته (Weekly)</option>
              <option value="today">امروز (Today)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 mb-1">استان / منطقه:</label>
            <select id="selLbProvince" class="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500">
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
        <div class="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-950 text-slate-400 border-b border-white/[0.06] font-medium">
              <tr>
                <th class="p-3.5 w-14 text-center">رتبه</th>
                <th class="p-3.5">نام کاربر</th>
                <th class="p-3.5 text-center">استان</th>
                <th class="p-3.5 text-center">ریتینگ ELO</th>
                <th class="p-3.5 text-center">سرعت (OPM)</th>
                <th class="p-3.5 text-center">دقت</th>
                <th class="p-3.5 text-center">مود</th>
              </tr>
            </thead>
            <tbody id="tblLeaderboardBody" class="divide-y divide-white/[0.04] font-mono">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>

      </div>

    </section>

    <!-- ============================================== -->
    <!-- SCREEN 5: USER ANALYTICS & DEEP DIVE -->
    <!-- ============================================== -->
    <section id="viewAnalytics" class="hidden flex flex-col gap-6 max-w-4xl mx-auto w-full py-4">
      
      <div class="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div class="flex items-center justify-between border-b border-white/[0.08] pb-5">
          <div>
            <h2 class="text-2xl font-black text-white">📊 پرونده جامع آنالیز و عیب‌یابی مغز در mathgame</h2>
            <p class="text-xs text-slate-400 mt-1">بررسی الگوهای کندی ذهن، گلوگاه‌های جدول ضرب و روند پیشرفت ریتینگ</p>
          </div>
          <button id="btnBackFromAnalytics" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer">
            بازگشت
          </button>
        </div>

        <div id="analyticsContent" class="space-y-6 my-6">
          <div class="text-center py-10 text-slate-400 text-sm">در حال دریافت داده‌های لبه...</div>
        </div>
      </div>

    </section>

  </main>

  <!-- MODAL: USER PROFILE & SETTINGS -->
  <div id="modalProfile" class="hidden fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="glass-card rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 border border-white/[0.12]">
      <div class="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <h3 class="font-bold text-base text-white flex items-center gap-2">
          <span>👤 تنظیمات حساب کاربری</span>
        </h3>
        <button id="btnCloseProfileModal" class="text-slate-400 hover:text-white text-lg">✕</button>
      </div>

      <div class="space-y-4 text-xs">
        <div>
          <label class="block font-semibold text-slate-300 mb-1.5">نام کاربری در رده‌بندی:</label>
          <input type="text" id="iptUsername" maxlength="20" placeholder="مثلاً: سهراب_محاسب" class="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-cyan-500">
        </div>

        <div>
          <label class="block font-semibold text-slate-300 mb-1.5">استان سکونت:</label>
          <select id="selProfileProvince" class="w-full bg-slate-950 border border-white/[0.1] rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-cyan-500">
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

        <div class="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.05] space-y-1.5">
          <div class="flex justify-between text-slate-400">
            <span>شناسه اختصاصی:</span>
            <span class="font-mono text-cyan-400" id="txtProfileUserId">usr_...</span>
          </div>
          <div class="flex justify-between text-slate-400">
            <span>ریتینگ ELO فعلی:</span>
            <span class="font-mono text-emerald-400 font-bold" id="txtProfileElo">1200 ELO</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end gap-2 pt-2">
        <button id="btnSaveProfile" class="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer">
          ذخیره تغییرات
        </button>
      </div>
    </div>
  </div>

  <!-- APPLICATION CORE JAVASCRIPT ENGINE -->
  <script type="module">
    // ==========================================
    // 1. STATE & CONSTANTS
    // ==========================================
    const PROVINCES = {
      tehran: 'تهران', isfahan: 'اصفهان', fars: 'فارس',
      khorasan_razavi: 'خراسان رضوی', east_azerbaijan: 'آذربایجان شرقی',
      khuzestan: 'خوزستان', gilan: 'گیلان', mazandaran: 'مازندران',
      alborz: 'البرز', kerman: 'کرمان', yazd: 'یزد', qom: 'قم', other: 'ایران'
    };

    const RANKS = [
      { minElo: 0, titleFa: 'تازه‌کار', color: '#94a3b8', badge: '🌱' },
      { minElo: 1100, titleFa: 'کارآموز', color: '#38bdf8', badge: '⚡' },
      { minElo: 1300, titleFa: 'محاسب برتر', color: '#34d399', badge: '🔥' },
      { minElo: 1500, titleFa: 'خبره محاسبات', color: '#fbbf24', badge: '💎' },
      { minElo: 1700, titleFa: 'استاد سرعت', color: '#f43f5e', badge: '👑' },
      { minElo: 1900, titleFa: 'گرندمستر ذهنی', color: '#a855f7', badge: '🪐' },
      { minElo: 2100, titleFa: 'نابغه ملی', color: '#ec4899', badge: '🏆' },
    ];

    function getRank(elo) {
      let current = RANKS[0];
      for (const r of RANKS) {
        if (elo >= r.minElo) current = r;
      }
      return current;
    }

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
        mode: 'blitz',
        subOption: '30',
        operators: { add: true, sub: true, mul: true, div: true, mod: false, pow: false },
        dojoTier: 1
      },
      pb: {
        blitz_30: 42.0,
        blitz_60: 45.0,
        sprint_20: 20000,
        sprint_50: 55000,
        survival: 25
      },
      activeRun: null,
      customWeaknessProblems: null
    };

    function loadLocal() {
      try {
        const u = localStorage.getItem('mathgame_user');
        if (u) {
          STATE.user = JSON.parse(u);
        } else {
          const rId = 'usr_' + Math.random().toString(36).substring(2, 10);
          const rNum = Math.floor(100 + Math.random() * 900);
          STATE.user = { id: rId, username: 'محاسب_' + rNum, province: 'tehran', elo: 1200 };
          saveLocal();
        }

        const s = localStorage.getItem('mathgame_settings');
        if (s) Object.assign(STATE.settings, JSON.parse(s));

        const p = localStorage.getItem('mathgame_pb');
        if (p) Object.assign(STATE.pb, JSON.parse(p));
      } catch (e) {
        console.warn('Storage read error:', e);
      }
    }

    function saveLocal() {
      try {
        localStorage.setItem('mathgame_user', JSON.stringify(STATE.user));
        localStorage.setItem('mathgame_settings', JSON.stringify(STATE.settings));
        localStorage.setItem('mathgame_pb', JSON.stringify(STATE.pb));
      } catch (e) {
        console.warn('Storage write error:', e);
      }
    }

    // ==========================================
    // 2. SYNTHETIC AUDIO & HAPTIC ENGINE
    // ==========================================
    let audioCtx = null;

    function unlockAudio() {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });

    function playTactileClick() {
      if (!STATE.settings.audio) return;
      try {
        unlockAudio();
        const now = audioCtx.currentTime;

        // Mechanical switch click transient
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.03);

        // Tactile micro haptic
        if (navigator.vibrate) navigator.vibrate(15);
      } catch (e) {}
    }

    function playErrorBuzz() {
      if (!STATE.settings.audio) return;
      try {
        unlockAudio();
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, now);
        osc.frequency.linearRampToValueAtTime(65, now + 0.14);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.17);

        if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
      } catch (e) {}
    }

    function playStreakChime(multiplier) {
      if (!STATE.settings.audio) return;
      try {
        unlockAudio();
        const now = audioCtx.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);
          gain.gain.setValueAtTime(0.2, now + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.2);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.22);
        });
      } catch (e) {}
    }

    // ==========================================
    // 3. ZERO-LAG PROBLEM GENERATOR
    // ==========================================
    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateProblem(config, customWeaknessList) {
      if (customWeaknessList && customWeaknessList.length > 0) {
        const picked = customWeaknessList[Math.floor(Math.random() * customWeaknessList.length)];
        return {
          a: picked.a,
          b: picked.b,
          op: picked.op,
          answer: picked.answer,
          expression: picked.expression || picked.problem,
          expectedLen: Math.abs(picked.answer).toString().length + (picked.answer < 0 ? 1 : 0),
          category: 'تمرین نقاط ضعف'
        };
      }

      if (config.mode === 'dojo') {
        const tier = config.dojoTier || 1;
        let a, b;
        if (tier === 1) { // 1x1 to 9x9
          a = rand(2, 9);
          b = rand(2, 9);
        } else if (tier === 2) { // 11x11 to 19x19 or squares
          if (Math.random() > 0.45) {
            a = rand(11, 19);
            b = rand(11, 19);
          } else {
            a = rand(11, 30);
            b = a;
          }
        } else if (tier === 3) { // World Cup: 2-digit x 2-digit
          a = rand(12, 99);
          b = rand(12, 99);
        } else {
          a = rand(2, 15);
          b = rand(2, 15);
        }

        const answer = a * b;
        return {
          a, b, op: '×', answer,
          expression: \`\${a} × \${b}\`,
          expectedLen: Math.abs(answer).toString().length + (answer < 0 ? 1 : 0),
          category: 'ضرب‌خانه تخصصی'
        };
      }

      const activeOps = [];
      if (config.operators.add) activeOps.push('+');
      if (config.operators.sub) activeOps.push('-');
      if (config.operators.mul) activeOps.push('×');
      if (config.operators.div) activeOps.push('÷');
      if (config.operators.mod) activeOps.push('%');
      if (config.operators.pow) activeOps.push('^2');

      if (activeOps.length === 0) activeOps.push('+');
      const op = activeOps[Math.floor(Math.random() * activeOps.length)];

      let a = 0, b = 0, answer = 0, expression = '', category = 'محاسبات پایه';

      switch (op) {
        case '+': {
          const r = Math.random();
          if (r < 0.4) {
            a = rand(2, 9); b = rand(2, 9);
          } else if (r < 0.8) {
            a = rand(12, 89); b = rand(6, 45);
          } else {
            a = rand(25, 95); b = rand(18, 98);
          }
          answer = a + b;
          expression = \`\${a} + \${b}\`;
          category = 'جمع';
          break;
        }
        case '-': {
          const r = Math.random();
          if (r < 0.4) {
            a = rand(5, 18); b = rand(2, a);
          } else {
            a = rand(25, 99); b = rand(12, a - 1);
          }
          answer = a - b;
          expression = \`\${a} − \${b}\`;
          category = 'تفریق';
          break;
        }
        case '×': {
          const r = Math.random();
          if (r < 0.65) {
            a = rand(2, 9); b = rand(2, 9);
          } else {
            a = rand(11, 19); b = rand(2, 9);
          }
          answer = a * b;
          expression = \`\${a} × \${b}\`;
          category = 'ضرب';
          break;
        }
        case '÷': {
          b = rand(2, 9);
          const quotient = rand(2, 12);
          a = b * quotient;
          answer = quotient;
          expression = \`\${a} ÷ \${b}\`;
          category = 'تقسیم';
          break;
        }
        case '%': {
          b = rand(3, 9);
          a = rand(10, 50);
          answer = a % b;
          expression = \`\${a} mod \${b}\`;
          category = 'باقیمانده';
          break;
        }
        case '^2': {
          a = rand(2, 25);
          b = 2;
          answer = a * a;
          expression = \`\${a}²\`;
          category = 'مربع کامل';
          break;
        }
      }

      return {
        a, b, op, answer, expression,
        expectedLen: Math.abs(answer).toString().length + (answer < 0 ? 1 : 0),
        category
      };
    }

    // ==========================================
    // 4. DOM REFS & BINDING
    // ==========================================
    const DOM = {
      viewHub: document.getElementById('viewHub'),
      viewRun: document.getElementById('viewRun'),
      viewSummary: document.getElementById('viewSummary'),
      viewLeaderboard: document.getElementById('viewLeaderboard'),
      viewAnalytics: document.getElementById('viewAnalytics'),
      modalProfile: document.getElementById('modalProfile'),

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
      badgeEdgeStatus: document.getElementById('badgeEdgeStatus'),
      txtEdgePoP: document.getElementById('txtEdgePoP'),
      badgeSyncQueue: document.getElementById('badgeSyncQueue'),
      txtSyncCount: document.getElementById('txtSyncCount'),

      btnHeroStart: document.getElementById('btnHeroStart'),
      btnHeroWeakness: document.getElementById('btnHeroWeakness'),
      btnEditProfilePencil: document.getElementById('btnEditProfilePencil'),
      cardUsername: document.getElementById('cardUsername'),
      cardElo: document.getElementById('cardElo'),
      cardRankName: document.getElementById('cardRankName'),
      cardRankIcon: document.getElementById('cardRankIcon'),
      cardProvince: document.getElementById('cardProvince'),
      cardBestPb: document.getElementById('cardBestPb'),
      lblModeActive: document.getElementById('lblModeActive'),
      subOptionsToolbar: document.getElementById('subOptionsToolbar'),
      modeTiles: document.querySelectorAll('.mode-tile'),

      chkOpAdd: document.getElementById('chkOpAdd'),
      chkOpSub: document.getElementById('chkOpSub'),
      chkOpMul: document.getElementById('chkOpMul'),
      chkOpDiv: document.getElementById('chkOpDiv'),
      chkOpMod: document.getElementById('chkOpMod'),
      chkOpPow: document.getElementById('chkOpPow'),
      btnPresetAll: document.getElementById('btnPresetAll'),
      btnPresetMulOnly: document.getElementById('btnPresetMulOnly'),
      btnPresetAddSub: document.getElementById('btnPresetAddSub'),
      toggleZenMode: document.getElementById('toggleZenMode'),
      toggleEnterMode: document.getElementById('toggleEnterMode'),

      hudTimer: document.getElementById('hudTimer'),
      hudOpm: document.getElementById('hudOpm'),
      hudStreak: document.getElementById('hudStreak'),
      hudMultiplier: document.getElementById('hudMultiplier'),
      hudCounter: document.getElementById('hudCounter'),
      hudProgressLabel: document.getElementById('hudProgressLabel'),
      txtGhostTarget: document.getElementById('txtGhostTarget'),
      txtGhostDelta: document.getElementById('txtGhostDelta'),
      barGhostFill: document.getElementById('barGhostFill'),

      problemContainer: document.getElementById('problemContainer'),
      txtProblemExpression: document.getElementById('txtProblemExpression'),
      txtUserInputEcho: document.getElementById('txtUserInputEcho'),
      boxInputDisplay: document.getElementById('boxInputDisplay'),
      lblProblemIndex: document.getElementById('lblProblemIndex'),
      lblOpCategory: document.getElementById('lblOpCategory'),
      btnAbortRun: document.getElementById('btnAbortRun'),
      btnSkipProblem: document.getElementById('btnSkipProblem'),

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
      btnShareSummary: document.getElementById('btnShareSummary'),
      btnReturnHub: document.getElementById('btnReturnHub'),

      selLbMode: document.getElementById('selLbMode'),
      selLbPeriod: document.getElementById('selLbPeriod'),
      selLbProvince: document.getElementById('selLbProvince'),
      tblLeaderboardBody: document.getElementById('tblLeaderboardBody'),
      btnBackFromLeaderboard: document.getElementById('btnBackFromLeaderboard'),

      analyticsContent: document.getElementById('analyticsContent'),
      btnBackFromAnalytics: document.getElementById('btnBackFromAnalytics'),

      btnCloseProfileModal: document.getElementById('btnCloseProfileModal'),
      iptUsername: document.getElementById('iptUsername'),
      selProfileProvince: document.getElementById('selProfileProvince'),
      txtProfileUserId: document.getElementById('txtProfileUserId'),
      txtProfileElo: document.getElementById('txtProfileElo'),
      btnSaveProfile: document.getElementById('btnSaveProfile')
    };

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

    function updateProfileCard() {
      const rank = getRank(STATE.user.elo);
      DOM.navUserName.textContent = STATE.user.username;
      DOM.navUserElo.textContent = STATE.user.elo + ' ELO';
      DOM.navUserBadge.textContent = rank.badge;

      DOM.cardUsername.textContent = STATE.user.username;
      DOM.cardElo.textContent = STATE.user.elo + ' ELO';
      DOM.cardRankName.textContent = rank.titleFa;
      DOM.cardRankIcon.textContent = rank.badge;
      DOM.cardProvince.textContent = PROVINCES[STATE.user.province] || 'تهران';
      DOM.cardBestPb.textContent = (STATE.pb['blitz_30'] || 40.0).toFixed(1) + ' OPM';

      DOM.iptUsername.value = STATE.user.username;
      DOM.selProfileProvince.value = STATE.user.province || 'tehran';
      DOM.txtProfileUserId.textContent = STATE.user.id;
      DOM.txtProfileElo.textContent = STATE.user.elo + ' ELO';
    }

    // ==========================================
    // 5. RUN ENGINE & ZERO-ALLOCATION 144Hz TICK
    // ==========================================
    let animFrameId = null;

    function startRun(customProblems = null) {
      const modeKey = \`\${STATE.config.mode}_\${STATE.config.subOption}\`;
      const targetPb = STATE.pb[modeKey] || 45.0;
      DOM.txtGhostTarget.textContent = (typeof targetPb === 'number' && targetPb < 120) ? targetPb.toFixed(1) + ' OPM' : '45.0 OPM';

      STATE.activeRun = {
        mode: modeKey,
        modeCategory: STATE.config.mode,
        subOption: STATE.config.subOption,
        targetPb,
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

      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = requestAnimationFrame(runLoopTick);
    }

    function runLoopTick(timestamp) {
      if (!STATE.activeRun) return;

      const run = STATE.activeRun;
      const elapsed = performance.now() - run.startTime;
      run.durationMs = elapsed;

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

      const minutes = elapsed / 60000;
      if (minutes > 0.008) {
        const liveOpm = (run.correctCount / minutes);
        DOM.hudOpm.textContent = liveOpm.toFixed(1);

        const expectedCount = (run.targetPb / 60) * (elapsed / 1000);
        const diff = run.correctCount - expectedCount;
        const fillPercent = Math.min(Math.max(50 + diff * 6, 5), 95);
        DOM.barGhostFill.style.width = fillPercent + '%';

        if (diff >= 0) {
          DOM.txtGhostDelta.textContent = \`+\${(diff * 1.1).toFixed(1)}s جلوتر\`;
          DOM.txtGhostDelta.className = 'text-emerald-400 font-bold';
        } else {
          DOM.txtGhostDelta.textContent = \`\${(diff * 1.1).toFixed(1)}s عقب‌تر\`;
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

      if (run.targetQuestions && run.correctCount >= run.targetQuestions) {
        endRun();
        return;
      }

      const problem = generateProblem(STATE.config, run.customProblemsQueue);
      run.currentProblem = problem;
      run.userTyped = '';
      run.lastProblemTime = performance.now();

      DOM.txtProblemExpression.textContent = problem.expression;
      DOM.txtUserInputEcho.textContent = '';
      DOM.lblProblemIndex.textContent = '#' + (run.totalAnswered + 1);
      DOM.lblOpCategory.textContent = problem.category;

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
      playTactileClick();

      // Zen Auto-submit
      if (STATE.settings.zenMode && !STATE.settings.enterMode) {
        // If length reached or matched
        if (run.userTyped.length >= run.currentProblem.expectedLen) {
          evaluateCurrentInput();
        }
      }
    }

    function evaluateCurrentInput() {
      if (!STATE.activeRun || !STATE.activeRun.currentProblem) return;
      const run = STATE.activeRun;
      const problem = run.currentProblem;
      const typedNum = parseInt(run.userTyped, 10);
      const now = performance.now();
      const latencyMs = Math.round(now - run.lastProblemTime);

      const isCorrect = (typedNum === problem.answer);
      run.totalAnswered++;

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

        DOM.problemContainer.classList.remove('anim-hit', 'anim-miss');
        void DOM.problemContainer.offsetWidth;
        DOM.problemContainer.classList.add('anim-hit');

        if (run.modeCategory === 'survival') {
          run.survivalRemainingMs = Math.min(run.survivalRemainingMs + 1500, 10000);
        }

        updateStreakDisplay(run.currentStreak);
        if (run.modeCategory === 'sprint') {
          DOM.hudCounter.textContent = \`\${run.correctCount} / \${run.targetQuestions}\`;
        } else {
          DOM.hudCounter.textContent = run.correctCount;
        }
        nextProblem();

      } else {
        run.wrongCount++;
        run.currentStreak = 0;

        DOM.problemContainer.classList.remove('anim-hit', 'anim-miss');
        void DOM.problemContainer.offsetWidth;
        DOM.problemContainer.classList.add('anim-miss');

        playErrorBuzz();
        updateStreakDisplay(0);

        if (run.modeCategory === 'survival') {
          endRun(\`باخت در چالش بقا! پاسخ شما: \${typedNum} | پاسخ درست: \${problem.answer}\`);
          return;
        }

        // Show brief red alert on input box then advance to keep flow fast
        DOM.boxInputDisplay.classList.remove('border-cyan-500/40', 'text-cyan-400');
        DOM.boxInputDisplay.classList.add('border-rose-500', 'text-rose-400');

        setTimeout(() => {
          if (STATE.activeRun) nextProblem();
        }, 160);
      }
    }

    function skipCurrentProblem() {
      if (!STATE.activeRun || !STATE.activeRun.currentProblem) return;
      const run = STATE.activeRun;
      run.totalAnswered++;
      run.wrongCount++;
      run.currentStreak = 0;
      updateStreakDisplay(0);
      playErrorBuzz();
      nextProblem();
    }

    function updateStreakDisplay(streak) {
      DOM.hudStreak.textContent = streak;
      let multText = 'x1';
      let multClass = 'text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300';

      if (streak >= 50) {
        multText = 'x5 MAX';
        multClass = 'text-xs font-mono font-black px-1.5 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300 flame-active';
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

    function endRun(customTitle = null) {
      if (!STATE.activeRun) return;
      if (animFrameId) cancelAnimationFrame(animFrameId);

      const run = STATE.activeRun;
      STATE.activeRun = null;

      const elapsedMs = Math.round(performance.now() - run.startTime);
      const minutes = elapsedMs / 60000;
      const opm = minutes > 0 ? parseFloat((run.correctCount / minutes).toFixed(1)) : 0;
      const accuracy = run.totalAnswered > 0 ? parseFloat(((run.correctCount / run.totalAnswered) * 100).toFixed(1)) : 0;

      if (run.modeCategory === 'blitz' && opm > (STATE.pb[run.mode] || 0)) {
        STATE.pb[run.mode] = opm;
        saveLocal();
        updateProfileCard();
      }

      DOM.sumTitle.textContent = customTitle || 'پایان مسابقه mathgame';
      DOM.sumOpm.textContent = opm.toFixed(1);
      DOM.sumAccuracy.textContent = accuracy + '%';
      DOM.sumDuration.textContent = (elapsedMs / 1000).toFixed(1) + 's';
      DOM.sumMaxStreak.textContent = run.maxStreak;

      renderHistogram(run.telemetry);
      const bottlenecks = analyzeBottlenecks(run.telemetry);
      renderBottlenecks(bottlenecks);

      showScreen('summary');

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
        { key: '<300ms', label: 'زیر ۳۰۰ms', color: 'bg-emerald-400' },
        { key: '300-500ms', label: '۳۰۰-۵۰۰ms', color: 'bg-cyan-400' },
        { key: '500-800ms', label: '۵۰۰-۸۰۰ms', color: 'bg-amber-400' },
        { key: '800-1200ms', label: '۸۰۰-۱۲۰۰ms', color: 'bg-orange-400' },
        { key: '>1200ms', label: 'بالای ۱.۲s', color: 'bg-rose-400' }
      ];

      labels.forEach(b => {
        const count = bins[b.key] || 0;
        const heightPct = Math.round((count / maxCount) * 80);
        const col = document.createElement('div');
        col.className = 'flex-1 flex flex-col items-center justify-end h-full gap-1.5';
        col.innerHTML = \`
          <span class="text-[10px] font-mono text-slate-300 font-bold">\${count}</span>
          <div class="w-full \${b.color} rounded-t-lg transition-all duration-300 shadow-lg" style="height: \${Math.max(heightPct, 6)}%"></div>
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
            problem: key, a: t.a, b: t.b, op: t.op, answer: t.answer,
            totalLatency: 0, count: 0, errors: 0
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
        card.className = \`p-3.5 rounded-2xl bg-slate-950/80 border \${isSlow ? 'border-amber-700/50' : 'border-white/[0.06]'} flex items-center justify-between\`;
        card.innerHTML = \`
          <div>
            <div class="num-font text-base font-bold text-white">\${b.problem} = \${b.answer}</div>
            <div class="text-[10px] text-slate-400">\${b.errors > 0 ? \`\${b.errors} بار اشتباه\` : 'بدون خطا'}</div>
          </div>
          <div class="text-right">
            <span class="num-font text-sm font-bold \${isSlow ? 'text-amber-400' : 'text-slate-300'}">\${b.avgLatency}ms</span>
            <div class="text-[9px] text-slate-400">میانگین</div>
          </div>
        \`;
        DOM.boxBottlenecks.appendChild(card);
      });

      STATE.customWeaknessProblems = bottlenecks;
    }

    // ==========================================
    // 6. API CLIENT & OFFLINE QUEUE
    // ==========================================
    async function submitRunPayload(payload) {
      if (!navigator.onLine) {
        queueOfflineRun(payload);
        DOM.sumEloChange.textContent = \`ذخیره شد (آفلاین) - \${STATE.user.elo} ELO\`;
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
            saveLocal();
            updateProfileCard();

            const deltaText = data.delta >= 0 ? \`+\${data.delta}\` : \`\${data.delta}\`;
            DOM.sumEloChange.textContent = \`\${deltaText} (\${data.newElo} ELO)\`;
            if (data.rank) {
              DOM.sumRankBadge.textContent = data.rank.badge;
            }
          }
        } else {
          queueOfflineRun(payload);
        }
      } catch (err) {
        queueOfflineRun(payload);
      }
    }

    function queueOfflineRun(payload) {
      try {
        const queue = JSON.parse(localStorage.getItem('mathgame_offline_queue') || '[]');
        payload.id = 'run_' + Math.random().toString(36).substring(2, 12);
        queue.push(payload);
        localStorage.setItem('mathgame_offline_queue', JSON.stringify(queue));
        updateSyncQueueStatus();
      } catch (e) {}
    }

    async function syncOfflineQueue() {
      try {
        const queue = JSON.parse(localStorage.getItem('mathgame_offline_queue') || '[]');
        if (queue.length === 0) return;

        const res = await fetch('/api/runs/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ runs: queue })
        });

        if (res.ok) {
          localStorage.removeItem('mathgame_offline_queue');
          updateSyncQueueStatus();
        }
      } catch (e) {}
    }

    function updateSyncQueueStatus() {
      try {
        const queue = JSON.parse(localStorage.getItem('mathgame_offline_queue') || '[]');
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
    // 7. LEADERBOARDS & ANALYTICS
    // ==========================================
    async function loadLeaderboard() {
      const mode = DOM.selLbMode.value;
      const period = DOM.selLbPeriod.value;
      const province = DOM.selLbProvince.value;

      DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">در حال دریافت برترین‌های کلودفلر...</td></tr>';

      try {
        const query = new URLSearchParams({ mode, period, province }).toString();
        const res = await fetch(\`/api/leaderboard?\${query}\`);
        if (res.ok) {
          const list = await res.json();
          renderLeaderboardTable(list);
        } else {
          DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">خطا در بارگذاری جدول</td></tr>';
        }
      } catch (e) {
        DOM.tblLeaderboardBody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400">عدم برقراری ارتباط با سرور لبه (حالت آفلاین)</td></tr>';
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
        tr.className = index < 3 ? 'bg-cyan-950/20 hover:bg-cyan-950/40 transition' : 'hover:bg-slate-900/40 transition';
        
        let rankBadge = \`#\${index + 1}\`;
        if (index === 0) rankBadge = '🥇 ۱';
        else if (index === 1) rankBadge = '🥈 ۲';
        else if (index === 2) rankBadge = '🥉 ۳';

        const prov = PROVINCES[item.province] || item.province || 'ایران';

        tr.innerHTML = \`
          <td class="p-3.5 text-center font-bold text-white">\${rankBadge}</td>
          <td class="p-3.5 font-bold text-slate-100 flex items-center gap-2">
            <span>\${item.username || 'محاسب ناشناس'}</span>
          </td>
          <td class="p-3.5 text-center text-slate-400">\${prov}</td>
          <td class="p-3.5 text-center text-cyan-400 font-bold">\${item.elo_rating || 1200}</td>
          <td class="p-3.5 text-center text-emerald-400 font-bold">\${item.opm.toFixed(1)}</td>
          <td class="p-3.5 text-center text-slate-300">\${item.accuracy.toFixed(0)}%</td>
          <td class="p-3.5 text-center text-slate-400 text-[11px]">\${item.mode}</td>
        \`;
        DOM.tblLeaderboardBody.appendChild(tr);
      });
    }

    async function loadUserAnalytics() {
      DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">در حال تحلیل تله‌متری...</div>';
      try {
        const res = await fetch(\`/api/user/analytics?user_id=\${STATE.user.id}\`);
        if (res.ok) {
          const data = await res.json();
          renderAnalyticsScreen(data);
        } else {
          DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">ابتدا چند مسابقه را به پایان برسانید تا پرونده شما تشکیل شود!</div>';
        }
      } catch (e) {
        DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">خطا در دریافت پرونده آنالیز</div>';
      }
    }

    function renderAnalyticsScreen(data) {
      if (!data || !data.topWeaknesses) {
        DOM.analyticsContent.innerHTML = '<div class="text-center py-10 text-slate-400">داده‌ای یافت نشد.</div>';
        return;
      }

      let html = \`
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] text-center">
            <div class="text-xs text-slate-400">تعداد مسابقات آنالیز شده</div>
            <div class="num-font text-3xl font-black text-cyan-400 mt-1">\${data.recentRunsCount}</div>
          </div>
          <div class="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] text-center">
            <div class="text-xs text-slate-400">کل معادلات ارزیابی‌شده</div>
            <div class="num-font text-3xl font-black text-emerald-400 mt-1">\${data.totalProblemsAnalyzed}</div>
          </div>
          <div class="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.06] text-center">
            <div class="text-xs text-slate-400">ریتینگ ELO فعلی</div>
            <div class="num-font text-3xl font-black text-violet-400 mt-1">\${data.user?.elo_rating || STATE.user.elo}</div>
          </div>
        </div>

        <div class="space-y-3 mt-6">
          <h3 class="font-bold text-sm text-white">کندترین فکت‌ها و گلوگاه‌های محاسباتی شما:</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      \`;

      data.topWeaknesses.forEach(w => {
        html += \`
          <div class="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] flex items-center justify-between">
            <div>
              <div class="num-font text-lg font-bold text-white">\${w.problem}</div>
              <div class="text-xs text-slate-400 mt-0.5">\${w.attempts} تکرار - \${w.errorRate}% خطا</div>
            </div>
            <div class="text-right">
              <span class="num-font text-base font-bold text-amber-400">\${w.avgLatency}ms</span>
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
    // 8. EVENT BINDINGS & KEYBOARD MAPPING
    // ==========================================
    const PERSIAN_DIGIT_MAP = {
      '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
      '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
      '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
      '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
      '−': '-', '-': '-'
    };

    window.addEventListener('keydown', (e) => {
      // Space to start run from Hub
      if (e.code === 'Space' && !DOM.viewHub.classList.contains('hidden') && DOM.modalProfile.classList.contains('hidden')) {
        e.preventDefault();
        startRun();
        return;
      }

      // Space to skip problem in run
      if (e.code === 'Space' && STATE.activeRun) {
        e.preventDefault();
        skipCurrentProblem();
        return;
      }

      if (e.key === 'Escape') {
        if (STATE.activeRun) {
          endRun();
          showScreen('hub');
        }
        DOM.modalProfile.classList.add('hidden');
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

      let char = e.key;
      if (PERSIAN_DIGIT_MAP[char] !== undefined) {
        char = PERSIAN_DIGIT_MAP[char];
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
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const val = btn.getAttribute('data-val');
        handleInputDigit(val);
      });
    });

    // Mode Tiles click
    DOM.modeTiles.forEach(tile => {
      tile.addEventListener('click', () => {
        const mode = tile.getAttribute('data-mode');
        selectMode(mode);
      });
    });

    function selectMode(mode) {
      STATE.config.mode = mode;
      DOM.modeTiles.forEach(t => {
        if (t.getAttribute('data-mode') === mode) {
          t.className = 'mode-tile cursor-pointer glass-card glass-interactive rounded-2xl p-5 flex flex-col justify-between ring-2 ring-cyan-500 bg-slate-900/90';
        } else {
          t.className = 'mode-tile cursor-pointer glass-card glass-interactive rounded-2xl p-5 flex flex-col justify-between';
        }
      });
      renderSubOptions(mode);
    }

    function renderSubOptions(mode) {
      DOM.subOptionsToolbar.innerHTML = '';

      if (mode === 'blitz') {
        DOM.lblModeActive.textContent = 'حمله سرعتی (Time Attack)';
        DOM.subOptionsToolbar.innerHTML = \`
          <button class="sub-btn px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-700 text-xs font-mono text-cyan-300 font-bold active" data-sub="30">۳۰s</button>
          <button class="sub-btn px-3 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300 font-bold" data-sub="60">۶۰s</button>
          <button class="sub-btn px-3 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300 font-bold" data-sub="120">۱۲۰s</button>
        \`;
        STATE.config.subOption = '30';
      } else if (mode === 'sprint') {
        DOM.lblModeActive.textContent = 'دوی هدفی (Target Sprint)';
        DOM.subOptionsToolbar.innerHTML = \`
          <button class="sub-btn px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-700 text-xs font-mono text-emerald-300 font-bold active" data-sub="20">۲۰ سوال</button>
          <button class="sub-btn px-3 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300 font-bold" data-sub="50">۵۰ سوال</button>
          <button class="sub-btn px-3 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300 font-bold" data-sub="100">۱۰۰ سوال</button>
        \`;
        STATE.config.subOption = '20';
      } else if (mode === 'dojo') {
        DOM.lblModeActive.textContent = 'ضرب‌خانه تخصصی (Multiplication Dojo)';
        DOM.subOptionsToolbar.innerHTML = \`
          <select id="selDojoTier" class="bg-slate-950 border border-white/[0.1] rounded-lg px-2.5 py-1 text-xs text-amber-300 font-bold">
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
        DOM.lblModeActive.textContent = 'مرگ ناگهانی (Sudden Death)';
        DOM.subOptionsToolbar.innerHTML = \`
          <span class="text-xs text-rose-400 font-mono font-bold">شروع: ۵ ثانیه | ۱ خطا = باخت</span>
        \`;
        STATE.config.subOption = 'survival';
      }

      DOM.subOptionsToolbar.querySelectorAll('.sub-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          DOM.subOptionsToolbar.querySelectorAll('.sub-btn').forEach(b => {
            b.className = 'sub-btn px-3 py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300 font-bold';
          });
          btn.className = 'sub-btn px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-700 text-xs font-mono text-cyan-300 font-bold active';
          STATE.config.subOption = btn.getAttribute('data-sub');
        });
      });
    }

    // Operator Checkboxes
    DOM.chkOpAdd.addEventListener('change', (e) => STATE.config.operators.add = e.target.checked);
    DOM.chkOpSub.addEventListener('change', (e) => STATE.config.operators.sub = e.target.checked);
    DOM.chkOpMul.addEventListener('change', (e) => STATE.config.operators.mul = e.target.checked);
    DOM.chkOpDiv.addEventListener('change', (e) => STATE.config.operators.div = e.target.checked);
    DOM.chkOpMod.addEventListener('change', (e) => STATE.config.operators.mod = e.target.checked);
    DOM.chkOpPow.addEventListener('change', (e) => STATE.config.operators.pow = e.target.checked);

    // Operator Presets
    DOM.btnPresetAll.addEventListener('click', () => {
      setOpCheckboxes(true, true, true, true, true, true);
    });
    DOM.btnPresetMulOnly.addEventListener('click', () => {
      setOpCheckboxes(false, false, true, false, false, false);
    });
    DOM.btnPresetAddSub.addEventListener('click', () => {
      setOpCheckboxes(true, true, false, false, false, false);
    });

    function setOpCheckboxes(add, sub, mul, div, mod, pow) {
      DOM.chkOpAdd.checked = add; STATE.config.operators.add = add;
      DOM.chkOpSub.checked = sub; STATE.config.operators.sub = sub;
      DOM.chkOpMul.checked = mul; STATE.config.operators.mul = mul;
      DOM.chkOpDiv.checked = div; STATE.config.operators.div = div;
      DOM.chkOpMod.checked = mod; STATE.config.operators.mod = mod;
      DOM.chkOpPow.checked = pow; STATE.config.operators.pow = pow;
    }

    DOM.toggleZenMode.addEventListener('change', (e) => {
      STATE.settings.zenMode = e.target.checked;
      saveLocal();
    });
    DOM.toggleEnterMode.addEventListener('change', (e) => {
      STATE.settings.enterMode = e.target.checked;
      saveLocal();
    });

    DOM.btnAudioToggle.addEventListener('click', () => {
      STATE.settings.audio = !STATE.settings.audio;
      DOM.iconAudio.textContent = STATE.settings.audio ? '🔊' : '🔇';
      saveLocal();
    });

    DOM.btnLangToggle.addEventListener('click', () => {
      const isFa = document.documentElement.lang === 'fa';
      if (isFa) {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        DOM.btnLangToggle.textContent = 'FA';
        DOM.txtHeaderSubtitle.textContent = 'Ultra-low Latency Mental Math Speedrunning';
      } else {
        document.documentElement.lang = 'fa';
        document.documentElement.dir = 'rtl';
        DOM.btnLangToggle.textContent = 'EN';
        DOM.txtHeaderSubtitle.textContent = 'لیگ محاسبات ذهنی سریع ایران';
      }
    });

    // Profile Modal
    DOM.btnOpenProfile.addEventListener('click', () => DOM.modalProfile.classList.remove('hidden'));
    DOM.btnEditProfilePencil.addEventListener('click', () => DOM.modalProfile.classList.remove('hidden'));
    DOM.btnCloseProfileModal.addEventListener('click', () => DOM.modalProfile.classList.add('hidden'));

    DOM.btnSaveProfile.addEventListener('click', async () => {
      const n = DOM.iptUsername.value.trim();
      const p = DOM.selProfileProvince.value;
      if (n) {
        STATE.user.username = n;
        STATE.user.province = p;
        saveLocal();
        updateProfileCard();

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

    // Start Actions
    DOM.btnHeroStart.addEventListener('click', () => startRun());
    DOM.btnHeroWeakness.addEventListener('click', () => {
      if (STATE.customWeaknessProblems && STATE.customWeaknessProblems.length > 0) {
        startRun(STATE.customWeaknessProblems);
      } else {
        startRun();
      }
    });
    DOM.btnPlayAgain.addEventListener('click', () => startRun());
    DOM.btnTrainWeaknessNow.addEventListener('click', () => {
      if (STATE.customWeaknessProblems && STATE.customWeaknessProblems.length > 0) {
        startRun(STATE.customWeaknessProblems);
      } else {
        startRun();
      }
    });
    DOM.btnReturnHub.addEventListener('click', () => showScreen('hub'));
    DOM.btnAbortRun.addEventListener('click', () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      STATE.activeRun = null;
      showScreen('hub');
    });
    DOM.btnSkipProblem.addEventListener('click', () => skipCurrentProblem());

    // Share summary
    DOM.btnShareSummary.addEventListener('click', () => {
      const text = \`⚡ رکورد جدید من در mathgame:\\n🔥 سرعت: \${DOM.sumOpm.textContent} OPM\\n🎯 دقت: \${DOM.sumAccuracy.textContent}\\n💎 ریتینگ ELO: \${STATE.user.elo}\\n🇮🇷 رده‌بندی استان \${PROVINCES[STATE.user.province] || 'ایران'}\`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        DOM.btnShareSummary.textContent = '✅ کپی شد!';
        setTimeout(() => DOM.btnShareSummary.textContent = '📋 اشتراک‌گذاری رکورد', 2000);
      }
    });

    // Nav
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

    window.addEventListener('online', () => {
      DOM.txtEdgePoP.textContent = 'لبه کلودفلر (Online)';
      DOM.badgeEdgeStatus.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/[0.08] text-emerald-400';
      syncOfflineQueue();
    });
    window.addEventListener('offline', () => {
      DOM.txtEdgePoP.textContent = 'حافظه آفلاین (Offline)';
      DOM.badgeEdgeStatus.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/[0.08] text-amber-400';
    });

    async function checkEdgePoP() {
      try {
        const res = await fetch('/api/health');
        if (res.ok) {
          const info = await res.json();
          if (info.colo) {
            DOM.txtEdgePoP.textContent = \`لبه \${info.colo}\`;
          }
        }
      } catch (e) {}
    }

    // Init
    loadLocal();
    updateProfileCard();
    selectMode('blitz');
    updateSyncQueueStatus();
    checkEdgePoP();

    if (navigator.onLine) {
      syncOfflineQueue();
    }
  </script>
</body>
</html>`;
}
