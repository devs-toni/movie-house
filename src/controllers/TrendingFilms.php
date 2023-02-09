<?php
require_once('../repository/Repository.php');
require_once('../models/Movie.php');
require_once(str_replace('\\', '/', __DIR__) . '/../../config.php');
$db = new Repository();
$movies = json_decode($_REQUEST['films']);

foreach ($movies as $m) {
  if (!$db->existFilm($m->id)) {
    $posterPath = API_IMAGE_URL . $m->poster_path;
    $new = new Movie($m->id, $m->title, $m->original_language, $m->overview, $posterPath, isset($m->release_date) ? $m->release_date : null, $m->vote_average);
    $db->addFilm($new);
  }
}

echo json_encode('OK');