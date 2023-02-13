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
const uploadPosterPath = document.getElementById("uploadPosterPath");
const editTitle = document.getElementById("editTitle");
const editLanguage = document.getElementById("editLanguage");
const editDescription = document.getElementById("editDescription");
const editPosterPath = document.getElementById("editPosterPath");
const editReleaseDate = document.getElementById("editReleaseDate");
const editVoteAverage = document.getElementById("editVoteAverage");
const addModal = document.getElementById('addModal');
const addSubmit = document.getElementById('addSubmit');
const idInput = document.querySelector('.form__input');

let filmIdToChange;
let filmIdToDelete;

addFilm.addEventListener("click", showAddModal);
closeBtn.addEventListener("click", closeAddModal);
editBtn.addEventListener("click", showEditModal);
editCloseBtn.addEventListener("click", closeEditModal);
tableBody.addEventListener("click", handleEditFilm);
closeEdit.addEventListener("click", closeModalEdit);
addSubmit.addEventListener("click", addNewFilm);
uploadPosterPath.addEventListener("change", cleanUrlInput);

function showAddModal() {
  modalAddFilm.show();
  obtainID();
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

function addNewFilm(e) {
  e.preventDefault();
  const addData = new FormData(addModal);
  const config = {
    'method': 'POST',
    'body': addData,
  }
  fetch("src/controllers/Movies.php?type=add", config)
    .then(res => res.json())
    .then(() => {
      customAlert('center', 'success', 'Added', '<h4>Film added successfully</h4>', false, 2000, '#232323', '#ff683f');
      closeAddModal();
    })
}

async function mainFetch() {
  saveGenres();
  let deleteAll = false;
  await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, restart DB!",
    background: "#232323",
    color: "white",
    confirmButtonColor: "green",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAll = true;
      Swal.fire({
        title: "Reset!",
        text: "DB reset completed.",
        icon: "success",
        background: "#232323",
        color: "white",
        confirmButtonColor: "green",
      });
    }
  });
  if (deleteAll) {
    document.body.innerHTML =
      "<div class='lds-facebook center'><div></div><div></div><div></div></div>";
    let twentyElementsPages = 500;
    let films = [];
    let api = '';
    await fetch('src/controllers/GetApi.php?type=api')
      .then(res => res.json())
      .then(res => {
        api = res;
      });
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
  window.location = "index.php";
}

async function saveGenres() {
  const genresUrl = await getApiUrlFetch();
  let genres = [];
  await fetch(genresUrl)
    .then((res) => res.json())
    .then((res) => {
      genres = res;
    })
    .catch((err) => console.error(err));

  const json = JSON.stringify(genres);
  const file = new FormData();
  file.append("genres", json);
  const config = {
    method: "POST",
    body: file,
  };
  fetch('src/controllers/Genres.php?action=add', config);
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
          <th data-film="${res[0][i]}" class="film-actions"><i class="edit-btn fa-solid fa-pen-to-square"></i>    <i class="delete-btn fa-solid fa-trash-can"></i></th>
      </tr>`;
  }
}

function handleEditFilm(e) {
  if (e.target.matches(".edit-btn")) {
    filmIdToChange = parseInt(e.target.parentElement.dataset.film);

    modalEditData.show();
    getInfo(filmIdToChange);
  }
  if (e.target.matches(".delete-btn")) {
    const rowToDelete = e.target.parentElement.parentElement;
    filmIdToDelete = parseInt(e.target.parentElement.dataset.film);
    deleteFilm(filmIdToDelete);
    rowToDelete.remove();
  }
}

function getInfo(filmId) {
  fetch("src/controllers/HandleInfoFilm.php?film=" + filmId, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const { title, language, description, imgPath, date, average } = data;
      printModalData(title, language, description, imgPath, date, average);
    });

  modalEditData.addEventListener("submit", obtainNewData);
}

function printModalData(title, language, description, imgPath, date, average) {
  editTitle.value = title;
  editLanguage.value = language;
  editDescription.value = description;
  editPosterPath.value = imgPath;
  editReleaseDate.value = date;
  editVoteAverage.value = average;
}

function obtainNewData(e) {
  e.preventDefault();

  const filmFormData = new FormData(e.target);
  filmFormData.append("id", filmIdToChange);
  editData(filmFormData);
}

function editData(editFilm) {
  fetch("src/controllers/Movies.php?type=update", {
    method: "POST",
    body: editFilm,
  })
    .then(res => res.json())
    .then(data => {
      customAlert('center', 'success', 'Edited', '<h4>Film edited successfully</h4>', false, 2000, '#232323', '#ff683f');
      closeModalEdit();
    })
}

function deleteFilm(id) {
  fetch("src/controllers/Movies.php?type=delMovie&film=" + id, {
    method: "GET",
  });
}

function cleanUrlInput() {
  editPosterPath.value = "";
}

async function getApiUrlFetch() {
  let genresUrl = '';
  await fetch(`src/controllers/GetApi.php?type=genres`)
    .then(res => res.json())
    .then((res) => {
      genresUrl = res;
    })
    .catch(err => console.error(err));
  return genresUrl;
}
