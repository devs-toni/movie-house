<?php

require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');

Templates::addHeader('Neflis', [], ['infoFilm']);

$filmId = $_GET['film'];
?>

<nav>
    <div>
        <i class="fa-solid fa-circle-arrow-left"></i>
        <i class="fa-solid fa-house"></i>
    </div>
    <i class="fa-solid fa-user"></i>
</nav>

<section>
    <div>
        <img id="imgFilm" src="" alt="" data-id=<?= $filmId ?>>
        <div>
            <i class="fa-solid fa-thumbs-up"></i>
            <i class="fa-solid fa-circle-plus"></i>
            <i class="fa-solid fa-comment"></i>
        </div>
    </div>
    <div>
        <div>
            <h2>Title</h2>
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
<?php
Templates::addFooter([]);
