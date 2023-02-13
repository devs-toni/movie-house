<?php

class AdminRepository extends Connection
{

  function deleteFilms()
  {
    $this->connect();
    mysqli_query($this->con, 'DELETE FROM MOVIES');
    $this->con->close();
  }

  function deleteMoviesLinks()
  {
    $this->connect();
    mysqli_query($this->con, 'DELETE FROM movies_in_list');
    $this->con->close();
  }

  function deleteCommentLinks()
  {
    $this->connect();
    mysqli_query($this->con, 'DELETE FROM comments');
    $this->con->close();
  }

  function deleteLikesLinks()
  {
    $this->connect();
    mysqli_query($this->con, 'DELETE FROM likes');
    $this->con->close();
  }
  function deleteGenresLinks()
  {
    $this->connect();
    mysqli_query($this->con, 'DELETE FROM movies_genres');
    $this->con->close();
  }
  function deleteGenres()
  {
    $this->connect();
    mysqli_query($this->con, 'DELETE FROM genres');
    $this->con->close();
  }
}