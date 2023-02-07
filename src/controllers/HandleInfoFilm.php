<?php

require_once('../repository/Repository.php');

$db = new Repository();

$filmId = $_GET['film'];

$filmInfo = $db->getInfoFilm($filmId);

echo json_encode($filmInfo);
