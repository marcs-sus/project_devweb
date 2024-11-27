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

// Stopwatch
const stopwatch = document.querySelector(".time-display");
const toggleIcon = document.querySelector("#playPause svg");

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeInterval = null;
let isRunning = false;

function startPauseStopwatch() {
  if (isRunning) {
    clearInterval(timeInterval);
    toggleIcon.innerHTML = `
      <path id="playIcon" d="M320-202v-560l440 280-440 280Zm66.67-280Zm0 158.67L636-482 386.67-640.67v317.34Z" />
    `;
    isRunning = false;
  } else {
    timeInterval = setInterval(displayTime, 10);
    toggleIcon.innerHTML = `
      <path id="pauseIcon" d="M523.33-200v-560H760v560H523.33ZM200-200v-560h236.67v560H200Zm390-66.67h103.33v-426.66H590v426.66Zm-323.33 0H370v-426.66H266.67v426.66Zm0-426.66v426.66-426.66Zm323.33 0v426.66-426.66Z" />
    `;
    isRunning = true;
  }
}

function resetStopwatch() {
  clearInterval(timeInterval);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  stopwatch.innerHTML = "00 : 00 : 00 : 000";
  isRunning = false;

  toggleIcon.innerHTML = `
    <path id="playIcon" d="M320-202v-560l440 280-440 280Zm66.67-280Zm0 158.67L636-482 386.67-640.67v317.34Z" />
  `;
}

function displayTime() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  stopwatch.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}
