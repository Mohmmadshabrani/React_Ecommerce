<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-type: application/json");

require_once '../connection.php';


// Get the JSON data from the request body
$requestData = json_decode(file_get_contents("php://input"));

// Extract data from the request
$id = $requestData->id;
$currentPassword = $requestData->currentPassword;
$newPassword = $requestData->newPassword;

// Verify if the user exists and authenticate the user
// Replace this section with your authentication logic
// You should verify that the user is authorized to change their password

// For simplicity, let's assume the user's current password is "12345"

$currentPasswordFromDatabase = $conn->query("select password from users where id = $id")->fetchAll(PDO::FETCH_ASSOC);
$currentPasswordFromDatabase = $currentPasswordFromDatabase[0]['password'];

if ($currentPassword !== $currentPasswordFromDatabase) {
    http_response_code(400);
    echo json_encode(array("message" => "Current password is incorrect"));
    exit();
}

// Update the user's password in the database with the new password
// You should have a proper database update query here

// For simplicity, let's assume you have a users table with a password field
$updateQuery = "
    UPDATE users
    SET password = :newPassword
    WHERE id = :id
";

$stmt = $conn->prepare($updateQuery);
$stmt->bindParam(':newPassword', $newPassword);
$stmt->bindParam(':id', $id);

if ($stmt->execute()) {
    echo json_encode(array("success" => true, "message" => "Password updated successfully"));
} else {
    http_response_code(500);
    echo json_encode(array("success" => false, "message" => "Failed to update password"));
}
?>