<?php  
	require_once './classes/AdvertCRUD.php';
    session_start();
    $error = 0;
    $errormessage = '';

    $advert_id = $_POST['advert_id'];
    $text =  htmlspecialchars($_POST['text']);
    $user_id = $_SESSION['user_id']; 
    
	$crud = new AdvertCRUD();
	$data = $crud->addCommentToAdvert($advert_id, $text, $user_id);
    
    $ajaxresult = (object) array('error' => $error, 'errormessage' => $errormessage, 'data' => $data);
    echo json_encode($ajaxresult);
?>