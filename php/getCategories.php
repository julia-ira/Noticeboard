<?php
    require_once './classes/AdvertCRUD.php';
	$crud = new AdvertCRUD();
	$data = $crud->getCategories();
    $categories = (object) array('error' => $error, 'errormessage' => $errormessage, 'data' => $data);   
    echo json_encode($categories);
?>