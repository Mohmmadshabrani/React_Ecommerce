<?php 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
header("Content-type: application/json");
require '../connection.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    echo $id;

    error_log("Received ID: " . $id);

    $sql = 'DELETE FROM `order` WHERE id = :id'; // Enclose the table name in backticks

    $statement = $conn->prepare($sql);
    $statement->bindParam(':id', $id);

    if ($statement->execute()) {
        echo json_encode(array('message' => 'User Deleted successfully '));
    } else {
        error_log("Error deleting user: " . json_encode($statement->errorInfo()));
    }
}
?>
