
const getErrorMsg = (errors) => {
  let error = '';
  errors.forEach(err => {
      error += `<p>${err}</p>`;
  });
  return error;
}

const customAlert = (position, icon, title, html, showConfirmButton, timer) => {
  Swal.fire({
    position,
    icon,
    title,
    html,
    showConfirmButton,
    timer: timer,
  });
}

