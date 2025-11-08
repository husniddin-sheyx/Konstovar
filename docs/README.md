# Konstovar - Dars Qurollari Onlayn Do'koni

## Loyiha haqida
Konstovar - bu maktab va ofis uchun dars qurollarini sotish uchun mo'ljallangan zamonaviy onlayn do'kon platformasi.

## Texnologiyalar
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Icons**: Font Awesome 6.0

## Loyihaning asosiy funksiyalari
✅ Mahsulotlarni ko'rish va qidirish
✅ Kategoriyalar bo'yicha filtrlash
✅ Narx oralig'i bo'yicha filtrlash
✅ Savatga mahsulot qo'shish
✅ Foydalanuvchi ro'yxatdan o'tishi va kirishi
✅ Buyurtma berish (faqat ro'yxatdan o'tganlar uchun)
✅ Admin panel (mahsulotlar, buyurtmalar, foydalanuvchilarni boshqarish)
✅ Jonli chat
✅ Sevimlilar va taqqoslash

## O'rnatish

### Usul 1: Docker bilan (Tavsiya etiladi) 🐳

> 📘 **Batafsil qo'llanma**: [DOCKER.md](DOCKER.md) faylida Docker haqida to'liq ma'lumot bor!

**Afzalliklari:**
- Tez va oson
- Har qanday OS da ishlaydi (Windows, Mac, Linux)
- XAMPP o'rnatish shart emas
- Production uchun tayyor

**Talablar:**
- Docker Desktop o'rnatilgan bo'lishi kerak
- Download: https://www.docker.com/products/docker-desktop

**Ishga tushirish:**

```bash
# 1. Loyiha papkasiga kiring
cd konstovar

# 2. Docker containerlarni ishga tushiring
docker-compose up -d

# 3. Tayyir! Saytni ochilg'aning:
# Asosiy sayt: http://localhost:8080
# Admin panel: http://localhost:8080/admin.html
# PHPMyAdmin: http://localhost:8081
```

**Docker commandalar:**
```bash
# Containerlarni to'xtatish
docker-compose down

# Loglarni ko'rish
docker-compose logs -f

# Database qayta yaratish
docker-compose down -v
docker-compose up -d

# Containerlarni restart qilish
docker-compose restart
```

---

### Usul 2: XAMPP/WAMP/MAMP o'rnatish (An'anaviy usul)
- XAMPP yuklab oling: https://www.apachefriends.org/
- Apache va MySQL xizmatlarini ishga tushiring

### 2. Database yaratish
1. PHPMyAdmin ochilsin: http://localhost/phpmyadmin
2. Yangi database yarating: `konstovar`
3. `database.sql` faylini import qiling:
   - PHPMyAdmin -> konstovar -> Import -> `database.sql` ni tanlang -> Go

### 3. Loyihani joylashtirish
1. Loyiha fayllarini XAMPP/htdocs papkasiga ko'chiring:
   ```
   C:\xampp\htdocs\konstovar\
   ```

### 4. Database ulanishini sozlash
Quyidagi fayllarda database ulanish ma'lumotlarini tekshiring:
- `products.php`
- `orders.php`
- `usres.php` (users)
- `analytics.php`

```php
$host = 'localhost';
$user = 'root';        // MySQL foydalanuvchi nomi
$pass = '';            // MySQL paroli
$db = 'konstovar';     // Database nomi
```

### 5. Saytni ochish
Brauzerda quyidagi manzilga kiring:
```
http://localhost/konstovar/index.html
```

Admin panel uchun:
```
http://localhost/konstovar/admin.html
```

## Fayl strukturasi
```
konstovar/
├── index.html          # Asosiy sahifa
├── admin.html          # Admin panel
├── script.js           # Frontend JavaScript
├── admin-script.js     # Admin JavaScript
├── styles.css          # Frontend CSS
├── admin-styles.css    # Admin CSS
├── products.php        # Mahsulotlar API
├── orders.php          # Buyurtmalar API
├── usres.php           # Foydalanuvchilar API
├── analytics.php       # Statistika API
├── db-config.php       # Database ulanish konfiguratsiyasi
├── database.sql        # Database struktura
├── Dockerfile          # Docker image konfiguratsiyasi
├── docker-compose.yml  # Docker Compose konfiguratsiyasi
├── .dockerignore       # Docker ignore fayli
├── .env.example        # Environment variables namunasi
├── .gitignore          # Git ignore fayli
├── Makefile            # Docker qulaylik commandlari
├── README.md           # Bu fayl
├── DOCKER.md           # Docker batafsil qo'llanma
└── img/                # Rasmlar papkasi
```

## API Endpoints

### Mahsulotlar (products.php)
- `GET` - Barcha mahsulotlarni olish
- `POST` - Yangi mahsulot qo'shish yoki tahrirlash
- `DELETE` - Mahsulotni o'chirish

