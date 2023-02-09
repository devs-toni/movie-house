<?php
session_start();
require_once('../repository/Repository.php');
$db = new Repository();
$user = $_SESSION['user'];
$name = $_REQUEST['name'];
$db->addList($name, $user);
echo json_encode('OK');