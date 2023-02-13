const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById('tableBody');
const list = document.getElementById('paginatedList');
const title = document.querySelector(".all__title");
let adminPage = false;

searchInput && searchInput.addEventListener("keyup", searchMovies);

function searchMovies() {
  let movie = searchInput.value;
  adaptViewToSearch('hide');

  if (movie.length > 4) {
    title ? title.textContent = "Search Results" : "";
    fetch("src/controllers/Movies.php?type=search&schMovies=" + movie, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!adminPage) {
          printFilms(data, '#paginatedList');
        } else {
          searchEditFilms(data);
        }
      });
  }

  if (movie.length == 0) {
    title.textContent = "";
    if (!adminPage) {
      adaptViewToSearch('show');
      printFilms(null, '#paginatedList');
      list.innerHTML = '';
    } else {
      tableBody.innerHTML = "";
    }
  }
}

function adaptViewToSearch(action) {
  const listTrend = document.querySelector(".top-trend");
  const listSpa = document.querySelector(".top-spanish");
  const listAdult = document.querySelector(".top-p");
  const listVotes = document.querySelector(".top-votes");
  const lists = [listTrend, listSpa, listVotes, listAdult];

  if (action === 'hide') {
    lists.forEach((c) => c.classList.add('hidden'));
  } else {
    lists.forEach((c) => c.classList.remove('hidden'));
  }
}
