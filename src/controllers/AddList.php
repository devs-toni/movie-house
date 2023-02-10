<?php
session_start();
require_once('../repository/Repository.php');
$db = new Repository();
$user = $_SESSION['user'];
$name = $_REQUEST['name'];
if (!$db->listExist($name, $user)) {
  $db->addList($name, $user);
  $id = $db->getListUser($name, $user);
  echo json_encode($id);
} else
  echo json_encode('N');