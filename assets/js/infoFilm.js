const commentsContainer = document.getElementById("commentsFilm");

window.addEventListener("load", getDataInfoFilm());

function getDataInfoFilm() {
  const film = document.querySelector("img").dataset.id;
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
  document.getElementById("imgFilm").src = imgPath;
  document.getElementById("dateFilm").textContent = date;
  document.getElementById("rateFilm").textContent = rate;
  document.getElementById("descriptionFilm").textContent = description;

  commentsContainer.innerHTML = "";
  if (comments) {
    for (let i = 0; i < comments.length; i++) {
      const commentContainer = document.createElement("div");
      commentContainer.innerHTML = `<h5>${comments[i].username}</h5><p>${comments[i].comment}</p>`;
      commentsContainer.appendChild(commentContainer);
    }
  }
}
