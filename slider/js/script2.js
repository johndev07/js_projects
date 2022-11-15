const rightArrow = document.querySelector(".right");
const leftArrow = document.querySelector(".left");
const slider = document.querySelector(".slider");
const frame = document.querySelector(".frame");
const sliderImg = document.querySelectorAll(".slider img");

let count = 1;
let length = sliderImg.length;

let frameWidth = (window.innerWidth / 100) * 80;

slider.style.transform = `translateX(-${frameWidth * count}px)`;
rightArrow.addEventListener("click", () => {
  if (count >= sliderImg.length - 1) return;
  slider.style.transition = `transform 0.4s ease-in-out`;
  count++;
  slider.style.transform = `translateX(-${frame.offsetWidth * count}px)`;
});

leftArrow.addEventListener("click", () => {
  if (count <= 0) return;
  slider.style.transition = `transform 0.4s ease-in-out`;
  count--;
  slider.style.transform = `translateX(-${frame.offsetWidth * count}px)`;
});

slider.addEventListener("transitionend", () => {
  if (sliderImg[count].classList.contains("last-clone")) {
    slider.style.transition = "none";
    count = sliderImg.length - 2;
    slider.style.transform = `translateX(-${frame.offsetWidth * count}px)`;
  }
  if (sliderImg[count].classList.contains("first-clone")) {
    slider.style.transition = "none";
    count = sliderImg.length - count;
    slider.style.transform = `translateX(-${frame.offsetWidth * count}px)`;
  }
});
