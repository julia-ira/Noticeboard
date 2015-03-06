<?php
	require_once './classes/AdvertCRUD.php';
    $advertId = $_GET['advert_id'];
    if(!isset($_GET['page'])){
        $page = 0;
    }
    else{
        $page = filter_var($_GET["page"], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH);
        if(!is_numeric($page)){
            header('HTTP/1.1 500 Invalid page number!');
            exit();
        }
    }
    $crud = new AdvertCRUD();
	$data = $crud->getCommentsToAdvertByPage($advertId, $page);
    $pages = $crud->getCommentsPagesNumber($advertId);
    $advert = (object) array('data' => $data, 'pages' => $pages, 'total' => count($crud->getCommentsToAdvert($advertId)));
    
    echo json_encode($advert);
?>