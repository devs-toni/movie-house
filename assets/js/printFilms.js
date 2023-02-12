// DATA -> We have the results in the method call (catalog)
// CONTAINER -> div where we need to print the results, f.e. ".carousel-spa"
/* ACTION ->
*             mark: The most popular in the API
*             vote: The most voted in the DB
*             spa:  Spanish Films in the DB
*             porn: Adult section in the API            
*/


async function printFilms(data, container, action) {
const { imagesUrl, trendingUrl, apiUrl } = await getApiUrls();
  let printContainer = document.querySelector(container);
  let results = [];

  if (data) { // CATALOGUE
    printContainer.innerHTML = "";
    printDbFilms(data, printContainer, true);

  } else {
    switch (action) {
      case "mark":
        results = await fetchApi(trendingUrl);
        const file = new FormData();
        results = results.filter(f => f.poster_path !== null && f.release_date !== null);
        const json = JSON.stringify(results);
        file.append("films", json);
        let ids = await fetchDb('src/controllers/TrendingFilms.php', file);
        printApiFilms(results, printContainer, 20, false, ids, imagesUrl);
        break;

      case "vote":
        results = await fetchDb('src/controllers/MostVotedFilms.php', null);
        printDbFilms(results, printContainer, false);
        break;

      case "spa":
        results = await fetchDb('src/controllers/SpanishFilms.php', null);
        printDbFilms(results, printContainer, false);
        break;

      case "adult":
        let films = [];
        for (let i = 1; i <= 12; i++) {
          await fetch(`${apiUrl}&page=${i}&include_adult=true`)
            .then((res) => res.json())
            .then((res) => {
              films.push(res.results);
            })
            .catch((err) => console.error(err));
        }
        results = films.flat();
        results = results.filter(f => f.adult);
        printApiFilms(results, printContainer, 20, true, null, imagesUrl);
        break;
    }
  }

  printContainer.classList.remove("hidden");
  document.querySelectorAll('img[data-id]').forEach(img => {
    img.onclick = openInfoFilm;
  });
}

function printApiFilms(results, container, files, isAdult, ids, imagesUrl) {

  for (let i = 0; i < files; i++) {
    container.innerHTML += `<div class="carousel__film"><img class="${isAdult ? "adult" : ""}" src="${imagesUrl}${results[i].poster_path}" alt="${results[i].title}" ${!isAdult ? 'data-id=' : ''}${ids[i]}"></div>`;
  }
}

function printDbFilms(results, container, isCatalogue) {
  for (let i = 0; i < results[0].length; i++) {
    container.innerHTML += `<div class="${isCatalogue ? 'list__film' : 'carousel-votes__film'}"><img src="${results[2][i]}" alt="${results[1][i]}" data-id="${results[0][i]}"></div>`
  }
}