<?php

class Templates
{
  static function addHeader(string $title, array $scriptsNotDefer, array $scriptsDefer): void
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
      <script defer src="assets/js/search.js?v=<?= rand() ?>"></script>
      <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      <script defer src="https://kit.fontawesome.com/8bbf7b9ae4.js" crossorigin="anonymous"></script>
      <title><?= $title ?></title>
    </head>

    <body class="index-container">
      <div id="backgroundModalActive">
      <?php
    }

    static function addFooter(array|null $scripts)
    {
      ?>
        <?php foreach ($scripts as $s) { ?>
          <script src="assets/js/<?= $s ?>.js?v=<?= rand() ?>"></script>
        <?php } ?>
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
        <button onclick="openMenu()" class="navbar__button--user"><i class="fa-solid fa-user-group"></i></button>
        <div id="myDropdown" class="dropdown__dropdown-content">
          <a href="#">My Lists</a>
          <a onclick="openConfig();" href="#">Configuration</a>';

      $close =
        '   <a href="src/controllers/Logout.php">Logout</a> 
        </div>
      </div>';

      $loginButton =
        "<button class='navbar__button'><i class='fa-solid fa-right-to-bracket'></i></button>";
      $userButton = $isAdmin
        ?
        $dropdown . '<a href="admin.php">Admin</a>' . $close
        :
        $dropdown . $close;
  ?>
    <nav class="navbar">
      <?php
      require("searchInput.php");
      echo $isLogged ? $userButton : $loginButton
      ?>
    </nav>
<?php }
  }
