<?php
    require_once './classes/AdvertCRUD.php';
    $keywords = $_GET['search'];
	$crud = new AdvertCRUD();
	$data = $crud->searchByAll($keywords);
    $adverts = (object) array('data' => $data);
    echo json_encode($adverts);
?>