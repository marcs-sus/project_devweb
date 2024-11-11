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

function moveImage(btn) {
  clearInterval(intervalId);
  if (btn.id === "next") {
    imgIndex++;
  } else if (btn.id === "prev") {
    imgIndex--;
  }

  slideImage(imgIndex);
}

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

// Interactive Text Area
const textArea = document.getElementById("textArea");

function toggleTextStyle(style) {
  switch (style) {
    case "normal":
      textArea.style.fontStyle = "normal";
      break;
    case "italic":
      textArea.style.fontStyle = "italic";
      break;
    case "oblique":
      textArea.style.fontStyle = "oblique";
    default:
      break;
  }
}

function toggleTextWeight(weight) {
  switch (weight) {
    case "normal":
      textArea.style.fontWeight = "normal";
      break;
    case "bold":
      textArea.style.fontWeight = "bold";
    default:
      break;
  }
}

function toggleTextDeco(deco) {
  switch (deco) {
    case "underline":
      textArea.style.textDecoration = "underline";
      break;
    case "overline":
      textArea.style.textDecoration = "overline";
      break;
    case "underline overline":
      textArea.style.textDecoration = "underline overline";
    case "strikethrough":
      textArea.style.textDecoration = "line-through";
      break;
    default:
      break;
  }
}

function transformText(transform) {
  switch (transform) {
    case "uppercase":
      textArea.style.textTransform = "uppercase";
      break;
    case "lowercase":
      textArea.style.textTransform = "lowercase";
      break;
    default:
      break;
  }
}

function clearText() {
  textArea.value = "";
}

function copyText() {
  textArea.select();
  navigator.clipboard.writeText(textArea.value);
  alert("Copied to clipboard");
}
