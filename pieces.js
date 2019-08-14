var moves = [];

function King(row, column, colour){
    this.captured = false;
    this.label = 'K';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
        this.pic = images[0];
    }else{
        this.colour = 'B';
        this.pic = images[6];
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
        
        imageMode(CENTER);
        var imagePos = coordinatesToPixelPos((this.pos.x),(this.pos.y));
        image(this.pic, imagePos.x + (squareSize / 2), imagePos.y + (squareSize / 2), squareSize, squareSize);
        
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
        nextTurn(this.colour);
    }
    
}

function Rook(row, column, colour){
    this.captured = false;
    this.label = 'R';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
        this.pic = images[4];
    }else{
        this.colour = 'B';
        this.pic = images[10];
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
        
        imageMode(CENTER);
        var imagePos = coordinatesToPixelPos((this.pos.x),(this.pos.y));
        image(this.pic, imagePos.x + (squareSize / 2), imagePos.y + (squareSize / 2), squareSize, squareSize);
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
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieceColour != this.colour && otherConditions == true){
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
        if(board[endPoz.x][endPoz.y].pieceColour != 'none'){
            board[endPoz.x][endPoz.y].pieceObject.captured = true;
            //console.log('capture');
            //console.log(board[endPoz.x][endPoz.y].pieces);
        }
        var newString = " " + this.colour + this.label + ' ' + chosenMove.x + ' , ' + chosenMove.y;
        moves.push(newString);
        this.pos.add(chosenMove);
        nextTurn(this.colour);
        
    } 
}

function Knight(row, column, colour){
    this.captured = false;
    this.label = 'N';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
        this.pic = images[3];
    }else{
        this.colour = 'B';
        this.pic = images[9];
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
        
        imageMode(CENTER);
        var imagePos = coordinatesToPixelPos((this.pos.x),(this.pos.y));
        image(this.pic, imagePos.x + (squareSize / 2), imagePos.y + (squareSize / 2), squareSize, squareSize);
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
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieceColour != this.colour && otherConditions == true){
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
        }
        moves.push(chosenMove);
        this.pos.add(chosenMove);
    }
}

function Bishop(row, column, colour){
    this.captured = false;
    this.label = 'B';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
        this.pic = images[2];
    }else{
        this.colour = 'B';
        this.pic = images[8];
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
        
        imageMode(CENTER);
        var imagePos = coordinatesToPixelPos((this.pos.x),(this.pos.y));
        image(this.pic, imagePos.x + (squareSize / 2), imagePos.y + (squareSize / 2), squareSize, squareSize);
    }
    
    //list all availabe legal moves
    this.availableMoves = function(){
        //replace this with other conditions such as captures, occupied spaces etc
        var otherConditions = true;
        
        var legalMoves = [];
 
        
        //Attempt to remake bishop move function
        var possibleMoves = [[]];
        for(var i = -rows; i < rows; i++){
            for(var j = -columns; j < columns; j++){
                if((i != 0 || j != 0) && (i == j || i == -j)){
                    if(i + this.pos.x < rows && i + this.pos.x >= 0 && j + this.pos.y < columns && j + this.pos.y >= 0){
                        var possible = true;
                        let v1 = createVector(i, j);
                        if(i > 0){
                            var ix = 1;
                        }else{
                            var ix = -1;
                        }
                        if(j>0){
                            var jx = 1;
                        }else{
                            var jx = -1;
                        }
                        
                        var iy = ix;
                        var jy = jx;
                        while(Math.abs(ix) < Math.abs(i)){
                            console.log(ix + this.pos.x);
                            if((board[(ix + this.pos.x)][this.pos.y + jx].pieceColour == this.colour) && ix != 0){
                                        possible = false;
                                        console.log('1');
                                    } else if(board[ix + this.pos.x][this.pos.y +  jx].pieceColour != this.colour && board[ix + this.pos.x][this.pos.y + jx].pieceColour != 'none'){
                                            possibleMoves.push(createVector(ix, jx));
                                            possible = false;
                                        console.log('2');
                                    }
                            ix += iy ;
                            jx += jy;
                        }
                        
                    }
                    if(possible){
                            possibleMoves.push(createVector(i, j));
                        }
                }
            }
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
        moves.push(chosenMove);
        this.pos.add(chosenMove);
        nextTurn(this.colour);
    }
}

