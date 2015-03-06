<?php
    require_once './classes/AdvertCRUD.php';
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
    $data = $crud->getAdvertsByPage($page);
    $pages = $crud->getPagesNumber();
    $adverts = (object) array('error' => $error, 'errormessage' => $errormessage, 'data' => $data, 'pages' => $pages);
    
    echo json_encode($adverts);
?>