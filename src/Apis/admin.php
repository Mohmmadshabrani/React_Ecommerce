<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once './connection.php';
$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare('INSERT INTO admin (firstName , lastName, email , phoneNumber , password) VALUES (:firstName , :lastName , :email , :phoneNumber , :password) ');

$stmt->bindParam('firstName', $data->firstName);
$stmt->bindParam('lastName', $data->lastName);
$stmt->bindParam('email', $data->email);
$stmt->bindParam('phoneNumber', $data->phoneNumber);
$stmt->bindParam('password', $data->password);
$stmt->bindParam('key', $data->key);

if ($stmt->execute()) {
    echo "success";
}

$stmt->execute();


  if ($stmt)
  echo json_encode(['success' => true , 'authToken' => $insertedId ]);
else{
  echo json_encode(['success' => false]);
}