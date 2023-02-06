<?php
require_once('../../config.php');
require_once('../repository/Repository.php');
$db = new Repository();
$min = $_GET['min'];
$movies = $db->getPaginationMovies($min, PAGE_SIZE);
echo json_encode($movies);