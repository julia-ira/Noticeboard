<?php
    require_once './classes/AdvertCRUD.php';
    $keywords = $_GET['search'];
    $type = $_GET['type'];
    $crud = new AdvertCRUD();
    if(strcasecmp ($type , "all" ) == 0){
        $data = $crud->searchByAll($keywords);
    }
	if(strcasecmp ($type , "tags" ) == 0){
        $data = $crud->searchByTags($keywords);
    }
	if(strcasecmp ($type , "keywords" ) == 0){
        $data = $crud->searchByKeywords($keywords);
    }
    $adverts = (object) array('data' => $data);
    echo json_encode($adverts);
?>