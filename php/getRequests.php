<?php
    require_once './classes/UserCRUD.php'; 
    session_start();
    //if($_SESSION['role']=='2')  //later
    $crud = new UserCRUD();
    $data = $crud->getRequests();
    $user = (object) array('data' => $data);
    echo json_encode($user);
?>