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
$isAdult = false;

// USER LOGIN
if (isset($_SESSION['user']))
  Session::checkSessionExpiration();
if (isset($_SESSION['user'])) {
  $isLogged = true;
  $isAdmin = $dbUsers->isAdmin($_SESSION['user']);
  $isAdult = $dbUsers->isAdult($_SESSION['user']);
}

// TEMPLATES
Templates::addHeader('Neflis', ['loadApi', 'printFilms'], ['formValidation', 'configuration', 'script']);
Templates::addAside();
Templates::addNav($isLogged, $isAdmin);
if ($isAdult) {
  Templates::addNewSection('adult', 'Adult', 'Adult Films', 'sections');
  echo '<script src="assets/js/sectionAdult.js"></script>';
}
Templates::addNewSection('trend', 'Trend', 'Top Trending Films', 'sections');
if ($isLogged) {
  Templates::addNewSection('votes', 'Vote', 'Most Voted By Users', 'sections');
  echo '<script src="assets/js/sectionVoted.js"></script>';
}
Templates::addNewSection('spa', 'Spa', 'Top Spanish Films', 'sections');
Templates::addNewSection('it', 'It', 'Top Italian Films', 'sections');
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