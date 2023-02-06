<?php
session_start();

require_once('../repository/Repository.php');

$db = new Repository();

$mail = $_REQUEST['email'];
$pass = $_REQUEST['password'];

$data = $db->getUserByEmail($mail);
if (count($data) === 0)
  header('Location: /' . explode('/', $_SERVER['REQUEST_URI'])[1] . '/index.php?err');

if (password_verify($pass, $data['pass'])) {
  $_SESSION['user'] = $data['id'];
  header('Location: /' . explode('/', $_SERVER['REQUEST_URI'])[1] . '/index.php');
} else 
  header('Location: /' . explode('/', $_SERVER['REQUEST_URI'])[1] . '/index.php?err');
