const rowVotes = document.querySelector('.carousel-votes-container');

const leftArrowVote = document.getElementById('leftArrowVote');
const rightArrowVote = document.getElementById('rightArrowVote');

rightArrowVote.addEventListener('click', () => {
  rowVotes.scrollLeft += rowVotes.offsetWidth + 90;
});
leftArrowVote.addEventListener('click', () => {
  rowVotes.scrollLeft -= (rowVotes.offsetWidth + 90);
});





const rowIt = document.querySelector('.carousel-it-container');

const leftArrowIt = document.getElementById('leftArrowIt');
const rightArrowIt = document.getElementById('rightArrowIt');

rightArrowIt.addEventListener('click', () => {
  rowIt.scrollLeft += rowIt.offsetWidth + 90;
});
leftArrowIt.addEventListener('click', () => {
  rowIt.scrollLeft -= (rowIt.offsetWidth + 90);
});




const rowSpa = document.querySelector('.carousel-spa-container');

const leftArrowSpa = document.getElementById('leftArrowSpa');
const rightArrowSpa = document.getElementById('rightArrowSpa');

rightArrowSpa.addEventListener('click', () => {
  rowSpa.scrollLeft += rowSpa.offsetWidth + 90;
});
leftArrowSpa.addEventListener('click', () => {
  rowSpa.scrollLeft -= (rowSpa.offsetWidth + 90);
});





const rowTrend = document.querySelector('.carousel-trend-container');

const leftArrowTrend = document.getElementById('leftArrowTrend');
const rightArrowTrend = document.getElementById('rightArrowTrend');

rightArrowTrend.addEventListener('click', () => {
  rowTrend.scrollLeft += rowTrend.offsetWidth + 90;
});
leftArrowTrend.addEventListener('click', () => {
  rowTrend.scrollLeft -= (rowTrend.offsetWidth + 90);
});




const rowAdult = document.querySelector('.carousel-adult-container');

const leftArrowAdult = document.getElementById('leftArrowAdult');
const rightArrowAdult = document.getElementById('rightArrowAdult');

rightArrowAdult.addEventListener('click', () => {
  rowAdult.scrollLeft += rowAdult.offsetWidth + 90;
});
leftArrowAdult.addEventListener('click', () => {
  rowAdult.scrollLeft -= (rowAdult.offsetWidth + 90);
});