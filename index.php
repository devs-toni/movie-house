<?php
// INIT
session_start();
set_include_path(str_replace('\\', '/', __DIR__ . '/'));
require_once('config.php');
require_once(DIR_MODELS . 'User.php');
require_once(DIR_MODELS . 'Movie.php');
require_once(DIR_TEMPLATES . 'Templates.php');
require_once(DIR_REPO . 'Repository.php');
require_once(DIR_SESSION . 'Session.php');

// VARIABLES
$db = new Repository();
$isLogged = false;
$isAdmin = false;
$isAdult = false;

// USER LOGIN
if (isset($_SESSION['user']))
  Session::checkSessionExpiration();
if (isset($_SESSION['user'])) {
  $isLogged = true;
  $isAdmin = $db->isAdmin($_SESSION['user']);
  $isAdult = $db->isAdult($_SESSION['user']);
}

// TEMPLATES
Templates::addHeader('Neflis', ['pagination'], ['formValidation', 'returnIndex', 'configuration', 'openLists']);
include_once(DIR_TEMPLATES . 'aside.php');
Templates::addNav($isLogged, $isAdmin);
include_once(DIR_TEMPLATES . 'trendingFilms.php');
include_once(DIR_TEMPLATES . 'spanishFilms.php');
$isLogged && include_once(DIR_TEMPLATES . 'voteFilms.php');
$isAdult && include_once(DIR_TEMPLATES . 'pFilms.php');
include_once(DIR_TEMPLATES . 'allFilms.php');
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