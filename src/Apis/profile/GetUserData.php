<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

// Get the user ID from the request body (assuming it's in JSON format)
$userId = json_decode(file_get_contents("php://input"));
 // Assuming the JSON object has a 'userId' property

// Create a prepared statement to fetch user details
$query = "
    SELECT * FROM users WHERE id = :user_id
";

$stmt = $conn->prepare($query);
$stmt->bindParam(':user_id', $userId, PDO::PARAM_INT); // Bind the parameter as an integer
$stmt->execute();

$userDetails = $stmt->fetch(PDO::FETCH_ASSOC);

if ($userDetails) {
    echo json_encode($userDetails);
} else {
    echo json_encode(array("message" => "User not found"));
}

// Close the database connection
$conn = null;