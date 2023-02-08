<?php
session_start();

require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');

Templates::addHeader('Neflis', [], ['infoFilm']);

$filmId = $_GET['film'];
?>
<div class="info-film">
    <nav class="info-film__nav">
        <div>
            <i class="fa-solid fa-circle-arrow-left"></i>
        </div>
    </nav>

    <section class="info-film__section">
        <div class="container__left">
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
<dialog id="modalConfirmDelete" class="modal__delete-comment--confirm">
    <h4>Are you sure to delete this comment?</h4>
    <div>
        <button id="btnConfirmDelete">Yes</button>
        <button id="cancelDelete">No</button>
    </div>
</dialog>
<dialog id="modalMessageDeleted" class="modal__delete-comment--deleted">
    <h4><i class="fa-solid fa-circle-check"></i></h4>
    <h4>Your comment has been deleted correctly</h4>
</dialog>

<?php
Templates::addFooter([]);
