function generateEmptyBoard () {
  return(
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  );
}

function generateRandomOneOf(a, b, chanceOfA) {
  return Math.random() <= chanceOfA ? a : b;
}

function generateNumberBetween (min, max){
  return Math.floor(Math.random() * (max - min) + min);
}

var gameState = {
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  score: 0
}

function generateRandomTile() {
  let row = generateNumberBetween(0, 3);
  let col = generateNumberBetween(0, 3);
  while (gameState.board[row][col] !== 0) {
    row = generateNumberBetween(0, 3);
    col = generateNumberBetween(0, 3);
  }
  gameState.board[row][col] = generateRandomOneOf(2, 4, 0.9);
};

function printGame  () {
  console.log(`SCORE: ${score}\n+---+---+---+---+`);
  for (let row = 0; row < 4; row++) {
    console.log(
      "|",
      gameState.board[row][0],
      "|",
      gameState.board[row][1],
      "|",
      gameState.board[row][2],
      "|",
      gameState.board[row][3],
      "|"
    );
    console.log("+---+---+---+---+");
  }
};
function stack () {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    let stackCount = 0;
    for (let col = 0; col < 4; col++) {
      if (gameState.board[row][col] !== 0) {
        newBoard[row][stackCount] = gameState.board[row][col];
        stackCount++;
      }
    }
  }
  gameState.board = newBoard;
};

function merge() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameState.board[row][col] === gameState.board[row][col + 1]) {
        gameState.board[row][col] *= 2;
        gameState.board[row][col + 1] = 0;
        gameState.score += gameState.board[row][col];
      }
    }
  }
};

function flipVertical() {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newBoard[row][col] = gameState.board[row][3 - col];
    }
  }
  gameState.board = newBoard;
};

function transpose () {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newBoard[row][col] = gameState.board[col][row];
    }
  }
  gameState.board = newBoard;
};

function moveLeft () {
  stack();
  merge();
  stack();
  updateGameState();
};

function moveRight () {
  flipVertical();
  stack();
  merge();
  stack();
  flipVertical();
  updateGameState();
};

function moveUp () {
  transpose();
  stack();
  merge();
  stack();
  transpose();
  updateGameState();
};

function moveDown () {
  transpose();
  flipVertical();
  stack();
  merge();
  stack();
  flipVertical();
  transpose();
  updateGameState();
};

function setGameBoard () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let tile = document.createElement("div");
      tile.id = `${i.toString()}-${j.toString()}`;
      let num = gameState.board[i][j];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
};

function updateGameState () {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let tile = document.getElementById(`${i.toString()}-${j.toString()}`);
      let num = gameState.board[i][j];
      updateTile(tile, num);
    }
  }
  updateScore()
}

function updateScore () {
  let screenScore = document.getElementById("score")
  screenScore.innerHTML = gameState.score
}

function updateTile (tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if(num > 0) tile.innerText = num;
  if (num >= 16384) {
    tile.classList.add("xMAX2");
  } else if (num >= 4096) {
    tile.classList.add("xMAX");
  } else {
    tile.classList.add(`x${num.toString()}`);
  }
};


window.onload = () => {
  generateRandomTile();
  generateRandomTile();
  setGameBoard();
};

function makeMove (e) {
  switch (e.code){
    case "ArrowLeft": 
    case "KeyA": {
      moveLeft();
      generateRandomTile();
      break;
    }
    case "ArrowRight":
    case "KeyD": {
      moveRight();
      generateRandomTile();
      break;
    }
    case "ArrowUp":
    case "KeyW": {
      moveUp();
      generateRandomTile();
      break;
    }
    case "ArrowDown":
    case "KeyS": {
      moveDown();
      generateRandomTile();
      break;
    }
    default:{
    } 
  }

}

window.addEventListener("keyup", makeMove);