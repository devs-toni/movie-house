<?php
require_once('Repository.php');
require_once('../models/Movie.php');
require_once(str_replace('\\', '/', __DIR__) . '/../../config.php');

$db = new Repository();
$films = json_decode($_POST['films']);

$db->deleteMoviesLinks();
$db->deleteCommentLinks();
$db->deleteLikesLinks();
$db->deleteFilms();

for ($i = 0; $i < count($films); $i++) {
  $f = $films[$i];
  $posterPath = API_IMAGE_URL . $f->poster_path;
  if (!$f->adult && ($f->original_language === 'en' || $f->original_language === 'es')) {
    $movie = new Movie($f->id, $f->title, $f->original_language, $f->overview, $posterPath, isset($f->release_date) ? $f->release_date : null, $f->vote_average);
    $db->addFilm($movie);
  }
}

echo json_encode('ok');
