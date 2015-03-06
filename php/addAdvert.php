<?php
	require_once './classes/AdvertCRUD.php';
    header('Content-type: text/html; charset=utf-8');
	session_start();
    
    $error = 0;
    $errormessage = '';

    $data = '';

    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["add-image"]["name"]);
    $extension = end($temp);
    $image  = "";

    if(($_FILES["add-image"]["type"] == "image/gif"
        || $_FILES["add-image"]["type"] == "image/jpeg"
        || $_FILES["add-image"]["type"] == "image/jpg"
        || $_FILES["add-image"]["type"] == "image/pjpeg"
        || $_FILES["add-image"]["type"] == "image/x-png"
        || $_FILES["add-image"]["type"] == "image/png")
        && $_FILES["add-image"]["size"] < 2000000
        && in_array($extension, $allowedExts))
    {
            if ($_FILES["add-image"]["error"] > 0){
                echo "Return Code: " . $_FILES["add-image"]["error"] . "<br>";
            }else{
                if (file_exists("../images/" . $_FILES["add-image"]["name"])){
                    $error = 1;
                    $errormessage = $_FILES["add-image"]["name"] . " already exists. ";
                }else{
                    move_uploaded_file($_FILES["add-image"]["tmp_name"],
                        "../images/" . $_FILES["add-image"]["name"]);
                    $image = "/images/" . $_FILES["add-image"]["name"];
                }
            }
	}else{
		$error = 1;
		$errormessage = "Invalid file";
	}
    $title = $_POST['add-title'];
    $text =  htmlspecialchars($_POST['add-text']);
    $user_id = $_SESSION['user_id']; 
    $category_id = $_POST['add-category'];
    $tags = $_POST['tags'];
    if(empty($tags)){
        $tags = "різне";
    }
    
    $advert = new AdvertCRUD();
	$data = $advert->addAdvert($title, $text, $user_id, $category_id, $tags, $image);
       
    header('Location: /index.html');
?>