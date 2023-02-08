<?php

require_once('../repository/Repository.php');

$filmId = $_GET['film'];
$db = new Repository();

$dltFilm = $db->deleteSelectFilm($filmId);

echo json_encode("deleted film: ". $filmId);