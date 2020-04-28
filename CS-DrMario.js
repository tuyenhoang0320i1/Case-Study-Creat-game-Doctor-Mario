const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const SQ = SquareSize = 20;
const ROW = 20;
const COL = COLUMN = 10;
const VACANT = 'white';

// draw square
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "black";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ)
}


//creat the board
let board = [];
for (r = 0; r < ROW; r++) {
    board[r] = [];
    for (c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

//draw the board

function drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();
// the pieces and their colors
const PIECES = [
    [I, "red"],
    [J, "blue"],
    [T, "yellow"]
];

//generate random piece

function randomPiece() {
    let r = randomN = Math.floor(Math.random() * PIECES.length); // 0 - 3
    return new Piece(PIECES[r][0],PIECES[r][1])
}

let p = randomPiece();


// The Object Piece

function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; // we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // we need to control the piece
    this.x = 4;
    this.y = -1;
}

// fill function

Piece.prototype.fill = function (color) {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            // we draw only occupied squares
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// draw a piece to the board

Piece.prototype.draw = function () {
    this.fill(this.color);
}

//undraw a piece

Piece.prototype.unDraw = function () {
    this.fill(VACANT);
}

// move Down the peice

Piece.prototype.moveDown = function () {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        // we lock the piece and generate a new one
        this.lock();
        p = randomPiece();
    }
}

// move Right the piece
Piece.prototype.moveRight = function () {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
}

// move Left the piece
Piece.prototype.moveLeft = function () {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// rotate the piece
Piece.prototype.rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COL / 2) {
            // it's the right wall
            kick = -1; // we need to move the piece to the left
        } else {
//          // it's the right wall
            kick = 1; // we need to move the piece to the right
        }
    }

    if (!this.collision(kick, 0, 0, nextPattern)) {
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; //(0+1)%4 =>1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

Piece.prototype.lock = function() {
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            // we skip the vacant squares
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            // pieces to lock on top = game over
            if (this.y + r < 0) {
                alert("Game Over!");
                // stop animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            board[this.y + r][this.x + c] = this.color;
        }
    }
}


// collision function

Piece.prototype.collision = function (x, y, piece) {
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            // if the square is empty, we skip it
            if (!piece[r][c]) {
                continue;
            }
            // coordinates of the piece after movement
            let newX = this.x + c + x;
            let newY = this.y + r + y;

            // conditions
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            // skip newY < 0; board[-1] will crush our game
            if (newY < 0) {
                continue;
            }
            // check if there is a locked piece already in place
            if (board[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}

// check remove tetromino


    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 6; col++) {
            let matchCount = 0;
            for (let i = 1; i < 5; i++) {
                if (this.board[row][col].color === this.board[row][col + i].color && this.board[row][col].color !== -1) {
                    matchCount++;
                }
            }
            if (matchCount >= 3) {
                for (matchCount; matchCount >= 0; matchCount--) {
                    this.board[row][col + matchCount].color = -1;

                }
                this.drawBoard();
            }
        }
    }


checkVertical() {
    for (let col = 0; col < 10; col++) {
        for (let row = 0; row < 16; row++) {
            let matchCount = 0;
            for (let i = 1; i < 5; i++) {
                if (this.board[row][col].color === this.board[row + i][col].color && this.board[row][col].color !== -1) {
                    matchCount++;
                }
            }
            if (matchCount >= 3) {
                for (matchCount; matchCount >= 0; matchCount--) {
                    this.board[row + matchCount][col].color = -1;

                }
                this.drawBoard();
            }
        }
    }
}


// CONTROL the piece

document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode == 38) {
        p.rotate();
        dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight()
        dropStart = Date.now();
    } else if (event.keyCode == 40) {
        p.moveDown()

    }
}

// drop the piece every 1 sec

let dropStart = Date.now();

function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }

    requestAnimationFrame(drop);
}

drop();

