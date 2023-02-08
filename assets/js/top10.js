const row = document.querySelector('.carousel-container');

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

rightArrow.addEventListener('click', () => {
  row.scrollLeft += row.offsetWidth + 90;
});
leftArrow.addEventListener('click', () => {
  row.scrollLeft -= (row.offsetWidth + 90);
});

function loadBtns(total) {
  const totalPages = Math.ceil(total.length / 10);
  console.log('Whhaaat' + totalPages);
  for (let i = 0; i < totalPages; i++) {
    const btn = document.createElement('button');

    if (i == 0) btn.classList.add('active');

    document.querySelector('.btns').appendChild(btn);

  }
}