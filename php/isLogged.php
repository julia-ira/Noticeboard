<?php
    session_start();
    if (isset($_SESSION['user_id'])) {
        $data['logged'] = 'true';
        $data['user_id'] = $_SESSION['user_id'];
        $data['login'] = $_SESSION['login'];
        $data['role'] =  $_SESSION['role'];
        $data['status'] = $_SESSION['status'];
        $userList = (object) array('error' => 0, 'errormessage' => '', 'data' => $data);
    } else {
        $data['logged'] = 'false';
        $data['user_id'] = -1;
        $data['login']="";
        $data['role']="";
        $data['status']='';
        $userList = (object) array('error' => 0, 'errormessage' => '', 'data' => $data);
    }
    echo json_encode($userList);
?>