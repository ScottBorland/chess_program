//control size of board
var rows = 8;
var columns = 8;

var squareSize = 100;

var images = [];

var board = [];

var squares = [];

var pieces = [];

var turn = 'W';

var moveRecord = [];


function setup(){
    frameRate(3);
    createCanvas(1920, 1080);
    
    for (var i = 1; i < 10; i++) {
        images.push(loadImage("assets/2000px-Chess_Pieces_Sprite_0" + i + ".png"));
    }
    for (var i = 10; i < 13; i++) {
        images.push(loadImage("assets/2000px-Chess_Pieces_Sprite_" + i + ".png"));
    }
    
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
    pieces.push(new Rook(0, 0, 'B'));
    pieces.push(new Knight(1, 0, 'B'));
    pieces.push(new Bishop(2, 0, 'B'));
    pieces.push(new Queen(3, 0, 'B'));
    pieces.push(new King(4, 0, 'B'));
    pieces.push(new Bishop(5, 0, 'B'));
    pieces.push(new Knight(6, 0, 'B'));
    pieces.push(new Rook(7, 0, 'B'));
    pieces.push(new Pawn(0, 1, 'B'));
    pieces.push(new Pawn(1, 1, 'B'));
    pieces.push(new Pawn(2,1, 'B'));
    pieces.push(new Pawn(3, 1, 'B'));
    pieces.push(new Pawn(4, 1, 'B'));
    pieces.push(new Pawn(5, 1, 'B'));
    pieces.push(new Pawn(6,1, 'B'));
    pieces.push(new Pawn(7, 1, 'B'));
    
    pieces.push(new Rook(0, 7, 'W'));
    pieces.push(new Knight(1, 7, 'W'));
    pieces.push(new Bishop(2, 7, 'W'));
    pieces.push(new Queen(3, 7, 'W'));
    pieces.push(new King(4, 7, 'W'));
    pieces.push(new Bishop(5, 7, 'W'));
    pieces.push(new Knight(6, 7, 'W'));
    pieces.push(new Rook(7, 7, 'W'));
    pieces.push(new Pawn(0, 6, 'W'));
    pieces.push(new Pawn(1, 6, 'W'));
    pieces.push(new Pawn(2,6, 'W'));
    pieces.push(new Pawn(3, 6, 'W'));
    pieces.push(new Pawn(4, 6, 'W'));
    pieces.push(new Pawn(5, 6, 'W'));
    pieces.push(new Pawn(6,6, 'W'));
    pieces.push(new Pawn(7, 6, 'W'));
    
    
    /*pieces.push(new Rook(3, 7, 'W'));
    pieces.push(new Rook(4, 5, 'W'));
    pieces.push(new Rook(3, 4, 'W'));
    pieces.push(new Rook(4, 1, 'W'));
    pieces.push(new Rook(6, 5, 'W'));
    pieces.push(new Rook(3, 2, 'B'));
    pieces.push(new Rook(2, 2, 'B'));*/
    
    /*pieces.push(new Bishop(1, 7, 'B'));
    pieces.push(new Bishop(1, 5, 'W'));
    pieces.push(new Bishop(1, 4, 'B'));
    pieces.push(new Bishop(1, 1, 'W'));
    pieces.push(new Bishop(7, 5, 'W'));
    pieces.push(new Bishop(6, 2, 'B'));
    pieces.push(new Bishop(4, 2, 'B'));
    pieces.push(new Bishop(2, 6, 'B'));
    pieces.push(new Bishop(3, 5, 'B'));
    pieces.push(new Bishop(4, 3, 'B'));*/
    
    /*pieces.push(new Queen(3, 7, 'W'));
    pieces.push(new Queen(4, 5, 'W'));
    pieces.push(new Queen(3, 4, 'B'));
    pieces.push(new Queen(4, 1, 'W'));
    pieces.push(new Queen(6, 5, 'W'));
    pieces.push(new Queen(3, 2, 'B'));
    pieces.push(new Queen(2, 2, 'B'));*/
    
    /*pieces.push(new Pawn(0, 1, 'B'));
    pieces.push(new Pawn(1, 1, 'B'));
    pieces.push(new Pawn(2,1, 'B'));
    pieces.push(new Pawn(3, 1, 'B'));
    pieces.push(new Pawn(4, 1, 'B'));
    pieces.push(new Pawn(5, 1, 'B'));
    pieces.push(new Pawn(6,1, 'B'));
    pieces.push(new Pawn(7, 1, 'B'));
    
    pieces.push(new Pawn(0, 6, 'W'));
    pieces.push(new Pawn(1, 6, 'W'));
    pieces.push(new Pawn(2,6, 'W'));
    pieces.push(new Pawn(3, 6, 'W'));
    pieces.push(new Pawn(4, 6, 'W'));
    pieces.push(new Pawn(5, 6, 'W'));
    pieces.push(new Pawn(6,6, 'W'));
    pieces.push(new Pawn(7, 6, 'W'));*/
    
    /*for(i = 0; i < rows; i++){
        for(j = 0; j < columns; j++){
            board[i][j].pieces = 'none';
            board[i][j].pieceColour = 'none';
        }
    }*/
}

function draw(){
    background(230);
    for(i = 0; i < rows; i++){
        for(j = 0; j < columns; j++){
            board[i][j].pieces = 'none';
            board[i][j].pieceColour = 'none';
        }
    }

    //draw squares
    for(i = 0; i < squares.length; i++){
        squares[i].show();
    }
    
    
    
    for(i = 0; i < pieces.length; i++){
        if(pieces[i].captured){
            pieces.splice(i, 1);
        }
    }
    
    for(i = 0; i < pieces.length; i++){
        board[pieces[i].pos.x][pieces[i].pos.y].pieces = pieces[i];
        board[pieces[i].pos.x][pieces[i].pos.y].pieceObject = pieces[i];
        board[pieces[i].pos.x][pieces[i].pos.y].pieceColour = pieces[i].colour;
        board[pieces[i].pos.x][pieces[i].pos.y].pieceObject.show();
    }
    
}

function coordinatesToPixelPos(row, column){
    pixelPos = createVector((width / 2 - ((rows/2) * squareSize) + (row * squareSize)), height / 2 - ((columns/2 * squareSize)) + (column * squareSize));
    return pixelPos;
}

function nextTurn(colour){
    if(colour == 'W'){
        turn = 'B'
    }else if (colour == 'B'){
        turn = 'W';
    }
}


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        for(var i = 0; i < moves.length; i++){
            var newString = "  Move " + i + ' : ' + moves[i];
            moveRecord.push(newString);
    }
    console.log(moveRecord);
  }
    if(keyCode === RIGHT_ARROW){
       RandomMove(); 
    }
}

function RandomMove(){
    let randomPiece = random(pieces);
        if(randomPiece.captured == false && randomPiece.colour == turn && randomPiece.availableMoves() != 'noLegalMoves'){
            randomPiece.randomMove();
            }
       else{
           RandomMove();
       }
}

function Square(row, column){
    this.r = row;
    this.c = column;
    
    this.pieces = 'none';
    this.pieceColour = 'none';
    this.pieceObject = 'none';
    
    if((this.r + this.c) % 2 == 0){
        this.squareColour = 'W';
    }else{
        this.squareColour = 'B';
    }
    
    this.show = function (){
        let c = color(0);
        if(this.squareColour == 'W'){
            c = color(177,228,185);
        }else{
            c = color(112, 162, 163);
        }
        fill(c);
        var position = coordinatesToPixelPos(this.r, this.c);
        rect(position.x, position.y, squareSize, squareSize);
    }
    
}

















