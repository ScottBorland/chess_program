
function King(row, column, colour){
    this.captured = false;
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
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieces == 'none' && otherConditions == true){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        chosenMove = random(legalMoves);
        board[this.pos.x][this.pos.y].pieces = 'none';
        this.pos.add(chosenMove);
    }
    
}

function Rook(row, column, colour){
    this.captured = false;
    this.label = 'R';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
    }else{
        this.colour = 'B';
    }
    this.show = function(){
        
        if(this.captured){
            console.log('Captured');
        }
        
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
                if(i + this.pos.x < rows){
                    if(board[(i + this.pos.x)][this.pos.y].pieceColour != 'none' && board[(i + this.pos.x)][this.pos.y].pieceColour != this.colour){
                        possibleHorizontalMoves.push(i);
                        break;
                    }
                if(board[(i + this.pos.x)][this.pos.y].pieceColour == 'none'){
                possibleHorizontalMoves.push(i);
                }else{
                    break;
                    }
                }
            }
        }
        
        for(var i = 0; i < rows; i++){
            if(i != 0){
                if(this.pos.x - i >= 0){
                    if(board[(-i + this.pos.x)][this.pos.y].pieceColour != 'none' && board[(-i + this.pos.x)][this.pos.y].pieceColour != this.colour){
                        possibleHorizontalMoves.push(-i);
                        break;
                    }
                if(board[(-i + this.pos.x)][this.pos.y].pieceColour == 'none'){
                possibleHorizontalMoves.push(-i);
                }else{
                    break;
                    }
                }
            }
        }
        
        //console.log(possibleHorizontalMoves);
        
        var possibleVerticalMoves = [];
        for(var i = 0; i < columns; i++){
            if(i != 0){
                if(this.pos.y + i < columns){
                    if(board[(this.pos.x)][this.pos.y + i].pieceColour != 'none' && board[(this.pos.x)][this.pos.y + i].pieceColour != this.colour){
                        possibleVerticalMoves.push(i);
                        break;
                    }
                    if(board[this.pos.x][this.pos.y + i].pieceColour == 'none'){
                        possibleVerticalMoves.push(i);
                    }else{
                        break;
                    }
                }
            }
        }
        
        for(var i = 0; i < columns; i++){
            if(i != 0){
                if(this.pos.y - i >= 0){
                    if(board[(this.pos.x)][this.pos.y - i].pieceColour != 'none' && board[(this.pos.x)][this.pos.y - i].pieceColour != this.colour){
                        possibleVerticalMoves.push(-i);
                        break;
                    }
                    if(board[this.pos.x][(this.pos.y - i)].pieceColour == 'none'){
                        possibleVerticalMoves.push(-i);
                    }else{
                        break;
                    }
                }
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
        
        for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieces != this.colour && otherConditions == true){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        chosenMove = random(legalMoves);
        board[this.pos.x][this.pos.y].pieces = 'none';
        var endPoz = p5.Vector.add(this.pos, chosenMove);
        if(board[endPoz.x][endPoz.y].pieces != 'none'){
            board[endPoz.x][endPoz.y].pieceObject.captured = true;
            console.log('capture');
            console.log(board[endPoz.x][endPoz.y].pieces);
        }
        this.pos.add(chosenMove);
        
    } 
}

function Knight(row, column, colour){
    this.captured = false;
    this.label = 'N';
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
        var possibleMoves = [[1,2], [2,1], [2, -1], [-2, 1], [-2, -1], [1, -2], [-1, -2], [2, -1]];
        for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieces == 'none' && otherConditions == true){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        chosenMove = random(legalMoves);
        board[this.pos.x][this.pos.y].pieces = 'none';
        this.pos.add(chosenMove);
    }
}

function Bishop(row, column, colour){
    this.captured = false;
    this.label = 'B';
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
        
        var possibleMoves = [[]];
        for (var i = 0; i < possibleHorizontalMoves.length; i++){
            for(var j = 0; j < possibleVerticalMoves.length; j++){
                if(possibleHorizontalMoves[i] == possibleVerticalMoves[j] || possibleHorizontalMoves[i] == (possibleVerticalMoves[j] * -1)){
                    possibleMoves.push(createVector(possibleHorizontalMoves[i], possibleVerticalMoves[j]));
                }
            }
        }
               
        for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieces == 'none' && otherConditions == true){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        chosenMove = random(legalMoves);
        board[this.pos.x][this.pos.y].pieces = 'none';
        this.pos.add(chosenMove);
    }
}

function Queen(row, column, colour){
    this.captured = false;
    this.label = 'Q';
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
        //Rook code:
        var possibleHorizontalMovesR = [];
        for(var i = 0; i < rows; i++){
            if(i != 0){
                possibleHorizontalMovesR.push(i);
                possibleHorizontalMovesR.push(-i);
            }
        }

        var possibleVerticalMovesR = [];
        for(var i = 0; i < columns; i++){
            if(i != 0){
                possibleVerticalMovesR.push(i);
                possibleVerticalMovesR.push(-i);
            }
        }

        
        var possibleMoves = [[]];
        for (var i = 0; i < possibleHorizontalMovesR.length; i++){
            possibleMoves.push(createVector(possibleHorizontalMovesR[i], 0));
        }
        
        for (var i = 0; i < possibleVerticalMovesR.length; i++){
            possibleMoves.push(createVector(0, possibleVerticalMovesR[i]));
        }
        //Bishop code:
        var possibleHorizontalMoves = [];
        for(var i = 0; i < rows; i++){
            if(i != 0){
                possibleHorizontalMoves.push(i);
                possibleHorizontalMoves.push(-i);
            }
        }
        
        var possibleVerticalMoves = [];
        for(var i = 0; i < columns; i++){
            if(i != 0){
                possibleVerticalMoves.push(i);
                possibleVerticalMoves.push(-i);
            }
        }
        
        //var possibleMoves = [[]];
        for (var i = 0; i < possibleHorizontalMoves.length; i++){
            for(var j = 0; j < possibleVerticalMoves.length; j++){
                if(possibleHorizontalMoves[i] == possibleVerticalMoves[j] || possibleHorizontalMoves[i] == (possibleVerticalMoves[j] * -1)){
                    possibleMoves.push(createVector(possibleHorizontalMoves[i], possibleVerticalMoves[j]));
                }
            }
        }
               
        for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieces == 'none' && otherConditions == true){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        chosenMove = random(legalMoves);
        board[this.pos.x][this.pos.y].pieces = 'none';
        this.pos.add(chosenMove);
    }
}

function Pawn(row, column, colour){
    this.captured = false;
    this.label = 'P';
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
        var possibleMoves = [[]];
        if(this.pos.y <= 1 && this.colour == 'B'|| this.pos.y >= (columns -2) && this.colour == 'W'){
            if(this.colour == 'W'){
                possibleMoves.push(createVector(0, -2));
            }else{
                possibleMoves.push(createVector(0, 2));
            }
        }
        
        if(this.colour == 'W'){
            possibleMoves.push(createVector(0, -1));
        }else{
            possibleMoves.push(createVector(0, 1));
        }
        
        
        for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieces == 'none' && otherConditions == true){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        if(this.availableMoves.length != 0){
        chosenMove = random(legalMoves);
        board[this.pos.x][this.pos.y].pieces = 'none';
        this.pos.add(chosenMove);
        }else{
            return('noLegalMoves');
        }
    }
    
}









































































