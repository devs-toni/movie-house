<?php

require_once('../repository/Repository.php');

$db = new Repository();

$titleFilm = $_GET['film'];

$filmInfo = $db->getInfoFilm($titleFilm);

echo json_encode($filmInfo);
