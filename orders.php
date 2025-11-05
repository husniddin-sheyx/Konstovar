<?php
header('Content-Type: application/json');

// Database ulanishini yuklash
require_once 'db-config.php';

// Buyurtmalarni olish
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query('SELECT * FROM orders ORDER BY date DESC');
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    echo json_encode($orders);
    exit;
}

// Buyurtma qo'shish
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_POST['edit'])) {
    $userName = $_POST['userName'];
    $items = $_POST['items'];
    $total = $_POST['total'];
    $status = $_POST['status'];

    $stmt = $conn->prepare('INSERT INTO orders (userName, items, total, status) VALUES (?, ?, ?, ?)');
    $stmt->bind_param('ssis', $userName, $items, $total, $status);
    $stmt->execute();
    echo json_encode(['success' => $stmt->affected_rows > 0]);
    exit;
}

// Buyurtmani tahrirlash
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit'])) {
    $id = $_POST['id'];
    $status = $_POST['status'];

    $stmt = $conn->prepare('UPDATE orders SET status=? WHERE id=?');
    $stmt->bind_param('si', $status, $id);
    $stmt->execute();
    echo json_encode(['success' => $stmt->affected_rows > 0]);
    exit;
}

// Buyurtmani o'chirish
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'];

    $stmt = $conn->prepare('DELETE FROM orders WHERE id=?');
    $stmt->bind_param('i', $id);
    $stmt->execute();
    echo json_encode(['success' => $stmt->affected_rows > 0]);
    exit;
}

$conn->close();
?>