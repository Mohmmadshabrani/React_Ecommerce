<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

// { id: id, comment: comment, rating: value }

$data = json_decode(file_get_contents('php://input'));


$stmt = $conn->prepare("INSERT INTO product_review (product_id	, user_id , comment , rating) VALUES (:product_id, :user_id , :comment , :rating)");
$stmt->bindParam(':product_id', $data->id);
$stmt->bindParam(':user_id', $data->userId);
$stmt->bindParam(':comment', $data->comment);
$stmt->bindParam(':rating', $data->rating);
$stmt->execute();
http_response_code(200);
echo json_encode(['msg' => 'Review added successfully']);