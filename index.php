<?php
// INIT
session_start();

require_once('config.php');
require_once(DIR_MODELS . 'User.php');
require_once(DIR_MODELS . 'Movie.php');
require_once(DIR_TEMPLATES . 'Templates.php');
require_once(DIR_REPO . 'MovieRepository.php');
require_once(DIR_REPO . 'UserRepository.php');
require_once(DIR_SESSION . 'Session.php');

// VARIABLES
$dbMovies = new MovieRepository();
$dbUsers = new UserRepository();
$isLogged = false;
$isAdmin = false;
$isAdult = true;
$sections = ['history', 'thriller', 'action', 'comedy', 'adventure', 'horror', 'drama', 'crime', 'fantasy', 'documentary', 'science_fiction', 'western', 'mystery', 'music', 'romance', 'family', 'war'];

// USER LOGIN
if (isset($_SESSION['user']))
  Session::checkSessionExpiration();
if (isset($_SESSION['user'])) {
  $isLogged = true;
  $isAdmin = $dbUsers->isAdmin($_SESSION['user']);
  $isAdult = $dbUsers->isAdult($_SESSION['user']);
}

// TEMPLATES
Templates::addHeader('Movie House', ['loadApi', 'printFilms'], ['formValidation', 'configuration', 'script']);
Templates::addAside();
Templates::addNav($isLogged, $isAdmin);
if ($isAdult) {
  Templates::addNewSection('adult', 'Adult Films');
  echo '<script src="assets/js/sectionAdult.js"></script>';
}

Templates::addNewSection('trend', 'Trending');
foreach ($sections as $sec) {
  Templates::addNewSection($sec, ucfirst($sec));
}
if ($isLogged) {
  Templates::addNewSection('votes', 'Most Voted By Users');
  echo '<script src="assets/js/sectionVoted.js"></script>';
}
Templates::addNewSection('spa', 'Spanish');
Templates::addNewSection('it', 'Italian');
echo '<script src="assets/js/sections.js"></script>';
Templates::addSearchSection();

include_once(DIR_TEMPLATES . 'modalLogin.php');
include_once(DIR_TEMPLATES . 'modalSignUp.php');
include_once(DIR_TEMPLATES . 'modalConfig.php');
Templates::addFooter(['modals', 'alerts']);

//ALERT EXPIRATION
if (isset($_REQUEST['expire'])) {
  ?>
                  <script>
                    window.history.pushState('', '', 'index.php');
                    customAlert('center', 'info', '', '<h4>Session expired . . .</h4>', false, 4000, '#232323', '#ff683f');
                  </script>
                <?php
}