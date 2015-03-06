<?php
    require_once './classes/UserCRUD.php';
    $crud = new UserCRUD();
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $login = trim($_POST['login']);
    $gender = trim($_POST['gender']);
    if(!$crud->isUserExist($email,$login)){
        $allowedExts = array("gif", "jpeg", "jpg", "png");
        $temp = explode(".", $_FILES["file"]["name"]);
        $extension = end($temp);
        $picture = "/style/images/user.png";
        if(($_FILES["file"]["type"] == "image/gif"
            || $_FILES["file"]["type"] == "image/jpeg"
            || $_FILES["file"]["type"] == "image/jpg"
            || $_FILES["file"]["type"] == "image/pjpeg"
            || $_FILES["file"]["type"] == "image/x-png"
            || $_FILES["file"]["type"] == "image/png")
            && $_FILES["file"]["size"] < 2000000
            && in_array($extension, $allowedExts))
        {
            if ($_FILES["file"]["error"] > 0){
                echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
            }else{
                if (file_exists("../images/avatars/" . $_FILES["file"]["name"])){
                    $error = 1;
                    $errormessage = $_FILES["file"]["name"] . " already exists. ";
                }else{
                    move_uploaded_file($_FILES["file"]["tmp_name"],
                        "../images/avatars/" . $_FILES["file"]["name"]);
                    $picture = "/images/avatars/" . $_FILES["file"]["name"];
                }
            }
        }else{
            $error = 1;
            $errormessage = "Invalid file";
        }

     if($crud->register($email,$password ,$login,$gender,$picture)){
        header('Location: /index.html');
     }
    }
?>
