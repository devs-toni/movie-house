<?php
session_start();
require_once('../repository/Repository.php');
$db = new Repository();
$user = $_SESSION['user'];

$lists = $db->getAllListUser($user);
$movies = $db->getMoviesList(array_key_first($lists));
echo json_encode(["lists" => $lists, "movies" => $movies]);