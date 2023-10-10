<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$productId = json_decode(file_get_contents('php://input'));

$reviews = $conn->query("select * from product_review pr join users u on pr.user_id = u.id  where product_id ")->fetchAll(PDO::FETCH_ASSOC);
if($conn)
echo json_encode($reviews);
else
echo 'no';