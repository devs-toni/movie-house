const commentsContainer = document.getElementById("commentsFilm");
const btnAddLikeFilm = document.querySelector(".fa-thumbs-up");
const rateFilm = document.getElementById("rateFilm");

let idOpenedFilm;

window.addEventListener("load", getDataInfoFilm());
btnAddLikeFilm && btnAddLikeFilm.addEventListener("click", addLikeFilm);

function getDataInfoFilm() {
  idOpenedFilm = document.querySelector("img").dataset.id;
  const userId = btnAddLikeFilm.dataset.userid;

  fetch("src/controllers/HandleInfoFilm.php?film=" + idOpenedFilm, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { title, description, imgPath, date, rate, comments } = data;
      printInfoFilm(imgPath, date, rate, description, comments, title);
    });

  fetch(
    "src/controllers/CheckRated.php?film=" + idOpenedFilm + "&user=" + userId,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        btnAddLikeFilm.classList.add("info-film__btn-like--active");
      }
    });
}

function printInfoFilm(imgPath, date, rate, description, comments, title) {
  document.getElementById("titleFilm").textContent = title;
  document.getElementById("imgFilm").src = imgPath;
  document.getElementById("dateFilm").textContent = date;
  rateFilm.textContent = rate;
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

function addLikeFilm(e) {
  const userId = e.target.dataset.userid;
  let rate = Number(rateFilm.innerText);

  fetch(
    "src/controllers/AddLikeFilm.php?film=" + idOpenedFilm + "&user=" + userId,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data === "isDeleted") {
        rate -= 1;
        rateFilm.innerText = rate;
        btnAddLikeFilm.classList.remove("info-film__btn-like--active");
      } else {
        rate += 1;
        rateFilm.innerText = rate;
        btnAddLikeFilm.classList.add("info-film__btn-like--active");
      }
    });
}
