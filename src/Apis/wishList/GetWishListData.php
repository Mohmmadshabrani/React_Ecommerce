<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$userId = json_decode(file_get_contents('php://input'));

$stmt = $conn->prepare("SELECT p.id, p.name, p.price, p.mainPicture, cy.name FROM wish_list c JOIN products p ON c.product_id = p.id JOIN categories cy ON p.category_id = cy.id WHERE c.user_id = :user_id");
$stmt->bindValue(':user_id', $userId, PDO::PARAM_INT); 
if ($stmt->execute()) {
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if ($result) {
    echo json_encode($result);
  } else {
    echo json_encode('No products found for the given user ID.');
  }
} else {
  echo json_encode('Error executing the SQL statement.');
}
?>