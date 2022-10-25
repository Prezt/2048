const size = {
    rows: 4,
    columns: 4
};

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
};

function printGameBoard (board) {
    for (let row = 0; row < 4; row++) {
        console.log(
            '|',
            board[row][0],
            '|',
            board[row][1],
            '|',
            board[row][2],
            '|',
            board[row][3],
            '|'
        );
        console.log('+---+---+---+---+');
    }
}

function generateRandomOneOf(a, b, chanceOfA) {
    return Math.random() <= chanceOfA ? a : b;
}

function generateNumberBetween (min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

const filterZero = (row) => (row.filter((e)=> e !== 0));

const makeId = (i, j) => (`${i.toString()}-${j.toString()}`);

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
    while (gameState.board[row][col] !== 0) {
        row = generateNumberBetween(0, size.rows - 1);
        col = generateNumberBetween(0, size.columns - 1);
    }
    gameState.board[row][col] = generateRandomOneOf(num1, num2, chanceOf1);
}

function storePreviousBoard() { 
    const hasGameChanged = checkGameChanged();
    if(hasGameChanged){
        for (let i = 0; i < size.rows; i++) {
            for (let j = 0; j < size.columns; j++){
                gameState.previousBoard[i][j] = gameState.board[i][j];
            }
        }
    }
}

function checkGameChanged () { 
    for (let i = 0; i < size.rows; i++) {
        for (let j = 0; j < size.columns; j++){
            if (gameState.board[i][j] !== gameState.previousBoard[i][j]) return true;
        }
    }
    return false;
}

function checkEmptyTiles () {
    for (let i = 0; i < size.rows; i++) {
        for (let j = 0; j < size.columns; j++){
            if (gameState.board[i][j] === 0) return true;
        }
    }
    return false;
}

function checkAvailableMoves (){
    return true;
}

function calculateMoveLeft(row, j){
    const current = row[j];
    if(j===0 || current === 0) {
        return 0;
    }
    if(j===1){
        const first = row[j-1];
        if(first === 0 || first === current){ 
            return 1;
        } 
        return 0;
    }
    else if(j===2){ 
        const first = row[j-2];
        const second = row[j-1];
        if(
            (first === 0 && second === 0) || 
            (first === current && second === 0) || 
            (first === 0 && second === current)){
            return 2;
        } else if (
            (first === 0) || 
            (second === 0) || 
            (first === second) || 
            (second === current) 
        ){
            return 1;
        } else return 0;
    }
    else if(j===3){
        const first = row[j-3];
        const second = row[j-2];
        const third = row[j-1];
        if(
            (first === 0 && second === 0 && third === 0) || 
            (first === current && second === 0 && third === 0) || 
            (first === 0 && second === current && third === 0) || 
            (first === 0 && second === 0 && third === current)
        ){
            return 3;
        } else if(
            (first === 0 && second === 0) || 
            (first === 0 && third === 0) || 
            (second === 0 && third === 0) || 
            (second === current && third === 0) || 
            (first === 0 && third === current) || 
            (second === 0 && third === current) || 
            (first === 0 && second === third ) || 
            (first === second && third === 0) || 
            (first === third && second === 0) ||
            (first === second && third === current)
        ){
            return 2;
        } else if (
            (first === 0) ||
            (second === 0) ||
            (third === 0) ||
            (first === second) ||
            (second === third) ||
            (third === current)
        ){
            return 1;
        } else return 0;
    } 

}

