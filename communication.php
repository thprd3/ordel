<?php
// Pull these from server 
$userId = 
$wins = 
$losses = 
$streak = 

//update values based on performance
//on win
$wins++ 
$streak++

//on loss
$losses++
$streak = 0;

// after game, add new values to db
$sql = INSERT INTO `ordel` (`userId`, `wins`, `losses`, `streak`) VALUES ($userId, $wins, $losses, $streak)
mysqli_connect

?>