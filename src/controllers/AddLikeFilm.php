<?php

require_once('../repository/Repository.php');

$db = new Repository();

$filmId = $_GET['film'];
$userId = $_GET['user'];

$idLike = $db->checkIfisAlreadyRated($filmId, $userId);

if ($idLike) {
    $db->deleteLike($idLike);
    $db->substrLikeRate($filmId);
    $res = "isDeleted";
} else {
    $db->insertLike($filmId, $userId);
    $db->addLikeRate($filmId);
    $res = "isAdded";
}

echo json_encode($res);
