<?php
    require_once './classes/UserCRUD.php';
    if (!empty($_GET['email']) && isset($_GET['email'])) {
        $email = $_GET['email'];
    }
    if (!empty($_GET['key']) && isset($_GET['key'])){
        $key = $_GET['key'];
    } 
    if (isset($email) && isset($key)) { 
        $crud = new UserCRUD();
        $data = $crud->activateUser($email,$key);
        echo $data;
    } else {
        echo '<div>Сталася помилка .</div>';
    }
?>