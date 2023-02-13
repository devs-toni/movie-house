<?php
session_start();
require_once('config.php');
require_once(DIR_MODELS . 'User.php');
require_once(DIR_MODELS . 'Movie.php');
require_once(DIR_TEMPLATES . 'Templates.php');
require_once(DIR_REPO . 'MovieRepository.php');
require_once(DIR_REPO . 'ListsRepository.php');
require_once(DIR_REPO . 'UserRepository.php');
require_once(DIR_SESSION . 'Session.php');

if (isset($_SESSION['user']))
  Session::checkSessionExpiration();

$dbUsers = new UserRepository();
$isLogged = false;
$isAdmin = false;

if (isset($_SESSION['user'])) {
  $isLogged = true;
  $isAdmin = $dbUsers->isAdmin($_SESSION['user']);
}

Templates::addHeader('Lists', ['alerts'], ['manageLists']);
Templates::addAside();
Templates::addListsPage();
Templates::addFooter([]);
?>
<script>
  const listsReturn = document.querySelector('#listsReturn');
  listsReturn.addEventListener('click', () =>   window.location.href = "index.php");
</script>