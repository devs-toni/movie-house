const formList = document.getElementById('formList');
const ul = document.getElementById('ulLists');
const filmsContainer = document.getElementById('films');

const addList = (e) => {
  e.preventDefault();
  const name = listName.value;
  if (name) {
    fetch(`src/controllers/addList.php?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data !== 'N') {
          ul.innerHTML += `<div class="one-list" data-id="${data}"><p id="linkList" data-id="${data}">${name}</p><i class="fa-solid fa-ban" id="deleteList" data-id="${data}"></i></div>`;
          document.querySelectorAll(`p#linkList[data-id]`).forEach(link => {
            prepareListLink(link);
          });
          document.querySelectorAll('#deleteList').forEach(d => {
            d.addEventListener('click', () => prepareDeleteLink(d));
          });
        } else {
          customAlert('center', 'error', '', '<h3>This list name already exists</h3>', false, 2000, '#232323', '#fff');
        }
      })
      .catch((err) => console.error(err));
  }
}

window.addEventListener('load', () => {
  fetch(`src/controllers/getLists.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data !== 'N') {
        getLists(data.lists);
        getMovies(data.movies);
        const linkList = document.querySelectorAll('#linkList');
        linkList.forEach((l) => {
          prepareListLink(l);
        });
        const deleteList = document.querySelectorAll('#deleteList');
        deleteList.forEach((l) => {
          l.addEventListener('click', () => prepareDeleteLink(l));
        });

      }
    })
    .catch((err) => console.error(err));
});

const getLists = (data) => {
  for (const name in data) {
    ul.innerHTML += `<div class="one-list" data-id=${name}><p id="linkList" data-id=${name}>${data[name]}</p><i class="fa-solid fa-ban" id="deleteList" data-id="${name}"></i></div>`;
  }
}

const getMovies = (data) => {
  filmsContainer.innerHTML = '';
  if (data.length > 0) {
    for (const movie of data) {
      console.log(movie);
      filmsContainer.innerHTML += `<div class="film" onclick="openInfoFilm(event)"><img src="${movie.img}" alt="${movie.name}" data-id="${movie.id}"></div>`
    }
  }
}
formList.addEventListener('submit', addList);


function openInfoFilm(e) {
  window.location.href =
    "infoFilm.php?film=" + e.target.dataset.id + "&lists";
}

function prepareListLink(link) {
  fetch(`src/controllers/getMoviesList.php?list=${link.dataset.id}`)
    .then((res) => res.json())
    .then((data) => {
      link.addEventListener('click', () => getMovies(data));
    })
    .catch((err) => console.error(err));
}
function prepareDeleteLink(link) {
  fetch(`src/controllers/DeleteList.php?list=${link.dataset.id}`)
    .then((res) => res.json())
    .then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        background: "#232323",
        color: "white",
        confirmButtonColor: "green",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector(`div.one-list[data-id="${link.dataset.id}"]`).remove();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            background: "#232323",
            color: "white",
            confirmButtonColor: "green",
          });
        }
      });
    })
    .catch((err) => console.error(err));
}