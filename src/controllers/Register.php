<?php
session_start();
require_once('../repository/Repository.php');
require_once('../models/User.php');

$db = new Repository();

$username = $_REQUEST['username'];
$mail = $_REQUEST['email'];
$pass = $_REQUEST['password'];

$db->addUser(new User($username, $mail, $pass));
$data = $db->getUserByEmail($mail);
$_SESSION['user'] = $data['id'];
header('Location: /' . explode('/', $_SERVER['REQUEST_URI'])[1] . '/index.php');