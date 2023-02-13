const rowVotes = document.querySelector('#carousel-votes-container');

const leftArrowVote = document.getElementById('leftArrowVotes');
const rightArrowVote = document.getElementById('rightArrowVotes');

rightArrowVote.addEventListener('click', () => {
  rowVotes.scrollLeft += rowVotes.offsetWidth + 90;
});
leftArrowVote.addEventListener('click', () => {
  rowVotes.scrollLeft -= (rowVotes.offsetWidth + 90);
});