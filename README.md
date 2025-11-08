# 🛒 Konstovar - Kantselyariya Mahsulotlari Do'koni

Modern va professional kantselyariya mahsulotlari onlayn do'koni. Backend va Frontend alohida ajratilgan, Docker bilan ishga tushirishga tayyor.

## 📁 Loyiha Strukturasi

```
konstovar/
├── backend/              # PHP API (Backend)
│   ├── products.php      # Mahsulotlar API
│   ├── orders.php        # Buyurtmalar API
│   ├── usres.php         # Foydalanuvchilar API
│   ├── analytics.php     # Analitika API
│   ├── db-config.php     # Database konfiguratsiyasi
│   ├── database.sql      # Database strukturasi
│   └── .htaccess         # API routing
│
├── frontend/             # HTML/CSS/JS (Frontend)
│   ├── index.html        # Asosiy sahifa
│   ├── admin.html        # Admin panel
│   ├── script.js         # Frontend logika
│   ├── admin-script.js   # Admin logika
│   ├── styles.css        # Asosiy stillar
│   ├── admin-styles.css  # Admin stillar
│   └── img/              # Rasmlar
│
├── docker/               # Docker konfiguratsiya
│   ├── Dockerfile        # PHP image
│   ├── docker-compose.yml # Xizmatlar
│   └── .dockerignore     # Ignore fayllar
│
├── docs/                 # Hujjatlar
│   ├── README.md         # Asosiy qo'llanma
│   ├── DOCKER.md         # Docker haqida
│   ├── BOSHLASH.md       # Boshlang'ich qo'llanma
│   ├── USTOZ_UCHUN.md    # O'qituvchilar uchun
│   └── QISQA_QOLLANMA.txt # Qisqa ko'rsatma
│
├── docker-compose.yml    # Docker Compose (root)
├── .env.example          # Environment o'zgaruvchilar namunasi
├── .gitignore            # Git ignore
└── Makefile              # Qulaylik buyruqlari
```

## 🚀 Tez Boshlash

### **1. Docker bilan (Tavsiya etiladi)**

```bash
# Repository'ni clone qiling
git clone https://github.com/husniddin-sheyx/Konstovar.git
cd Konstovar

# Docker containerlarni ishga tushiring
docker-compose up -d

# Brauzerda oching
# Asosiy sayt: http://localhost:8080
# Admin panel: http://localhost:8080/admin.html
# PHPMyAdmin: http://localhost:8081
```

### **2. XAMPP bilan (Alternativ)**

1. XAMPP o'rnating va ishga tushiring
2. Loyihani `htdocs` papkasiga ko'chiring
3. `backend/database.sql` ni import qiling
4. `backend/db-config.php` da database ma'lumotlarini sozlang
5. Brauzerda `http://localhost/konstovar/frontend/` ni oching

## 🔧 Texnologiyalar

### Backend:
- **PHP 8.1** - Server-side dasturlash
- **MySQL 8.0** - Database
- **REST API** - API arxitekturasi

### Frontend:
- **HTML5** - Markup
- **CSS3** - Styling (Flexbox, Grid, Animations)
- **JavaScript (ES6+)** - Client-side logika
- **Fetch API** - Backend bilan aloqa

### DevOps:
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Apache** - Web server
- **PHPMyAdmin** - Database boshqaruvi

## 🎯 Asosiy Funksiyalar

### Foydalanuvchilar uchun:
- ✅ Mahsulotlarni ko'rish va qidirish
- ✅ Kategoriya bo'yicha filtrlash
- ✅ Savatga qo'shish
- ✅ Ro'yxatdan o'tish (majburiy)
- ✅ Buyurtma berish
- ✅ Sevimlilar va taqqoslash
- ✅ Responsive dizayn

### Admin panel:
- ✅ Mahsulotlar boshqaruvi (CRUD)
- ✅ Buyurtmalar ko'rish va status o'zgartirish
- ✅ Foydalanuvchilar ro'yxati
- ✅ Analitika va statistika
- ✅ Dashboard

