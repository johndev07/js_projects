const inputfile = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img");
const previewImg = document.querySelector(".preview-img > img");
const filterOption = document.querySelectorAll(".filter  button");
const mainContainer = document.querySelector(".container");
const filterName = document.querySelector(".filter-info > .name");
const filterValue = document.querySelector(".filter-info > .value");
const filterSlider = document.querySelector(".slider > input");
const rotateOption = document.querySelectorAll(".rotateOption > button");
const reset = document.querySelector(".reset-filter");
const save_img = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  greyscale = 0;

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;
const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)`;
};

const loadImage = () => {
  let file = inputfile.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  console.log(file, "testing  ");
  previewImg.addEventListener("load", () => {
    mainContainer.classList.remove("disable");
  });
};

console.log(filterOption);

filterOption.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter button.active").classList.remove("active");
    option.classList.add("active");
    filterName.textContent = option.textContent;

    switch (option.id) {
      case "brightness":
        filterSlider.max = 200;
        filterValue.innerText = brightness;
        filterSlider.value = brightness;
        break;
      case "saturation":
        filterSlider.max = 200;
        filterValue.innerText = saturation;
        filterSlider.value = saturation;
        break;
      case "inversion":
        filterValue.innerText = inversion;
        filterSlider.value = inversion;
        break;
      case "greyscale":
        filterValue.innerText = greyscale;
        filterSlider.value = greyscale;
    }
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  let selectedFilter = document.querySelector(".filter  button.active");

  switch (selectedFilter.id) {
    case "brightness":
      brightness = filterSlider.value;
      break;
    case "saturation":
      saturation = filterSlider.value;
      break;
    case "inversion":
      inversion = filterSlider.value;
      break;
    case "greyscale":
      greyscale = filterSlider.value;
  }

  applyFilters();
};

rotateOption.forEach((option) => {
  option.addEventListener("click", () => {
    switch (option.id) {
      case "left":
        console.log("left clicked");
        rotate -= 90;
        break;
      case "right":
        rotate += 90;
        break;
      case "flip_vertical":
        console.log(flipVertical);
        flipVertical = flipVertical == 1 ? -1 : 1;
        break;
      case "flip_horizontal":
        flipHorizontal = flipHorizontal == 1 ? -1 : 1;
        break;
    }
    applyFilters();
    console.log("i reached");
  });
});

const resetfilter = () => {
  console.log("i am working");
  brightness = 100;
  saturation = 100;
  inversion = 0;
  greyscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOption[0].click();
  applyFilters();
};

reset.addEventListener("click", resetfilter);

filterSlider.addEventListener("input", updateFilter);
inputfile.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => inputfile.click());
const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};
save_img.addEventListener("click", saveImage);
