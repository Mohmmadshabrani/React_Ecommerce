<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$stmt = $conn->prepare("select * from products where discount > 0");
$stmt->execute();
$stmt = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($stmt) {
  echo json_encode($stmt);
} else
  echo json_encode([]);
