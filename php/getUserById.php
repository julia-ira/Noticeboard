<?php
    require_once './classes/UserCRUD.php';
    if(isset($_GET['user_id'])){   
        $userId = $_GET['user_id'];
        $crud = new UserCRUD();
        $data = $crud->getUserById($userId);
        $user = (object) array('data' => $data);
        echo json_encode($user);
    }
    else{
        echo "Error!";
    }
?>