function Queen(row, column, colour){
    this.captured = false;
    this.label = 'Q';
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
        this.pic = images[1];
    }else{
        this.colour = 'B';
        this.pic = images[7];
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
        
        imageMode(CENTER);
        var imagePos = coordinatesToPixelPos((this.pos.x),(this.pos.y));
        image(this.pic, imagePos.x + (squareSize / 2), imagePos.y + (squareSize / 2), squareSize, squareSize);
    }
 
    
    //list all availabe legal moves
    this.availableMoves = function(){
        //replace this with other conditions such as captures, occupied spaces etc
        var otherConditions = true;
        
        var legalMoves = [];
        //Rook code:
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

        //Bishop code:
    for(var i = -rows; i < rows; i++){
            for(var j = -columns; j < columns; j++){
                if((i != 0 || j != 0) && (i == j || i == -j)){
                    if(i + this.pos.x < rows && i + this.pos.x >= 0 && j + this.pos.y < columns && j + this.pos.y >= 0){
                        var possible = true;
                        let v1 = createVector(i, j);
                        if(i > 0){
                            var ix = 1;
                        }else{
                            var ix = -1;
                        }
                        if(j>0){
                            var jx = 1;
                        }else{
                            var jx = -1;
                        }
                        
                        var iy = ix;
                        var jy = jx;
                        while(Math.abs(ix) < Math.abs(i)){
                            console.log(ix + this.pos.x);
                            if((board[(ix + this.pos.x)][this.pos.y + jx].pieceColour == this.colour) && ix != 0){
                                        possible = false;
                                        console.log('1');
                                    } else if(board[ix + this.pos.x][this.pos.y +  jx].pieceColour != this.colour && board[ix + this.pos.x][this.pos.y + jx].pieceColour != 'none'){
                                            possibleMoves.push(createVector(ix, jx));
                                            possible = false;
                                        console.log('2');
                                    }
                            ix += iy ;
                            jx += jy;
                        }
                        
                    }
                    if(possible){
                            possibleMoves.push(createVector(i, j));
                        }
                }
            }
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
            //console.log('capture');
            //console.log(board[endPoz.x][endPoz.y].pieces);
        }
        moves.push(chosenMove);
        this.pos.add(chosenMove);
        nextTurn(this.colour);
    }    
    
}

function Pawn(row, column, colour){
    this.captured = false;
    this.label = 'P';
    this.captured = false;
    this.pos = createVector(row, column);
    if(colour == 'W'){
        this.colour = 'W';
        this.pic = images[5];
    }else{
        this.colour = 'B';
        this.pic = images[11];
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
        
        imageMode(CENTER);
        var imagePos = coordinatesToPixelPos((this.pos.x),(this.pos.y));
        image(this.pic, imagePos.x + (squareSize / 2), imagePos.y + (squareSize / 2), squareSize, squareSize);
    }
    //list all availabe legal moves
    this.availableMoves = function(){
        //replace this with other conditions such as captures, occupied spaces etc
        var otherConditions = true;
        
        var legalMoves = [];
        //Generates list of vectors in which this piece type moves
        
        var possibleMoves = [[]];
        //var possibleCaptures = [[]];
        
        if((this.pos.y <= 1 && this.colour == 'B')|| (this.pos.y >= (columns -2) && this.colour == 'W')){
            if(this.colour == 'W' && board[this.pos.x][this.pos.y - 2].pieces == 'none' && board[this.pos.x][this.pos.y - 1].pieces == 'none'){
                possibleMoves.push(createVector(0, -2));
            }else if(this.colour == 'B' && board[this.pos.x][this.pos.y + 2].pieces == 'none' && board[this.pos.x][this.pos.y + 1].pieces == 'none'){
                possibleMoves.push(createVector(0, 2));
            }
        }
        
        if(this.colour == 'W'){
            possibleMoves.push(createVector(0, -1));
        }else{
            possibleMoves.push(createVector(0, 1));
        }
        
        if(this.colour == 'W'){
            var v1 = createVector(-1, -1);
            var endPos = p5.Vector.add(this.pos, v1);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieceColour == 'B'){
                legalMoves.push(v1);
               }
            var v2 = createVector(1, -1);
            var endPos = p5.Vector.add(this.pos, v2);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieceColour == 'B'){       
               legalMoves.push(v2);
               }
        } else if(this.colour == 'B'){
            var v1 = createVector(-1, 1);
            var endPos = p5.Vector.add(this.pos, v1);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieceColour == 'W'){
                legalMoves.push(v1);
               }
            var v2 = createVector(1, 1);
            var endPos = p5.Vector.add(this.pos, v2);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieceColour == 'W'){       
               legalMoves.push(v2);
               }
        }
 
    for(var i = 0; i < possibleMoves.length; i++){
            var endPos = p5.Vector.add(this.pos, possibleMoves[i]);
            if(endPos.x >= 0 && endPos.x < (rows) && endPos.y >= 0 && endPos.y < (columns) && board[endPos.x][endPos.y].pieces == 'none'){
                legalMoves.push(possibleMoves[i]);
            }
        }
        return(legalMoves);
    }
    
    this.randomMove = function(){
        var legalMoves = this.availableMoves();
        if(legalMoves.length > 0){
        chosenMove = random(legalMoves);
        board[this.pos.x][this.pos.y].pieces = 'none';
        var endPoz = p5.Vector.add(this.pos, chosenMove);
        if(board[endPoz.x][endPoz.y].pieces != 'none'){
            board[endPoz.x][endPoz.y].pieceObject.captured = true;
            //console.log('capture');
            //console.log(board[endPoz.x][endPoz.y].pieces);
        }
        this.pos.add(chosenMove);
        nextTurn(this.colour);
        }else{
            console.log('No legal moves');
            return('noLegalMoves');
        }
    }
    
}









































































