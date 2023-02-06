const btnCloseSignUp = document.getElementById("closeSignUp");
const modalSignUp = document.querySelector(".modal-sign-up");
const api =
  "https://api.themoviedb.org/3/movie/popular?api_key=f97d6a2165e719275828bcd71a17fccc&language=en-US";
const btnOpenModal = document.querySelector(".navbar__button");
const modalLogin = document.querySelector(".modal__login");
const btnCloseLogin = document.querySelector(".modal__btn-close");
const btnRedirectRegister = document.querySelector("#redirectRegister");
const btnRedirectLogin = document.querySelector("#redirectLogin");
const backgroundModalActive = document.getElementById("backgroundModalActive");

btnOpenModal.addEventListener("click", showLoginModal);
btnCloseSignUp.addEventListener("click", closeSignUp);
btnCloseLogin.addEventListener("click", closeLogin);
btnRedirectRegister.addEventListener("click", showRegisterModal);
btnRedirectLogin.addEventListener("click", redirectLogin);

function showLoginModal() {
  modalLogin.show();
  backgroundModalActive.classList.add("modal__background--active");
  setTimeout(() => {
    backgroundModalActive.addEventListener("click", closeLogin);
  }, 1);
}

function closeLogin() {
  modalLogin.close();
  backgroundModalActive.classList.remove("modal__background--active");
  backgroundModalActive.removeEventListener("click", closeLogin);
}

function showRegisterModal() {
  closeLogin();
  modalSignUp.show();
  backgroundModalActive.classList.add("modal__background--active");
  setTimeout(() => {
    backgroundModalActive.addEventListener("click", closeSignUp);
  }, 1);
}

function redirectLogin() {
  closeSignUp();
  showLoginModal();
}

function closeSignUp() {
  modalSignUp.close();
  backgroundModalActive.classList.remove("modal__background--active");
  backgroundModalActive.removeEventListener("click", closeSignUp);
}

async function mainFetch() {
  let films = [];
  for (let i = 1; i <= 20; i++) {
    await fetch(`${api}&page=${i}`)
      .then((res) => res.json())
      .then((res) => {
        films.push(res.results);
      })
      .catch((err) => console.error(err));
  }

  const file = new FormData();
  const finalArray = films.flat();

  const json = JSON.stringify(finalArray);
  file.append("films", json);
  const config = {
    method: "POST",
    body: file,
  };

  fetch("src/repository/LoadDatabase.php", config)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
}

// document.addEventListener("DOMContentLoaded", function () {
//   mainFetch();
// });
