<?php require '../connection.php' ?>


<?php
if (isset($_GET['id'])) {

    $id = $_GET['id'];
}
if (isset($_POST)) {

    $re = file_get_contents("php://input");
    $data = json_decode($re, true);
    $Fname = $data['firstName'];
    $Lname = $data['lastName'];
    $password = $data['password'];
    $email = $data['email'];
    $phone = $data['phoneNumber'];
    
} else {
    die('nothing to insert');
}

$stmt = $conn->prepare("UPDATE users SET firstName = :Fname, lastName = :Lname, email = :email, phoneNumber =:phone , password = :password  WHERE id = :id");
$stmt->bindParam(':Fname', $Fname);
$stmt->bindParam(':Lname', $Lname);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);
$stmt->bindParam(':phone', $phone);
$stmt->bindParam(':id', $id);
$stmt->execute();
?>