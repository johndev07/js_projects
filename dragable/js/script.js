const wrapper = document.querySelector(".wrapper"),
  header = document.querySelector("header");

function drag({ movementX, movementY }) {
  let getStyle = getComputedStyle(wrapper);
  let left = parseInt(getStyle.left);
  let top = parseInt(getStyle.top);
  console.log(left, top);
  wrapper.style.left = `${left + movementX}px`;
  wrapper.style.top = `${top + movementY}px`;
}

header.addEventListener("mousedown", () => {
  header.classList.add("active");
  header.addEventListener("mousemove", drag);
});

document.addEventListener("mouseup", () => {
  header.classList.remove("active");
  header.removeEventListener("mousemove", drag);
});
