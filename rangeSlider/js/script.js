const rangeInput = document.querySelectorAll(".range-input input");
const progress = document.querySelector(".slider .progress");
const priceInput = document.querySelectorAll(".price-input input");
let priceGap = 1000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minValue = parseInt(priceInput[0].value);
    let maxValue = parseInt(priceInput[1].value);

    console.log(minValue, maxValue);
    if (maxValue - minValue >= priceGap && maxValue <= 10000) {
      if (e.target.className == "input-min") {
        rangeInput[0].value = minValue;
        progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxValue;
        progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minValue = parseInt(rangeInput[0].value);
    let maxValue = parseInt(rangeInput[1].value);
    // console.log(minValue, maxValue);
    if (maxValue - minValue < priceGap) {
      if (e.target.className == "range-min") {
        rangeInput[0].value = maxValue - priceGap;
      } else {
        rangeInput[1].value = minValue + priceGap;
      }
    } else {
      priceInput[0].value = minValue;
      priceInput[1].value = maxValue;
      progress.style.left = (minValue / rangeInput[0].max) * 100 + "%";
      progress.style.right = 100 - (maxValue / rangeInput[1].max) * 100 + "%";
    }
  });
});
