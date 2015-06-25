/**
 * Created by Shaaheen on 6/7/2015.
 */

var view = {
    diplayMessage: function(msg){
        var access = document.getElementById("message");
        access.innerHTML = msg;

    },
    displayHit: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class","hit");
    },
    displayMiss: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class","miss");
    }

};

var model = {
    boardSize: 18,
    numShips: 4,
    currShips: 0,
    shipLength:3,
    shipsSunk:0,
    rows: ["A","B","C","D","E"],

    ships: [],

    fire: function(guess){
        for (var i=0;i <this.numShips;i++){
            var ship = this.ships[i];
            var ind = ship.locations.indexOf(guess);

            if (ind > -1){
                ship.hits[ind] = "hit";
                view.diplayMessage("Hit!");
                view.displayHit(guess);
                if (this.checkSunk(ship)){
                    view.diplayMessage("Ship Sunk!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.diplayMessage("Miss!");
        view.displayMiss(guess);
        return false;
    },

    checkSunk: function(ship){
        for (var i=0;i<this.shipLength;i++){
            if (ship.hits[i] == ""){
                return false;
            }
        }
        return true;
    },

    generateAllShips : function(){
        for (var i =0; i<this.numShips;i++){
            var potentialLocation = this.generateShip();
            while (this.checkForCollision(potentialLocation)){
                potentialLocation = this.generateShip();
            }
            this.currShips++;
            this.ships.push({locations: potentialLocation,hits:["","",""]})
        }
    },

    generateShip: function(){
        var location=["","",""];

        var col = Math.floor(Math.random() * 18) + 1;
        var rowLetter = this.rows[Math.floor(Math.random() * 5)];
        console.log("Letter :" + String(rowLetter) + "  Num " + String(col));
        location[0] = (rowLetter + col);

        //Vertical Direction
        if ((Math.floor(Math.random() * 2))  ===1){
            if (this.rows.indexOf(rowLetter) === 0){
                location[1]=( "B" + col);
                location[2]=( "C" + col);
            }
            else if( this.rows.indexOf(rowLetter) === 4){
                location[1]=("C" + col);
                location[2]=("D" + col);
            }
            else{
                location[1]=(this.rows[this.rows.indexOf(rowLetter) +1] + col);
                location[2]=(this.rows[this.rows.indexOf(rowLetter) -1] + col);
            }
        }
        else{
            if (col ==1){
                location[1]=( rowLetter+ (col + 1) );
                location[2]=( rowLetter + (col + 2) );
            }
            else if (col ==18){
                location[1]=( rowLetter+ (col - 1) );
                location[2]=( rowLetter + (col - 2) );
            }
            else{
                location[1]=( rowLetter+ (col - 1) );
                location[2]=( rowLetter + (col +1) );
            }
        }
        return location;
    },

    checkForCollision: function(location){
        for (var i = 0 ; i < this.currShips; i++){
            for (var j = 0; j < this.shipLength; j++){
                if (this.ships[i].locations.indexOf(location[j]) != -1){
                    return true;
                }
            }
        }
        return false;
    }


};

var controller = {
    guesses: 0,

    processGuess: function(guess){
        if (this.validate(guess)){
            this.guesses++;
            var hit = model.fire(guess);
            if (hit && (model.shipsSunk === model.numShips)){
                view.diplayMessage("All ships sunk");
            }
        }
        else{
            alert("Please enter valid coordinates");
        }
    },

    validate: function(guess){
        var letters = ["A","B","C","D","E"];
        if (guess.length == 2 || guess.length == 3){
            if (letters.indexOf(guess.charAt(0)) !=-1){
                var  col = guess.charAt(1);
                if (guess.length == 3 ){
                    col = col + guess.charAt(2);
                }
                if ((col > 0) && (col <= 18)){
                    return true;
                }
            }
        }
        return false;
    }
};

function init(){
    model.generateAllShips();
    var fireButton = document.getElementById("fire");
    fireButton.onclick = handleFireButton;
    var guessIn = document.getElementById("guess");
    guessIn.onkeypress = handleKeyPress;
}

function handleFireButton(){
    var guessIn = document.getElementById("guess");
    var guess = guessIn.value;
    controller.processGuess(guess);
    guess.value= "";
}

function handleKeyPress(e){
    var fireButton = document.getElementById("fire");
    if (e.keyCode === 13){
        fireButton.click();
        return false;
    }
}

window.onload = init;
