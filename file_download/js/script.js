let submitBtn = document.querySelector(".reset-btn");
let urlInput = document.querySelector("#urlInput");
submitBtn.addEventListener("click", makeUrl);

function makeUrl(e) {
  e.preventDefault();
  fetch(urlInput.value)
    .then((response) => response.blob())
    .then((file) => {
      let tempurl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempurl;
      aTag.download = "filename";
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    });
}
