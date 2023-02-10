const rowSpa = document.querySelector('.carousel-spa-container');

const leftArrowSpa = document.getElementById('leftArrowSpa');
const rightArrowSpa = document.getElementById('rightArrowSpa');

rightArrowSpa.addEventListener('click', () => {
  rowSpa.scrollLeft += rowSpa.offsetWidth + 90;
});
leftArrowSpa.addEventListener('click', () => {
  rowSpa.scrollLeft -= (rowSpa.offsetWidth + 90);
});

