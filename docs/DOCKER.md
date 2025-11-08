
# Docker bilan Konstovar loyihasini ishlatish 🐳

## Docker nima?
Docker - bu ilovalaringizni containerlar ichida ishlatish texnologiyasi. Bu sizga:
- Har qanday kompyuterda bir xil ishlashini kafolatlaydi
- Tez va oson deploy qilish imkoniyatini beradi
- Server sozlamalaridan xalos qiladi

## Talablar

### Windows
1. **Docker Desktop** yuklab oling: https://www.docker.com/products/docker-desktop
2. WSL2 (Windows Subsystem for Linux) yoqilgan bo'lishi kerak
3. Docker Desktop'ni ishga tushiring

### Mac
1. **Docker Desktop** yuklab oling: https://www.docker.com/products/docker-desktop
2. Docker Desktop'ni ishga tushiring

### Linux
```bash 
# Docker o'rnatish
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose o'rnatish
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Loyihani ishga tushirish

### 1-usul: Docker Compose (Oson)

```bash
# Loyiha papkasiga kiring
cd konstovar

# Containerlarni ishga tushiring
docker-compose up -d

# ✅ Tayyor! Brauzerda ochilg'aning:
# http://localhost:8080
```

### 2-usul: Makefile bilan (Juda oson)

```bash
# Ishga tushirish
make up

# To'xtatish
make down

# Qayta ishga tushirish
make restart

# Loglarni ko'rish
make logs
```

## Docker containerlar

Loyihada 3 ta container mavjud:

### 1. **konstovar_web** - PHP va Apache
- Port: 8080
- Asosiy sayt va admin panel

### 2. **konstovar_db** - MySQL Database
- Port: 3306
- Barcha ma'lumotlar saqlanadi

### 3. **konstovar_phpmyadmin** - PHPMyAdmin
- Port: 8081
- Database'ni boshqarish uchun

## Docker commandlar

### Asosiy commandlar

```bash
# Containerlarni ishga tushirish
docker-compose up -d

# Containerlarni to'xtatish
docker-compose down

# Containerlarni qayta ishga tushirish
docker-compose restart

# Loglarni ko'rish
docker-compose logs -f

# Aniq bir container logini ko'rish
docker-compose logs -f web
```

### Database bilan ishlash

```bash
# Database backup olish
docker exec konstovar_db mysqldump -u root -proot konstovar > backup.sql

# Backup'ni tiklash
docker exec -i konstovar_db mysql -u root -proot konstovar < backup.sql

# Database'ga kirish (MySQL CLI)
docker exec -it konstovar_db mysql -u root -proot konstovar
```

### Container ichiga kirish

```bash
# Web container ichiga kirish
docker exec -it konstovar_web bash

# Database container ichiga kirish
docker exec -it konstovar_db bash
```

### Tozalash

```bash
# Barcha containerlarni o'chirish
docker-compose down

# Volume'larni ham o'chirish (database tozalanadi!)
docker-compose down -v

# Barcha narsani qayta qurish
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## Sozlamalar

### Portlarni o'zgartirish

`docker-compose.yml` faylida:

```yaml
services:
  web:
    ports:
      - "9000:80"  # 8080 o'rniga 9000
```

### Database parolini o'zgartirish

`docker-compose.yml` da:

```yaml
services:
  db:
    environment:
      MYSQL_ROOT_PASSWORD: yangi_parol_123
```

Va `db-config.php` da:

```php
$pass = 'yangi_parol_123';
```

## Production deployment

### 1. VPS/Cloud Server'da

```bash
# Server'ga ulaning
ssh user@your-server.com

# Loyihani klonlash
git clone https://github.com/yourname/konstovar.git
cd konstovar

# Docker o'rnatish (agar yo'q bo'lsa)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Parollarni o'zgartiring!
nano docker-compose.yml

# Ishga tushiring
docker-compose up -d

# NGINX reverse proxy qo'shish (HTTPS uchun)
# Let's Encrypt SSL sertifikati olish
```

### 2. SSL sertifikati (HTTPS)

NGINX config:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Muammolarni hal qilish

### Port band
**Xato:** Port 8080 allaqachon ishlatilmoqda

**Yechim:**
```bash
# Boshqa portni ishlating
# docker-compose.yml da 8080 ni 9000 ga o'zgartiring
```

### Container ishlamayapti
```bash
# Loglarni tekshiring
docker-compose logs -f

# Container holatini tekshiring
docker ps -a

# Qayta ishga tushiring
docker-compose restart
```

### Database connection error
```bash
# db-config.php tekshiring
# docker-compose.yml da parollar to'g'ri ekanligini tekshiring
# Container loglarini ko'ring:
docker-compose logs db
```

### Ma'lumotlar yo'qoldi
```bash
# Volume mavjudligini tekshiring
docker volume ls

# Agar backup bor bo'lsa, tiklang:
docker exec -i konstovar_db mysql -u root -proot konstovar < backup.sql
```

## Foydali maslahatlar

1. **Har doim backup oling!**
   ```bash
   make backup
   # yoki
   docker exec konstovar_db mysqldump -u root -proot konstovar > backup.sql
   ```

2. **Development uchun volume ishlatilg'aning**
   ```yaml
   volumes:
     - .:/var/www/html  # Real-time code o'zgarishlari
   ```

3. **Production da qattiq parollar qo'ying**
   ```bash
   # .env fayl yarating
   cp .env.example .env
   nano .env
   ```

4. **Regular yangilang**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

## Qo'shimcha resurslar

- **Docker docs**: https://docs.docker.com/
- **Docker Compose docs**: https://docs.docker.com/compose/
- **Docker Hub**: https://hub.docker.com/
- **Best practices**: https://docs.docker.com/develop/dev-best-practices/

---

## Savol-Javoblar

**S: Docker Desktop kerakmi?**  
J: Ha, Windows va Mac uchun. Linux'da faqat Docker Engine yetarli.

**S: Ma'lumotlar qayerda saqlanadi?**  
J: Docker volume'da: `konstovar_db_data`

**S: XAMPP bilan parallel ishlayaptimi?**  
J: Ha, lekin portlar to'qnashmasligi kerak (8080 vs 80)

**S: Production uchun tayyor?**  
J: Ha, lekin parollarni o'zgartiring va HTTPS qo'shing!

---

**Omad!** 🚀
