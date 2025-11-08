-- Konstovar Database Structure
-- Database yaratish
CREATE DATABASE IF NOT EXISTS konstovar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE konstovar;

-- Foydalanuvchilar jadvali
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Mahsulotlar jadvali
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    price INT NOT NULL DEFAULT 0,
    discount INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    reviews INT DEFAULT 0,
    icon VARCHAR(100),
    imageUrl VARCHAR(255),
    popularity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Buyurtmalar jadvali
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(200) NOT NULL,
    userEmail VARCHAR(255),
    items TEXT NOT NULL,
    total INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dastlabki mahsulotlarni qo'shish
INSERT INTO products (name, description, price, category, icon, imageUrl, rating, reviews, discount, popularity) VALUES
('Qalamlar to\'plami', '12 dona rangli qalamlar, yuqori sifatli', 15000, 'stationery', 'fas fa-pen', 'img/qalamlar-toplami.jpg', 4.5, 23, 10, 95),
('Matematika daftari', '48 varaq, kvadratli, A4 format', 5000, 'notebooks', 'fas fa-book', 'img/daftar-matematika-a4.jpg', 4.8, 45, 0, 88),
('Qalam', 'Qora qalam, 0.7mm, 12 dona', 8000, 'stationery', 'fas fa-pen-fancy', 'img/qalam-qora-0_7mm.jpg', 4.2, 18, 5, 72),
('Rangli qog\'oz', 'A4 format, 20 rang, 200 varaq', 12000, 'art', 'fas fa-palette', 'img/rangli-qogoz-a4.jpg', 4.6, 31, 15, 91),
('Ingliz tili daftari', '48 varaq, chiziqli, A4 format', 5000, 'notebooks', 'fas fa-book', 'img/daftar-ingliz-tili-a4.jpg', 4.7, 38, 0, 85),
('Kalkulyator', 'Ilmiy kalkulyator, 12 raqamli ekran', 25000, 'office', 'fas fa-calculator', 'img/kalkulyator.jpg', 4.4, 27, 20, 78),
('Rangli qalamlar', '24 dona rangli qalamlar, qutida', 18000, 'art', 'fas fa-paint-brush', 'img/rangli-qalamlar-24.jpg', 4.9, 52, 12, 96),
('Stapler', 'Ofis stapler, 20 qog\'oz uchun', 15000, 'office', 'fas fa-paperclip', 'img/stapler.jpg', 4.1, 15, 8, 65),
('Qizil qalam', 'Qizil qalam, 0.5mm, 10 dona', 6000, 'stationery', 'fas fa-pen', 'img/qizil-qalam-0_5mm.jpg', 4.3, 22, 0, 68),
('Fizika daftari', '48 varaq, kvadratli, A4 format', 5000, 'notebooks', 'fas fa-book', 'img/daftar-fizika-a4.jpg', 4.5, 29, 0, 82),
('Qaychi', 'Ofis qaychisi, qo\'lda ishlatish uchun', 8000, 'office', 'fas fa-cut', 'img/qaychi.jpg', 4.0, 12, 0, 58),
('Rangli qalamlar', '36 dona rangli qalamlar, professional', 22000, 'art', 'fas fa-paint-brush', 'img/rangli-qalamlar-36.jpg', 4.8, 41, 18, 94),
('Yelim', 'Ofis yelimi, 50ml, 5 dona', 10000, 'office', 'fas fa-tint', 'img/yelim-50ml.jpg', 3.9, 8, 0, 45),
('Geografiya daftari', '48 varaq, chiziqli, A4 format', 5000, 'notebooks', 'fas fa-book', 'img/daftar-geografiya-a4.jpg', 4.6, 33, 0, 79),
('Markerlar', 'Rangli markerlar, 12 dona', 14000, 'stationery', 'fas fa-highlighter', 'img/markerlar-12.jpg', 4.4, 26, 7, 73);
