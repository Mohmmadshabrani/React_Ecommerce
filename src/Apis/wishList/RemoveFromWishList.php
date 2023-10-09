<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$data = json_decode(file_get_contents('php://input'));
$userId = $data->id;
$productId = $data->product_id;
$conn->query("delete from wish_list where user_id  = $userId and product_id = $productId");

http_response_code(200);
echo json_encode(['msg' => 'Product removed from wish list']);