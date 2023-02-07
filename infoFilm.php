<?php

require_once('config.php');
require_once(DIR_TEMPLATES . 'Templates.php');

Templates::addHeader('Neflis', [], ['infoFilm']);

$filmName = $_GET['film'];
?>

<nav>
    <div>
        <button>Back</button>
        <button>Home</button>
    </div>
    <button>User</button>
</nav>

<section>
    <div>
        <img id="imgFilm" src="" alt="<?= $filmName ?>">
        <div>
            <button>Likes</button>
            <button>AddList</button>
            <button>AddComments</button>
        </div>
    </div>
    <div>
        <div>
            <h2><?= $filmName ?></h2>
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
Templates::addFooter();
