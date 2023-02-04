let imagesLoaded = 0;
let totalImages;

const loadImages = (total) => {
  if (total) totalImages = total;
  if (imagesLoaded === totalImages) {
    document.querySelector('#paginatedList').classList.remove('hidden');
    document.querySelector('#loader').classList.add('hidden');
  }
}

const imageLoaded = () => {
  imagesLoaded++;
  loadImages();
}