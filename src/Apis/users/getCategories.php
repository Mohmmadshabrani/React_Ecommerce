<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';


$stmt = $conn->prepare("select id, image ,  name  from categories");

$stmt->execute();
$stmt = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($stmt) {
  echo json_encode($stmt);
} else
  echo json_encode([]);
