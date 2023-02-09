<?php
session_start();
require_once('../repository/Repository.php');
require_once('../models/User.php');

$db = new Repository();
$action = $_REQUEST['field'];
$value = $_REQUEST['value'];
$id = $_SESSION['user'];

switch ($action) {
  case "username":
    $response = $db->updateUserField($value, null, null, $id);
    break;
  case "email":
    $response = $db->updateUserField(null, $value, null, $id);
    break;
  case "password":
    $response = $db->updateUserField(null, null, $value, $id);
    break;
  default:
    break;
}
echo json_encode($response);