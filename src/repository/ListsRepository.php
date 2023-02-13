<?php
require_once('Connection.php');

class ListsRepository extends Connection
{

  function getMoviesList($list)
  {
    $this->connect();
    $allMovies = [];
    $pre = mysqli_prepare($this->con, 'SELECT id_movie, poster_path, title FROM movies_in_list ml INNER JOIN movies m ON m.id = ml.id_movie WHERE id_list = ?');
    $pre->bind_param('i', $list);
    $pre->execute();
    $result = $pre->get_result();
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $movie = (object) [
          "id" => $row["id_movie"],
          "img" => $row["poster_path"],
          "name" => $row["title"],
        ];
        array_push($allMovies, $movie);
      }
    }
    $this->con->close();
    return $allMovies;
  }

  function addMovieToList($filmId, $listId)
  {
    $query = "INSERT INTO movies_in_list (id_list, id_movie) VALUES (?,?)";

    $this->connect();
    $pre = mysqli_prepare($this->con, $query);
    $pre->bind_param("ii", $listId, $filmId);
    $pre->execute();

    $pre->close();
    $this->con->close();
  }

  function getListUser($name, $user)
  {
    $this->connect();
    $response = '';
    $pre = mysqli_prepare($this->con, 'SELECT l.id FROM list_user_movies l INNER JOIN users u ON l.id_user = u.id WHERE l.name = ? AND l.id_user = ?');
    $pre->bind_param('si', $name, $user);
    $pre->execute();
    $result = $pre->get_result();
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $response = $row['id'];
      }
    }
    $this->con->close();
    return $response;
  }

  function listExist($name, $user)
  {
    $this->connect();
    $response = '';
    $pre = mysqli_prepare($this->con, 'SELECT count(u.id) id FROM list_user_movies l INNER JOIN users u ON l.id_user = u.id WHERE l.name = ? AND l.id_user = ?');
    $pre->bind_param('si', $name, $user);
    $pre->execute();
    $result = $pre->get_result();
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $response = $row['id'];
      }
    }
    $this->con->close();

    if ($response)
      return true;
    else
      return false;
  }

  function addList($name, $user): void
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'INSERT INTO list_user_movies (name, id_user) VALUES (?,?)');
    $pre->bind_param('si', $name, $user);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }

  function getAllListUser($user)
  {
    $this->connect();
    $allLists = [];
    $pre = mysqli_prepare($this->con, 'SELECT id, name FROM list_user_movies WHERE id_user = ?');
    $pre->bind_param('i', $user);
    $pre->execute();
    $result = $pre->get_result();
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $allLists[$row['id']] = $row['name'];
      }
    }
    $this->con->close();
    return $allLists;
  }
}