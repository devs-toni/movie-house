<?php
require_once('Repository.php');
require_once('../models/Movie.php');
require_once(str_replace('\\' , '/',__DIR__) . '/../../config.php');

$db = new Repository();
$films = json_decode($_POST['films']);

$db->deleteFilms();

for ($i = 0; $i < count($films); $i++) {
  $f = $films[$i];
  if (!$f->adult) {
    $movie = new Movie($f->title, $f->original_language, $f->overview, API_IMAGE_URL . $f->poster_path, isset($f->release_date) ? $f->release_date : null, $f->vote_average);
    $db->addFilm($movie);
  }
}

echo json_encode('ok');