# Konstovar - Boshlash uchun qo'llanma 🚀

## 1-qadam: Docker Desktop o'rnatish

### Windows uchun:

1. **Docker Desktop yuklab olish**
   - Sayt: https://www.docker.com/products/docker-desktop
   - "Download for Windows" tugmasini bosing
   - Fayl hajmi: ~500MB

2. **O'rnatish**
   - Yuklab olingan `Docker Desktop Installer.exe` ni ishga tushiring
   - "OK" tugmasini bosing
   - Kutib turing (5-10 daqiqa)
   - Kompyuterni qayta ishga tushiring (restart)

3. **Docker Desktop'ni ishga tushiring**
   - Windows menusidan "Docker Desktop" ni toping
   - Ishga tushiring
   - Pastki o'ng burchakda Docker icon'i ko'rinadi
   - Icon yashil bo'lguncha kutib turing ✅

4. **Tekshirish**
   - CMD yoki PowerShell oching
   - Quyidagi commandni kiriting:
   ```bash
   docker --version
   ```
   - Natija: `Docker version 24.x.x` ko'rinishi kerak

---

## 2-qadam: Loyihani ishga tushirish

### Oson usul (Tavsiya etiladi):

1. **PowerShell yoki CMD ochilg'aning**
   - Windows tugmasini bosing
   - "PowerShell" yozing
   - "Run as Administrator" (Administrator sifatida ishga tushirish)

2. **Loyiha papkasiga kiring**
   ```bash
   cd f:\Husniddin\konstovar
   ```

3. **Loyihani ishga tushiring**
   ```bash
   docker-compose up -d
   ```

4. **Jarayon:**
   ```
   [+] Building 2.3s (10/10) FINISHED
   [+] Running 3/3
    ✔ Container konstovar_db          Started
    ✔ Container konstovar_phpmyadmin  Started
    ✔ Container konstovar_web         Started
   ```

5. **Tayyor! 🎉**
   - Asosiy sayt: http://localhost:8080
   - Admin panel: http://localhost:8080/admin.html
   - PHPMyAdmin: http://localhost:8081

---

## 3-qadam: Saytni tekshirish

### Brauzerda ochilg'aning:

1. **Asosiy sayt**
   - URL: http://localhost:8080
   - Mahsulotlar ko'rinishi kerak
   - Savatga qo'shish ishlaydi

2. **Admin panel**
   - URL: http://localhost:8080/admin.html
   - Mahsulotlar, buyurtmalar, foydalanuvchilar

3. **PHPMyAdmin**
   - URL: http://localhost:8081
   - Server: db
   - Username: root
   - Password: root
   - Database: konstovar

---

## Foydali commandlar

### Asosiy commandlar:

```bash
# Loyihani ishga tushirish
docker-compose up -d

# Loyihani to'xtatish
docker-compose down

# Loglarni ko'rish
docker-compose logs -f

# Qayta ishga tushirish
docker-compose restart

# Holatni tekshirish
docker ps
```

### Makefile bilan (Osonroq):

```bash
# Ishga tushirish
make up

# To'xtatish
make down

# Loglarni ko'rish
make logs

# Qayta ishga tushirish
make restart

# Backup olish
make backup

# Yordam
make help
```

---

## Muammolarni hal qilish

### 1. "Docker daemon is not running"
**Yechim:**
- Docker Desktop ishga tushganligini tekshiring
- Pastki o'ng burchakda Docker icon'i yashil bo'lishi kerak

### 2. "Port 8080 already in use"
**Yechim 1:** Portni o'zgartiring
```bash
# docker-compose.yml da:
ports:
  - "9000:80"  # 8080 o'rniga 9000
```

**Yechim 2:** Boshqa dasturni to'xtating
```bash
# Qaysi dastur ishlatayotganini tekshirish
netstat -ano | findstr :8080

# Dasturni to'xtatish (Process ID ni bilsangiz)
taskkill /PID <process_id> /F
```

### 3. "Cannot connect to Docker daemon"
**Yechim:**
```bash
# Docker Desktop'ni qayta ishga tushiring
# Yoki kompyuterni restart qiling
```

### 4. "Database connection error"
**Yechim:**
```bash
# Containerlarni to'xtatib, qayta ishga tushiring
docker-compose down
docker-compose up -d

# 30 sekund kutib, qayta urinib ko'ring
```

---

## Video qo'llanma

### Docker Desktop o'rnatish:
1. YouTube'da qidiring: "How to install Docker Desktop on Windows"
2. Yoki: https://www.youtube.com/watch?v=_9AWYlt86B8

### Docker asoslari:
1. YouTube'da qidiring: "Docker Tutorial for Beginners"
2. Yoki: https://www.youtube.com/watch?v=fqMOX6JJhGo

---

## Qisqa xulosa

### ✅ Nima qildik:
1. Docker Desktop o'rnatdik
2. Loyihani 1 command bilan ishga tushirdik
3. Sayt http://localhost:8080 da ochildi
4. Database va PHPMyAdmin ham tayyor

### 🎯 Keyingi qadamlar:
1. Saytni test qiling
2. Admin panelga kiring
3. Mahsulot qo'shing
4. Buyurtma bering

### 💡 Esda tuting:
- Har safar loyihani ishlatish uchun: `docker-compose up -d`
- Loyihani to'xtatish uchun: `docker-compose down`
- Loglarni ko'rish uchun: `docker-compose logs -f`

---

## Yordam kerakmi?

**Telegram:**
- Docker Uzbekistan: @docker_uz
- IT Help UZ: @ithelp_uz

**YouTube:**
- "Docker Tutorial Uzbek"
- "Docker Compose Tutorial"

**Savollar:**
- DOCKER.md faylini o'qing
- README.md faylini o'qing

---

## Omad! 🚀

Loyihangiz tayyor! Docker bilan ishlash juda oson va qulay.

Agar biror muammo bo'lsa, quyidagi commandlarni bajaring:
```bash
docker-compose logs -f
```

Bu sizga xato haqida to'liq ma'lumot beradi.
