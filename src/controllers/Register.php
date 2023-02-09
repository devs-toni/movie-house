<?php
session_start();
require_once('../repository/Repository.php');
require_once('../models/User.php');

$db = new Repository();

$username = $_REQUEST['name'];
$mail = $_REQUEST['mail'];
$pass = $_REQUEST['pass'];

$db->addUser(new User($username, $mail, $pass));
$data = $db->getUserByEmail($mail);
$_SESSION['user'] = $data['id'];

echo json_encode("Ok");
// header('Location: ../../index.php');