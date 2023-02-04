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


// LOAD DATABASE

async function mainFetch() {
  document.body.innerHTML = "<div class='lds-facebook center'><div></div><div></div><div></div></div>";
  let twentyElementsPages = 30;
  let films = [];
  for (let i = 1; i <= twentyElementsPages; i++) {
    await fetch(`${api}&page=${i}`)
      .then(res => res.json())
      .then(res => {
        films.push(res.results);
      })
      .catch(err => console.error(err));
  }

  const file = new FormData();
  let finalArray = films.flat();
  finalArray = finalArray.filter(f => f.poster_path !== null && f.release_date !== null);
  const json = JSON.stringify(finalArray);
  file.append("films", json);
  const config = {
    'method': 'POST',
    'body': file,
  }

  await fetch('src/repository/LoadDatabase.php', config)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
  window.location = 'index.php';
}


