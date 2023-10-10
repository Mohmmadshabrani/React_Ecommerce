<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");
require '../connection.php';

$query = 'SELECT * , c.name as categoryName FROM products p join categories c on p.category_id = c.id' ;
$x = $conn->query($query);
$data = $x->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);

?>