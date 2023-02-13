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
          <a onclick="openMyLists();">My Lists</a>
          <a onclick="openConfig();" href="#">Configuration</a>';

    $close =
      '   <a href="src/controllers/Users.php?type=logout">Logout</a> 
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
                          <input class="navbar__input" id="searchInput" type="text" placeholder="Search">
                          <?php echo $isLogged ? $userButton : $loginButton ?>
                        </nav>
          <?php }

  static function addSearchSection()
  {
    ?>
                      <section class="all-films">
                      <div class="all">
                        <div class="all__controls">
                            <h3 class="all__title"></h3>
                        </div>
                        <div class="all__main">
                          <div class="all-films-container">
                            <div id="paginatedList" class="list"></div>
                          </div>
                        </div>
                      </div>
                    </section>
                  <?php
  }

  static function addAside()
  {
    ?>
                  <div class="aside">
                    <p>Neflis</p>
                  </div>
                <?php
  }
  static function addListsPage()
  {
    ?>
             <div class="lists-container">
              <nav class="nav">
                <i class="fa-solid fa-circle-arrow-left" id="listsReturn"></i>
              </nav>
              <div class="main-container">
                <div class="title">
                  <h2>Lists</h2>
                  <form id="formList">
                    <input type="text" id="listName" name="listName" placeholder="Enter list name" required>
                    <button type="submit" id="addList"><i class="fa-sharp fa-regular fa-plus"></i></button>
                  </form>
                  <div id="ulLists" class="lists"></div>
                </div>
    
                <div class="main">
                  <div id="films" class="main__films"></div>
                </div>
              </div>
            </div>
                <?php
  }

  static function addNewSection($name, $title)
  {
    if (str_contains($title, '_')) {
      $array = [];
      $arrayTitle = explode(' ', str_replace('_', ' ', $title));
      foreach ($arrayTitle as $word) {
        array_push($array, ucfirst($word));
      }
      $title = implode(' ', $array);
    }
    ?>
                <section class="top-<?= $name ?>" id="top-section">
              <div class="top">
                <div class="top__controls">
                  <h3><?= $title ?></h3>
                </div>
                <div class="top__main">
      
                  <button role="button" id="leftArrow<?= ucfirst($name) ?>" class="left-arrow">&lt;</button>
      
                  <div class="carousel-container" id="carousel-<?= $name ?>-container">
                    <div class="carousel" id="carousel-<?= $name ?>"></div>
                  </div>
      
                  <button role="button" id="rightArrow<?= ucfirst($name) ?>" class="right-arrow">&gt;</button>
                </div>
              </div>
              <script type="text/javascript">
                printFilms(null, '#carousel-<?= $name ?>', '<?= $name ?>');
              </script>
            </section>
                <?php
  }

}