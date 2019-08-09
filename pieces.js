
function King(row, column, colour){
    this.label = 'K';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
    }else{
        this.colour = 'B';
    }
    this.show = function(){
        var position = coordinatesToPixelPos((this.pos.x), (this.pos.y));
        position.x = position.x - (squareSize / 2);
        position.y = (position.y) - (squareSize / 2);
        fill(342, 243);
        textSize(30);
        textAlign(CENTER, CENTER);
        text(this.label, position.x, position.y);
    }
    this.availableMoves = function(){
        var legalMoves = [];
        //Generates list of vectors in which this piece type moves
        var possibleMoves = [()];
    }
}








































