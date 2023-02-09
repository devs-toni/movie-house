<?php
require_once('../repository/Repository.php');
$filmToEdit = $_POST;
$filmFile = $_FILES["uploadPosterPath"];

$posterPath = $filmToEdit["editPosterPath"];

if($posterPath == "") {
    $posterPath = insertImage($filmFile);
}

$db = new Repository();
$updateMovie = $db->editInfoFilm($filmToEdit["editTitle"], $filmToEdit["editLanguage"], $filmToEdit["editDescription"], $posterPath, $filmToEdit["editReleaseDate"], $filmToEdit["editVoteAverage"], intval($filmToEdit["id"]));
echo json_encode("Updated Film: " . $filmToEdit["id"]);

function insertImage($film) {
    if(empty($film["name"])) {
        return;
    }

    $file_name = $film["name"];
    $extension = pathinfo($film["name"], PATHINFO_EXTENSION);

    $ext_formats = array("png", "gif", "jpeg", "jpg");

    if(!in_array(strtolower($extension), $ext_formats)) {
        return;
    }

    if($film["size"] > 33000003008000) {
        return;
    }

    $targetDir = dirname(__File__, 3) . "/assets/posters/";
    
    if(!file_exists(($targetDir))) {
        @mkdir($targetDir);
    }

    $token = md5(uniqid(rand(), true));
    $file_name = $token . "." . $extension;

    $add = $targetDir.$file_name;
    $db_url_img = "assets/posters/$file_name";

    if(move_uploaded_file($film["tmp_name"], $add)) {
        return $db_url_img;
    }

}