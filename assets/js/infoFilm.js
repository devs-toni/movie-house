const commentsContainer = document.getElementById("commentsFilm");
const btnAddLikeFilm = document.querySelector(".fa-thumbs-up");
const btnAddCommentFilm = document.querySelector(".fa-comment");
const btnSendComment = document.getElementById("btnSendComment");
const rateFilm = document.getElementById("rateFilm");
const modalAddComment = document.getElementById("modalAddComment");
const formComments = document.getElementById("formComments");
const closeAddComment = document.getElementById("closeAddComment");
const addFilmList = document.getElementById("addFilmList");
const containerLists = document.getElementById("containerLists");
const btnNewList = document.getElementById("btnNewList");
const modalNewList = document.getElementById("modalNewList");
const formCreateNewList = document.getElementById("formCreateNewList");
const modalAddFilmToList = document.getElementById("modalAddFilmToList");
const btnCloseNewList = document.getElementById("btnCloseNewList");
const btnCloseAddFilmToList = document.getElementById("btnCloseAddFilmToList");

let idOpenedFilm;
let idUserRegistered;

window.addEventListener("load", getDataInfoFilm);
btnAddLikeFilm && btnAddLikeFilm.addEventListener("click", addLikeFilm);
btnAddCommentFilm &&
  btnAddCommentFilm.addEventListener("click", openModalCommentFilm);
btnSendComment.addEventListener("click", addCommentFilm);
closeAddComment.addEventListener("click", closeModalAddComment);
addFilmList && addFilmList.addEventListener("click", chooseListToAdd);
btnNewList.addEventListener("click", openModalCreateNewList);
formCreateNewList.addEventListener("submit", createNewList);
btnCloseNewList.addEventListener("click", closeModalNewList);
btnCloseAddFilmToList.addEventListener("click", closeAddFilmToList);

function getDataInfoFilm() {
  idOpenedFilm = document.querySelector("img").dataset.id;

  fetch("src/controllers/Movies.php?type=info&film=" + idOpenedFilm, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const { title, description, imgPath, date, rate, comments } = data;
      printInfoFilm(imgPath, date, rate, description, comments, title);
    })
    .catch((err) => console.error(err));

  if (btnAddLikeFilm) {
    idUserRegistered = btnAddLikeFilm.dataset.userid;
    fetch(
      "src/controllers/Movies.php?type=check&film=" +
        idOpenedFilm +
        "&user=" +
        idUserRegistered,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          btnAddLikeFilm.classList.add("info-film__btn-like--active");
        }
      })
      .catch((err) => console.error(err));
  }
}

function printInfoFilm(imgPath, date, rate, description, comments, title) {
  document.getElementById("titleFilm").textContent = title;
  document.getElementById("imgFilm").src = imgPath;
  document.getElementById("dateFilm").textContent = date;
  rateFilm.textContent = rate;
  document.getElementById("descriptionFilm").textContent = description;

  commentsContainer.innerHTML = "";
  if (comments) {
    for (let i = 0; i < comments.length; i++) {
      const commentContainer = document.createElement("div");
      commentContainer.classList.add("container__each-comment");
      if (comments[i].idUser == idUserRegistered) {
        commentContainer.innerHTML = `<div><h5>${comments[i].username}</h5>
        <p class = "comment__delete--active" data-idcomment = ${comments[i].idComment}>delete</p>
        </div><p>${comments[i].comment}</p>`;
      } else {
        commentContainer.innerHTML = `<div><h5>${comments[i].username}</h5>
                                      <p class = "comment__delete" data-idcomment = ${comments[i].idComment}>delete</p>
                                      </div><p>${comments[i].comment}</p>`;
      }
      commentsContainer.appendChild(commentContainer);
      document
        .querySelector(`[data-idcomment="${comments[i].idComment}"]`)
        .addEventListener("click", startDeleteComment);
    }
  }
}

