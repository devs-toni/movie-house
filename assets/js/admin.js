const addFilm = document.querySelector('#addFilm');
const modalAddFilm = document.querySelector('.modal__addFilm');
const closeBtn = document.querySelector(".modal__btn-close");
const loadDb = document.querySelector('#loadDatabase');
const dltFilm = document.querySelector('.dltFilms');
const backBtn = document.querySelector('#goBack');
const api = 'https://api.themoviedb.org/3/movie/popular?api_key=f97d6a2165e719275828bcd71a17fccc&language=en-US';

addFilm.addEventListener("click", showAddModal);
closeBtn.addEventListener("click", closeAddModal);

function showAddModal() {
  modalAddFilm.show();
}

function closeAddModal(){
  modalAddFilm.close();
}


const data = new FormData(addModal);
const config = {
  'method': 'POST',
  'body': data,
}
fetch("src/controllers/AddFilm.php", config);


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
  saveData(films, twentyElementsPages);
}

async function saveData(films, limit) {
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

loadDb.addEventListener('click', mainFetch);
backBtn.addEventListener('click', () => window.location = 'index.php');
