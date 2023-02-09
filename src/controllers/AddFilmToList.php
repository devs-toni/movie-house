<?php

require_once('../repository/Repository.php');

$db = new Repository();

$filmId = $_GET['film'];
$listId = $_GET['list'];

$db->addMovieToList($filmId, $listId);

echo json_encode("done");
