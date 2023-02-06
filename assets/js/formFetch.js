const formLogin = document.querySelector('#loginForm');
formLogin.addEventListener('submit', loginFetch);
const formRegister = document.querySelector('#registerForm');
formRegister.addEventListener('submit', register);

function loginFetch(e) {
  e.preventDefault();

  const mail = email.value;
  const pass = password.value;

  const errors = loginValidation(mail, pass);

  if (errors.length === 0) {
    fetch(`src/controllers/Login.php?email=${mail}&pass=${pass}`)
      .then(res => res.json())
      .then(res => {
        if (res === 'Ok') {
          window.location.reload();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error',
            text: 'Email/Password wrong . . . ',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  } else {

    let error = 'Error: ';
    errors.forEach((err, index) => {
      if (index !== errors.length - 1)
        error += err + ' , ';
      else
        error += err + ' ';
    });
    if (errors.length === 1) error += "isn't valid";
    else error += "aren't valid";

    Swal.fire({
      position: 'center',
      icon: 'warning',
      text: error,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

function register(e) {
  e.preventDefault();
  console.log(e);
  const name = usernameSignUp.value;
  const mail = emailSignUp.value;
  const pass = passwordSignUp.value;

  const errors = registerValidation(name, mail, pass);

  if (errors.length === 0) {
    window.location = `src/controllers/Register.php?name=${name}&mail=${mail}&pass=${pass}`;
  } else {
    let error = 'Error: ';
    errors.forEach((err, index) => {
      if (index !== errors.length - 1)
        error += err + ' , ';
      else
        error += err + ' ';
    });
    if (errors.length === 1) error += "isn't valid";
    else error += "aren't valid";
    Swal.fire({
      position: 'center',
      icon: 'warning',
      text: error,
      showConfirmButton: false,
      timer: 2000,
    });
  }
}