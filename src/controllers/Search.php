<?php
require_once('../../config.php');
require_once('../repository/Repository.php');
$db = new Repository();
$schMovies = $_GET['schMovies'];
$movies = $db->getSearchMovies($schMovies);
echo json_encode($movies);