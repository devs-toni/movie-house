<?php
require_once('../repository/Repository.php');
require_once('../models/Movie.php');
require_once(str_replace('\\', '/', __DIR__) . '/../../config.php');
$db = new Repository();
$movies = json_decode($_REQUEST['films']);
$ids = [];
foreach ($movies as $m) {
  $id = $db->getFilmId($m->title, $m->overview);
  if (strlen($id) === 0) {
    $posterPath = API_IMAGE_URL . $m->poster_path;
    $new = new Movie($m->title, $m->original_language, $m->overview, $posterPath, isset($m->release_date) ? $m->release_date : null, $m->vote_average);
    $db->addFilm($new);
    array_push($ids, $db->getFilmId($m->title, $m->poster_path));
  } else {
    array_push($ids, $id);
  }
}

echo json_encode($ids);