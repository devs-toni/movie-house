const commentsContainer = document.getElementById("commentsFilm");
const btnAddLikeFilm = document.querySelector(".fa-thumbs-up");
const btnAddCommentFilm = document.querySelector(".fa-comment");
const btnSendComment = document.getElementById("btnSendComment");
const rateFilm = document.getElementById("rateFilm");
const modalAddComment = document.getElementById("modalAddComment");
const formComments = document.getElementById("formComments");
const modalConfirmDelete = document.getElementById("modalConfirmDelete");
const btnConfirmDelete = document.getElementById("btnConfirmDelete");
const modalMessageDeleted = document.getElementById("modalMessageDeleted");
const closeAddComment = document.getElementById("closeAddComment");
const cancelDelete = document.getElementById("cancelDelete");
const btnReturn = document.getElementById("btnReturn");

let idOpenedFilm;
let idUserRegistered;
let idCommentToDelete;

window.addEventListener("load", getDataInfoFilm());
btnAddLikeFilm && btnAddLikeFilm.addEventListener("click", addLikeFilm);
btnAddCommentFilm &&
  btnAddCommentFilm.addEventListener("click", openModalCommentFilm);
btnSendComment && btnSendComment.addEventListener("click", addCommentFilm);
btnConfirmDelete && btnConfirmDelete.addEventListener("click", deleteComment);
closeAddComment &&
  closeAddComment.addEventListener("click", closeModalAddComment);
cancelDelete && cancelDelete.addEventListener("click", closeModalDeleteComment);
btnReturn && btnReturn.addEventListener("click", returnLastPage);

function getDataInfoFilm() {
  idOpenedFilm = document.querySelector("img").dataset.id;

  fetch("src/controllers/HandleInfoFilm.php?film=" + idOpenedFilm, {
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
      "src/controllers/CheckRated.php?film=" +
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
    "src/controllers/AddLikeFilm.php?film=" +
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

  fetch("src/controllers/AddComment.php", {
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
  idCommentToDelete = e.target.dataset.idcomment;
  modalConfirmDelete.show();
}

function deleteComment() {
  fetch("src/controllers/DeleteComment.php?idComment=" + idCommentToDelete, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data === "deleted") {
        modalConfirmDelete.close();
        let divToDelete = document.querySelector(
          `[data-idcomment="${idCommentToDelete}"]`
        ).parentElement.parentElement;
        divToDelete.remove();
        modalMessageDeleted.show();
        setTimeout(() => {
          modalMessageDeleted.close();
        }, 2000);
      }
    })
    .catch((err) => console.error(err));
}

function closeModalDeleteComment() {
  modalConfirmDelete.close();
}

function returnLastPage() {
  window.location.href = "index.php";
}
