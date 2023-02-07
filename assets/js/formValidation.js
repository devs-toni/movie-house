const formLogin = document.querySelector('#loginForm');
formLogin.addEventListener('submit', login);

const formRegister = document.querySelector('#registerForm');
formRegister.addEventListener('submit', register);

function login(e) {
  e.preventDefault();
  const mail = email.value;
  const pass = password.value;
  fetch(`src/controllers/Login.php?email=${mail}&pass=${pass}`)
    .then(res => res.json())
    .then(res => {
      if (res === 'Ok') {
        window.location.reload();
      } else {
        customAlert('center', 'warning', 'Error', '<h4>Email/Password wrong!</h4>', false, 2000, '#232323', '#ff683f');
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function register(e) {
  e.preventDefault();
  const username = usernameSignUp.value;
  const mail = emailSignUp.value;
  const pass = passwordSignUp.value;
  const rPass = rPasswordSignUp.value;
  const errors = validate(mail, pass, rPass, username);
  if (errors.length === 0) {
    window.location = `src/controllers/Register.php?name=${username}&mail=${mail}&pass=${pass}`;
  } else {
    const error = getErrorMsg(errors);
    customAlert('center', 'warning', 'Error', error, true, 0, '#232323', '#ff683f', '#ff683f');
  }
}


function validate(email, password, rPassword, username) {
  const errors = [];

  const passLength = 6;
  const usernameLength = 5;

  if (!email
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    errors.push('<b>Email</b> is not a valid email address.');

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
  if (username) {
    if (username.length < usernameLength)
      errors.push(`<b>Username</b> should contain at least ${usernameLength} characters.`);
  }
  return errors;
}




