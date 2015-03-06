<?php
require_once 'Connection.php';
//require_once 'PHPMailer/PHPMailerAutoload.php';
/**
 *
 */
class UserCRUD {

	function __construct() {
        session_start();
		$this -> connection = new Connection();
		$this -> connection -> connect();
	}

	function __destruct() {
		$this -> connection -> disconnect();
	}
    
    public function isUserExist($email,$login){
        $isRegistered = false;
        $query = "SELECT * FROM users where email='$email'";
        $sql = mysql_query($query) or die(mysql_error());
        if (mysql_num_rows($sql) > 0) {
            $isRegistered = true;
        } else {
            $query2 = "SELECT * FROM users where login='$login'";
            $sql = mysql_query($query2) or die(mysql_error());
            if (mysql_num_rows($sql) > 0){
                $isRegistered = true;
            }
        }
        return $isRegistered;
    }
    
    public function login($email,$password){
        $query = "SELECT * FROM users where email='$email' and password='$password'";
        $res = mysql_query($query) or die(mysql_error());
        $num_row = mysql_num_rows($res);
        $row=mysql_fetch_array($res);
        $isLogged = false;
        if( $num_row >=1 ) { 
            $_SESSION['user_id']=$row['user_id'];
            $_SESSION['login'] = $row['login'];
            $_SESSION['role'] = $row['role_id'];
            $_SESSION['status']= $row['status'];
            $isLogged = true;
        } else {
            unset($_SESSION['token']);
            unset($_SESSION['user_id']);
            unset($_SESSION['login']);
            unset( $_SESSION['role']);
            unset($_SESSION['status']);
            $isLogged = false;
        }
        return $isLogged;
    }
    
    public function sendEmail($email, $subject, $body){
        require("PHPMailer/class.phpmailer.php"); 
        $isSend = false;
        $mail = new PHPMailer();
        $mail->isSMTP(); 
        $mail->Mailer = "smtp";
        $mail->Port = 2525;
        $mail->Host = 'mx1.hostinger.com.ua';
        $mail->SMTPAuth = true;                          
        $mail->Username = 'no-reply@noticeboard.url.ph';  
        $mail->Password = 'rehfuf';                          

        $mail->From = 'no-reply@noticeboard.url.ph';
        $mail->FromName = 'Noticeboard';
        $mail->addAddress($email);      

        $mail->WordWrap = 50;           
        $mail->isHTML(true);                  

        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->AltBody = $body;

        if(!$mail->send()) {
            $isSend = false;
        } else {
            $isSend = true;
        }
        return $isSend;
    }
    
    public function register($email,$password,$login,$gender,$picture){      
        $isRegistered = false;
        $activation = md5(uniqid(rand(), true));
        
        $query3 = "INSERT INTO users (email, login, password, picture, gender,activation) 
        VALUES ('$email', '$login', '$password', '$picture', '$gender','$activation')";
        $result = mysql_query($query3) or die(mysql_error());
        
        $query4 = "SELECT * FROM users where email='$email'";
        $result = mysql_query($query4) or die(mysql_error());
        
        if (mysql_num_rows($result) >= 1) {	 
            $row=mysql_fetch_array($result);
            $_SESSION['user_id']=$row['user_id'];
            $_SESSION['login'] = $row['login'];
            $_SESSION['role'] = $row['role_id'];
            $_SESSION['status'] = $row['status'];
            $isRegistered = true;
            $subject = 'Registration Confirmation';
            $body = 'To activate your account, please click on this link:<br><br>';
            $body .= 'http://noticeboard.url.ph'.'/php/activation.php?email=' . urlencode($email) . '&key='.$activation;
            if(!$this->sendEmail($email, $subject, $body)){
                echo 'Повідомлення не може бути відправлено.';
                //echo 'Код помилки: ' . $mail->ErrorInfo;
            }else{
                echo '<div>Дякуємо за реєстрацію. Лист для підтвердження був відправлений за адресою ' . $email .'. Длял активації акаунту перейдіть за посиланням в листі. Ви можете перейти на <a href="/">головну сторінку</a></div>';	 
            }
	     } else { // If it did not run OK.
            echo '<div class="errormsgbox">Ви не можете зареєструватись через системну помилку. Приносимо вибачення за незручності. Ви можете перейти на <a href="/">головну сторінку</a></div>';
	     }
        
        return $isRegistered;
    }
    
    public function resetPassword($email){
        $msg = "";
        $query = "SELECT * FROM users where email='$email'";
        $sql = mysql_query($query) or die(mysql_error());
        if (mysql_num_rows($sql) < 1) {
            $msg = "Помилка! Користувач з такою email-адресою не знайдений.";
        } else {
            $random=md5(uniqid(rand()));
            $password=mysql_real_escape_string(substr($random, 0, 8));
            $update = "UPDATE users SET password = '$password' WHERE email = '$email';";
            $res =  mysql_query($update) or die(mysql_error());
            $subject = "Password Reset";
            $body = "Your new password is as follows:<br>----------------------------<br>
            Password: $password<br>----------------------------<br>
            Please make note this information has been encrypted into our database.<br><br>
            This email was automatically generated."; 
            if(!$this->sendEmail($email, $subject, $body)){
                $msg = 'Повідомлення не може бути відправлено.';
                //echo 'Код помилки: ' . $mail->ErrorInfo;
            }else{
               $msg = '<div>Лист для відновлення паролю був відправлений за адресою ' . $email .'. Ви можете перейти на <a href="/">головну сторінку</a></div>';	 
            }
        }
        return $msg;
    }
    
