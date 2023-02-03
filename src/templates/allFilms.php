<section>
    <h3>Catalogue</h3>
    <div>
    <?php 
    $allPoster= $db->getAllFilms();
    foreach($allPoster as $poster){
        echo "<img src='". $urlImages. $poster."'>";
    }
    ?>
    </div>
</section>