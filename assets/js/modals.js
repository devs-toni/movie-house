const btnCloseSignUp = document.getElementById("closeSignUp");
const modalSignUp = document.querySelector(".modal-sign-up");
const api = 'https://api.themoviedb.org/3/movie/popular?api_key=f97d6a2165e719275828bcd71a17fccc&language=en-US';
const btnOpenModal = document.querySelector(".navbar__button");
const modalLogin = document.querySelector(".modal__login");
const btnCloseLogin = document.querySelector(".modal__btn-close");
const btnRedirectRegister = document.querySelector("#redirectRegister");
const btnRedirectLogin = document.querySelector("#redirectLogin");

btnOpenModal.addEventListener("click", showLoginModal);
btnCloseSignUp.addEventListener("click", closeSignUp);
btnCloseLogin.addEventListener("click", closeLogin);
btnRedirectRegister.addEventListener("click", showRegisterModal);
btnRedirectLogin.addEventListener("click", redirectLogin);


function showLoginModal() {
  modalLogin.show();
}

function closeLogin() {
  modalLogin.close();
}

function showRegisterModal() {
  modalLogin.close();
  modalSignUp.show();
}

function redirectLogin() {
  modalSignUp.close();
  modalLogin.show();
}

function closeSignUp() {
  modalSignUp.close();
}


