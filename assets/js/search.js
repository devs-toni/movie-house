const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById('tableBody');
let adminPage = false;
const title = document.querySelector(".all-films__title");

searchInput && searchInput.addEventListener("keyup", searchMovies);

function searchMovies() {
  let movie = searchInput.value;
  const paginationContainer = document.getElementById("paginationContainer");
  const top10 = document.querySelector(".top-10");
  top10.style.display = 'none';
  if (movie.length >= 2) {
    title ? title.textContent = "Search Results" : "";
    fetch("src/controllers/Search.php?schMovies=" + movie, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
            if(!adminPage){
            paginationContainer.style.visibility = "hidden";
            printFilms(data, '#paginatedList');
            }else{
                searchEditFilms(data);
            }
      });
  }

  if (movie.length == 0) {
    title ? title.textContent = "Catalogue" : "";
        if(!adminPage){
        top10.style.display = "flex";
        setCurrentPage(currentPage);
        paginationContainer.style.visibility = "visible";
        }else{
            tableBody.innerHTML = "" ;
        }
  }
}
