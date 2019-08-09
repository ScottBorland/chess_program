
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
        position.x = position.x + (squareSize / 2);
        position.y = (position.y) + (squareSize / 2);
        if(this.colour == 'W'){
            fill(255);
        }else{
            fill(0);
        }
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
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && otherConditions == true){
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

function Rook(row, column, colour){
    this.label = 'R';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
    }else{
        this.colour = 'B';
    }
    this.show = function(){
        var position = coordinatesToPixelPos((this.pos.x), (this.pos.y));
        position.x = position.x + (squareSize / 2);
        position.y = (position.y) + (squareSize / 2);
        if(this.colour == 'W'){
            fill(255);
        }else{
            fill(0);
        }
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
        
        var possibleHorizontalMoves = [];
        for(var i = 0; i < rows; i++){
            if(i != 0){
                possibleHorizontalMoves.push(i);
                possibleHorizontalMoves.push(-i);
            }
        }
        
        //console.log(possibleHorizontalMoves);
        
        var possibleVerticalMoves = [];
        for(var i = 0; i < columns; i++){
            if(i != 0){
                possibleVerticalMoves.push(i);
                possibleVerticalMoves.push(-i);
            }
        }
        
        //console.log(possibleVerticalMoves);
        
        var possibleMoves = [[]];
        for (var i = 0; i < possibleHorizontalMoves.length; i++){
            possibleMoves.push(createVector(possibleHorizontalMoves[i], 0));
        }
        
        for (var i = 0; i < possibleVerticalMoves.length; i++){
            possibleMoves.push(createVector(0, possibleVerticalMoves[i]));
        }
        
        console.log(possibleMoves);
        
        for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && otherConditions == true){
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













































































