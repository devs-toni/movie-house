const btnCloseSignUp = document.getElementById("closeSignUp");
const modalSignUp = document.querySelector(".modal-sign-up");
const api = 'https://api.themoviedb.org/3/movie/popular?api_key=f97d6a2165e719275828bcd71a17fccc&language=en-US'
btnCloseSignUp.addEventListener("click", closeSignUp);

function closeSignUp() {
  modalSignUp.close();
}

async function mainFetch() {
  let films = [];
  for (let i = 1; i <= 20; i++) {
    await fetch(`${api}&page=${i}`)
      .then(res => res.json())
      .then(res => {
        films.push(res.results);
      })
      .catch(err => console.error(err));
  }

  const file = new FormData();
  const finalArray = films.flat();

  const json = JSON.stringify(finalArray);
  file.append("films", json);
  const config = {
    'method': 'POST',
    'body': file,
  }

  fetch('src/repository/LoadDatabase.php', config)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(err => console.error(err));
}

// document.addEventListener("DOMContentLoaded", function () {
//   mainFetch();
// });


