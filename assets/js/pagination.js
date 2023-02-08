const url = "https://image.tmdb.org/t/p/w500";
const trendingUrl = 'https://api.themoviedb.org/3/trending/movie/week?api_key=f97d6a2165e719275828bcd71a17fccc&language=en-US&page=1';
let currentPage;
const paginationLimit = 24;

function doPagination(total) {
  window.addEventListener("load", () => {
    loadFilms(total);
  });
}

function loadFilms(total) {
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("prevButton");
  let pageCount = Math.ceil(total / paginationLimit);

  getPaginationNumbers(pageCount);
  setCurrentPage(1);
  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });
  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });
  document.querySelectorAll(".pg-num").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
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

function testImage(image) {
  const tester = new Image();
  tester.onload = imageFound(image);
}

function imageFound(image) {
  image.parentNode.lastChild.classList.add("hidden");
  image.classList.remove("lazy");
}
function openInfoFilm(e) {
  window.location.href = "infoFilm.php?film=" + e.target.dataset.id;
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

async function printFilms(data, container) {
  let lazyLoadImages;
  let printContainer = document.querySelector(container);

  if (data) {
    printContainer.innerHTML = "";
    printDbFilms(data, printContainer);
    lazyLoadImages = document.querySelectorAll(`${container} li img`);
  } else {
    results = await fetchApi(trendingUrl);
    fetchDb('src/controllers/TrendingFilms.php', results);
    printApiFilms(results, printContainer, 20);
    lazyLoadImages = document.querySelectorAll(`${container} div img`)
  }

  lazyLoadImages.forEach((i) => {
    i.addEventListener("click", openInfoFilm);
    i.onload = () => {
      testImage(i);
    };
  });

  printContainer.classList.remove("hidden");

  function printApiFilms(results, container, files) {
    for (let i = 0; i < files; i++) {
      container.innerHTML += `<div class="carousel__film"><img class="lazy" src="${url}${results[i].poster_path}" alt="${results[i].title}" data-id="${results[i].id}"><div class="skeleton"></div></div>`;
    }
  }

  function printDbFilms(results, container) {
    for (let i = 0; i < results[0].length; i++) {
      container.innerHTML += `<li><img class="lazy" src="${results[2][i]}" alt="${results[1][i]}" data-id="${results[0][i]}"><div class="skeleton"></div></li>`
    }
  }
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
const fetchDb = async (url, data) => {

  const file = new FormData();
  data = data.filter(f => f.poster_path !== null && f.release_date !== null);
  const json = JSON.stringify(data);
  file.append("films", json);

  const config = {
    'method': 'POST',
    'body': file,
  }
  await fetch(url, config)
    .then((res) => res.json())
    .then((res) => {
      console.log((res));
    })
    .catch((err) => {
      console.error(err);
    });
}