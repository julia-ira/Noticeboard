<?php
	require_once './classes/AdvertCRUD.php';
    $advert_id = $_GET['advert_id'];
	$advert = new AdvertCRUD();
	$data = $advert->getAdvertById($advert_id);
    $advert = (object) array('data' => $data);
    
    echo json_encode($advert);
?>