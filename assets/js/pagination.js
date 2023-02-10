let currentPage;
let pageCount;
const paginationLimit = 24;


function doPagination(total) {
  window.addEventListener("load", () => {
    loadFilms(total);
  });
}

function loadFilms(total) {
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("prevButton");
  pageCount = Math.ceil(total / paginationLimit);

  getPaginationNumbers(pageCount);
  setCurrentPage(1, pageCount);
  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1, pageCount);
  });
  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1, pageCount);
  });
  document.querySelectorAll(".pg-num").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex, pageCount);
      });
    }
  });
}

const getPaginationNumbers = (pageCount) => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pg-num").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

const handlePageButtonsStatus = (pageCount) => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const appendPageNumber = (index) => {
  const paginationNumbers = document.getElementById("paginationNumbers");
  const pageNumber = document.createElement("button");
  pageNumber.className = "pg-num";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};

function openInfoFilm(e) {
  window.location.href =
    "infoFilm.php?film=" + e.target.dataset.id + "&page=" + currentPage;
}

////////////////////////////////////////////////////////////////////////////////////////////////// UTIL METHODS ////

const setCurrentPage = async (pageNum, pageCount) => {
  currentPage = pageNum;
  handleActivePageNumber();
  handlePageButtonsStatus(pageCount);
  const prevRange = (pageNum - 1) * paginationLimit;

  await fetch(`src/controllers/PaginationResults.php?min=${prevRange}`)
    .then((res) => res.json())
    .then((res) => {
      printFilms(res, '#paginatedList');
    })
    .catch((err) => {
      console.error(err);
    });
}

const fetchApi = async (url) => {
  let results;
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      results = res.results;
    })
    .catch((err) => {
      console.error(err);
    });
  return results;
}
const fetchDb = async (url, body) => {
  let config;
  if (body) {
    config = {
      'method': 'POST',
      'body': body,
    }
  }
  let response;
  await fetch(url, config ? config : null)
    .then((res) => res.json())
    .then((res) => {
      if (res !== 'OK') {
        response = res;
      }
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
}

async function printFilms(data, container, action) {
  const { url, trendingUrl, general } = await getApiUrls();
  let printContainer = document.querySelector(container);

  if (data) {
    printContainer.innerHTML = "";
    printDbFilms(data, printContainer);
  } else {
    if (action === 'mark') {
      results = await fetchApi(trendingUrl);
      const file = new FormData();
      results = results.filter(f => f.poster_path !== null && f.release_date !== null);
      const json = JSON.stringify(results);
      file.append("films", json);
      fetchDb('src/controllers/TrendingFilms.php', file);
      printApiFilms(results, printContainer, 20, false);
    } else if (action === 'vote') {
      results = await fetchDb('src/controllers/MostVotedFilms.php', null);
      printDbVotedFilms(results, printContainer);
    } else if (action === 'spa') {
      results = await fetchDb('src/controllers/SpanishFilms.php', null);
      printDbVotedFilms(results, printContainer);
    } else {
      let films = [];
      for (let i = 1; i <= 12; i++) {
        await fetch(`${general}&page=${i}&include_adult=true`)
          .then((res) => res.json())
          .then((res) => {
            films.push(res.results);
          })
          .catch((err) => console.error(err));
      }
      let results = films.flat();
      results = results.filter(f => f.adult);
      printApiFilms(results, printContainer, 20, true);
    }
  }
  printContainer.classList.remove("hidden");

  async function getApiUrls() {
    let url = '';
    let trendingUrl = '';
    let general = '';

    await fetch('src/controllers/GetApi.php?type=img')
      .then(res => res.json())
      .then((res) => {
        url = res;
      });
    await fetch('src/controllers/GetApi.php?type=trend')
      .then(res => res.json())
      .then((res) => {
        trendingUrl = res;
      });
    await fetch('src/controllers/GetApi.php?type=general')
      .then(res => res.json())
      .then((res) => {
        general = res;
      });

    return { url, trendingUrl, general };
  }

  function printApiFilms(results, container, files, p) {

    for (let i = 0; i < files; i++) {
      container.innerHTML += `<div class="carousel__film"><img class="${p ? "porn" : ""}" src="${url}${results[i].poster_path}" alt="${results[i].title}" ${!p ? 'data-id=' : ''}${results[i].id}"></div>`;
    }
  }

  function printDbFilms(results, container) {
    for (let i = 0; i < results[0].length; i++) {
      container.innerHTML += `<div class="list__film"><img src="${results[2][i]}" alt="${results[1][i]}" data-id="${results[0][i]}"></div>`
    }
  }

  function printDbVotedFilms(results, container) {
    for (let i = 0; i < results[0].length; i++) {
      container.innerHTML += `<div class="carousel-votes__film"><img src="${results[2][i]}" alt="${results[1][i]}" data-id="${results[0][i]}"></div>`;
    }
  }

  document.querySelectorAll('img[data-id]').forEach(img => {
    img.onclick = openInfoFilm;
  });
}