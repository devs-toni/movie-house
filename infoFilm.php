<?php
session_start();

require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');

$filmId = $_GET['film'];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Neflis</title>
    <link rel="stylesheet" type="text/css" href="assets/styles/css/index.min.css?v=<?= rand() ?>">
    <script defer src="https://kit.fontawesome.com/8bbf7b9ae4.js" crossorigin="anonymous"></script>
    <script defer src="assets/js/infoFilm.js?v=<?= rand() ?>"></script>
</head>

<body>
    <div class="info-film">
        <nav>
            <div>
                <i class="fa-solid fa-circle-arrow-left"></i>
                <i class="fa-solid fa-house"></i>
            </div>
            <?php
            if (isset($_SESSION['user'])) {
                echo "<i class='fa-solid fa-user'></i>";
            }
            ?>
        </nav>

        <section>
            <div>
                <img id="imgFilm" src="" alt="" data-id=<?= $filmId ?>>
                <div>
                    <?php
                    if (isset($_SESSION['user'])) {
                        echo "<i class='fa-solid fa-thumbs-up' data-userId ={$_SESSION['user']}></i>
            <i class='fa-solid fa-circle-plus'></i>
            <i class='fa-solid fa-comment'></i>";
                    }
                    ?>
                </div>
            </div>
            <div>
                <div>
                    <h2 id="titleFilm">Title</h2>
                    <h4 id="dateFilm">Año</h4>
                    <h3>Sipnosis</h3>
                    <p id="descriptionFilm">description</p>
                </div>
                <div>
                    <h3 id="rateFilm">Calificación</h3>
                    <div id="commentsFilm"></div>
                </div>
            </div>
        </section>


    </div>
    <dialog id="modalAddComment">
        <h2>Leave your comment...</h2>
        <form id="formComments">
            <textarea type="text" name="comment"></textarea>
            <button id="btnSendComment">Send</button>
        </form>
    </dialog>

</body>

</html>