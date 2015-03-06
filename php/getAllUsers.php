<?php
    require_once './classes/UserCRUD.php'; 
    $crud = new UserCRUD();
    $data = $crud->getAllUsers();
    $user = (object) array('data' => $data);
    echo json_encode($user);
?>