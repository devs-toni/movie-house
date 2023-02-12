/* let currentPage;
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
} */

/* const getPaginationNumbers = (pageCount) => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
}; */

/* const handleActivePageNumber = () => {
  document.querySelectorAll(".pg-num").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
}; */

/* const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
}; */

/* const handlePageButtonsStatus = (pageCount) => {
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
}; */

/* const appendPageNumber = (index) => {
  const paginationNumbers = document.getElementById("paginationNumbers");
  const pageNumber = document.createElement("button");
  pageNumber.className = "pg-num";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);
  paginationNumbers.appendChild(pageNumber);
};
 */


////////////////////////////////////////////////////////////////////////////////////////////////// UTIL METHODS ////

/* const setCurrentPage = async (pageNum, pageCount) => {
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
} */