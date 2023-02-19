const sections = ['trend', 'it', 'spa', 'action', 'comedy', 'adventure', 'history', 'horror', 'drama', 'thriller', 'crime', 'fantasy', 'documentary', 'science_fiction', 'western', 'mystery', 'music', 'romance', 'family', 'war'];
sections.map(s => setCarouselActions(s));

function setCarouselActions(section) {
  const rowAction = document.querySelector(`#carousel-${section}-container`);
  const leftArrowAction = document.getElementById(`leftArrow${section.charAt(0).toUpperCase() + section.slice(1)}`);
  const rightArrowAction = document.getElementById(`rightArrow${section.charAt(0).toUpperCase() + section.slice(1)}`);

  rightArrowAction.addEventListener('click', () => {
    rowAction.scrollLeft += rowAction.offsetWidth + 90;
  });
  leftArrowAction.addEventListener('click', () => {
    rowAction.scrollLeft -= (rowAction.offsetWidth + 90);
  });
}
