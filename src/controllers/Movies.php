<?php
require_once('../repository/MovieRepository.php');
require_once('../models/Movie.php');

$dbMovies = new MovieRepository();
$type = $_REQUEST['type'];

switch ($type) {
  case 'add':
    $response = addMovie($dbMovies);
    break;
  case 'addComment':
    $response = addComment($dbMovies);
    break;
  case 'delComment':
    $response = deleteComment($dbMovies);
    break;
  case 'delMovie':
    $response = deleteMovie($dbMovies);
    break;
  case 'search':
    $response = searchMovies($dbMovies);
    break;
  case 'info':
    $response = getInfo($dbMovies);
    break;
  case 'like':
    $response = handleLikes($dbMovies);
    break;
  case 'check':
    $response = checkMovie($dbMovies);
    break;
  case 'update':
    $response = updateMovie($dbMovies);
    break;
}

echo json_encode($response);

function addMovie($db)
{
  $title = $_REQUEST['title'];
  $language = $_REQUEST['language'];
  $description = $_REQUEST['description'];
  $posterPath = $_REQUEST['posterPath'];
  $releaseDate = $_REQUEST['releaseDate'];
  $voteAverage = $_REQUEST['voteAverage'];
  $movie = new Movie($title, $language, $description, $posterPath, $releaseDate, $voteAverage);
  $db->addFilm($movie);
  return 'Ok';
}

function deleteMovie($db)
{
  $filmId = $_REQUEST['film'];
  $dltFilm = $db->deleteSelectFilm($filmId);
  return "deleted film: " . $filmId;
}

function searchMovies($db)
{
  $schMovies = $_REQUEST['schMovies'];
  return $db->getSearchMovies($schMovies);
}

function getInfo($db)
{
  $filmId = $_REQUEST['film'];
  return $db->getInfoFilm($filmId);
}

function addComment($db)
{
  $userId = $_REQUEST['idUserRegistered'];
  $filmId = $_REQUEST['idOpenedFilm'];
  $comment = $_REQUEST['comment'];
  $newComment = $db->addCommentFilm($userId, $filmId, $comment);
  return $newComment;
}

function deleteComment($db)
{
  $idComment = $_REQUEST["idComment"];
  return $db->deleteComment($idComment);
}

function handleLikes($db)
{
  $filmId = $_GET['film'];
  $userId = $_GET['user'];
  $idLike = $db->checkIfisAlreadyRated($filmId, $userId);
  if ($idLike) {
    $db->deleteLike($idLike);
    $db->substrLikeRate($filmId);
    $res = "isDeleted";
  } else {
    $db->insertLike($filmId, $userId);
    $db->addLikeRate($filmId);
    $res = "isAdded";
  }
  return $res;
}

function checkMovie($db)
{
  $filmId = $_GET['film'];
  $userId = $_GET['user'];
  $idLike = $db->checkIfisAlreadyRated($filmId, $userId);
  if ($idLike) {
    $res = true;
  } else {
    $res = false;
  }
  return $res;
}

function updateMovie($db)
{
  $filmToEdit = $_POST;
  $filmFile = $_FILES["uploadPosterPath"];
  $posterPath = $filmToEdit["editPosterPath"];

  if ($posterPath == "") {
    $posterPath = insertImage($filmFile);
  }

  $updateMovie = $db->editInfoFilm($filmToEdit["editTitle"], $filmToEdit["editLanguage"], $filmToEdit["editDescription"], $posterPath, $filmToEdit["editReleaseDate"], $filmToEdit["editVoteAverage"], intval($filmToEdit["id"]));

  function insertImage($film)
  {
    if (empty($film["name"])) {
      return;
    }
    $file_name = $film["name"];
    $extension = pathinfo($film["name"], PATHINFO_EXTENSION);
    $ext_formats = array("png", "gif", "jpeg", "jpg");
    if (!in_array(strtolower($extension), $ext_formats)) {
      return;
    }
    if ($film["size"] > 33000003008000) {
      return;
    }
    $targetDir = dirname(__FILE__, 3) . "/assets/posters/";
    if (!file_exists(($targetDir))) {
      @mkdir($targetDir);
    }
    $token = md5(uniqid(rand(), true));
    $file_name = $token . "." . $extension;
    $add = $targetDir . $file_name;
    $db_url_img = "assets/posters/$file_name";
    if (move_uploaded_file($film["tmp_name"], $add)) {
      return $db_url_img;
    }
  }
  return "Updated Film: " . $filmToEdit["id"];
}