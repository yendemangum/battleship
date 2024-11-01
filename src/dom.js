import { Player } from "./script";
import "./style.css";

function pickRandom(value1, value2) {
  return Math.random() < 0.5 ? value1 : value2;
}

let computer = Player();
let n1 = false;
let n2 = false;
let n3 = false;
let n4 = false;
let n5 = false;
while (n1 == false) {
  n1 = computer.board.placeShip(
    computer.board.ship1,
    pickRandom("horizontal", "vertical"),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  );
}
while (n2 == false) {
  n2 = computer.board.placeShip(
    computer.board.ship2,
    pickRandom("horizontal", "vertical"),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  );
}
while (n3 == false) {
  n3 = computer.board.placeShip(
    computer.board.ship3,
    pickRandom("horizontal", "vertical"),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  );
}
while (n4 == false) {
  n4 = computer.board.placeShip(
    computer.board.ship4,
    pickRandom("horizontal", "vertical"),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  );
}
while (n5 == false) {
  n5 = computer.board.placeShip(
    computer.board.ship5,
    pickRandom("horizontal", "vertical"),
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  );
}

let user = Player();

let container = document.querySelector(".container");

let computerBoardTitle = document.createElement("div")
computerBoardTitle.textContent = "Computer board"
computerBoardTitle.setAttribute("class", "board-title")

let userBoardTitle = document.createElement("div")
userBoardTitle.textContent = "User Board"
userBoardTitle.setAttribute("class", "board-title")


let computerBoard = document.createElement("div");
computerBoard.setAttribute("class", "gameboard");

let userBoard = document.createElement("div");
userBoard.setAttribute("class", "gameboard");

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    let space = document.createElement("div");
    space.setAttribute("class", "space");
    space.addEventListener("click", () => {
      computer.board.receiveAttack(i, j);
      space.textContent = computer.board.board[i][j];
      if (computer.board.allShipsSunk()) {
        gameEnd.textContent = "Game Over! User wins!";
        container.append(gameEnd);
      }
    });
    computerBoard.appendChild(space);
  }
}
function renderUser() {
  userBoard.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let space = document.createElement("div");
      space.setAttribute("class", "space");
      if (typeof user.board.board[i][j] == "object") {
        space.textContent = "ship";
      } else {
        space.textContent = user.board.board[i][j];
      }
      userBoard.appendChild(space);
    }
  }
}

renderUser();

let computerTurnButton = document.createElement("button");
computerTurnButton.textContent = "Computer Turn";
computerTurnButton.addEventListener("click", () => {
  user.board.receiveAttack(
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10)
  );
  renderUser();
  if (user.board.allShipsSunk()) {
    gameEnd.textContent = "Game Over! Computer wins!";
    container.append(gameEnd);
  }
});

let gameEnd = document.createElement("div");
gameEnd.setAttribute("class", "game-end");

container.append(computerBoardTitle, computerBoard,userBoardTitle, userBoard, computerTurnButton);

let placeShipButton = document.querySelector(".ship-form");
let form = document.querySelector("form");
placeShipButton.addEventListener("click", () => {
  form.style.display = "flex";
  placeShipButton.style.display = "none"
  computerBoard.style.display = "none"
  computerBoardTitle.style.display = "none"
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get("ship") == "ship1");
  if (formData.get("ship") == "ship1") {
    user.board.placeShip(
      user.board.ship1,
      formData.get("orientation"),
      Number(formData.get("posX")),
      Number(formData.get("posY"))
    );
  } else if (formData.get("ship") == "ship2") {
    user.board.placeShip(
      user.board.ship2,
      formData.get("orientation"),
      Number(formData.get("posX")),
      Number(formData.get("posY"))
    );
  } else if (formData.get("ship") == "ship3") {
    user.board.placeShip(
      user.board.ship3,
      formData.get("orientation"),
      Number(formData.get("posX")),
      Number(formData.get("posY"))
    );
  } else if (formData.get("ship") == "ship4") {
    user.board.placeShip(
      user.board.ship4,
      formData.get("orientation"),
      Number(formData.get("posX")),
      Number(formData.get("posY"))
    );
  } else if (formData.get("ship") == "ship5") {
    user.board.placeShip(
      user.board.ship5,
      formData.get("orientation"),
      Number(formData.get("posX")),
      Number(formData.get("posY"))
    );
  }

  renderUser();
  computerBoard.style.display = "grid"
  computerBoardTitle.style.display = "block"
  form.style.display = "none";
  placeShipButton.style.display = "inline-block"
});
