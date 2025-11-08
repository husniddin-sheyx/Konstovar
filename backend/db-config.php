<?php
// Database konfiguratsiyasi
// Docker uchun
$host = getenv('DB_HOST') ?: 'db';
$user = getenv('DB_USER') ?: 'konstovar_user';
$pass = getenv('DB_PASSWORD') ?: 'konstovar_pass';
$db = getenv('DB_NAME') ?: 'konstovar';

// Localhost uchun (XAMPP)
if (gethostname() === 'localhost' || $_SERVER['HTTP_HOST'] === 'localhost') {
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $db = 'konstovar';
}

// Database ulanish
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]));
}

// UTF-8 encoding
$conn->set_charset("utf8mb4");
?>
