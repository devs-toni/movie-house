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