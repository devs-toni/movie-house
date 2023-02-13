<?php
require_once(str_replace('\\', '/', __DIR__) . '/../../config.php');
require_once('../repository/MovieRepository.php');
require_once('../models/Movie.php');

$dbMovies = new MovieRepository();
$type = $_REQUEST['type'];

switch ($type) {
  case 'trend':
    $response = getTrendingFilms($dbMovies);
    break;
  case 'vote':
    $response = $dbMovies->getMostVotedMovies();
    break;
  case 'spa':
    $response = $dbMovies->getSpanishTopMovies();
    break;
  case 'it':
    $response = $dbMovies->getItalianTopMovies();
    break;

}

echo json_encode($response);

function getTrendingFilms($db)
{
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
  return $ids;
}