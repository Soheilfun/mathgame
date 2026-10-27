# ⚡ mathgame
### پلتفرم مسابقات محاسبات ذهنی سریع ایران روی لبه کلودفلر
> **Ultra-Low Latency Mental Math Speedrunning, Operator Drills & Real-Time Leaderboards on Cloudflare Workers & Cloudflare D1**

- **تاریخ انتشار و به‌روزرسانی:** 2026-10-28
- **شناسه دیتابیس کلودفلر D1:** `96c66abc-1aba-4250-97b1-f18220209b47`
- **نام سرویس و ورکر:** `mathgame`

---

## 🇮🇷 ویژگی‌های اختصاصی نسخه ایرانی (Iranian Localization & UX)
- **پشتیبانی کامل و پیش‌فرض از زبان فارسی:** رابط کاربری کاملاً راست‌چین (RTL) با تایپوگرافی رسمی قلم **وزیرمتن (Vazirmatn)** به همراه فونت‌های مونو اسپیس (`JetBrains Mono`).
- **تبدیل خودکار ارقام فارسی کیبورد:** تبدیل بی‌درنگ کلیدهای فارسی (`۰۱۲۳۴۵۶۷۸۹` و `٠١٢٣٤٥٦٧٨٩`) بدون وقفه و بدون نیاز به تعویض زبان کیبورد.
- **رده‌بندی استانی و کشوری:** امکان فیلتر لیدربرد بر اساس استان‌های ایران (تهران، اصفهان، فارس، خراسان رضوی، آذربایجان شرقی، خوزستان، گیلان و...).
- **مود Zen بدون نیاز به اینتر:** ارسال خودکار پاسخ به محض تکمیل طول رقم پاسخ معادله، با کاهش تأخیر ورودی به صفر میلی‌ثانیه.

---

## 🏗️ مشخصات معماری و زیرساخت لبه (Cloudflare Infrastructure)
- **Runtime:** **Cloudflare Workers** (اجرای فوق سریع روی لبه بدون سربار Cold-Start).
- **Database:** **Cloudflare D1** (شناسه: `96c66abc-1aba-4250-97b1-f18220209b47`).
- **Frontend:** اپلیکیشن تک‌صفحه‌ای (SPA) خودکفا به زبان Vanilla JS (ES Modules) و Tailwind CSS بهینه‌سازی‌شده برای نرخ نوسازی **120Hz/144Hz** با بروزرسانی‌های Zero-Allocation DOM.
- **مقاومت آفلاین (Offline-First):** ذخیره‌سازی لوکال در `LocalStorage`، نگهداری صف اجراهای آفلاین و همگام‌سازی خودکار دسته‌ای (`Batch Sync`) به محض اتصال به اینترنت.
- **موتور صوتی مصنوعی (Web Audio API):** شبیه‌سازی صدای سوییچ کیبورد مکانیکی (Cherry MX Blue) برای کلیک‌های صحیح و بوق بم برای خطاها، بدون دانلود فایل صوتی اضافه.

---

## 🎮 حالت‌های بازی (Game Modes)
1. **حمله سرعتی (Speed Blitz):** بازه‌های زمانی ثابت (۳۰ ثانیه، ۶۰ ثانیه، ۱۲۰ ثانیه).
2. **دوی سرعتی (Target Sprint):** حل ۲۰، ۵۰ یا ۱۰۰ معادله با ثبت میلی‌ثانیه‌ای زمان کل.
3. **ضرب‌خانه تخصصی (Multiplication Dojo):**
   - سطح ۱: جدول تک‌رقمی ($1 \times 1$ تا $9 \times 9$)
   - سطح ۲: اعداد ۱۱ تا ۱۹ و توان‌های ۲ ($11 \times 11$ تا $19 \times 19$ و مجذورها تا ۳۰)
   - سطح ۳: تمرینات مسابقات جهانی محاسبات ذهنی ($10\text{--}99 \times 10\text{--}99$)
   - سطح ۴: محدوده کاملاً سفارشی برای عملوند A و B
4. **چالش بقا (Sudden Death):** شروع با ۵.۰ ثانیه؛ هر پاسخ درست $+1.5\text{s}$ زمان اضافه می‌کند (حداکثر ۱۰ ثانیه)؛ ۱ خطا مساوی است با پایان بلافاصله بازی.
5. **ماتریس عملگرها:** گزینه‌های تفکیک‌شده برای فعال/غیرفعال‌سازی جمع ($+$)، تفریق ($-$)، ضرب ($\times$)، تقسیم صحیح ($\div$)، باقیمانده ($\%$) و توان‌های ۲ و ۳ ($x^2, x^3$).

---

## 📊 ساختار دیتابیس D1 (Schema)
```sql
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
  details_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_runs_mode_opm ON runs(mode, opm DESC);
CREATE INDEX IF NOT EXISTS idx_users_elo ON users(elo_rating DESC);
CREATE INDEX IF NOT EXISTS idx_runs_user ON runs(user_id);
CREATE INDEX IF NOT EXISTS idx_runs_created_at ON runs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_province ON users(province);
```

---

## 🚀 راهنمای راه‌اندازی و دیپلوی (Deployment & Local Dev)

### ۱. اجرای لوکال با دیتابیس D1 شبیه‌سازی‌شده:
```bash
# رفتن به پوشه پروژه
cd f:\code\mathgame

# نصب وابستگی‌ها
npm install

# اجرای مایگریشن اولیه اسکیما روی D1 لوکال
npm run d1:init:local

# اجرای تست‌های یکپارچگی (Anti-cheat, Elo, Worker Routes)
npm test

# اجرای سرور توسعه دهنده لوکال
npm run dev
```
سپس مرورگر خود را باز کرده و به آدرس `http://localhost:8787` بروید.

---

### ۲. استقرار روی دیتابیس اختصاصی کلودفلر:
شناسه دیتابیس شما قبلاً تنظیم شده است: `96c66abc-1aba-4250-97b1-f18220209b47`

```bash
# اجرای اسکیما روی دیتابیس ابری
npm run d1:init:remote

# دیپلوی ورکر روی لبه جهانی کلودفلر
npm run deploy
```
