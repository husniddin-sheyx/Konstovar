# PHP va Apache bilan Docker image
FROM php:8.1-apache

# Kerakli PHP extensionlarni o'rnatish
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Apache mod_rewrite yoqish
RUN a2enmod rewrite

# Ishchi katalogni belgilash
WORKDIR /var/www/html

# Loyiha fayllarini ko'chirish
COPY . /var/www/html/

# Ruxsatlarni sozlash
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Apache portini ochish
EXPOSE 80

# Apache serverni ishga tushirish
CMD ["apache2-foreground"]
