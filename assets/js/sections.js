setCarouselActions('trend');
setCarouselActions('spa');
setCarouselActions('it');
setCarouselActions('action');

function setCarouselActions(section) {
  const rowAction = document.querySelector(`#carousel-${section}-container`);

  const leftArrowAction = document.getElementById(`leftArrow${section.charAt(0).toUpperCase()}`);
  const rightArrowAction = document.getElementById(`rightArrow${section.charAt(0).toUpperCase()}`);

  rightArrowAction.addEventListener('click', () => {
    rowAction.scrollLeft += rowAction.offsetWidth + 90;
  });
  leftArrowAction.addEventListener('click', () => {
    rowAction.scrollLeft -= (rowAction.offsetWidth + 90);
  });
}
