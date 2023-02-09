<?php

require_once('../repository/Repository.php');

$db = new Repository();

$userId = $_GET['idUser'];

$userLists = $db->getAllListUser($userId);

echo json_encode($userLists);
