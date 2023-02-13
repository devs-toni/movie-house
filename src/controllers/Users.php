<?php
session_start();
require_once("../../config.php");
require_once('../repository/UserRepository.php');
require_once('../models/User.php');
require_once("../utils/Session.php");


$dbUser = new UserRepository();
$type = $_REQUEST['type'];

switch ($type) {
  case "update":
    $response = updateUser($dbUser);
    break;

  case "register":
    $response = registerUser($dbUser);
    break;

  case "login":
    $response = loginUser($dbUser);
    break;

  case "logout":
    Session::destroySession('../../index.php');
    break;
  case "get":
    $response = $dbUser->getUserById($_SESSION['user']);
    break;

}

echo json_encode($response);

function updateUser($db)
{
  $field = $_REQUEST['field'];
  $value = $_REQUEST['value'];
  $id = $_SESSION['user'];
  switch ($field) {
    case "username":
      $response = $db->updateUserField($value, null, null, $id);
      break;
    case "email":
      $response = $db->updateUserField(null, $value, null, $id);
      break;
    case "password":
      $response = $db->updateUserField(null, null, $value, $id);
      break;
  }
  return $response;
}

function registerUser($db)
{
  $username = $_REQUEST['name'];
  $mail = $_REQUEST['mail'];
  $pass = $_REQUEST['pass'];
  $db->addUser(new User($username, $mail, $pass));
  $data = $db->getUserByEmail($mail);
  $_SESSION['user'] = $data['id'];
  return 'Ok';
}

function loginUser($db)
{
  $mail = $_REQUEST['email'];
  $pass = $_REQUEST['pass'];
  $data = $db->getUserByEmail($mail);
  if (count($data) === 0) {
    return 'Error';
  }
  if (password_verify($pass, $data['pass'])) {
    $_SESSION['user'] = $data['id'];
    $_SESSION['lastActivity'] = time();
    return 'Ok';
  } else {
    return 'Error';
  }
}