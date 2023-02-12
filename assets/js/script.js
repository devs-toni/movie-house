//OPEN LISTS
function openMyLists() {
  window.location.href = "lists.php";
}

//OPEN DROPDOWN
function openMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//OPEN INFOFILM
function openInfoFilm(e) {
  window.location.href =
    "infoFilm.php?film=" + e.target.dataset.id;
}