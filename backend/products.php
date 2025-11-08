<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS request uchun
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database ulanishini yuklash
require_once 'db-config.php';

// Mahsulotlarni olish
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query('SELECT * FROM products');
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($products);
    exit;
}

// Mahsulot qo'shish (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // If _POST has 'id', treat as update (edit)
    if (isset($_POST['id'])) {
        $id = $_POST['id'];
        $name = $_POST['name'] ?? '';
        $category = $_POST['category'] ?? '';
        $description = $_POST['description'] ?? '';
        $price = $_POST['price'] ?? 0;
        $discount = $_POST['discount'] ?? 0;
        $rating = $_POST['rating'] ?? 0;
        $reviews = $_POST['reviews'] ?? 0;
        $icon = $_POST['icon'] ?? '';
        $stmt = $conn->prepare('UPDATE products SET name=?, category=?, description=?, price=?, discount=?, rating=?, reviews=?, icon=? WHERE id=?');
        $stmt->bind_param('sssiiidsi', $name, $category, $description, $price, $discount, $rating, $reviews, $icon, $id);
        $stmt->execute();
        echo $stmt->affected_rows > 0 ? 'success' : 'error';
        exit;
    } else {
        // Add new product
        $name = $_POST['name'] ?? '';
        $category = $_POST['category'] ?? '';
        $description = $_POST['description'] ?? '';
        $price = $_POST['price'] ?? 0;
        $discount = $_POST['discount'] ?? 0;
        $rating = $_POST['rating'] ?? 0;
        $reviews = $_POST['reviews'] ?? 0;
        $icon = $_POST['icon'] ?? '';
        $stmt = $conn->prepare('INSERT INTO products (name, category, description, price, discount, rating, reviews, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('sssiiids', $name, $category, $description, $price, $discount, $rating, $reviews, $icon);
        $stmt->execute();
        echo $stmt->affected_rows > 0 ? 'success' : 'error';
        exit;
    }
}

// Mahsulot o'chirish (DELETE)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Parse input for id
    parse_str(file_get_contents('php://input'), $_DELETE);
    $id = $_DELETE['id'] ?? 0;
    if ($id) {
        $stmt = $conn->prepare('DELETE FROM products WHERE id=?');
        $stmt->bind_param('i', $id);
        $stmt->execute();
        echo $stmt->affected_rows > 0 ? 'success' : 'error';
        exit;
    }
    echo 'error';
    exit;
}
?>