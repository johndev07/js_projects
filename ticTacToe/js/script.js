const board = document.querySelector("#board");
const cellElements = document.querySelectorAll("[data-cell]");
const winningContainer = document.querySelector("#winningMessage");
const winningMesssage = document.querySelector(".data-winning-message-text");
const restart = document.querySelector("#restartButton");
let circleTurn = false;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove("x", "circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningContainer.classList.remove("show");
  circleTurn = false;
  board.classList.remove("circle");
  board.classList.add("x");
}

startGame();

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? "circle" : "x";

  placeMark(cell, currentClass);

  //placemarks
  //check for win

  setBoardHoverClass();
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBoardHoverClass();
  }

  //check for draw
  //switch turn
}

function isDraw() {
  let x = [...cellElements].every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("circle")
  );

  return x;
}

function endGame(draw) {
  if (draw) {
    winningMesssage.innerText = "Draw!";
  } else {
    winningMesssage.innerText = `${circleTurn ? "O's" : "X's"} Wins! `;
  }
  winningContainer.classList.add("show");
}

function placeMark(target, mark) {
  target.classList.add(mark);
}

function swapTurn() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove("x", "circle");
  if (circleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
}

function checkWin(currentClass) {
  let x = winningCombinations.some((combinations) =>
    combinations.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    })
  );
  return x;
}

restart.addEventListener("click", startGame);
