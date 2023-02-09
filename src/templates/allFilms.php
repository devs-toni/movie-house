<section class="all-films">
  <div class="all">
    <div class="all__controls">
        <h3>Catalogue</h3>
    </div>
    <?php
    $allPoster = $db->getAllFilms();
    if (count($allPoster) > 0) {
    ?> 
    <div class="all__main">
      <div class="all-films-container">
        <div id="paginatedList" class="list"></div>
      </div>
    </div>
    
    <nav class="all__nav" id="paginationContainer">
      <button class="left-arrow" id="prevButton">&lt;</button>    
      <div id="paginationNumbers"></div>
      <button class="right-arrow" id="nextButton">&gt;</button>
    </nav>
    <script type="text/javascript">
      doPagination(<?= count($allPoster) ?>);
    </script>
  </div>
<?php } ?> 
</section>