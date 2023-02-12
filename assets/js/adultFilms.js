const rowP = document.querySelector('.carousel-p-container');

const leftArrowP = document.getElementById('leftArrowP');
const rightArrowP = document.getElementById('rightArrowP');

rightArrowP.addEventListener('click', () => {
  rowP.scrollLeft += rowP.offsetWidth + 90;
});
leftArrowP.addEventListener('click', () => {
  rowP.scrollLeft -= (rowP.offsetWidth + 90);
});

