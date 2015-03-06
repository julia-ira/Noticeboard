<?php
    require_once './classes/AdvertCRUD.php';
    session_start();
    if(isset($_SESSION['user_id'])){
        $crud = new AdvertCRUD();
        $data = $crud->getAdvertsByUser($_SESSION['user_id']);
    }
    $adverts = (object) array('error' => $error, 'errormessage' => $errormessage, 'data' => $data);
    echo json_encode($adverts);
?>