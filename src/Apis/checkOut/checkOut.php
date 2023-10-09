<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: X-Requested-With');
header('Content-type: application/json');

require_once '../connection.php';

$data = json_decode(file_get_contents('php://input'));

$productData = $data->productDetails;
$userId = $data->userId;
$orderAmount = $data->amount;
$userData = $data->userDetails;

try {
    // Update user's address information
    $stmt = $conn->prepare('UPDATE users SET address = :address, city = :city, zipCode = :zipCode, userState = :userState WHERE id = :userId');
    $stmt->bindParam(':address', $userData->address);
    $stmt->bindParam(':city', $userData->city);
    $stmt->bindParam(':zipCode', $userData->zipCode);
    $stmt->bindParam(':userState', $userData->userState);
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();

    // Create a new order
    $stmt = $conn->prepare('INSERT INTO `order` (user_id, total_price) VALUES (:userId, :totalPrice)');
    $stmt->bindParam(':userId', $userId);
    $stmt->bindParam(':totalPrice', $orderAmount);
    $stmt->execute();
    $orderId = $conn->lastInsertId();

    // Associate products with the order
    foreach ($productData as $product) {
        $stmt = $conn->prepare('INSERT INTO `order-product` (order_id, product_id, quantity) VALUES (:orderId, :productId, :quantity)');
        $stmt->bindParam(':orderId', $orderId);
        $stmt->bindParam(':productId', $product->id);
        $stmt->bindParam(':quantity', $product->quantity);
        $stmt->execute();

        // Remove products from the cart
        $conn->query("DELETE FROM carts WHERE user_id = $userId AND product_id = {$product->id}");
    }

    echo json_encode(['success' => true, 'orderId' => $orderId]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
