<?php
    require_once './classes/AdvertCRUD.php';
    $tags = $_GET['search'];
	$crud = new AdvertCRUD();
	$data = $crud->searchByTags($tags);
    $adverts = (object) array('data' => $data);
    echo json_encode($adverts);
?>