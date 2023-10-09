<?php require 'connection.php' ?>
<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');

$query = 'SELECT * FROM admins' ;
$x = $conn->query($query);
$data = $x->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);



?>