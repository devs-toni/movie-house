<?php
require_once('../repository/Repository.php');
$db = new Repository();
$movies = $db->getTop10Movies();
echo json_encode($movies);