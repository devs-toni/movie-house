<?php

session_start();
require_once('../repository/ListsRepository.php');
$dbLists = new ListsRepository();
$type = $_REQUEST['type'];

switch ($type) {
  case 'getMovies':
    $response = getMoviesInList($dbLists);
    break;
  case 'getLists':
    $response = getAllLists($dbLists);
    break;
  case 'add':
    $response = addList($dbLists);
    break;
  case 'addFilmToList':
    $response = addFilmToList($dbLists);
    break;
  case 'choose':
    $response = $dbLists->getAllListUser($_REQUEST['idUser']);
    break;
  case 'delete':
    $response = deleteList($dbLists);
    break;
}

echo json_encode($response);

function getMoviesInList($db)
{
  $listId = $_REQUEST['list'];
  return $db->getMoviesList($listId);
}

function getAllLists($db)
{
  $user = $_SESSION['user'];
  $lists = $db->getAllListUser($user);

  if (count($lists) > 0) {
    $movies = $db->getMoviesList(array_key_first($lists));
    return ["lists" => $lists, "movies" => $movies];

  } else
    return 'N';
}

function addList($db)
{
  $user = $_SESSION['user'];
  $name = $_REQUEST['name'];
  if (!$db->listExist($name, $user)) {
    $db->addList($name, $user);
    $id = $db->getListUser($name, $user);
    return $id;

  } else
    return 'N';
}

function addFilmToList($db)
{
  $filmId = $_GET['film'];
  $listId = $_GET['list'];
  $db->addMovieToList($filmId, $listId);
  return "done";
}

function deleteList($db)
{
  $user = $_SESSION['user'];
  $listId = $_REQUEST['list'];
  $db->deleteMoviesListLinks($listId);
  $db->deleteList($listId);
  return 'OK';
}