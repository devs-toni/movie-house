const modalConfig = document.querySelector(".modal__config");
const main = document.querySelector(".modalc__main");
const btnCloseConfig = document.querySelector(".close-conf");
const btnBack = document.querySelector(".back-conf");
const configUsername = document.querySelector('#modifyUsername');
const configEmail = document.querySelector('#modifyEmail');
const configPassword = document.querySelector('#modifyPassword');
let user;
btnCloseConfig.addEventListener("click", closeConfigModal);

btnBack.addEventListener("click", () => {
  btnBack.classList.add('hidden');
  main.classList.remove('hidden');
  configUsername.classList.add('hidden');
  configPassword.classList.add('hidden');
  configEmail.classList.add('hidden');
});

const openConfig = () => {
  showConfigModal();
}

async function showConfigModal() {
  modalConfig.show();
  backgroundModalActive.classList.add("modal__background--active");
  setTimeout(() => {
    backgroundModalActive.addEventListener("click", closeConfigModal);
  }, 1);
  document.body.style.overflow = 'hidden';
  document.getElementById("myDropdown").classList.toggle("show");
  await fetch('src/controllers/Users.php?type=get')
    .then((res) => res.json())
    .then((data) => {
      user = data;
      if (user.rol === 'A') {
        customAlert('center', 'warning', 'Be careful!', '<h3>You are administrator, take care when you change your profile data</h3>', true, 0, '#232323', 'white', 'green');
      }
    }).catch(err => console.error(err));
}

function closeConfigModal() {
  modalConfig.close();
  backgroundModalActive.classList.remove("modal__background--active");
  backgroundModalActive.removeEventListener("click", closeConfigModal);
  document.body.style.overflow = 'inherit';
}

function openUsernameConfig() {
  console.log(user);
  btnBack.classList.remove('hidden');
  main.classList.add('hidden');
  configUsername.classList.remove('hidden');
  document.getElementById("usernameConfig").value = user.username;
}
function openEmailConfig() {
  btnBack.classList.remove('hidden');
  main.classList.add('hidden');
  configEmail.classList.remove('hidden');
  document.getElementById("emailConfig").value = user.email;

}
function openPasswordConfig() {
  btnBack.classList.remove('hidden');
  main.classList.add('hidden');
  configPassword.classList.remove('hidden');
  document.getElementById("passwordConfig").placeholder = 'Enter a new password';
  document.getElementById("rPasswordConfig").placeholder = 'Enter a new password';
}

function changeUsername(e) {
  e.preventDefault();
  const errors = [];
  const usernameLength = 5;
  const username = usernameConfig.value;
  if (username) {
    if (username.length < usernameLength)
      errors.push(`<b>Username</b> should contain at least ${usernameLength} characters.`);
  }
  if (errors.length === 0) {
    fetch(`src/controllers/Users.php?type=update&field=username&value=${username}`)
      .then(res => res.json())
      .then(res => {
        btnBack.classList.add('hidden');
        main.classList.remove('hidden');
        configUsername.classList.add('hidden');
        customAlert('center', 'success', '', '<h3>Username updated succesfully!</h3>', false, 2000, '#232323', 'white');
      }).catch(err => console.error(err));
  } else {
    const error = getErrorMsg(errors);
    customAlert('center', 'warning', 'Error', error, true, 0, '#232323', 'white', 'green');
    return;
  }
}

function changeEmail(e) {
  e.preventDefault();
  const errors = [];
  const email = emailConfig.value;
  if (!email
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    errors.push('<b>Email</b> is not a valid email address.');
  if (errors.length === 0) {
    fetch(`src/controllers/UpdateUser.php?field=email&value=${email}`)
      .then(res => res.json())
      .then(res => {
        btnBack.classList.add('hidden');
        main.classList.remove('hidden');
        configEmail.classList.add('hidden');
        (position, icon, title, html, showConfirmButton, timer, background, color, confirmButtonColor)
        customAlert('center', 'success', '', '<h3>Email updated succesfully!</h3>', false, 2000, '#232323', 'white');
      }).catch(err => console.error(err));
  } else {
    const error = getErrorMsg(errors);
    customAlert('center', 'warning', 'Error', error, true, 0, '#232323', 'white', 'green');
    return;
  }
}

function changePassword(e) {
  e.preventDefault();
  const passLength = 6;
  const password = passwordConfig.value;
  const rPassword = rPasswordConfig.value;
  const errors = [];
  if (password !== rPassword) {
    errors.push('<b>Passwords</b> should be equal');
  } else {
    if (password.length < passLength)
      errors.push(`<b>Password</b> should contain at least ${passLength} characters.`);
    if (password.search(/[0-9]/) < 0)
      errors.push(`<b>Password</b> should contain at least one numeric character.`);
    if (password.search(/[A-Z]/) < 0)
      errors.push(`<b>Password</b> should contain at least one uppercase letter.`);
    if (password.search(/[a-z]/) < 0)
      errors.push(`<b>Password</b> should contain at least one lowcase letter.`);
    const containSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!containSymbol.test(password))
      errors.push(`<b>Password</b> should contain at least one special character.`);
  }
  if (errors.length === 0) {
    fetch(`src/controllers/UpdateUser.php?field=password&value=${password}`)
      .then(res => res.json())
      .then(res => {
        btnBack.classList.add('hidden');
        main.classList.remove('hidden');
        configPassword.classList.add('hidden');
        customAlert('center', 'success', '', '<h3>Password updated succesfully!</h3>', false, 2000, '#232323', 'white');
      }).catch(err => console.error(err));
  } else {
    const error = getErrorMsg(errors);
    customAlert('center', 'warning', 'Error', error, true, 0, '#232323', 'white', 'green');
    return;
  }
}