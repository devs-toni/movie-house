<?php
session_start();

require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');

Templates::addHeader('Neflis', [], ['infoFilm']);

$filmId = $_GET['film'];
$lastPage = $_GET['page'];

$_SESSION['lastPage'] = $lastPage;

?>
<div class="info-film">
    <nav class="info-film__nav">
        <i class="fa-solid fa-circle-arrow-left" id="btnReturn"></i>
    </nav>

    <section class="info-film__section">
        <div class="container__left">
            <img id="imgFilm" src="" alt="" data-id=<?= $filmId ?>>
            <div>
                <?php
                if (isset($_SESSION['user'])) {
                    echo "
                        <i class='fa-solid fa-thumbs-up' data-userId ={$_SESSION['user']}></i>
                        <i class='fa-solid fa-circle-plus' id='addFilmList'></i>
                        <i class='fa-solid fa-comment'></i>
                        ";
                }
                ?>
            </div>
        </div>
        <div class="container__right">
            <div class="container__right--info-film">
                <h2 id="titleFilm">Title</h2>
                <h4 id="dateFilm">Año</h4>
                <h3>SINOPSIS</h3>
                <p id="descriptionFilm">description</p>
            </div>
            <div class="container__right--info-comments">
                <div class="container__likes">
                    <h3 id="rateFilm">Calificación</h3>
                    <h3>Likes</h3>
                </div>
                <div class="container__comments" id="commentsFilm"></div>
            </div>
        </div>
    </section>


</div>
</div>
<dialog id="modalAddComment">
    <div class="modal__add-comment">
        <button id="closeAddComment" class="modal__add-comment--close">🗙</button>
        <form id="formComments">
            <textarea type="text" name="comment" placeholder="Leave your comment..."></textarea>
            <button id="btnSendComment"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
    </div>
</dialog>

<dialog class="modal">
    <div class="modal__container">
        <button class="modal__btn-close">🗙</button>
        <h2 class="modal__title">Add to list</h2>
        <button id="btnNewList">New List</button>
        <div id="containerLists">

        </div>
    </div>
</dialog>

<dialog class="modal" id="modalNewList">
    <div class="modal__container">
        <button class="modal__btn-close">🗙</button>
        <div>
            <h2>Put a name to the list</h2>
            <form id="formCreateNewList">
                <input name="nameList" id="nameList" type="text">
                <button>Create</button>
            </form>
        </div>
    </div>
</dialog>

<?php
Templates::addFooter([]);
