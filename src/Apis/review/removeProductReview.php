<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$reviewId = json_decode(file_get_contents('php://input'));
$userId = $data->id;
$productId = $data->product_id;
$conn->query("delete from product_review where id = $reviewId");

http_response_code(200);
echo json_encode(['msg' => 'Review removed successfully']);