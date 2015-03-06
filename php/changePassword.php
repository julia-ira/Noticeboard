<?php
	require_once './classes/UserCRUD.php';
    //if($_SESSION['role']=="2" && !empty($_POST['user_id']) &&isset($_POST['user_id'])){
    $oldPassword = $_POST['oldPassword'];
    $newPassword = $_POST['newPassword'];
    //echo "Old: ".$oldPassword."<br>New: ".$newPassword ;
    
    $crud = new UserCRUD();
    $data = $crud->changePassword($oldPassword,$newPassword);
    $data = (object) array('data' => $data);
    //} else{
    //    $data = (object) array('data' => "ERROR!");
    //}
    echo json_encode($data);
?>