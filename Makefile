# Konstovar - Docker Makefile
# Qulaylik uchun commandlar

.PHONY: help build up down restart logs clean backup restore

help:
	@echo "Konstovar - Docker Commands"
	@echo "============================="
	@echo "make build    - Docker image yaratish"
	@echo "make up       - Containerlarni ishga tushirish"
	@echo "make down     - Containerlarni to'xtatish"
	@echo "make restart  - Containerlarni qayta ishga tushirish"
	@echo "make logs     - Loglarni ko'rish"
	@echo "make clean    - Hamma narsani tozalash (database ham)"
	@echo "make backup   - Database backup olish"
	@echo "make restore  - Database backup'dan tiklash"

build:
	docker-compose build

up:
	docker-compose up -d
	@echo "✅ Sayt tayyor!"
	@echo "   Asosiy sayt: http://localhost:8080"
	@echo "   Admin panel: http://localhost:8080/admin.html"
	@echo "   PHPMyAdmin:  http://localhost:8081"

down:
	docker-compose down

restart:
	docker-compose restart

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	@echo "⚠️  Barcha ma'lumotlar o'chirildi!"

backup:
	@echo "Database backup olinmoqda..."
	docker exec konstovar_db mysqldump -u root -proot konstovar > backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup tayyor: backup_*.sql"

restore:
	@echo "Database backup'dan tiklanmoqda..."
	@read -p "Backup fayl nomi: " file; \
	docker exec -i konstovar_db mysql -u root -proot konstovar < $$file
	@echo "✅ Database tiklandi"
