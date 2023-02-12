<?php

require_once('../repository/Repository.php');
require_once('../models/Movie.php');

$db = new Repository();

$title = $_POST['title'];
$language = $_POST['language'];
$description = $_POST['description'];
$posterPath = $_POST['posterPath'];
$releaseDate = $_POST['releaseDate'];
$voteAverage = $_POST['voteAverage'];

$newMovie = new Movie($title,$language,$description,$posterPath,$releaseDate,$voteAverage);

$db->addFilm($newMovie);

echo json_encode("Added film");