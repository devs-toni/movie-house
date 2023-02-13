const rowIt = document.querySelector('#carousel-it-container');

const leftArrowIt = document.getElementById('leftArrowIt');
const rightArrowIt = document.getElementById('rightArrowIt');

rightArrowIt.addEventListener('click', () => {
  rowIt.scrollLeft += rowIt.offsetWidth + 90;
});
leftArrowIt.addEventListener('click', () => {
  rowIt.scrollLeft -= (rowIt.offsetWidth + 90);
});




const rowSpa = document.querySelector('#carousel-spa-container');

const leftArrowSpa = document.getElementById('leftArrowSpa');
const rightArrowSpa = document.getElementById('rightArrowSpa');

rightArrowSpa.addEventListener('click', () => {
  rowSpa.scrollLeft += rowSpa.offsetWidth + 90;
});
leftArrowSpa.addEventListener('click', () => {
  rowSpa.scrollLeft -= (rowSpa.offsetWidth + 90);
});





const rowTrend = document.querySelector('#carousel-trend-container');

const leftArrowTrend = document.getElementById('leftArrowTrend');
const rightArrowTrend = document.getElementById('rightArrowTrend');

rightArrowTrend.addEventListener('click', () => {
  rowTrend.scrollLeft += rowTrend.offsetWidth + 90;
});
leftArrowTrend.addEventListener('click', () => {
  rowTrend.scrollLeft -= (rowTrend.offsetWidth + 90);
});
