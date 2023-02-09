<?php

require_once('../repository/Repository.php');

$db = new Repository();

$idFilm = $_GET['id'];

$db->extractId($idFilm);

echo json_encode("vamos");