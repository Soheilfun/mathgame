# ⚡ ذهن‌برتر (ZehnBarter) | MathArcade IR
### لیگ محاسبات ذهنی سریع ایران و دریل‌های رقابتی لبه کلودفلر
> **Ultra-Low Latency Mental Math Speedrunning, Operator Drills & Real-Time Leaderboards on Cloudflare Workers & Cloudflare D1**

---

## 🇮🇷 ویژگی‌های اختصاصی نسخه ایرانی (Iranian Localization & UX)
- **پشتیبانی کامل و پیش‌فرض از زبان فارسی:** رابط کاربری کاملاً راست‌چین (RTL) با تایپوگرافی چشم‌نواز قلم رسمی **وزیرمتن (Vazirmatn)** و فونت‌های مونو اسپیس با دقت بالا (`JetBrains Mono`).
- **تبدیل خودکار ارقام فارسی کیبورد:** تبدیل بی‌درنگ کلیدهای فارسی (`۰۱۲۳۴۵۶۷۸۹` و `٠١٢٣٤٥٦٧٨٩`) بدون وقفه و بدون نیاز به تعویض زبان کیبورد.
- **رده‌بندی استانی و کشوری:** امکان فیلتر لیدربرد بر اساس استان‌های ایران (تهران، اصفهان، فارس، خراسان رضوی، آذربایجان شرقی، خوزستان، گیلان و...).
- **مود Zen بدون نیاز به اینتر:** ارسال خودکار پاسخ به محض تکمیل طول رقم پاسخ معادله، با کاهش تأخیر ورودی به صفر میلی‌ثانیه.

---

## 🏗️ مشخصات معماری و زیرساخت لبه (Cloudflare Infrastructure)
- **Runtime:** **Cloudflare Workers** (اجرای فوق سریع روی لبه بدون سربار Cold-Start).
- **Database:** **Cloudflare D1** (دیتابیس SQLite توزیع‌شده در لبه شبکه) برای ذخیره‌سازی لیدربردها، ریتینگ Elo و تله‌متری دقیق هر دور بازی.
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

## 🛡️ سیستم ضدتقلب و ریتینگ Elo (Competitive Engine)
- **سیستم پویای Elo:** محاسبه وزن سختی هر معادله (تک‌رقمی تا دورقمی) و تعدیل ریتینگ بر مبنای سرعت (OPM)، دقت و ضریب خطا.
- **فیلتر ضدتقلب لبه (Anti-Cheat Engine):**
  - اعتبارسنجی فیزیولوژیکی حداقل زمان واکنش انسان ($< 110\text{ms}$ مسدود می‌شود).
  - راستی‌آزمایی ریاضی جواب‌ها در برابر عملگرها در بک‌اند کلودفلر.
  - شناسایی رفتار بات و اسکریپت با تحلیل انحراف معیار تأخیرهای یکنواخت ($\sigma < 6\text{ms}$).
- **تحلیل نقاط ضعف (Weakness Heatmap):**
  - هیستوگرام توزیع پاسخ‌دهی در مقیاس میلی‌ثانیه ($<300\text{ms}, 300\text{--}500\text{ms}, ...$)
  - تشخیص گلوگاه‌های محاسباتی (مانند $7 \times 8$ با میانگین تاخیر بالا)
  - کلید **«تمرین نقاط ضعف»** برای شروع فوری تمرین متمرکز بر سوالات کند یا اشتباه کاربر.

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

### ۲. استقرار روی کلودفلر واقعی (Cloudflare Production Deploy):
```bash
# ایجاد دیتابیس D1 در اکانت کلودفلر
npx wrangler d1 create zehnbarter_db

# شناسه database_id برگشتی را در wrangler.jsonc و wrangler.toml جایگزین کنید.

# اجرای اسکیما روی دیتابیس ابری
npm run d1:init:remote

# دیپلوی ورکر روی لبه جهانی کلودفلر
npm run deploy
```

---

## 📁 ساختار فایل‌های پروژه
```text
f:\code\mathgame\
├── package.json               # اسکریپت‌ها و وابستگی‌های wrangler
├── wrangler.jsonc             # پیکربندی پیشرفته Cloudflare Workers و اتصال D1
├── wrangler.toml              # پیکربندی استاندارد Workers
├── schema.sql                 # جدول‌ها و ایندکس‌های دیتابیس Cloudflare D1
├── .gitignore                 # نادیده گرفتن node_modules و state
├── src\
│   ├── index.js               # نقطه ورودی ورکر لبه، مسیرهای API، اعتبارسنجی
│   ├── db.js                  # تعامل با D1 و کوئری‌های بهینه لیدربرد
│   ├── anti-cheat.js          # موتور راستی‌آزمایی تله‌متری و شناسایی بات
│   ├── elo.js                 # الگوریتم ریتینگ پویا بر اساس دقت و OPM
│   └── views\
│       └── app.html.js        # تک‌صفحه‌ای اختصاصی فوق سریع با تم ارکید و وزیرمتن
└── test\
    └── local-sim.js           # مجموعه تست‌های یکپارچه‌سازی و سنجش الگوریتم‌ها
```
