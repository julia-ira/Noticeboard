<?php
	require_once './classes/AdvertCRUD.php';
    if($_SESSION['role']=="2" && !empty($_POST['comment_id']) &&isset($_POST['comment_id'])){
        $comment_id = $_POST['comment_id'];
        $crud = new AdvertCRUD();
        $data = $crud->deleteCommentById($comment_id);
        $data = (object) array('data' => $data); 
    } else{
        $data = (object) array('data' => "ERROR!");
    }
    echo json_encode($data);
?>