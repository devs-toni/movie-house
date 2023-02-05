function doPagination(total) {
  const paginationNumbers = document.getElementById("paginationNumbers");
  const paginatedList = document.getElementById("paginatedList");
  const nextButton = document.getElementById("nextButton");
  const prevButton = document.getElementById("prevButton");
  const paginationLimit = 24;
  const pageCount = Math.ceil(total / paginationLimit);
  const url = "https://image.tmdb.org/t/p/w500";
  let currentPage;

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
        ul = document.querySelector('#paginatedList');
        ul.innerHTML = '';
        for (let i = 0; i < res[0].length; i++) {
          ul.innerHTML += `<li><img src="assets/images/loader.gif" alt="${res[1][i]}" data-src="${url}${res[2][i]}"></li>`;
        }
        document.querySelector('#paginatedList').classList.remove('hidden');
        document.querySelector('#loader').classList.add('hidden');
        let lazyloadImages = document.querySelectorAll('#paginatedList li img');
        if ("IntersectionObserver" in window) {
          var imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                var image = entry.target;
                image.src = image.dataset.src;
                imageObserver.unobserve(image);
              }
            });
          });
        }
        lazyloadImages.forEach(function (image) {
          imageObserver.observe(image);
        });

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

