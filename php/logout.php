<?php
    require_once './classes/UserCRUD.php';
    
    $crud = new UserCRUD();
    $crud->logout();
    header("Location: http://noticeboard.url.ph/index.html");
    die('Logged out.');
?>