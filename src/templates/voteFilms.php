<section class="top-10">
        <div class="top contenedor">
          <div class="top__controls">
            <h3>Most Voted Films</h3>
          </div>

          <div class="top__main">
            <button role="button" id="leftArrowVote" class="left-arrow">&lt;</button>
            <div class="carousel-votes-container">
              <div class="carousel-votes">
              </div>
            </div>
            <button role="button" id="rightArrowVote" class="right-arrow">&gt;</button>
          </div>
        </div>
        <script src="assets/js/voteFilms.js"></script>
        <script type="text/javascript">
          printFilms(null, '.carousel-votes', 'vote');
        </script>
    </div>
</section>