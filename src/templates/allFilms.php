<section class="all-films">
    <h3 class="all-films__title">Catalogue</h3>
    <div class="container">
    <?php
    $allPoster = $db->getAllFilms();
    if (count($allPoster) > 0) {
      Templates::addImageLoader();
      ?>
        <ul id="paginatedList" aria-live="polite" class="container__pg-list hidden">
          <?php
          foreach ($allPoster as $name => $poster) { ?>
            <li>
              <img src='<?= $urlImages . $poster ?>' alt='<?= $name ?>' onload='imageLoaded();'>
            </li>
    <?php } ?>
          <script>
            loadImages(<?= count($allPoster) ?>)
          </script>
        </ul>

        <nav class="container__pg-nav">
          <button class="pg-btn" id="prevButton" title="Previous page" aria-label="Previous page">
          &lt;
          </button>
          <div id="paginationNumbers">
          </div>
    
          <button class="pg-btn" id="nextButton" title="Next page" aria-label="Next page">
          &gt;
          </button>
        </nav>
        <script type="text/javascript">
          doPagination();
        </script>
<?php } ?> 
    </div>
</section>
