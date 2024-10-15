// Carousel behaviour
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-item');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

let currentIndex = 0;

// Move to appointed slide
function moveToSlide(index) {
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
}

// Modular arithmetic for slides loop
nextButton.onclick = function() {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
}

prevButton.onclick = function() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    moveToSlide(currentIndex);
}

// Autoplay after 10 seconds
setInterval(function() {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
}, 10000);