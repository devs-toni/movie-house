let imagesLoaded = 0;
let totalImages;

const loadImages = (total) => {
  if (total) totalImages = total;

  if (imagesLoaded === totalImages) {
    document.querySelector('#paginatedList').style.display = 'flex';
    document.querySelector('#loader').style.display = 'none';
  }
}

const imageLoaded = () => {
  imagesLoaded++;
  loadImages();
}