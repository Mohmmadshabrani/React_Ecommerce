<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-type: application/json');

require_once '../connection.php';

// Validate and sanitize the user ID
$userId = json_decode(file_get_contents('php://input'));

if ($userId === null || $userId <= 0) {
    echo json_encode(array('error' => 'Invalid user ID'));
    exit;
}

try {
    // Use a prepared statement to prevent SQL injection
    $stmt = $conn->prepare('SELECT * FROM users WHERE id = :userId');
    $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
    $stmt->execute();

    // Fetch the user data
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        echo json_encode(array('error' => 'User not found'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
}
?>
