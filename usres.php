<?php
header('Content-Type: application/json');

// Database ulanishini yuklash
require_once 'db-config.php';

// Foydalanuvchilarni olish
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query('SELECT id, first_name, last_name, phone, created_at FROM users ORDER BY created_at DESC');
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode($users);
    exit;
}

// Foydalanuvchi qo'shish
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_POST['edit'])) {
    $firstName = $_POST['first_name'];
    $lastName = $_POST['last_name'];
    $phone = $_POST['phone'];

    $stmt = $conn->prepare('INSERT INTO users (first_name, last_name, phone) VALUES (?, ?, ?)');
    $stmt->bind_param('sss', $firstName, $lastName, $phone);
    $stmt->execute();
    echo json_encode(['success' => $stmt->affected_rows > 0]);
    exit;
}

// Foydalanuvchini tahrirlash
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit'])) {
    $id = $_POST['id'];
    $firstName = $_POST['first_name'];
    $lastName = $_POST['last_name'];
    $phone = $_POST['phone'];

    $stmt = $conn->prepare('UPDATE users SET first_name=?, last_name=?, phone=? WHERE id=?');
    $stmt->bind_param('sssi', $firstName, $lastName, $phone, $id);
    $stmt->execute();
    echo json_encode(['success' => $stmt->affected_rows > 0]);
    exit;
}

// Foydalanuvchini o'chirish
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];

    $stmt = $conn->prepare('DELETE FROM users WHERE id=?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    echo json_encode(['success' => $stmt->affected_rows > 0]);
    exit;
}

$conn->close();
?>