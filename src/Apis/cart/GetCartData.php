<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$userId = json_decode(file_get_contents("php://input"));


$stmt = $conn->prepare("SELECT c.quantity , p.name, p.price, p.mainPicture, cy.name FROM carts c JOIN products p ON c.product_id = p.id JOIN categories cy on p.category_id = cy.id WHERE c.user_id = :user_id");

$stmt->bindParam('user_id', $userId);
$stmt->execute();
$stmt = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($stmt) {
  echo json_encode($stmt);
} else
  echo json_encode([]);
