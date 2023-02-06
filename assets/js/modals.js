const btnCloseSignUp = document.getElementById("closeSignUp");
const modalSignUp = document.querySelector(".modal-sign-up");
const btnOpenModal = document.querySelector(".navbar__button");
const modalLogin = document.querySelector(".modal__login");
const btnCloseLogin = document.querySelector(".modal__btn-close");
const btnRedirectRegister = document.querySelector("#redirectRegister");
const btnRedirectLogin = document.querySelector("#redirectLogin");
btnOpenModal && btnOpenModal.addEventListener("click", showLoginModal);
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

function openMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


