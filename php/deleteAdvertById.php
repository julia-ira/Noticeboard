<?php
	require_once './classes/AdvertCRUD.php';
    //if(!empty($_POST['advert_id']) &&isset($_POST['advert_id'])){
        $advert_id = $_POST['advert_id'];
        $advert = new AdvertCRUD();
        $data = $advert->deleteAdvertById($advert_id);
        $advert = (object) array('data' => $data);
    //}else{
    //    $data = (object) array('data' => "ERROR!");
    //}
    echo json_encode($advert);
?>