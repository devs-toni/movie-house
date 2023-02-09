<?php
session_start();
require_once('../repository/Repository.php');
$db = new Repository();
$user = $db->getUserById($_SESSION['user']);
echo json_encode($user);

