const generateEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let game = {
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  score: 0,
};

const generateRandomOneOf = (a, b) => (Math.random() >= 0.5 ? a : b);

const generateNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const generateRandomTile = (game) => {
  let row = generateNumberBetween(0, 3);
  let col = generateNumberBetween(0, 3);
  while (game.board[row][col] !== 0) {
    row = generateNumberBetween(0, 3);
    col = generateNumberBetween(0, 3);
  }
  game.board[row][col] = generateRandomOneOf(2, 4);
};

const printGame = (game) => {
  console.log(`SCORE: ${game.score}\n+---+---+---+---+`);
  for (let row = 0; row < 4; row++) {
    console.log(
      "|",
      game.board[row][0],
      "|",
      game.board[row][1],
      "|",
      game.board[row][2],
      "|",
      game.board[row][3],
      "|"
    );
    console.log("+---+---+---+---+");
  }
};

const stack = (game) => {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    let stackCount = 0;
    for (let col = 0; col < 4; col++) {
      if (game.board[row][col] !== 0) {
        newBoard[row][stackCount] = game.board[row][col];
        stackCount++;
      }
    }
  }
  game.board = newBoard;
};

const merge = (game) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      if (game.board[row][col] === game.board[row][col + 1]) {
        game.board[row][col] *= 2;
        game.board[row][col + 1] = 0;
        game.score += game.board[row][col];
      }
    }
  }
};

const flipVertical = (game) => {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newBoard[row][col] = game.board[row][3 - col];
    }
  }
  game.board = newBoard;
};

const transpose = (game) => {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newBoard[row][col] = game.board[col][row];
    }
  }
  game.board = newBoard;
};

const testGame = {
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  score: 0,
};

const moveLeft = (game) => {
  stack(game);
  merge(game);
  stack(game);
  generateRandomTile(game);
};

const moveRight = (game) => {
  flipVertical(game);
  stack(game);
  merge(game);
  stack(game);
  flipVertical(game);
  generateRandomTile(game);
};

const moveUp = (game) => {
  transpose(game);
  stack(game);
  merge(game);
  stack(game);
  transpose(game);
  generateRandomTile(game);
};

const moveDown = (game) => {
  transpose(game);
  flipVertical(game);
  stack(game);
  merge(game);
  stack(game);
  flipVertical(game);
  transpose(game);
  generateRandomTile(game);
};

generateRandomTile(testGame);
generateRandomTile(testGame);
generateRandomTile(testGame);
generateRandomTile(testGame);
generateRandomTile(testGame);
generateRandomTile(testGame);
generateRandomTile(testGame);
generateRandomTile(testGame);
printGame(testGame);
console.log("Down");
moveDown(testGame);
printGame(testGame);
