const row = document.querySelector('.carousel-container');

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

rightArrow.addEventListener('click', () => {
  row.scrollLeft += row.offsetWidth + 90;
});
leftArrow.addEventListener('click', () => {
  row.scrollLeft -= (row.offsetWidth + 90);
});

