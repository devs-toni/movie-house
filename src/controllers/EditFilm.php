<?php
require_once('../repository/Repository.php');

$filmToEdit = json_decode($_POST['film']);
$db = new Repository();
$updateMovie = $db->editInfoFilm($filmToEdit->editTitle, $filmToEdit->editLanguage, $filmToEdit->editDescription, $filmToEdit->editPosterPath, $filmToEdit->editReleaseDate, $filmToEdit->editVoteAverage, $filmToEdit->id);
echo json_encode("Updated Film: " . $filmToEdit->id);