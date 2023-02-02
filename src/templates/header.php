<?php

class Templates
{
  static function addHeader($title)
  {
?>
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" type="text/css" href="./src/styles/css/index.min.css?v=<?php echo (rand()); ?>">
      <script defer src="./src/js/script.js?v=<?php echo (rand()); ?>"></script>
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
}
