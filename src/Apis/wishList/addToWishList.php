<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("SELECT * FROM wish_list WHERE productId = :productId AND user = :userId");
$stmt->bindParam(':productId', $data->productId);
$stmt->bindParam(':userId', $data->userId);
$stmt->execute();

if ($stmt->rowCount() > 0) {
  http_response_code(400);
  echo json_encode(['msg' => 'Product already in a Wish List']);
} else {
  $stmt = $conn->prepare("INSERT INTO wish_list (user_id, product_id) VALUES (:userId, :productId)");
  $stmt->bindParam(':userId', $data->userId);
  $stmt->bindParam(':productId', $data->productId);
  $stmt->execute();

  http_response_code(200);
  echo json_encode(['msg' => 'Product added to Wish List']);
}