### Buyurtmalar (orders.php)
- `GET` - Barcha buyurtmalarni olish
- `POST` - Yangi buyurtma qo'shish yoki tahrirlash
- `DELETE` - Buyurtmani o'chirish

### Foydalanuvchilar (usres.php)
- `GET` - Barcha foydalanuvchilarni olish
- `POST` - Yangi foydalanuvchi qo'shish yoki tahrirlash
- `DELETE` - Foydalanuvchini o'chirish

### Statistika (analytics.php)
- `GET` - Umumiy statistika ma'lumotlarini olish

## Asosiy funksiyalar

### Frontend
1. **Mahsulotlar sahifasi** - Barcha mahsulotlarni ko'rsatish
2. **Qidiruv** - Mahsulotlarni nom yoki tavsif bo'yicha qidirish
3. **Filtrlash** - Kategoriya va narx bo'yicha filtrlash
4. **Savat** - Mahsulotlarni savatga qo'shish va boshqarish
5. **Autentifikatsiya** - Ro'yxatdan o'tish va kirish
6. **Buyurtma berish** - Faqat tizimga kirganlar uchun

### Admin Panel
1. **Mahsulotlar boshqaruvi** - Qo'shish, tahrirlash, o'chirish
2. **Buyurtmalar boshqaruvi** - Ko'rish, tahrirlash, o'chirish
3. **Foydalanuvchilar boshqaruvi** - Ko'rish, tahrirlash, o'chirish
4. **Statistika** - Umumiy ma'lumotlar va grafika

## Xavfsizlik
⚠️ **Muhim**: Ushbu loyiha ta'lim maqsadida yaratilgan. Real ishlab chiqarish uchun quyidagilarni qo'shing:
- Parollarni xeshlash (bcrypt/password_hash)
- SQL Injection himoyasi (prepared statements ishlatilgan)
- XSS himoyasi
- CSRF token
- HTTPS ulanish
- Session boshqaruvi

## Muammolarni hal qilish

### Database ulanish xatosi
- MySQL xizmati ishga tushganligini tekshiring
- Database ulanish ma'lumotlarini to'g'ri kiritganligini tekshiring
- `konstovar` database yaratilganligini tekshiring

### 404 xato
- Fayl yo'llari to'g'riligini tekshiring
- XAMPP htdocs papkasiga to'g'ri joylashtirilganligini tekshiring

### Mahsulotlar ko'rinmayapti
- `database.sql` to'liq import qilinganligini tekshiring
- Browser console'da xatolik borligini tekshiring (F12)

## Production Deployment 🚀

### Docker bilan deploy qilish

**1. VPS/Cloud Server (DigitalOcean, AWS, Azure, etc.)**

```bash
# Server'ga ulaning
ssh user@your-server-ip

# Git orqali loyihani klonlash
git clone https://github.com/yourname/konstovar.git
cd konstovar

# Docker va Docker Compose o'rnatish (agar yo'q bo'lsa)
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Production uchun docker-compose ishga tushirish
docker-compose up -d

# NGINX reverse proxy sozlash (ixtiyoriy, HTTPS uchun)
# Let's Encrypt SSL sertifikati olish
```

**2. Database backup**

```bash
# Backup olish
docker exec konstovar_db mysqldump -u root -proot konstovar > backup.sql

# Backup'ni qayta yuklash
docker exec -i konstovar_db mysql -u root -proot konstovar < backup.sql
```

**3. Production uchun muhim sozlamalar:**

`db-config.php` da:
```php
// Production uchun qattiq parollar qo'ying
$pass = 'qattiq_parol_123!@#';
```

`docker-compose.yml` da:
```yaml
environment:
  MYSQL_ROOT_PASSWORD: qattiq_parol_123
  MYSQL_PASSWORD: qattiq_parol_456
```

### Hostingga deploy qilish (cPanel/Shared Hosting)

1. **Fayllarga ZIP yasang** va hosting'ga yuklang
2. **Database yarating** cPanel -> MySQL Databases
3. **database.sql import qiling** phpMyAdmin orqali
4. **db-config.php sozlang** hosting database ma'lumotlari bilan
5. **Tayyor!** your-domain.com ga kiring

---

## Kelajakdagi yangilanishlar
- [ ] To'lov tizimi integratsiyasi
- [ ] Email bildirinomalari
- [ ] Mahsulot rasmlarini yuklash
- [ ] Mahsulot sharhlar tizimi
- [ ] Maxsus chegirmalar va kuponlar
- [ ] Mobil ilova

## Muallif
Husniddin

## Litsenziya
MIT License

---
**Eslatma**: Agar qandaydir muammo yuzaga kelsa, browser console (F12) va PHP error log'larini tekshiring.
