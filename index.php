<?php
session_start();
require_once('config.php');
require_once(DIR_MODELS . 'User.php');
require_once(DIR_MODELS . 'Movie.php');
require_once(DIR_TEMPLATES . 'Templates.php');
require_once(DIR_REPO . 'Repository.php');

$db = new Repository();
$isLogged = false;
$isAdmin = false;

if (isset($_SESSION['user'])) {
  $isLogged = true;
  $isAdmin = $db->isAdmin($_SESSION['user']);
}

Templates::addHeader('Neflis', ['pagination'], ['alerts','formValidation']);

include_once(DIR_TEMPLATES . 'aside.php');
Templates::addNav($isLogged, $isAdmin);

include_once(DIR_TEMPLATES . 'allFilms.php');
include_once(DIR_TEMPLATES . 'modalLogin.php');
include_once(DIR_TEMPLATES . 'modalSignUp.php');
Templates::addFooter(['modals']);