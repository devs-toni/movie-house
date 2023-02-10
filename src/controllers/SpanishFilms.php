<?php
require_once('../repository/Repository.php');
$db = new Repository();
$results = $db->getSpanishTopMovies();
echo json_encode($results);