function addLikeFilm() {
  let rate = Number(rateFilm.innerText);

  fetch(
    "src/controllers/Movies.php?type=like&film=" +
      idOpenedFilm +
      "&user=" +
      idUserRegistered,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data === "isDeleted") {
        rate -= 1;
        rateFilm.innerText = rate;
        btnAddLikeFilm.classList.remove("info-film__btn-like--active");
      } else {
        rate += 1;
        rateFilm.innerText = rate;
        btnAddLikeFilm.classList.add("info-film__btn-like--active");
      }
    })
    .catch((err) => console.error(err));
}

function openModalCommentFilm() {
  modalAddComment.show();
}

function closeModalAddComment() {
  modalAddComment.close();
}

function addCommentFilm(e) {
  e.preventDefault();
  const formData = new FormData(formComments);
  formData.append("idUserRegistered", idUserRegistered);
  formData.append("idOpenedFilm", idOpenedFilm);

  fetch("src/controllers/Movies.php?type=addComment", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      const commentContainer = document.createElement("div");
      commentContainer.classList.add("container__each-comment");
      commentContainer.innerHTML = `<div><h5>${data.username}</h5>
                                    <p class = "comment__delete--active" data-idcomment = ${data.idComment}>delete</p>
                                    </div><p>${data.comment}</p>`;
      commentsContainer.appendChild(commentContainer);
      document
        .querySelector(`[data-idcomment="${data.idComment}"]`)
        .addEventListener("click", startDeleteComment);
    })
    .catch((err) => console.error(err));

  modalAddComment.close();
  document.querySelector(`[name="comment"]`).value = "";
}

function startDeleteComment(e) {
  const idCommentToDelete = e.target.dataset.idcomment;
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    iconColor: "#ff683f",
    showCancelButton: true,
    confirmButtonColor: "#ff683f",
    cancelButtonColor: "#435c75",
    confirmButtonText: "Yes, delete it!",
    background: "#232323",
    color: "#ff683f",
    confirmButtonColor: "#ff683f",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteComment(idCommentToDelete);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
        iconColor: "#ff683f",
        background: "#232323",
        color: "#ff683f",
        confirmButtonColor: "#ff683f",
      });
    }
  });
}

function deleteComment(idCommentToDelete) {
  fetch("src/controllers/Movies.php?type=delComment&idComment=" + idCommentToDelete, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data === "deleted") {
        let divToDelete = document.querySelector(
          `[data-idcomment="${idCommentToDelete}"]`
        ).parentElement.parentElement;
        divToDelete.remove();
      }
    })
    .catch((err) => console.error(err));
}

function chooseListToAdd() {
  fetch(`src/controllers/Lists.php?type=choose&idUser=${idUserRegistered}&idFilm=${idOpenedFilm}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        containerLists.textContent = "";
        for (const name in data.lists) {
          const p = document.createElement("p");
          p.textContent = data.lists[name];
          p.setAttribute("data-id", name);
          containerLists.appendChild(p);
          document.querySelector(`[data-id="${name}"]`).addEventListener("click", addFilmToList);
        }
      }
      modalAddFilmToList.show();
    })
    .catch((err) => console.error(err));
}

function addFilmToList(e) {
  const idList = e.target.dataset.id;

  fetch(
    "src/controllers/Lists.php?type=addFilmToList&film=" +
      idOpenedFilm +
      "&list=" +
      idList,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data === "done") {
        modalAddFilmToList.close();
      }
    })
    .catch((err) => console.error(err));
}

function openModalCreateNewList() {
  modalNewList.show();
}

function createNewList(e) {
  e.preventDefault();
  const name = nameList.value;
  fetch(`src/controllers/Lists.php?type=add&name=${name}`)
    .then((res) => res.json())
    .then((data) => {
      if (data !== "N") {
        modalNewList.close();
        chooseListToAdd();
      } else {
        customAlert(
          "center",
          "error",
          "",
          "<h3>This list name already exists</h3>",
          false,
          2000,
          "#232323",
          "#fff"
        );
      }
    })
    .catch((err) => console.error(err));
}

function closeModalNewList() {
  modalNewList.close();
  nameList.value = "";
}

function closeAddFilmToList() {
  modalAddFilmToList.close();
}
