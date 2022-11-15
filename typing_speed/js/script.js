const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const mistake = document.querySelector(".mistake p span > b");
const timerTag = document.querySelector(".time p span > b");
const wpm = document.querySelector(".wpm p span > b");
const cpm = document.querySelector(".cpm p span > b");
const tryAgainBtn = document.querySelector(".try_again");
let charIndex = 0,
  mistakeCount = 0,
  isTyping = 0,
  timeLeft = 60;

let timer,
  maxTime = 60;
function randomPara() {
  let randomParaNumber = Math.floor(Math.random() * paragraphs.length);
  let fullPara = "";

  paragraphs[randomParaNumber].split("").forEach((letter) => {
    fullPara += `<span>${letter}</span>`;
  });
  typingText.innerHTML = fullPara;
  document.addEventListener("keydown", () => inputField.focus());
  typingText.addEventListener("click", () => inputField.focus());
}

randomPara();

function initTyping() {
  const character = typingText.querySelectorAll("span");
  let typedCharacter = inputField.value.split("")[charIndex];

  if (charIndex < character.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }

    if (typedCharacter == null) {
      charIndex--;
      if (character[charIndex].classList.contains("incorrect")) {
        mistakeCount--;
        mistake.innerText = mistakeCount;
      }
      character[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (character[charIndex].innerText === typedCharacter) {
        character[charIndex].classList.add("correct");
      } else {
        character[charIndex].classList.add("incorrect");
        mistakeCount++;
        mistake.innerText = mistakeCount;
      }
      charIndex++;
    }
    let x = document
      .querySelector(".typing-text p >span.active")
      ?.classList.remove("active");
    console.log(charIndex);
    let speedCount = Math.round(
      ((charIndex - mistakeCount) / 5 / (maxTime - timeLeft)) * 60
    );
    speedCount =
      speedCount < 0 || !speedCount || speedCount === Infinity ? 0 : speedCount;
    wpm.innerText = speedCount;
    cpm.innerText = charIndex - mistakeCount;
    character[charIndex].classList.add("active");
  } else {
    clearInterval(timer);
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    console.log(timerTag);
    timerTag.innerText = timeLeft;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
}

function resetGame() {
  console.log("fined");
  randomPara();
  timeLeft = 60;
  charIndex = 0;
  mistakeCount = 0;
  isTyping = 0;
  mistake.innerText = mistakeCount;
  wpm.innerText = 0;
  cpm.innerText = 0;
  fullPara = "";
  inputField.value = "";
  timerTag.innerText = maxTime;
  clearInterval(timer);
}

inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