function calculateAllMoves() {
    const moves = {
        left: [
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]]
        ],
        right: [
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]]
        ],
        up: [
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]]
        ],
        down: [
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]],
            [[0, 0], [0, 0], [0, 0], [0, 0]]
        ]
    };
    for (let i = 0; i < size.rows; i++) {
        const leftRow = gameState.board[i];
        for (let j = 0; j < size.columns; j++){
            moves.left[i][j] = [0-calculateMoveLeft(leftRow, j), 0];
        }
    }
    
    for (let i = 0; i < size.rows; i++) {
        const rightRow = [gameState.board[i][3], gameState.board[i][2], gameState.board[i][1], gameState.board[i][0]];
        for (let j = 0; j < size.columns; j++){
            moves.right[i][3-j] = [calculateMoveLeft(rightRow, j), 0];
        }
    }
    for (let j = 0; j < size.columns; j++) {
        const upRow = [gameState.board[0][j], gameState.board[1][j], gameState.board[2][j], gameState.board[3][j]];
        for (let i = 0; i < size.rows; i++){
            moves.up[i][j] = [0, calculateMoveLeft(upRow, i)];
        }
    }
    for (let j = 0; j < size.columns; j++) {
        const downRow = [gameState.board[3][j], gameState.board[2][j], gameState.board[1][j], gameState.board[0][j]];
        for (let i = 0; i < size.rows; i++){
            moves.down[3 - i][j] = [0, 0- calculateMoveLeft(downRow, i)];
        }
    }
    return moves;
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
    row = filterZero(row);
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
}

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
}

function moveUp () {
    storePreviousBoard();
    for (let i = 0; i < size.rows; i++) {
        let row = [gameState.board[0][i], gameState.board[1][i], gameState.board[2][i], gameState.board[3][i]];
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
}

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
}

function updateScore () {
    let screenScore = document.getElementById('score');
    screenScore.innerHTML = gameState.score;
}

function updateTile (tile, num) {
    tile.innerText = '';
    tile.classList.value = '';
    tile.classList.add('tile');
    if(num > 0) tile.innerText = num;
    if (num >= 16384) {
        tile.classList.add('xMAX2');
    } else if (num >= 4096) {
        tile.classList.add('xMAX');
    } else {
        tile.classList.add(`x${num.toString()}`);
    }
}

function updateGameState () {
    for (let i = 0; i < size.rows; i++) {
        for (let j = 0; j < size.columns; j++) {
            let tile = document.getElementById(makeId(i, j));
            let num = gameState.board[i][j];
            if(num === 2048 && gameState.hasWon === false){
                gameState.hasWon = true;
                window.alert(`CONGRATULATIONS YOU HAVE WON WITH ${gameState.undoCount} UNDOS`);
            }
            updateTile(tile, num);
        }
    }
    updateScore();
    const moves = calculateAllMoves();
    console.log('         MOVES');
    console.log('left');
    printGameBoard(moves.left);
    console.log('right');
    printGameBoard(moves.right);
    console.log('up');
    printGameBoard(moves.up);
    console.log('down');
    printGameBoard(moves.down);
}

function setNewGameBoard () {
    document.getElementById('board').innerHTML='';
    gameState.previousBoard = generateEmptyBoard();
    gameState.board = generateEmptyBoard();
    generateRandomTile(2, 2, 1);
    generateRandomTile(2, 2, 1);
    for (let i = 0; i < size.rows; i++) {
        for (let j = 0; j < size.columns; j++) {
            let tile = document.createElement('div');
            tile.id = makeId(i, j);
            let num = gameState.board[i][j];
            updateTile(tile, num);
            document.getElementById('board').append(tile);
        }
    }
}

function checkGameOver () {
    const hasAvailableMoves = checkAvailableMoves();
    if(!hasAvailableMoves) {
        window.alert(`**GAME OVER** \nFinal Score: ${gameState.score}`);
        setNewGameBoard();
    }
}

function checkGameAndGenerateTile () {
    const gameChanged = checkGameChanged();    
    if(gameChanged){ 
        generateRandomTile(2, 4, 0.9);
    }
}

function makeMove (e) {
    switch (e.code){
        case 'ArrowLeft': 
        case 'KeyA': {
            moveLeft();
            checkGameAndGenerateTile();
            updateGameState();
            break;
        }
        case 'ArrowRight':
        case 'KeyD': {
            moveRight();
            checkGameAndGenerateTile();
            updateGameState();
            break;
        }
        case 'ArrowUp':
        case 'KeyW': {
            moveUp();
            checkGameAndGenerateTile();
            updateGameState();
            break;
        }
        case 'ArrowDown':
        case 'KeyS': {
            moveDown();
            checkGameAndGenerateTile();
            updateGameState();
            break;
        }
        default: {
            checkGameOver();
            break;
        } 
    }
}

window.onload = () => {
    setNewGameBoard();
};


window.addEventListener('keyup', makeMove);