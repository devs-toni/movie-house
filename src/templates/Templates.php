<?php

class Templates
{
  static function addHeader(string $title, array|null $scriptsNotDefer, array|null $scriptsDefer) : void
  {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" type="text/css" href="assets/styles/css/index.min.css?v=<?= rand() ?>">
<?php foreach ($scriptsNotDefer as $s) { ?>
        <script src="assets/js/<?= $s ?>.js?v=<?= rand() ?>"></script>
<?php } ?>
<?php foreach ($scriptsDefer as $s) { ?>
             <script defer src="assets/js/<?= $s ?>.js?v=<?= rand() ?>"></script>
<?php } ?>
      <title><?= $title ?></title>
    </head>
    <body>
    <?php
  }

  static function addFooter()
  {
    ?>
    </body>
    </html>
    <?php
  }

  static function addImageLoader()
  {
    ?>
    <div id="loader" class="loader">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading Catalogue</p>
    </div>
    <?php
  }

  static function addNav($isLogged, $isAdmin)
  {
    $dropdown =
      '<div class="dropdown">
        <button onclick="openMenu()" class="navbar__button--user dropbtn">User</button>
        <div id="myDropdown" class="dropdown-content">
          <a href="#">My Lists</a>
          <a href="#">Configuration</a>';
    
    $close =
      '   <a href="src/controllers/Logout.php">Logout</a> 
        </div>
      </div>';

    $loginButton =
      "<button class='navbar__button'>Login</button>";
    $userButton = $isAdmin
      ? 
      $dropdown . '<a href="admin.php">Admin</a>' . $close
      :
      $dropdown . $close;
    ?>
        <nav class="navbar">
            <input class="navbar__input" type="text" placeholder="Search">
            <?= $isLogged ? $userButton : $loginButton ?>
        </nav>
    <?php }
}