<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare('SELECT * FROM users WHERE :email = email and :password = password');

$stmt->bindParam(':email', $data->email);
$stmt->bindParam(':password', $data->password);

$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
var_dump($res);

if ($stmt->rowCount() === 1)
  echo json_encode(['success' => true , 'authToken' => $res[0]["id"]]);
else{
  echo json_encode(['success' => false]);
}