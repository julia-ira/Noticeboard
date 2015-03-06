<?php
require_once './Google/Client.php';
require_once './Google/Service/Oauth2.php';
session_start();

$client = new Google_Client("config.ini");
$client->setApplicationName("Google UserInfo PHP Starter Application");
$oauth2 = new Google_Service_Oauth2($client);

//echo "oauth created.<br>";

$client->addScope(Google_Service_Oauth2::USERINFO_PROFILE);
$client->addScope(Google_Service_Oauth2::USERINFO_EMAIL);

//echo "scopes added<br>";

if (isset($_GET['logout'])) { // logout: destroy token
    unset($_SESSION['token']);
    unset($_SESSION['user_id']);
    unset( $_SESSION['role']);
    unset($_SESSION['status']);
    $client->revokeToken();
    session_destroy();
    header("Location: http://noticeboard.url.ph/login.html");
    die('Logged out.');
}


if (isset($_GET['code'])) { // we received the positive auth callback, get the token and store it in session
    $client->authenticate($_GET['code']);
    $_SESSION['token'] = $client->getAccessToken();
}

if (isset($_SESSION['token'])) { // extract token from session and configure client
    $client->setAccessToken($_SESSION['token']);
}

if ($client->getAccessToken()) {
    $user = $oauth2->userinfo->get();

    $connection = mysql_connect ('localhost', 'u936235099_user', 'rehfuf', 'u936235099_board')
    or die ('Unable to connect!');
    mysql_select_db('u936235099_board') or die (mysql_error());
    mysql_query("set character_set_client='utf8'"); 
    mysql_query("set character_set_server='utf8'"); 
    mysql_query("set character_set_results='utf8'"); 
    mysql_query("set collation_connection='utf8_unicode_ci'");

    $query = "SELECT * FROM users where email='$user->email'";
    $sql = mysql_query($query) or die(mysql_error());
    if (mysql_num_rows($sql) == 0) {
        $query2 = "INSERT INTO users (email, login, google_uid ,picture, gender, status) 
        VALUES ('$user->email', '$user->name', '$user->id', '$user->picture', '$user->gender', '1')";
        $result = mysql_query($query2) or die(mysql_error());
    } else {
        $update = "UPDATE users SET login='$user->name', google_uid='$user->id', picture='$user->picture',gender='$user->gender' WHERE email='$user->email'";
        $result = mysql_query($update) or die(mysql_error());
    }
    $result = mysql_query($query) or die(mysql_error());;
    $row=mysql_fetch_array($result);
    $_SESSION['user_id']=$row['user_id'];
    $_SESSION['login'] = $row['login'];
    $_SESSION['role'] = $row['role_id'];
    $_SESSION['status'] = $row['status'];
    mysql_close($connection);
    header("Location: http://noticeboard.url.ph/index.html");
    die('registered.');
} else{
    $authUrl = $client->createAuthUrl();
    $url = "Location: ".$authUrl;
    header($url);
    die('redirect');
}
?>