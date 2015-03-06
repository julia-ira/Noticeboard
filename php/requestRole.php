<?php
    require_once './classes/UserCRUD.php';
    if(isset($_POST['user-role']) && isset($_POST['user-surname']) && (!empty($_POST['user-surname'])){   
        $crud = new UserCRUD();
        $data = $crud->createRequest($_POST['user-role'], $_POST['user-surname']);
        $data = (object) array('data' => $data);
        echo json_encode($data);
    }
    else{
        echo "Error!";
    }
?>