<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';

?>
<?php 
if (isset($_FILES["image"]) && isset($_FILES["image"]["error"])) {
    $file = $_FILES["image"];

    if ($file["error"] === UPLOAD_ERR_OK) {
        $uploadDirectory = '../../../public/img/products/';

        $uniqueFilename = $file["name"];

        $targetFilePath = $uploadDirectory . $uniqueFilename;

        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            echo "File uploaded successfully. Stored as: " . $uniqueFilename;
            $stmt = $conn->prepare("INSERT INTO products (name, category_id, price, mainPicture, discount, description) 
            VALUES (:name, :category_id, :price, :image, :discount, :description)");

            $name = $_POST['name'];
            $category_id = $_POST['category_id']; 
            $price = $_POST['price'];
            $discount = $_POST['discount']; 
            $description = $_POST['description'];
            // $sales = $_POST['sales']; 
            $uniqueFilename = "/img/products/" . $uniqueFilename;
            var_dump($uniqueFilename);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category_id', $category_id);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':discount', $discount);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':image',$uniqueFilename);
            // $stmt->bindParam(':sales', $sales);
   

            if ($stmt->execute()) {
                echo "Data inserted into the database successfully.";
            } else {
                echo "Error inserting data into the database.";
            }
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    } else {
        echo "Upload error. Error code: " . $file["error"];
    }
} else {
    echo "No file uploaded.";
}
?>
?>
