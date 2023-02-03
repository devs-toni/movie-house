<?php
require_once('Connection.php');

class Repository extends Connection
{

  function addUser(User $user): void
  {
    $this->connect();
    $pre = mysqli_prepare($this->con, 'INSERT INTO users (rol, username, email, password) VALUES (?,?,?,?)');

    $userRol = $user->getRol();
    $userName = $user->getUserName();
    $userEmail = $user->getEmail();
    $userPass = $user->getPassword();

    $pre->bind_param('ssss', $userRol, $userName, $userEmail, $userPass);
    $pre->execute();
    $pre->close();
    $this->con->close();
  }
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

  function deleteMovies() {
    $this->connect();
    mysqli_query($this->con, 'DELETE FROM MOVIES');
    $this->con->close();
  }
}