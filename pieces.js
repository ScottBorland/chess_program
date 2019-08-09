
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
    //list all availabe legal moves
    this.availableMoves = function(){
        //replace this with other conditions such as captures, occupied spaces etc
        var otherConditions = true;
        
        var legalMoves = [];
        //Generates list of vectors in which this piece type moves
        var possibleMoves = [[0,1], [1,1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
        for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x > 0 && endPos.x < (rows + 1) && endPos.y > 0 && endPos.y < (columns + 1) && otherConditions == true){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        chosenMove = random(legalMoves);
        this.pos.add(chosenMove);
    }
    
}








































