<section class="all-films">
    <h3 class="all-films__title">Catalogue</h3>
    <div class="all-films__container"> 
      <ul id="paginatedList" aria-live="polite" class="all-films__container__paginated-list" style="display: none;">
      <?php
      $allPoster = $db->getAllFilms();
      foreach ($allPoster as $name => $poster) { ?>
             <li>
               <img src='<?= $urlImages . $poster ?>' alt='<?= $name ?>' onload='imageLoaded();'>
             </li>
        <?php } ?>
      <script>
      loadImages(<?= count($allPoster)?>)
      </script>
      </ul>
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

      <nav class="all-films__container__pagination-container">
        <button class="all-films__container__pagination-container__pagination-button" id="prevButton" title="Previous page" aria-label="Previous page">
        &lt;
        </button>
        <div id="paginationNumbers" class="all-films__container__pagination-container__pagination-numbers">
        </div>
    
        <button class="all-films__container__pagination-container__pagination-button" id="nextButton" title="Next page" aria-label="Next page">
        &gt;
        </button>
      </nav>
      <script type="text/javascript">
        doPagination();
      </script>
    </div>
</section>
