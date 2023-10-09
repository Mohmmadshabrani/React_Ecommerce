<?php require '../connection.php' ?>


<?php
// if (isset($_GET['id'])) {

//     $id = $_GET['id'];
// }
// if (isset($_POST)) {

//     $re = file_get_contents("php://input");
//     $data = json_decode($re, true);
//     $Name = $data['name'];
//     $image = $data['image'];
   
    
// } else {
//     die('nothing to insert');
// }

// $stmt = $conn->prepare("UPDATE categories SET name = :Name, image = :image,  WHERE id = :id");
// $stmt->bindParam(':Name', $Fname);
// $stmt->bindParam(':image', $image);

// $stmt->bindParam(':id', $id);
// $stmt->execute();


if (isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    echo "No ID provided.";
    exit; // Exit the script if no ID is provided.
}

if (isset($_FILES["image"])) {
    $file = $_FILES["image"];

    if ($file["error"] === UPLOAD_ERR_OK) {
        $uploadDirectory = '../../../public/img/';
        $uniqueFilename =  $file["name"];
        $targetFilePath = $uploadDirectory . $uniqueFilename;

        // Check if the uploaded file is an image (you can add more validation).
        $imageInfo = getimagesize($file["tmp_name"]);
        if (!$imageInfo) {
            echo "The uploaded file is not a valid image.";
            exit; // Exit the script if the file is not a valid image.
        }

        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            echo "File uploaded successfully. Stored as: " . $uniqueFilename;

            // Use prepared statements to update the database.
            $stmt = $conn->prepare("UPDATE categories SET name = :name, image = :image WHERE id = :id");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':image', $uniqueFilename);
            $stmt->bindParam(':id', $id);
            $name = $_POST['text'];

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