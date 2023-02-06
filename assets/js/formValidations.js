
function loginValidation(mail, password) {
  const errors = [];
  if (!mail
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    errors.push('Email');
  if (password.length < 3)
    errors.push('Password');
  
  return errors;
}

function registerValidation(username, mail, password) {
    const errors = [];
  if (username.length < 4) 
    errors.push('Username');
  if (!mail
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    errors.push('Email');
  if (password.length < 3)
    errors.push('Password');
  
  return errors;
}