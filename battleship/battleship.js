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
    boardSize: 6,
    numShips: 1,
    shipLength:3,
    shipsSunk:0,

    ships: [{ locations: ["A1","B1","C1"], hits:["","",""]}],

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
        if (guess.length == 2){
            if (letters.indexOf(guess.charAt(0)) !=-1){
                var  col = guess.charAt(1);
                if ((col > 0) && (col <= 6)){
                    return true;
                }
            }
        }
        return false;
    }
};
function init(){
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
