<?php

session_start();
require_once('../repository/Repository.php');
$db = new Repository();
$listId = $_REQUEST['list'];

$movies = $db->getMoviesList($listId);
echo json_encode($movies);