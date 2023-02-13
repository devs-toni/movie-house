const rowAdult = document.querySelector('#carousel-adult-container');

const leftArrowAdult = document.getElementById('leftArrowAdult');
const rightArrowAdult = document.getElementById('rightArrowAdult');

rightArrowAdult.addEventListener('click', () => {
  rowAdult.scrollLeft += rowAdult.offsetWidth + 90;
});
leftArrowAdult.addEventListener('click', () => {
  rowAdult.scrollLeft -= (rowAdult.offsetWidth + 90);
});