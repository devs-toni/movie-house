window.addEventListener("load", checkPageToReturn);

function checkPageToReturn() {
  fetch("src/controllers/CheckPageToReturn.php", { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      if (data !== "noData") {
        setCurrentPage(parseInt(data));
      }
    });
}
