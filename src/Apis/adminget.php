<?php require 'connection.php' ?>
<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");

$query = 'SELECT * FROM admins' ;
$x = $conn->query($query);
$data = $x->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);



?>