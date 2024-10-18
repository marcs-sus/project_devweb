// Carousel behaviour
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");

let currentIndex = 0;
let intervalId;

// Move to appointed slide
function moveToSlide(index) {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  track.style.width = `${slideWidth * slides.length}px`;
}

// Modular arithmetic for slides loop
nextButton.onclick = function () {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
  resetInterval();
};

prevButton.onclick = function () {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  moveToSlide(currentIndex);
  resetInterval();
};

// Autoplay after 10 seconds
function startInterval() {
  intervalId = setInterval(function () {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  }, 10000);
}

function resetInterval() {
  clearInterval(intervalId);
  startInterval();
}

startInterval();