<?php

require_once('../repository/Repository.php');

$db = new Repository();

$userId = $_POST['idUserRegistered'];
$filmId = $_POST['idOpenedFilm'];
$comment = $_POST['comment'];




$newComment = $db->addCommentFilm($userId, $filmId, $comment);


echo json_encode($comment);
