const Ship = function (length) {
  let hits = 0;
  const isSunk = () => {
    if (hits >= length) {
      return true;
    } else if (hits < length) {
      return false;
    }
  };
  const hit = () => hits++;
  return { length, hits, isSunk, hit };
};

const Gameboard = function () {
  let board = [];
  for (let i = 0; i < 10; i++) {
    board[i] = new Array(10);
  }

  let ship1 = Ship(2);
  let ship2 = Ship(3);
  let ship3 = Ship(3);
  let ship4 = Ship(4);
  let ship5 = Ship(5);

  const placeShip = (ship, orientation, posX, posY) => {
    if (
      (ship.length + posX >= 10 && orientation == "vertical") ||
      (ship.length + posY >= 10 && orientation == "horizontal")
    ) {
      return false;
    } else if (orientation == "vertical") {
      for (let i = 0; i < ship.length; i++) {
        if (board[posX + i][posY]) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[posX + i][posY] == undefined) {
          board[posX + i][posY] = ship;
        }
      }
      return true;
    } else if (orientation == "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        if (board[posX][posY + i]) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[posX][posY + i] == undefined) {
          board[posX][posY + i] = ship;
        }
      }
      return true;
    }
  };

  const receiveAttack = (posX, posY) => {
    if (
      board[posX][posY] == ship1 ||
      board[posX][posY] == ship2 ||
      board[posX][posY] == ship3 ||
      board[posX][posY] == ship4 ||
      board[posX][posY] == ship5
    ) {
      board[posX][posY].hit();
      board[posX][posY] = "hit";
      return board[posX][posY];
    } else if (board[posX][posY] == "hit") {
      return;
    } else {
      board[posX][posY] = "miss";
      return board[posX][posY];
    }
  };

  function allShipsSunk() {
    if (
      ship1.isSunk() &&
      ship2.isSunk() &&
      ship3.isSunk() &&
      ship4.isSunk() &&
      ship5.isSunk()
    ) {
      return "All ships sunk!";
    }
  }
  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    ship1,
    ship2,
    ship3,
    ship4,
    ship5,
    board,
  };
};
const Player = function () {
  const board = Gameboard();
  return { board };
};

export { Player };
