<?php

require_once('../repository/Repository.php');

$db = new Repository();

$id = $db->extractId();

echo json_encode($id);