## 🌐 API Endpoints

Barcha API so'rovlari `/api/` prefiksi bilan boshlanadi:

### Mahsulotlar:
- `GET /api/products.php` - Barcha mahsulotlar
- `POST /api/products.php` - Yangi mahsulot qo'shish
- `DELETE /api/products.php?id={id}` - Mahsulotni o'chirish

### Buyurtmalar:
- `GET /api/orders.php` - Barcha buyurtmalar
- `POST /api/orders.php` - Yangi buyurtma
- `DELETE /api/orders.php?id={id}` - Buyurtmani o'chirish

### Foydalanuvchilar:
- `GET /api/usres.php` - Barcha foydalanuvchilar
- `POST /api/usres.php` - Yangi foydalanuvchi
- `DELETE /api/usres.php?id={id}` - Foydalanuvchini o'chirish

### Analitika:
- `GET /api/analytics.php` - Statistika

## 🔐 Admin Panel

**URL:** `http://localhost:8080/admin.html`

**Login ma'lumotlari:**
- Username: `admin`
- Password: `admin123`

## 🗄️ Database

**PHPMyAdmin:** `http://localhost:8081`

**Kirish ma'lumotlari:**
- Server: `db`
- Username: `root`
- Password: `root`
- Database: `konstovar`

### Database Strukturasi:

```sql
-- Foydalanuvchilar
users (id, first_name, last_name, phone, created_at)

-- Mahsulotlar
products (id, name, category, description, price, discount, rating, reviews, icon, imageUrl)

-- Buyurtmalar
orders (id, userName, items, total, status, date)
```

## 📦 Docker Buyruqlar

```bash
# Ishga tushirish
docker-compose up -d

# To'xtatish
docker-compose down

# Qayta ishga tushirish
docker-compose restart

# Loglarni ko'rish
docker-compose logs -f

# Holatni tekshirish
docker ps

# Containerlarni tozalash
docker-compose down -v
```

## 🔄 Kelajakda O'zgarishlar

```bash
# O'zgarishlarni saqlash
git add .
git commit -m "O'zgarishlar tavsifi"
git push

# Yangilanishlarni olish
git pull
```

## 🐛 Muammolarni Hal Qilish

### Port band bo'lsa:
```bash
# Portni tekshirish
netstat -ano | findstr :8080

# docker-compose.yml da portni o'zgartiring
ports:
  - "8090:80"  # 8080 o'rniga 8090
```

### Database ulanmasa:
```bash
# Containerlarni qayta ishga tushiring
docker-compose restart

# Yoki to'liq qayta yarating
docker-compose down
docker-compose up -d
```

### API ishlamasa:
- Brauzer console'ni tekshiring (F12)
- API yo'llari `/api/` bilan boshlanganligini tekshiring
- Backend containerning loglarini ko'ring: `docker-compose logs backend`

## 📚 Qo'shimcha Hujjatlar

- [DOCKER.md](docs/DOCKER.md) - Docker haqida batafsil
- [BOSHLASH.md](docs/BOSHLASH.md) - Boshlang'ichlar uchun
- [USTOZ_UCHUN.md](docs/USTOZ_UCHUN.md) - O'qituvchilar uchun
- [QISQA_QOLLANMA.txt](docs/QISQA_QOLLANMA.txt) - Qisqa ko'rsatma

## 👨‍💻 Muallif

**Husniddin Sheyx**
- GitHub: [@husniddin-sheyx](https://github.com/husniddin-sheyx)
- Repository: [Konstovar](https://github.com/husniddin-sheyx/Konstovar)

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi.

## 🎉 Minnatdorchilik

Docker, PHP, MySQL va boshqa open-source texnologiyalar jamoasiga rahmat!

---

**Saytni ishga tushiring va sinab ko'ring!** 🚀
