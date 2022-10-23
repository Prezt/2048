const size = {
  rows: 4,
  columns: 4
}

var gameState = {
  previousBoard:[
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  score: 0,
  hasWon: false,
  undoCount: 0
}

function printGameBoard  (board) {
  console.log(`SCORE: ${score}\n+---+---+---+---+`);
  for (let row = 0; row < 4; row++) {
    console.log(
      "|",
      board[row][0],
      "|",
      board[row][1],
      "|",
      board[row][2],
      "|",
      board[row][3],
      "|"
    );
    console.log("+---+---+---+---+");
  }
};

function generateRandomOneOf(a, b, chanceOfA) {
  return Math.random() <= chanceOfA ? a : b;
}

function generateNumberBetween (min, max){
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const filterZero = (row) => (row.filter((e)=> e !== 0))

const makeId = (i, j) => (`${i.toString()}-${j.toString()}`)

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

function undo() { 
  gameState.undoCount++;
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns; j++){
      gameState.board[i][j] = gameState.previousBoard[i][j];
    }
  }
  updateGameState();
}

function generateRandomTile(num1, num2, chanceOf1) {
  let row = generateNumberBetween(0, size.rows - 1);
  let col = generateNumberBetween(0, size.columns - 1);
  console.log(row,'-',col)
  while (gameState.board[row][col] !== 0) {
    row = generateNumberBetween(0, size.rows - 1);
    col = generateNumberBetween(0, size.columns - 1);
  }
  gameState.board[row][col] = generateRandomOneOf(num1, num2, chanceOf1);
};

function storePreviousBoard() { 
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns; j++){
      gameState.previousBoard[i][j] = gameState.board[i][j];
    }
  }
}

function checkGameChanged () { 
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns; j++){
      if (gameState.board[i][j] !== gameState.previousBoard[i][j]) return true
    }
  }
  return false
}

function checkEmptyTiles () {
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns; j++){
      if (gameState.board[i][j] === 0) return true
    }
  }
  return false
}

function rowLeft(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length-1; i++){
    if (row[i] === row[i+1]) {
        row[i] *= 2;
        row[i+1] = 0;
        gameState.score += row[i];
    }
  }
  row = filterZero(row)
  while (row.length < size.columns) {
    row.push(0);
  }
  return row;
}

function moveLeft () {
  storePreviousBoard();
  for (let i = 0; i < size.rows; i++) {
    let row = gameState.board[i];
    row = rowLeft(row);
    gameState.board[i] = row;
    for (let j = 0; j < size.columns; j++){
      const tile = document.getElementById(makeId(i, j));
      const num = gameState.board[i][j];
      updateTile(tile, num);
    }
  }
};

function moveRight () {
  storePreviousBoard();
  for (let i = 0; i < size.rows; i++) {
    let row = gameState.board[i];
    row.reverse(); 
    row = rowLeft(row);
    gameState.board[i] = row.reverse();
    for (let j = 0; j < size.columns; j++){
      const tile = document.getElementById(makeId(i, j));
      const num = gameState.board[i][j];
      updateTile(tile, num);
    }
  }
};

function moveUp () {
  storePreviousBoard();
  for (let i = 0; i < size.rows; i++) {
    let row =  [gameState.board[0][i], gameState.board[1][i], gameState.board[2][i], gameState.board[3][i]];
    row = rowLeft(row);
    gameState.board[0][i] = row[0];
    gameState.board[1][i] = row[1];
    gameState.board[2][i] = row[2];
    gameState.board[3][i] = row[3];
    for (let j = 0; j < size.columns; j++){
      const tile = document.getElementById(makeId(i, j));
      const num = gameState.board[i][j];
      updateTile(tile, num);
    }
  }
};

function moveDown () {
  storePreviousBoard();
  for (let i = 0; i < size.rows; i++) {
    let row = [gameState.board[0][i], gameState.board[1][i], gameState.board[2][i], gameState.board[3][i]];
    row.reverse();
    row = rowLeft(row);
    row.reverse();
    gameState.board[0][i] = row[0];
    gameState.board[1][i] = row[1];
    gameState.board[2][i] = row[2];
    gameState.board[3][i] = row[3];
    for (let j = 0; j < size.columns; j++){
      const tile = document.getElementById(makeId(i, j));
      const num = gameState.board[i][j];
      updateTile(tile, num);
    }
  }
};

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

function updateGameState () {
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns; j++) {
      let tile = document.getElementById(makeId(i, j));
      let num = gameState.board[i][j];
      if(num === 2048 && gameState.hasWon === false){
        gameState.hasWon = true;
        window.alert(`CONGRATULATIONS YOU HAVE WON WITH ${gameState.undoCount} UNDOS`)
      }
      updateTile(tile, num);
    }
  }
  updateScore()
}

function setNewGameBoard () {
  document.getElementById("board").innerHTML=""
  gameState.previousBoard = generateEmptyBoard();
  gameState.board = generateEmptyBoard();
  generateRandomTile(2, 2, 1);
  generateRandomTile(2, 2, 1);
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns; j++) {
      let tile = document.createElement("div");
      tile.id = makeId(i, j);
      let num = gameState.board[i][j];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
};

function checkGameAndGenerateTile () {
  const gameChanged = checkGameChanged();
  const hasEmptyTiles = checkEmptyTiles();
  if(gameChanged){
    if(!hasEmptyTiles) {
      window.alert(`GAME OVER

      Final Score: ${gameState.score}`);
      setNewGameBoard()
    }
    generateRandomTile(2, 4, 0.9);
  }
}

function makeMove (e) {
  switch (e.code){
    case "ArrowLeft": 
    case "KeyA": {
      moveLeft();
      checkGameAndGenerateTile();
      updateGameState();
      break;
    }
    case "ArrowRight":
    case "KeyD": {
      moveRight();
      checkGameAndGenerateTile();
      updateGameState();
      break;
    }
    case "ArrowUp":
    case "KeyW": {
      moveUp();
      checkGameAndGenerateTile();
      updateGameState();
      break;
    }
    case "ArrowDown":
    case "KeyS": {
      moveDown();
      checkGameAndGenerateTile();
      updateGameState();
      break;
    }
    default:{
    } 
  }
}

window.onload = () => {
  setNewGameBoard();
};
window.addEventListener("keyup", makeMove);