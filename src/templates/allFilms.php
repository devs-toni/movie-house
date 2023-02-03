<section class="all-films">
    <h3 class="all-films__title">Catalogue</h3>
    <div class="all-films__container">
    <?php 
        $allPoster= $db->getAllFilms();
        foreach($allPoster as $poster){
            echo "<img class='container__img' src='". $urlImages. $poster."'>";
        }
    ?>
    </div>
</section>