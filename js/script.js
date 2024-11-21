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
  slideImgs = document.querySelectorAll("#slideImg"),
  btns = document.querySelectorAll(".slide-button");

const autoDeley = 5000;

let imgIndex = 1,
  intervalId;

const autoSlide = () => {
  intervalId = setInterval(() => slideImage(++imgIndex), autoDeley);
};

const slideImage = () => {
  if (imgIndex === slideImgs.length) {
    imgIndex = 0;
  } else if (imgIndex < 0) {
    imgIndex = slideImgs.length - 1;
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

let isBold = false;
let isItalic = false;
let currentDeco = "none";

function toggleTextWeight() {
  isBold = !isBold;
  if (isBold) {
    textArea.style.fontWeight = "bold";
  }
  if (!isBold) {
    textArea.style.fontWeight = "normal";
  }
  document.getElementById("boldBtn").classList.toggle("active", isBold);
}

function toggleTextStyle() {
  isItalic = !isItalic;
  if (isItalic) {
    textArea.style.fontStyle = "italic";
  }
  if (!isItalic) {
    textArea.style.fontStyle = "normal";
  }
  document.getElementById("italicBtn").classList.toggle("active", isItalic);
}

function toggleTextDeco(deco) {
  if (currentDeco === deco) {
    textArea.style.textDecoration = "none";
    document.getElementById(deco + "Btn").classList.remove("active");
    currentDeco = null;
    return;
  }

  ["underline", "overline", "line-through"].forEach((dec) => {
    document.getElementById(dec + "Btn").classList.remove("active");
  });

  textArea.style.textDecoration = deco;
  document.getElementById(deco + "Btn").classList.add("active");
  currentDeco = deco;
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

function changeFontSize(size) {
  textArea.style.fontSize = size;
}

function clearText() {
  textArea.innerHTML = "";
}

function copyText() {
  const range = document.createRange();
  range.selectNodeContents(textArea);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy"); // Obsolete but still works
    alert("Styled text copied to clipboard!");
  } catch (err) {
    alert("Failed to copy styled text: " + err);
  }
}

// Lightbox
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const lbImgs = document.querySelectorAll("#lbImg");
lbImgs.forEach((image) => {
  image.addEventListener("click", (e) => {
    lightbox.classList.add("active");
    const shownImg = document.createElement("img");
    shownImg.src = image.src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.appendChild(shownImg);
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove("active");
});
