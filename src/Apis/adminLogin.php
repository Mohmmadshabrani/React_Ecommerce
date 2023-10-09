<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');


require_once './connection.php';

$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare('SELECT * FROM admins WHERE :email = email and :password = password');

$stmt->bindParam(':email', $data->email);
$stmt->bindParam(':password', $data->password);

$stmt->execute();
$res = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($stmt->rowCount() === 1)
  echo json_encode(['success' => true , 'authToken' => $res[0]["id"]]);
else{
  echo json_encode(['success' => false]);
}