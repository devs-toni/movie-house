<?php
require_once('config.php');
require_once(SITE_ROOT . '/src/models/User.php');
require_once(SITE_ROOT . '/src/models/Movie.php');
require_once(SITE_ROOT . '/src/templates/Templates.php');
require_once(SITE_ROOT . '/src/repository/Repository.php');
$db = new Repository();

Templates::addHeader('Neflis', ['pagination', 'loadDb'], ['modals']);

include_once("./src/templates/aside.php");

$logButton = true;
$loginButton = "<button class='navbar__button'>Login</button>";
$userButton = "<button class='navbar__button--user'>User</button>";


?>

<nav class="navbar">
    <input class="navbar__input" type="text" placeholder="Search">
    <?php echo $logButton ? $loginButton : $userButton ?>
</nav>


<?php
include_once("./src/templates/allFilms.php");
include(SITE_ROOT . '/src/templates/modalLogin.php');
include(SITE_ROOT . '/src/templates/modalSignUp.php');
Templates::addFooter();