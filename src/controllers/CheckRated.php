<?php
require_once('../repository/Repository.php');

$db = new Repository();

$filmId = $_GET['film'];
$userId = $_GET['user'];

$idLike = $db->checkIfisAlreadyRated($filmId, $userId);

if ($idLike) {
    $res = true;
} else {
    $res = false;
}

echo json_encode($res);
