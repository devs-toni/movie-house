const btnCloseSignUp = document.getElementById("closeSignUp");
const modalSignUp = document.querySelector(".modal-sign-up");
const btnOpenModal = document.querySelector(".navbar__button");
const modalLogin = document.querySelector(".modal__login");
const btnCloseLogin = document.querySelector(".modal__btn-close");
const btnRedirectRegister = document.querySelector("#redirectRegister");
const btnRedirectLogin = document.querySelector("#redirectLogin");
const backgroundModalActive = document.getElementById("backgroundModalActive");

btnOpenModal && btnOpenModal.addEventListener("click", showLoginModal);
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
  document.body.style.overflow = 'hidden';
}

function closeLogin() {
  modalLogin.close();
  backgroundModalActive.classList.remove("modal__background--active");
  backgroundModalActive.removeEventListener("click", closeLogin);
  document.body.style.overflow = 'inherit';
}

function showRegisterModal() {
  closeLogin();
  modalSignUp.show();
  backgroundModalActive.classList.add("modal__background--active");
  setTimeout(() => {
    backgroundModalActive.addEventListener("click", closeSignUp);
  }, 1);
  document.body.style.overflow = 'hidden';
}

function redirectLogin() {
  closeSignUp();
  showLoginModal();
}

function closeSignUp() {
  modalSignUp.close();
  backgroundModalActive.classList.remove("modal__background--active");
  backgroundModalActive.removeEventListener("click", closeSignUp);
  document.body.style.overflow = 'inherit';
}

//DROPDOWN
const dropBtnUser = document.querySelector('.navbar__button--user');
const iconDropBtn = document.querySelector('.navbar__button i.fa-solid.fa-user-group');

function openMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

const dropdown = () => {
  var dropdowns = document.getElementsByClassName("dropdown__dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
}

dropBtnUser && dropBtnUser.addEventListener("click", dropdown);
iconDropBtn && iconDropBtn.addEventListener("click", dropdown);
