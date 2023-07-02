const nextButton = document.querySelectorAll(".next-button");
const prevButton = document.querySelectorAll(".prev-button");
const sections = [
  document.getElementById("Popular-movies"),
  document.getElementById("Now-playing"),
  document.getElementById("Top-Rated"),
  document.getElementById("Up-Coming")
];

function scrollSection(section, direction) {
  const filmWidth = (section.firstElementChild.clientWidth + 16) * 2;
  section.scrollLeft += direction * filmWidth;
}

function addScrollListeners(section, index) {
  nextButton[index].addEventListener("click", () => {
    scrollSection(section, 1);
  });

  prevButton[index].addEventListener("click", () => {
    scrollSection(section, -1);
  });
}

function addDisplayButtonListeners(section, index) {
  section.offsetParent.addEventListener("mouseover", () => {
    nextButton[index].style.display = "flex";
    prevButton[index].style.display = "flex";
  });

  section.offsetParent.addEventListener("mouseout", () => {
    nextButton[index].style.display = "none";
    prevButton[index].style.display = "none";
  });
}

function initializeCarousel() {
  sections.forEach((section, index) => {
    addScrollListeners(section, index);
    addDisplayButtonListeners(section, index);
  });
}

initializeCarousel();