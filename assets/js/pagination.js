const url = "https://image.tmdb.org/t/p/w500";
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

const setCurrentPage = async (pageNum, pageCount) => {
  currentPage = pageNum;

  console.log(pageNum);
  handleActivePageNumber();
  handlePageButtonsStatus(pageCount);

  const prevRange = (pageNum - 1) * paginationLimit;

  await fetch(`src/controllers/PaginationResults.php?min=${prevRange}`)
    .then((res) => res.json())
    .then((res) => {
      printFilms(res);
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
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

function printFilms(res) {
  let paginatedList = document.querySelector("#paginatedList");
  paginatedList.innerHTML = "";
  for (let i = 0; i < res[0].length; i++) {
    paginatedList.innerHTML += `<li><img class="lazy" src="${res[2][i]}" alt="${res[1][i]}" data-id="${res[0][i]}"><div class="skeleton"></div></li>`;
  }
  paginatedList.classList.remove("hidden");
  let lazyLoadImages = document.querySelectorAll("#paginatedList li img");
  lazyLoadImages.forEach((i) => {
    i.addEventListener("click", openInfoFilm);
    i.onload = () => {
      testImage(i);
    };
  });
}

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