    public function changePassword($oldPassword,$newPassword){
        $user_id = $_SESSION['user_id'];
        $msg = "";
        
        $query = "SELECT * FROM users where user_id='$user_id' AND password = '$oldPassword'";
        $sql = mysql_query($query) or die(mysql_error());
       
        if (mysql_num_rows($sql) < 1) {
            $msg = "Помилка! Попередній пароль введено не правильно.";
        } else {
            $update = "UPDATE users SET password = '$newPassword' WHERE user_id = '$user_id';";
            $res =  mysql_query($update) or die(mysql_error());
            $msg = "Пароль змінено!";
        }
        return $msg;
    }
    
    public function changeUserData($login,$image){
        $user_id = $_SESSION['user_id'];
        $isChanged = false;
        $query  = "UPDATE users SET login='$login', picture='$image' WHERE user_id='$user_id';";
        $res = mysql_query($query) or die(mysql_error());
        $check = "SELECT * FROM users where user_id='$user_id' and login='$login' and picture='$image'";
        $result_ch = mysql_query($check) or die(mysql_error());
        if(mysql_num_rows($result_ch) > 0){
            $isChanged = true;
        } else{
            echo "Сталася помилка. Дані не змінено.";
        }
        return $isChanged;
    }
    
    public function logout(){
        require_once './Google/Client.php';
        require_once './Google/Service/Oauth2.php';
        $client = new Google_Client("../config.ini");
        $client->setApplicationName("Google UserInfo PHP Starter Application");
        $oauth2 = new Google_Service_Oauth2($client);

        $client->addScope(Google_Service_Oauth2::USERINFO_PROFILE);
        
        $client->addScope(Google_Service_Oauth2::USERINFO_EMAIL);
        unset($_SESSION['token']);
        unset($_SESSION['user_id']);
        unset($_SESSION['login']);
        unset( $_SESSION['role']);
        unset($_SESSION['status']);
        $client->revokeToken();
        session_destroy();
    }
    
    public function getUserById($user_id){
        $query = "SELECT * FROM users where users.user_id='$user_id';";
        $res = mysql_query($query) or die(mysql_error());
        $rows = array();
        while($r = mysql_fetch_assoc($res)) {
            $rows[] = $r;
        }
        return $rows;
    }
    
    public function getAllUsers(){
        $query = "SELECT users.user_id,users.login,users.role_id,users.email,users.picture,roles.name AS 'role' FROM users INNER JOIN roles ON users.role_id = roles.role_id;";
        $res = mysql_query($query) or die(mysql_error());
        $rows = array();
        while($r = mysql_fetch_assoc($res)) {
            $rows[] = $r;
        }
        return $rows;
    }
    
    public function activateUser($email,$key){
        $msg='';
        $key=mysql_real_escape_string($key);
        
        $query  = "UPDATE users SET status=1 WHERE(email ='$email' AND activation='$key')LIMIT 1";
        $res = mysql_query($query) or die(mysql_error());
        if(isset($_SESSION['user_id'])){    
            $_SESSION['status'] = "1";
        }
        
       // if (mysql_num_rows($res) == 1) {
            $msg = '<div>Ваш акаунт активовано. Перейти на <a href="/">головну сторінку</a></div>';
    //    } else {
      //      $msg = '<div>Oops !Your account could not be activated. Please recheck the link or contact the system administrator.</div>';
    //    }
        
        return $msg;
    }
    
    public function deleteUserById($user_id){
        $user = $this->getUserById($user_id);
        $defLogo = "/style/images/user.png";
        if(is_readable(realpath("..".$user[0]['picture'])) && strcasecmp($defLogo, $user[0]['picture']) != 0){
            unlink(realpath("..".$user[0]['picture']));
        }
                
        $query = "DELETE FROM users where users.user_id='$user_id';";
		$res = mysql_query($query) or die(mysql_error());
		$data['deleted'] = true;
		return $data;
    }
    
    public function createRequest($request_role, $fullname){
        $msg = "";
        $date = date("Y-m-d H:i:s");
        $user_id = $_SESSION['user_id'];
        $current_role = $_SESSION['role'];
		$query = "INSERT INTO requests (user_id, fullname, current_role_id, request_role_id, request_time) 
			VALUES ('$user_id', '$fullname', '$current_role', '$request_role', '$date');";
		$result = mysql_query($query) or die(mysql_error());
        $check = "SELECT * FROM requests where user_id='$user_id' and request_role_id='$request_role';";
        $result_ch = mysql_query($check) or die(mysql_error());
        if(mysql_num_rows($result_ch) > 0){
            $msg = "Заявку успішно подано!";
        }else{
            $msg = "Сталася помилка. Заявку не подано.";
        }
        return $msg;
    }
    
    
    public function getRequests(){
        $query = "SELECT * FROM requests;";
        $res = mysql_query($query) or die(mysql_error());
        $rows = array();
        while($r = mysql_fetch_assoc($res)) {
            $rows[] = $r;
        }
        return $rows;
    }
}