//control size of board
var rows = 8;
var columns = 8;

var squareSize = 50;

var board = [];

var squares = [];

function setup(){
    createCanvas(1920, 1080);
    //initialise 3d array for board
    for (i = 0; i < rows; i++) {
        board[i] = new Array(columns);
    }
    
    //fill board array with squares
    for(i = 0; i < rows; i++){
        for(j = 0; j < columns; j++){
            board[i][j] = new Square(i, j);
            squares.push(new Square(i, j));
        }
    }
    
    console.log(board);
}

function draw(){
    background(51);
    //draw squares
    for(i = 0; i < squares.length; i++){
        squares[i].show();
    }
}

function Square(row, column){
    this.r = row;
    this.c = column;
    
    if((this.r + this.c) % 2 == 0){
        this.colour = 'W';
    }else{
        this.colour = 'B';
    }
    
    this.show = function (){
        //console.log('show');
        //background(0);
        let c = color(93);
        if(this.colour == 'W'){
            c = color(51);
        }else{
            c = color(0);
        }
        fill(c);
        rect(width / 2 - ((rows/2) * squareSize) + (this.r * squareSize), height / 2 - ((columns/2 * squareSize)) + (this.c * squareSize), squareSize, squareSize);
    }
    
}

















