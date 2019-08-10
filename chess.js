//control size of board
var rows = 8;
var columns = 8;

var squareSize = 100;

var board = [];

var squares = [];

var pieces = [];

function setup(){
    frameRate(1);
    createCanvas(1920, 1080);
    if(rows < 1){
        rows = 1;
    }else if(columns < 1){
        columns = 1;
    }
    //initialise 3d array for board
    for (i = 0; i < rows; i++) {
        board[i] = new Array(columns);
    }
    
    //fill board array with squares
    for(i = 0; i < rows; i++){
        for(j = 0; j < columns; j++){
            board[i][j] = new Square(i, j);
            squares.push(board[i][j]);
        }
    }
    //testing adding pieces
    //pieces.push(new King(4, 4, 'W'));
    //pieces.push(new Rook(0, 0, 'B'));
    //pieces.push(new Knight(1, 1, 'W'));
    //pieces.push(new Bishop(4, 3, 'B'));
    //pieces.push(new Queen(4, 4, 'B'));
    //pieces.push(new King(1, 1, 'W'));
    pieces.push(new Pawn(1,1, 'B'));
    pieces.push(new Pawn(6, 6, 'W'));
    pieces.push(new Pawn(4, 5, 'W'));
}

function draw(){
    background(230);
    //draw squares
    for(i = 0; i < squares.length; i++){
        squares[i].show();
    }
    //draw pieces
    for(i = 0; i < pieces.length; i++){
        pieces[i].show();
        pieces[i].randomMove();
    }
}

function coordinatesToPixelPos(row, column){
    pixelPos = createVector((width / 2 - ((rows/2) * squareSize) + (row * squareSize)), height / 2 - ((columns/2 * squareSize)) + (column * squareSize));
    return pixelPos;
}

function Square(row, column){
    this.r = row;
    this.c = column;
    
    this.pieces = 'none';
    
    if((this.r + this.c) % 2 == 0){
        this.colour = 'W';
    }else{
        this.colour = 'B';
    }
    
    this.show = function (){
        let c = color(0);
        if(this.colour == 'W'){
            c = color(177,228,185);
        }else{
            c = color(112, 162, 163);
        }
        fill(c);
        var position = coordinatesToPixelPos(this.r, this.c);
        rect(position.x, position.y, squareSize, squareSize);
    }
    
}

















