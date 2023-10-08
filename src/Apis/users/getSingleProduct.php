<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$productID = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("SELECT c.id as categroy_id, p.id , p.name, p.price, c.name as category_name, p.mainPicture, p.rating, p.description, p.discount FROM products p JOIN categories c ON c.id = p.category_id WHERE p.id = :productID");

$stmt->bindValue(':productID', $productID, PDO::PARAM_INT); 

if ($stmt->execute()) {
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if ($result) {
    echo json_encode($result);
  } else {
    echo json_encode('No product found for the given ID.');
  }
} else {
  echo json_encode('Error executing the SQL statement.');
}
?>