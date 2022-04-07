<?php
require 'connection.php';
// Pull these from server 
if(__getcookie()){
    $userId = $_COOKIE;
    $wins = $_COOKIE;
    $losses = $_COOKIE;
    $streak = $_COOKIE
}

else{
    $userId = (Math.random()*100);
    $wins = 0;
    $losses = 0;
    $streak = 0;
}
//update values based on performance
//on win
$wins++;


//on loss
$losses++
$streak = 0;

// after game, add new values to db
$sql = INSERT INTO `ordel` (`userId`, `wins`, `losses`, `streak`) VALUES ($userId, $wins, $losses, $streak)
mysqli_connect

if (mysqli_query($conn, $sql)) {
    echo 'yatta';
}
else{
    echo 'epic fail';
}

mysqli_close($conn);

?>