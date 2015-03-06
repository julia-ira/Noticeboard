<?php
    require_once './classes/AdvertCRUD.php';
	$crud = new AdvertCRUD();
	$data = $crud->getAllAdverts();
    $adverts = (object) array('error' => $error, 'errormessage' => $errormessage, 'data' => $data);
    echo json_encode($adverts);
?>