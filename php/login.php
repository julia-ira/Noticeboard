<?php
    require_once './classes/UserCRUD.php';

    $email = $_POST['log-email'];
    $password = $_POST['log-password'];
    $crud = new UserCRUD();
    if($crud->login($email,$password)){
        header('Location: /index.html');
    } else{
        echo '<div>Невірний логін чи пароль. Ви можете перейти на <a href="/">головну сторінку</a></div>';	
    }
?>