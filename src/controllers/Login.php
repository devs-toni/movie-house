<?php
session_start();
require_once("../../config.php");

require_once('../repository/Repository.php');

$db = new Repository();

$mail = $_REQUEST['email'];
$pass = $_REQUEST['pass'];

$data = $db->getUserByEmail($mail);

if (count($data) === 0) {
  $response = 'Error';
  echo json_encode($response);
  exit;
}

if (password_verify($pass, $data['pass'])) {
  $_SESSION['user'] = $data['id'];
  $response = 'Ok';
} else {
  $response = 'Error';
}

echo json_encode($response);