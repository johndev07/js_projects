const wrapper = document.querySelector(".wrapper"),
  form = document.querySelector("form"),
  fileInput = document.querySelector(".file_Input"),
  qrImage = document.querySelector(".qr-Image"),
  infoText = document.querySelector("p"),
  copyBtn = document.querySelector(".copy"),
  closeBtn = wrapper.querySelector(".close");

function fetchRequest(formData, file) {
  infoText.innerText = "scannig the qr code....";

  fetch("https://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
      console.log(result);
      wrapper.querySelector("textarea").innerText = result;
      infoText.innerText = result
        ? "Upload qr code to scan"
        : "couldn't scan the image";
    })
    .catch((err) => {
      infoText.innerText = "couldn't scan the qr code";
    });
}

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];
  if (!file) return;
  let formData = new FormData();
  formData.append("file", file);

  fetchRequest(formData, file);
});

form.addEventListener("click", () => fileInput.click());
closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").textContent;
  navigator.clipboard.writeText(text);
});
