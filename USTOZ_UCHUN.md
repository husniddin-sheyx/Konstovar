# 🚀 Loyihani ishga tushirish (Ustoz uchun)

## 1-QADAM: Docker Desktop o'rnatish

### Windows:
1. Yuklab oling: https://www.docker.com/products/docker-desktop
2. O'rnating va kompyuterni restart qiling
3. Docker Desktop dasturini oching
4. Pastki o'ng burchakda Docker icon'i **yashil** bo'lishini kuting

### Mac:
1. Yuklab oling: https://www.docker.com/products/docker-desktop
2. O'rnating
3. Docker Desktop dasturini oching

### Linux:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

---

## 2-QADAM: Loyihani ishga tushirish

### Terminal/PowerShell oching va quyidagi buyruqlarni bajaring:

```bash
# Loyiha papkasiga kiring
cd [loyiha_papkasi_manzili]

# Docker containerlarni ishga tushiring
docker-compose up -d
```

**Birinchi marta 5-10 daqiqa vaqt ketadi (image'lar yuklanadi)**

---

## 3-QADAM: Saytni ochish

### Brauzerda quyidagi manzillarni oching:

**Asosiy sayt:**
```
http://localhost:8080
```

**Admin panel:**
```
http://localhost:8080/admin.html
```
- Login: `admin`
- Parol: `admin123`

**PHPMyAdmin (Database):**
```
http://localhost:8081
```
- Server: `db`
- Username: `root`
- Password: `root`

---

## 📊 Foydali buyruqlar:

```bash
# Holatni tekshirish
docker ps

# Loglarni ko'rish
docker-compose logs -f

# To'xtatish
docker-compose down

# Qayta ishga tushirish
docker-compose restart

# Containerlarni tozalash
docker-compose down -v
```

---

## 🗄️ Database

Database avtomatik yaratiladi. Agar kerak bo'lsa, qo'lda import qilish:

```bash
# PHPMyAdmin orqali (http://localhost:8081)
# Yoki terminal orqali:
docker exec -i konstovar_db mysql -uroot -proot konstovar < database.sql
```

---

## 🔧 Muammolarni hal qilish

### Port band bo'lsa:
```bash
# Qaysi dastur 8080 portni ishlatayotganini tekshirish
netstat -ano | findstr :8080

# Yoki docker-compose.yml da portni o'zgartiring:
# ports:
#   - "8090:80"  # 8080 o'rniga 8090
```

### Docker ishlamasa:
1. Docker Desktop ochiq ekanligini tekshiring
2. Docker Engine yashil ekanligini tekshiring
3. Kompyuterni restart qiling

### Database ulanmasa:
```bash
# Containerlarni qayta ishga tushiring
docker-compose restart

# Yoki to'liq qayta yarating
docker-compose down
docker-compose up -d
```

---

## 📁 Loyiha strukturasi

```
konstovar/
├── Frontend (HTML/CSS/JS)
│   ├── index.html          # Asosiy sahifa
│   ├── admin.html          # Admin panel
│   ├── script.js           # Frontend logika
│   ├── admin-script.js     # Admin logika
│   ├── style.css           # Asosiy stillar
│   └── admin-style.css     # Admin stillar
│
├── Backend (PHP)
│   ├── products.php        # Mahsulotlar API
│   ├── orders.php          # Buyurtmalar API
│   ├── usres.php           # Foydalanuvchilar API
│   ├── analytics.php       # Analitika API
│   └── db-config.php       # Database config
│
├── Docker
│   ├── Dockerfile          # PHP image
│   ├── docker-compose.yml  # Xizmatlar
│   └── .dockerignore       # Ignore fayllar
│
└── Database
    └── database.sql        # Database strukturasi
```

---

## 🎯 Asosiy funksiyalar

### Frontend:
- ✅ Mahsulotlar ko'rish va qidirish
- ✅ Kategoriya bo'yicha filtrlash
- ✅ Savatga qo'shish
- ✅ Foydalanuvchi ro'yxatdan o'tish
- ✅ Buyurtma berish
- ✅ Sevimlilar va taqqoslash

### Admin panel:
- ✅ Mahsulotlar boshqaruvi (CRUD)
- ✅ Buyurtmalar ko'rish va status o'zgartirish
- ✅ Foydalanuvchilar ro'yxati
- ✅ Analitika va statistika

---

## 💡 Muhim:

1. **Docker Desktop** albatta o'rnatilgan bo'lishi kerak
2. Birinchi ishga tushirish 5-10 daqiqa vaqt oladi
3. Keyingi safar 10 sekund ichida ishga tushadi
4. Kompyuter restart bo'lsa, faqat `docker-compose up -d` yetarli

---

## 📞 Yordam kerak bo'lsa:

- BOSHLASH.md - Batafsil boshlang'ich qo'llanma
- DOCKER.md - Docker haqida to'liq ma'lumot
- README.md - Loyiha haqida umumiy ma'lumot

---

**Omad! Sayt muvaffaqiyatli ishga tushadi!** 🎉
