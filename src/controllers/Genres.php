<?php

require_once('../repository/MovieRepository.php');

$db = new MovieRepository();
$action = $_REQUEST['action'];

switch ($action) {
  case 'add':
    addGenres(json_decode($_REQUEST['genres']), $db);
    break;
}



function addGenres($genres, $db)
{
  $db->deleteGenres();
  foreach ($genres as $genre) {
    foreach ($genre as $gen) {
      $db->addGenre($gen->id, $gen->name);
    }
  }
  echo json_encode("Added genre");
}