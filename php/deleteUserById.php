<?php
	require_once './classes/UserCRUD.php';
    //if($_SESSION['role']=="2" && !empty($_POST['user_id']) &&isset($_POST['user_id'])){
        $user_id = $_POST['user_id'];
        $crud = new UserCRUD();
        $data = $crud->deleteUserById($user_id);
        $data = (object) array('data' => $data);
    //} else{
    //    $data = (object) array('data' => "ERROR!");
    //}
    echo json_encode($data);
?>