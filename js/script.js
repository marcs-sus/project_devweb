// Navbar
const sidebar = document.querySelector(".sidebar");

function showSidebar() {
  sidebar.style.display = "flex";
}

function hideSidebar() {
  sidebar.style.display = "none";
}

// Slideshow
const slideshow = document.querySelector(".slideshow"),
  carousel = document.querySelector(".carousel"),
  imgs = document.querySelectorAll("img"),
  btns = document.querySelectorAll(".slide-button");

const autoDeley = 5000;

let imgIndex = 1,
  intervalId;

const autoSlide = () => {
  intervalId = setInterval(() => slideImage(++imgIndex), autoDeley);
};

const slideImage = () => {
  if (imgIndex === imgs.length) {
    imgIndex = 0;
  } else if (imgIndex < 0) {
    imgIndex = imgs.length - 1;
  }

  carousel.style.transform = `translate(-${imgIndex * 100}%)`;
};

const updateClick = (e) => {
  clearInterval(intervalId);
  if (e.target.id === "next") {
    imgIndex++;
  } else {
    imgIndex--;
  }

  slideImage(imgIndex);
};

btns.forEach((button) => button.addEventListener("click", updateClick));

slideshow.addEventListener("mouseover", () => clearInterval(intervalId));
slideshow.addEventListener("mouseleave", autoSlide);

autoSlide();

// Drag and Drop
const boxes = document.querySelectorAll(".dnd-box"),
  item = document.querySelector(".dnd-item");

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    box.classList.add("hovered");
  });

  box.addEventListener("dragleave", () => {
    box.classList.remove("hovered");
  });

  box.addEventListener("drop", () => {
    box.appendChild(item);
    box.classList.remove("hovered");
  });
});
