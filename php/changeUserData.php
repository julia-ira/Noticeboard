<?php
	require_once './classes/UserCRUD.php';
    session_start();
    //$user_id = $_SESSION['user_id'];
    $crud = new UserCRUD();
    $user = $crud->getUserById($_SESSION['user_id']);
    //print_r($user);

    $picture = $user[0]['picture'];
    $login = $user[0]['login'];
    //echo "before: ".$picture." ".$login;
    if(isset($_POST['change-login']) && (!empty($_POST['change-login']))){
        $login = $_POST['change-login'];
    }

    $allowedExts = array("gif", "jpeg", "jpg", "png");
    $temp = explode(".", $_FILES["change-pic"]["name"]);
    $extension = end($temp);
    
    if(($_FILES["change-pic"]["type"] == "image/gif"
        || $_FILES["change-pic"]["type"] == "image/jpeg"
        || $_FILES["change-pic"]["type"] == "image/jpg"
        || $_FILES["change-pic"]["type"] == "image/pjpeg"
        || $_FILES["change-pic"]["type"] == "image/x-png"
        || $_FILES["change-pic"]["type"] == "image/png")
        && $_FILES["change-pic"]["size"] < 2000000
        && in_array($extension, $allowedExts))
    {
        if ($_FILES["change-pic"]["error"] > 0){
            echo "Return Code: " . $_FILES["change-pic"]["error"] . "<br>";
        }else{
            if (file_exists("../images/avatars/" . $_FILES["change-pic"]["name"])){
                $error = 1;
                $errormessage = $_FILES["change-pic"]["name"] . " already exists. ";
            }else{
                move_uploaded_file($_FILES["change-pic"]["tmp_name"],
                    "../images/avatars/" . $_FILES["change-pic"]["name"]);
                $picture = "/images/avatars/" . $_FILES["change-pic"]["name"];
                //echo "echo . ".$user[0]['picture'];
                $defLogo = "/style/images/user.png";
                if(is_readable(realpath("..".$user[0]['picture'])) && strcasecmp($defLogo, $user[0]['picture']) != 0){
                    unlink(realpath("..".$user[0]['picture']));
                }
                
            }
        }
    }
    //echo "after: ".$picture." ".$login;
    if($crud->changeUserData($login,$picture)){
        header('Location: /settings/');
    }
?>