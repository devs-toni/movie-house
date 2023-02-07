const searchInput = document.getElementById("searchInput");

searchInput && searchInput.addEventListener("keyup", searchMovies);

function searchMovies() {
  let ul = document.querySelector("#paginatedList");

  let movie = searchInput.value;
  const paginationContainer = document.getElementById("paginationContainer");

  if (movie.length >= 2) {
    fetch("src/controllers/Search.php?schMovies=" + movie, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        paginationContainer.style.visibility = "hidden";
        printFilms(data);
      });
  }

  if (movie.length == 0) {
    setCurrentPage(currentPage);
    paginationContainer.style.visibility = "visible";
  }
}
