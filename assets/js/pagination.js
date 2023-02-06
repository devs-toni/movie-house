function doPagination(total) {
  const paginationNumbers = document.getElementById("paginationNumbers");
  const paginatedList = document.getElementById("paginatedList");
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("prevButton");
  const paginationLimit = 24;
  const pageCount = Math.ceil(total / paginationLimit);
  const url = "https://image.tmdb.org/t/p/w500";
  let currentPage;

  function testImage(image) {
    var tester = new Image();
    tester.onload = imageFound(image);
  }

  function imageFound(image) {
    console.log('That image is found and loaded');
    image.parentNode.lastChild.classList.add('hidden');
    image.classList.remove('lazy');
  }

  const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pg-num";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);
    paginationNumbers.appendChild(pageNumber);
  };

  const getPaginationNumbers = () => {
    for (let i = 1; i <= pageCount; i++) {
      appendPageNumber(i);
    }
  };

  const setCurrentPage = async pageNum => {
    currentPage = pageNum;
    handleActivePageNumber();
    handlePageButtonsStatus();

    const prevRange = (pageNum - 1) * paginationLimit;

    await fetch(`src/controllers/PaginationResults.php?min=${prevRange}`)
      .then(res => res.json())
      .then(res => {
        paginatedList.innerHTML = '';
        for (let i = 0; i < res[0].length; i++) {
          paginatedList.innerHTML += `<li><img class="lazy" src="${url}${res[2][i]}" alt="${res[1][i]}"><div class="skeleton"></div></li>`;
        }
        document.querySelector('#paginatedList').classList.remove('hidden');
        let lazyloadImages = document.querySelectorAll('#paginatedList li img');
        lazyloadImages.forEach(i => {
          i.onload = () => {
            testImage(i);
          }
        })
      })
      .catch(err => {
        console.error(err);
      });
  }


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

  const handlePageButtonsStatus = () => {
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

  window.addEventListener("load", () => {
    getPaginationNumbers();
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
  });
}

