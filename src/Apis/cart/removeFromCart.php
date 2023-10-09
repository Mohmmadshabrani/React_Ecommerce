<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$data = json_decode(file_get_contents('php://input'));
$userId = $data->id;
$productId = $data->product_id;

$stmt = $conn->prepare("DELETE FROM carts WHERE user_id = :user_id AND product_id = :product_id");
$stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
$stmt->bindParam(':product_id', $productId, PDO::PARAM_INT);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo json_encode('Item removed from cart successfully.');
} else {
    echo json_encode('Item could not be removed from cart.');
}
