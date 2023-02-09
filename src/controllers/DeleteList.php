<?php
session_start();
require_once('../repository/Repository.php');
$db = new Repository();
$user = $_SESSION['user'];
$listId = $_REQUEST['list'];
$db->deleteMoviesListLinks($listId);
$db->deleteList($listId);
echo json_encode('OK');