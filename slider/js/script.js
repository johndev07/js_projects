let slider = document.querySelector(".slider");
let sliderImg = document.querySelectorAll(".slider > img");
let rightArrow = document.querySelector(".right");
let leftArrow = document.querySelector(".left");

let frameWidth = (window.innerWidth / 100) * 80;
let slideCounter = 1;

slider.style.transform = `translateX(-${frameWidth}px)`;

rightArrow.addEventListener("click", () => {
  if (slideCounter >= sliderImg.length - 1) return;
  slideCounter++;
  slider.style.transition = `1s linear`;
  slider.style.transform = `translateX(-${frameWidth * slideCounter}px)`;
});
leftArrow.addEventListener("click", () => {
  if (slideCounter <= 0) return;
  slideCounter--;
  slider.style.transition = `1s linear`;
  slider.style.transform = `translateX(-${frameWidth * slideCounter}px)`;
});

slider.addEventListener("transitionend", () => {
  if (sliderImg[slideCounter].classList.contains("last-clone")) {
    slideCounter = sliderImg.length - 2;
    slider.style.transition = `none`;
    slider.style.transform = `translateX(-${frameWidth * slideCounter}px)`;
  }
  if (sliderImg[slideCounter].classList.contains("first-clone")) {
    slideCounter = 1;
    slider.style.transition = `none`;
    slider.style.transform = `translateX(-${frameWidth * slideCounter}px)`;
  }
});
