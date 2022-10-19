export const generateEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const generateRandomOneOf = (a, b, chanceOfA) =>
  Math.random() >= chanceOfA ? a : b;

export const generateNumberBetween = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const generateRandomTile = (board, score) => {
  let row = generateNumberBetween(0, 3);
  let col = generateNumberBetween(0, 3);
  while (board[row][col] !== 0) {
    row = generateNumberBetween(0, 3);
    col = generateNumberBetween(0, 3);
  }
  board[row][col] = generateRandomOneOf(2, 4, 0.9);
};

export const printGame = (board, score) => {
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

export const stack = (board, score) => {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    let stackCount = 0;
    for (let col = 0; col < 4; col++) {
      if (board[row][col] !== 0) {
        newBoard[row][stackCount] = board[row][col];
        stackCount++;
      }
    }
  }
  board = newBoard;
};

export const merge = (board, score) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === board[row][col + 1]) {
        board[row][col] *= 2;
        board[row][col + 1] = 0;
        score += board[row][col];
      }
    }
  }
};

export const flipVertical = (board, score) => {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newBoard[row][col] = board[row][3 - col];
    }
  }
  board = newBoard;
};

export const transpose = (board, score) => {
  const newBoard = generateEmptyBoard();
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      newBoard[row][col] = board[col][row];
    }
  }
  board = newBoard;
};

const moveLeft = (board, score) => {
  stack(board, score);
  merge(board, score);
  stack(board, score);
  generateRandomTile(board, score);
};

const moveRight = (board, score) => {
  flipVertical(board, score);
  stack(board, score);
  merge(board, score);
  stack(board, score);
  flipVertical(board, score);
  generateRandomTile(board, score);
};

const moveUp = (board, score) => {
  transpose(board, score);
  stack(board, score);
  merge(board, score);
  stack(board, score);
  transpose(board, score);
  generateRandomTile(board, score);
};

const moveDown = (board, score) => {
  transpose(board, score);
  flipVertical(board, score);
  stack(board, score);
  merge(board, score);
  stack(board, score);
  flipVertical(board, score);
  transpose(board, score);
  generateRandomTile(board, score);
};
