<?php

require_once('../repository/Repository.php');

$db = new Repository();

$idComment = $_GET["idComment"];

$res = $db->deleteComment($idComment);

echo json_encode($res);
