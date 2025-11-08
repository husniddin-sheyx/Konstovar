<?php
header('Content-Type: application/json');

// Database ulanishini yuklash
require_once 'db-config.php';

// Umumiy statistikalar
$data = [];

// Foydalanuvchilar soni
$res = $conn->query('SELECT COUNT(*) as count FROM users');
$data['users'] = $res->fetch_assoc()['count'];

// Buyurtmalar soni
$res = $conn->query('SELECT COUNT(*) as count FROM orders');
$data['orders'] = $res->fetch_assoc()['count'];

// Eng ko‘p sotilgan mahsulotlar (misol uchun)
$res = $conn->query('SELECT name, SUM(total) as total_sold FROM orders GROUP BY name ORDER BY total_sold DESC LIMIT 5');
$popular = [];
while ($row = $res->fetch_assoc()) {
    $popular[] = $row;
}
$data['popular_products'] = $popular;

echo json_encode($data);
$conn->close();
?>