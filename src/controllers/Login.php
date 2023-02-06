<?php
session_start();
require_once ("../../config.php");

require_once('../repository/Repository.php');

$db = new Repository();

$mail = $_REQUEST['email'];
$pass = $_REQUEST['password'];

$data = $db->getUserByEmail($mail);
if (count($data) === 0)
  header('Location: ../../index.php?err');

if (password_verify($pass, $data['pass'])) {
  $_SESSION['user'] = $data['id'];
  header('Location: ../../index.php');
} 
else 
  header('Location: ../../index.php?err');
