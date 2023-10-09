<?php require '../connection.php' ?>


<?php

if (isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    echo "No ID provided.";
    exit; 
}
echo $id;

if (isset($_FILES["image"])) {
    $file = $_FILES["image"];

    if ($file["error"] === UPLOAD_ERR_OK) {
        $uploadDirectory = '../../public/img/products/';
        $uniqueFilename = $file["name"];
        $targetFilePath = $uploadDirectory . $uniqueFilename;
        
        $imageInfo = getimagesize($file["tmp_name"]);
        if (!$imageInfo) {
            echo "The uploaded file is not a valid image.";
            exit; 
        }

        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            echo "File uploaded successfully. Stored as: " . $uniqueFilename;

            
            $stmt = $conn->prepare("UPDATE products SET name = :name, category_id = :category_id, price = :price, mainPicture = :image, description = :description, discount = :discount WHERE ProductID = :id");
            
            $name = $_POST['name'];
            $category_id = $_POST['category_id']; 
            $price = $_POST['price'];
            $description = $_POST['description'];
            $discount = $_POST['discount']; 
            
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':category_id', $category_id);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':discount', $discount);
            $stmt->bindParam(':image', $uniqueFilename);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                echo "Data inserted into the database successfully.";
            } else {
                echo "Database error: " . implode(" - ", $stmt->errorInfo());
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