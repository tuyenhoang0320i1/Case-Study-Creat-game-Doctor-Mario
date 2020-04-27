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
    [I, "red"]
];
// initate a piece

let p = new Piece(PIECES[0][0], PIECES[0][1]);

// The Object Piece

function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; // we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // we need to control the piece
    this.x = 4;
    this.y = 0;
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
    if (!this.collision(0,1,this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    }else {
        // we lock the piece and generate a new one
    }
}

// move Right the piece
Piece.prototype.moveRight = function () {
    if (!this.collision(1,0,this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
}

// move Left the piece
Piece.prototype.moveLeft = function () {
    if (!this.collision(-1,0,this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
}

// rotate the piece
Piece.prototype.rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    let kick = 0;

    if (this.collision(0,0,nextPattern)) {}
    if (!this.collision(0,0,nextPattern)) {
        this.unDraw();
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length; //(0+1)%4 =>1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

// collision function

Piece.prototype.collision = function(x,y,piece) {
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


// CONTROL the piece

document.addEventListener("keydown",CONTROL);
function CONTROL(event) {
    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    }else if (event.keyCode == 38) {
        p.rotate();
        dropStart = Date.now();
    }else if (event.keyCode == 39) {
        p.moveRight()
        dropStart = Date.now();
    }else if (event.keyCode == 40) {
        p.moveDown()
        dropStart = Date.now();
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

