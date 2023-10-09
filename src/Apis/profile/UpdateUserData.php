<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");


require_once '../connection.php';


$userData = json_decode(file_get_contents("php://input"));


// Assuming you have received user details in JSON format
$userDetails = $userData->userDetails ;

// Update the user details in the database
$query = "
    UPDATE users
    SET firstName = :firstName, lastName = :lastName, phoneNumber = :phoneNumber, email = :email, address = :address, city = :city
    WHERE id = :userId
";

$stmt = $conn->prepare($query);
$stmt->bindParam(':firstName', $userDetails->firstName);
$stmt->bindParam(':lastName', $userDetails->lastName);
$stmt->bindParam(':phoneNumber', $userDetails->phoneNumber);
$stmt->bindParam(':email', $userDetails->email);
$stmt->bindParam(':address', $userDetails->address);
$stmt->bindParam(':city', $userDetails->city);
$stmt->bindParam(':userId', $userDetails->id);

if ($stmt->execute()) {
    // Update successful
    echo json_encode(array("success" => true, "message" => "User details updated successfully"));
} else {
    // Update failed
    echo json_encode(array("success" => false, "message" => "Failed to update user details"));
}


