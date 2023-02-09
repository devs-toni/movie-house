const rowVotes = document.querySelector('.carousel-votes-container');

const leftArrowVote = document.getElementById('leftArrowVote');
const rightArrowVote = document.getElementById('rightArrowVote');

rightArrowVote.addEventListener('click', () => {
  rowVotes.scrollLeft += rowVotes.offsetWidth + 90;
});
leftArrowVote.addEventListener('click', () => {
  rowVotes.scrollLeft -= (rowVotes.offsetWidth + 90);
});