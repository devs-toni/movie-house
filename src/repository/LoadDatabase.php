<?php
require_once('AdminRepository.php');
require_once('MoviesRepository.php');
require_once('../models/Movie.php');
require_once(str_replace('\\', '/', __DIR__) . '/../../config.php');

$dbAdmin = new AdminRepository();
$dbMovies = new MovieRepository();
$films = json_decode($_POST['films']);

$dbAdmin->deleteMoviesLinks();
$dbAdmin->deleteGenresLinks();
$dbAdmin->deleteCommentLinks();
$dbAdmin->deleteLikesLinks();
$dbAdmin->deleteFilms();

for ($i = 0; $i < count($films); $i++) {
  $f = $films[$i];
  $posterPath = API_IMAGE_URL . $f->poster_path;
  if (!$f->adult && ($f->original_language !== 'ko' && $f->original_language !== 'ja')) {
    $movie = new Movie($f->title, $f->original_language, $f->overview, $posterPath, isset($f->release_date) ? $f->release_date : null, $f->vote_average);
    $dbMovies->addFilm($movie);
    $id = $dbMovies->getFilmId($f->title, $f->overview);
    foreach ($f->genre_ids as $genre) {
      $dbMovies->addMovieGenres($id, $genre);
    }
  }
}

echo json_encode('Ok');