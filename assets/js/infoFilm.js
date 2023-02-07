const commentsContainer = document.getElementById("commentsFilm");

const url = "https://image.tmdb.org/t/p/w500";

window.addEventListener("load", getDataInfoFilm());

function getDataInfoFilm() {
  const film = document.querySelector("img").alt;
  fetch("src/controllers/HandleInfoFilm.php?film=" + film, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const { description, imgPath, date, rate, comments } = data;
      printInfoFilm(imgPath, date, rate, description, comments);
    });
}

function printInfoFilm(imgPath, date, rate, description, comments) {
  document.getElementById("imgFilm").src = `${url}${imgPath}`;
  document.getElementById("dateFilm").textContent = date;
  document.getElementById("rateFilm").textContent = rate;
  document.getElementById("descriptionFilm").textContent = description;

  if (comments) {
    for (let i = 0; i < comments.length; i++) {
      const comment = document.createElement("div");
    }
  }
}
