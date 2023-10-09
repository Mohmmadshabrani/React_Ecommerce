<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header("Access-Control-Allow-Headers: X-Requested-With");
header("Content-type: application/json");

require_once '../connection.php';
// $data = json_decode(file_get_contents("php://input"));
// echo ($data->photo);
// $stmt = $conn->prepare('INSERT INTO categories (name , image) VALUES (:name , :image) ');

// $stmt->bindParam('name', $data->name);
// $stmt->bindParam('image', $data->photo);


// $stmt->execute();
// $insertedId = $conn->lastInsertId();

// if ($stmt)
//   echo json_encode(['success' => true , 'authToken' => $insertedId ]);
// else{
//   echo json_encode(['success' => false]);
// }
?>
<?php 
if (isset($_FILES["image"])) {
    $file = $_FILES["image"];
  
    if ($file["error"] === UPLOAD_ERR_OK) {
        $uploadDirectory = '../../../public/img/';
  
        $uniqueFilename =  $file["name"];
  
        $targetFilePath = $uploadDirectory . $uniqueFilename;
  
        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            echo "File uploaded successfully. Stored as: " . $uniqueFilename;
  
            $stmt = $conn->prepare("INSERT INTO categories (name, image) VALUES (:name, :image)");
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':image', $uniqueFilename);
            // echo ($data->name);
            $name = $_POST['text'];
            if ($stmt->execute()) {
                echo "Data inserted into the database successfully.";
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
