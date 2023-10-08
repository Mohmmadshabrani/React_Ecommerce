<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$categoryName = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("select *  from products where category_id = :id");
$stmt->bindParam(':id' , $categoryName);
$stmt->execute();
$stmt = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($stmt) {
  echo json_encode($stmt);
} else
  echo json_encode([]);
