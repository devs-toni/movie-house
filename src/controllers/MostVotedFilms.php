<?php
require_once('../repository/Repository.php');
$db = new Repository();
$results = $db->getMostVotedMovies();
echo json_encode($results);