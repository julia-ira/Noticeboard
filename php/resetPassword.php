<?php
    require_once './classes/UserCRUD.php';

    $email = $_POST['forgot-email'];
    $crud = new UserCRUD();
    $msg = $crud->resetPassword($email);
    echo $msg;
?>