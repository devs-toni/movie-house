<section class="all-films">
    <h3 class="all-films__title">Catalogue</h3>
    <div class="container">
    <?php
    $allPoster = $db->getAllFilms();
    if (count($allPoster) > 0) {
      ?>
        <ul id="paginatedList" aria-live="polite" class="container__pg-list hidden"></ul>

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
          doPagination(<?=count($allPoster)?>);
        </script>
<?php } ?> 
    </div>
</section>
