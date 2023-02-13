<?php
require_once('Connection.php');

class MovieRepository extends Connection
{

  function addGenre($id, $name)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'INSERT INTO genres (id, name) VALUES (?,?)');
    $pre->bind_param('is', $id, $name);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }

    function addMovieGenres($idFilm, $genre)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'INSERT INTO movies_genres (id_movie, id_genre) VALUES (?,?)');
    $pre->bind_param('ii', $idFilm, $genre);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }

  // FILMS

  function addFilm(Movie $film): void
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'INSERT INTO movies (title, language, description, poster_path, release_date, vote_average, vote_count) VALUES (?,?,?,?,?,?,?)');

    $title = $film->getTitle();
    $lang = $film->getLanguage();
    $desc = $film->getDescription();
    $poster = $film->getPosterPath();
    $date = $film->getReleaseDate();
    $vote_average = $film->getVoteAverage();
    $vote_count = $film->getVoteCount();

    $pre->bind_param('sssssdi', $title, $lang, $desc, $poster, $date, $vote_average, $vote_count);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }

  function getFilmId($title, $overview)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'SELECT id FROM movies WHERE title = ? AND description = ?');

    $pre->bind_param('ss', $title, $overview);
    $pre->execute();
    $result = $pre->get_result();
    $resp = null;
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $resp = $row['id'];
      }
    }
    $pre->close();
    $this->con->close();
    return strlen($resp) > 0 ? $resp : null;
  }

  function existFilm($id)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'SELECT title FROM movies WHERE id = ?');
    $pre->bind_param('i', $id);
    $pre->execute();
    $result = $pre->get_result();

    if (mysqli_num_rows($result) > 0) {
      $response = true;
    } else {
      $response = false;
    }
    $pre->close();
    $this->con->close();
    return $response;
  }

  function getAllFilms()
  {
    $this->connect();
    $allPosterMovies = [];
    $result = mysqli_query($this->con, 'SELECT title, poster_path FROM movies');
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        $allPosterMovies[$row['title']] = $row["poster_path"];
      }
    }
    $this->con->close();
    return $allPosterMovies;
  }

  function getMostVotedMovies()
  {
    $ids = [];
    $titles = [];
    $posters = [];
    $posterMovies = [];

    $this->connect();

    $result = mysqli_query($this->con, 'SELECT id, title, poster_path FROM movies ORDER BY vote_count DESC LIMIT 20');
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        array_push($ids, $row['id']);
        array_push($titles, $row['title']);
        array_push($posters, $row['poster_path']);
      }
    }
    array_push($posterMovies, $ids, $titles, $posters);
    $this->con->close();
    return $posterMovies;
  }

  function getSpanishTopMovies()
  {
    $ids = [];
    $titles = [];
    $posters = [];
    $posterMovies = [];

    $this->connect();
    $result = mysqli_query($this->con, 'SELECT id, title, poster_path FROM movies WHERE language="es" ORDER BY vote_count DESC LIMIT 20');
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        array_push($ids, $row['id']);
        array_push($titles, $row['title']);
        array_push($posters, $row['poster_path']);
      }
    }
    array_push($posterMovies, $ids, $titles, $posters);
    $this->con->close();
    return $posterMovies;
  }

  function getItalianTopMovies()
  {
    $ids = [];
    $titles = [];
    $posters = [];
    $posterMovies = [];

    $this->connect();
    $result = mysqli_query($this->con, 'SELECT id, title, poster_path FROM movies WHERE language="it" ORDER BY vote_count DESC LIMIT 20');
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        array_push($ids, $row['id']);
        array_push($titles, $row['title']);
        array_push($posters, $row['poster_path']);
      }
    }
    array_push($posterMovies, $ids, $titles, $posters);
    $this->con->close();
    return $posterMovies;
  }

    function deleteMoviesListLinks($listId)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'DELETE FROM movies_in_list WHERE id_list=?');
    $pre->bind_param("i", $listId);
    $pre->execute();
    $this->con->close();
  }

    function deleteList($listId)
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'DELETE FROM list_user_movies WHERE id=?');
    $pre->bind_param("i", $listId);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }

  function getPaginationMovies($min, $size)
  {
    $this->connect();

    $ids = [];
    $titles = [];
    $posters = [];
    $posterMovies = [];

    $pre = mysqli_prepare($this->con, 'SELECT id, title, poster_path FROM movies LIMIT ?, ?');
    $pre->bind_param('ii', $min, $size);
    $pre->execute();
    $result = $pre->get_result();

    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        array_push($ids, $row['id']);
        array_push($titles, $row['title']);
        array_push($posters, $row['poster_path']);
      }
    }
    array_push($posterMovies, $ids, $titles, $posters);
    $this->con->close();
    return $posterMovies;
  }

  function getSearchMovies($movie)
  {
    $this->connect();

    $ids = [];
    $titles = [];
    $posters = [];
    $searchMovies = [];

    $result = mysqli_query($this->con, 'SELECT id, title, poster_path FROM movies WHERE title COLLATE utf8mb4_general_ci LIKE "%' . $movie . '%"');
    if (mysqli_num_rows($result) > 0) {
      while ($row = mysqli_fetch_assoc($result)) {
        array_push($ids, $row['id']);
        array_push($titles, $row['title']);
        array_push($posters, $row['poster_path']);
      }
    }
    array_push($searchMovies, $ids, $titles, $posters);
    $this->con->close();
    return $searchMovies;
  }

  function getInfoFilm($filmId)
  {
    $queryInfoFilm = 'SELECT id, title, language, description, poster_path, release_date, vote_average, vote_count FROM movies 
        WHERE id=?';
    $queryComments = 'SELECT comments.id, text, id_user, username FROM comments 
        INNER JOIN users ON comments.id_user = users.id
        WHERE comments.id_movie = ?';

    $this->connect();
    $pre = mysqli_prepare($this->con, $queryInfoFilm);
    $pre->bind_param("i", $filmId);
    $pre->execute();
    $res = $pre->get_result();
    $info = (object) [];

    while ($row = $res->fetch_assoc()) {
      $idMovie = $row['id'];
      $info = (object) [
        "title" => $row["title"],
        "language" => $row["language"],
        "description" => $row["description"],
        "imgPath" => $row["poster_path"],
        "date" => $row["release_date"],
        "average" => $row["vote_average"],
        "rate" => $row["vote_count"],
        "comments" => []
      ];
    }
    $pre->close();

    $pre = mysqli_prepare($this->con, $queryComments);
    $pre->bind_param("i", $idMovie);
    $pre->execute();
    $res2 = $pre->get_result();

    $comments = [];
    if (mysqli_num_rows($res2) > 0) {
      while ($row = $res2->fetch_assoc()) {
        $comment = (object) [
          "idComment" => $row["id"],
          "idUser" => $row["id_user"],
          "username" => $row["username"],
          "comment" => $row["text"]
        ];
        array_push($comments, $comment);
      }
    }

    count($comments) > 0 && $info->comments = $comments;

    $pre->close();
    $this->con->close();
    return $info;
  }

  //LIKES

  function checkIfisAlreadyRated($filmId, $userId)
  {

    $querySelect = "SELECT id FROM likes WHERE id_movie=? && id_user=?";

    $this->connect();
    $pre = mysqli_prepare($this->con, $querySelect);
    $pre->bind_param("ii", $filmId, $userId);
    $pre->execute();
    $res = $pre->get_result();

    if (mysqli_num_rows($res) > 0) {
      while ($row = $res->fetch_assoc()) {
        $idLike = $row['id'];
      }
    } else {
      $idLike = "";
    }

    $pre->close();
    $this->con->close();
    return $idLike;
  }

  function deleteLike($likeId)
  {
    $queryDelete = "DELETE FROM likes WHERE id=?";
    $this->connect();
    $pre = mysqli_prepare($this->con, $queryDelete);
    $pre->bind_param("i", $likeId);
    $pre->execute();

    $pre->close();
    $this->con->close();
  }

  function insertLike($filmId, $userId)
  {
    $queryInsert = "INSERT INTO likes (id_user, id_movie) VALUES (?, ?)";

    $this->connect();
    $pre = mysqli_prepare($this->con, $queryInsert);
    $pre->bind_param("ii", $userId, $filmId);
    $pre->execute();

    $pre->close();
    $this->con->close();
  }

  function addLikeRate($filmId)
  {
    $queryUpdateRateAdd = "UPDATE movies SET vote_count = (@cur_value := vote_count) + 1 WHERE id=?";

    $this->connect();
    $pre = mysqli_prepare($this->con, $queryUpdateRateAdd);
    $pre->bind_param("i", $filmId);
    $pre->execute();

    $pre->close();
    $this->con->close();
  }

  function substrLikeRate($filmId)
  {
    $queryUpdateRateSub = "UPDATE movies SET vote_count = (@cur_value := vote_count) - 1 WHERE id=?";

    $this->connect();
    $pre = mysqli_prepare($this->con, $queryUpdateRateSub);
    $pre->bind_param("i", $filmId);
    $pre->execute();

    $pre->close();
    $this->con->close();
  }

  //COMMENTS

  function addCommentFilm($userId, $filmId, $comment)
  {
    $query = "INSERT INTO comments (id_user, id_movie, text) VALUES (?,?,?)";
    $queryComments = 'SELECT comments.id, text, id_user, username FROM comments 
        INNER JOIN users ON comments.id_user = users.id
        WHERE comments.id_movie = ? && comments.id_user = ? && comments.text = ?';

    $this->connect();
    $pre = mysqli_prepare($this->con, $query);
    $pre->bind_param("iis", $userId, $filmId, $comment);
    $pre->execute();
    $pre->close();

    $pre = mysqli_prepare($this->con, $queryComments);
    $pre->bind_param("iis", $filmId, $userId, $comment);
    $pre->execute();
    $res = $pre->get_result();

    if (mysqli_num_rows($res) > 0) {
      while ($row = $res->fetch_assoc()) {
        $comment = (object) [
          "idComment" => $row["id"],
          "idUser" => $row["id_user"],
          "username" => $row["username"],
          "comment" => $row["text"]
        ];
      }
    }

    $pre->close();
    $this->con->close();
    return $comment;
  }

  function editInfoFilm($title, $language, $description, $poster, $date, $average, $id)
  {
    $queryEdit = "UPDATE movies SET title=?, language=?, description=?, poster_path=?, release_date=?, vote_average=? WHERE movies.id=?";

    $this->connect();
    $pre = mysqli_prepare($this->con, $queryEdit);
    $pre->bind_param("sssssdi", $title, $language, $description, $poster, $date, $average, $id);
    $pre->execute();
    $pre->close();

    $this->con->close();
  }


  function deleteSelectFilm($id)
  {
    $queryDelete = 'DELETE FROM movies WHERE movies.id=?';
    $this->connect();
    $pre = mysqli_prepare($this->con, $queryDelete);
    $pre->bind_param('i', $id);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }


  function deleteComment($idComment)
  {
    $query = "DELETE FROM comments WHERE id=?";

    $this->connect();
    $pre = mysqli_prepare($this->con, $query);
    $pre->bind_param("i", $idComment);
    $pre->execute();

    $pre->close();
    $this->con->close();
    return "deleted";
  }
}