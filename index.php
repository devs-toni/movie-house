<?php
require_once('config.php');
require_once(SITE_ROOT . '/src/repository/Repository.php');
require_once(SITE_ROOT . '/src/templates/header.php');
require_once(SITE_ROOT . '/src/models/User.php');
$db = new Repository();




    $urlImages = "https://image.tmdb.org/t/p/w500";
    $urlFetch = "https://api.themoviedb.org/3/movie/popular?api_key=f97d6a2165e719275828bcd71a17fccc&language=en-US&page=1";


Templates::addHeader('Neflis');

include(SITE_ROOT . '/src/templates/footer.php');
?>