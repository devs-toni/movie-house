<?php

class Templates
{
  static function addHeader(string $title, array $scriptsNotDefer, array $scriptsDefer)
  {
    ?>
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="assets/styles/css/index.min.css?v=<?=rand()?>">
            <?php foreach ($scriptsNotDefer as $s) { ?>
              <script src="assets/js/<?=$s?>.js?v=<?=rand()?>"></script>
            <?php } ?>
            <?php foreach ($scriptsDefer as $s) { ?>
              <script defer src="assets/js/<?=$s?>.js?v=<?=rand()?>"></script>
            <?php } ?>
            <title><?=$title?></title>
          </head>
          <body>
        <?php
  }

  static function addFooter()
  {
    ?>
          <button onclick="mainFetch();">Reiniciar Database</button>
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
}