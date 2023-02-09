const api =
  "https://api.themoviedb.org/3/movie/popular?api_key=f97d6a2165e719275828bcd71a17fccc&language=en-US";
const addFilm = document.querySelector("#addFilm");
const modalAddFilm = document.querySelector(".modal__addFilm");
const closeBtn = document.querySelector(".modal__btn-close");
const loadDb = document.querySelector("#loadDatabase");
const editBtn = document.querySelector("#editFilm");
const modalEditFilm = document.querySelector("#editFilmModal");
const backBtn = document.querySelector("#goBack");
const editCloseBtn = document.getElementById("editCloseBtn");
const modalEditData = document.getElementById("editDataModal");
const closeEdit = document.getElementById("closeModalEdit");

addFilm.addEventListener("click", showAddModal);
closeBtn.addEventListener("click", closeAddModal);
editBtn.addEventListener("click", showEditModal);
editCloseBtn.addEventListener("click", closeEditModal);
tableBody.addEventListener("click", editFilm);
closeEdit.addEventListener("click", closeModalEdit);

function showAddModal() {
  modalAddFilm.show();
}

function closeAddModal() {
  modalAddFilm.close();
}

function showEditModal() {
  adminPage = true;
  modalEditFilm.show();
}

function closeEditModal() {
  adminPage = false;
  modalEditFilm.close();
}

function closeModalEdit() {
  modalEditData.close();
}

//esto te lo has dejao a medias
const data = new FormData(addModal);
const config = {
  method: "POST",
  body: data,
};
fetch("src/controllers/AddFilm.php", config);

async function mainFetch() {
  document.body.innerHTML =
    "<div class='lds-facebook center'><div></div><div></div><div></div></div>";
  let twentyElementsPages = 30;
  let films = [];
  for (let i = 1; i <= twentyElementsPages; i++) {
    await fetch(`${api}&page=${i}`)
      .then((res) => res.json())
      .then((res) => {
        films.push(res.results);
      })
      .catch((err) => console.error(err));
  }
  saveData(films, twentyElementsPages);
}

async function saveData(films, limit) {
  const file = new FormData();
  let finalArray = films.flat();
  finalArray = finalArray.filter(
    (f) => f.poster_path !== null && f.release_date !== null
  );
  const json = JSON.stringify(finalArray);
  file.append("films", json);
  const config = {
    method: "POST",
    body: file,
  };

  await fetch("src/repository/LoadDatabase.php", config)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
  // window.location = 'index.php';
}

loadDb.addEventListener("click", mainFetch);
backBtn.addEventListener("click", () => (window.location = "index.php"));

function searchEditFilms(res) {
  tableBody.innerHTML = "";
  for (let i = 0; i < res[0].length; i++) {
    tableBody.innerHTML += `
      <tr>
          <th class="film-ID">${res[0][i]}</th>
          <th>${res[1][i]}</th>
          <th class="film-actions"><i class="edit-btn fa-solid fa-pen-to-square"></i><i class="delete-btn fa-solid fa-trash-can"></i></th>
      </tr>`;
  }
}

function editFilm(e) {
  if (e.target.matches(".edit-btn")) {
    modalEditData.show();
  }
}
