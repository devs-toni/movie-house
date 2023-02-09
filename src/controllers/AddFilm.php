<?php

require_once('../repository/Repository.php');
require_once('../models/Movie.php');

$db = new Repository();

$ID = $_POST['ID'];
$title = $_POST['title'];
$language = $_POST['language'];
$description = $_POST['description'];
$posterPath = $_POST['posterPath'];
$releaseDate = $_POST['releaseDate'];
$voteAverage = $_POST['voteAverage'];

$newMovie = new Movie($ID,$title,$language,$description,$posterPath,$releaseDate,$voteAverage);

$addFilm = $db->addFilm($newMovie);

echo json_encode("Added film");