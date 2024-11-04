// Carousel
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel-item");

let currentIndex = 0;
let intervalId;

// Move to appointed slide
function moveToSlide(index) {
  const slideWidth = slides[0].offsetWidth;
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  track.style.width = `${slideWidth * slides.length}px`;
}

// Modular arithmetic for slides loop
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  moveToSlide(currentIndex);
  resetInterval();
};

function prevSlide() {
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


// Navbar
const sidebar = document.querySelector('.sidebar');

function showSidebar() {
  sidebar.style.display = 'flex';
}

function hideSidebar() {
  sidebar.style.display = 'none';
}