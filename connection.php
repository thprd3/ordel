<?php

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }

$host='localhost';
$user='root';
$pass='';
$db_name='default';
$port = 3306;

$conn = mysqli_connect($host, $user, $pass, $db_name, $port);
if(mysqli_connect_errno()) {
    die('Failed to connect with MySQL: '.mysqli_connect-error());
}

?>