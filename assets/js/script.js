const btnCloseSignUp = document.getElementById("closeSignUp");
const modalSignUp = document.querySelector(".modal-sign-up");

btnCloseSignUp.addEventListener("click", closeSignUp);

function closeSignUp() {
  modalSignUp.close();
}
