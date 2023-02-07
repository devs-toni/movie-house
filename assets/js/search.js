const searchInput = document.getElementById("searchInput");
const title = document.querySelector('.all-films__title');

searchInput && searchInput.addEventListener("keyup", searchMovies);


function searchMovies() {
  let movie = searchInput.value;
  const paginationContainer = document.getElementById("paginationContainer");

  if (movie.length >= 2) {
    title.textContent = 'Search Results';
    fetch("src/controllers/Search.php?schMovies=" + movie, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        paginationContainer.style.visibility = "hidden";
        printFilms(data);
      })
  }

  if (movie.length == 0) {
    title.textContent = 'Catalogue';
    setCurrentPage(currentPage);
    paginationContainer.style.visibility = "visible";
  }
}