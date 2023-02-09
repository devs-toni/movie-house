const formList = document.getElementById('formList');
const ul = document.getElementById('ulLists');
const filmsContainer = document.getElementById('films');

const addList = (e) => {
  e.preventDefault();
  const name = listName.value;
  fetch(`src/controllers/addList.php?name=${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const li = document.createElement('li');
      li.textContent = name;
      ul.appendChild(li);
    })
    .catch((err) => console.error(err));
}

window.addEventListener('load', () => {
  fetch(`src/controllers/getLists.php`)
    .then((res) => res.json())
    .then((data) => {
      getLists(data.lists);
      getMovies(data.movies);
    })
    .catch((err) => console.error(err));
});

const getLists = (data) => {
  for (const name in data) {
    const li = document.createElement('li');
    li.textContent = data[name];
    ul.appendChild(li);
  }
}
const getMovies = (data) => {
  for (const movie of data) {
    console.log(movie);
    filmsContainer.innerHTML += `<div class="list__film"><img src="${movie.img}" alt="${movie.name}" data-id="${movie.id}"></div>`
  }
}
formList.addEventListener('submit', addList);