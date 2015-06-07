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
    numShips: 3,
    shipLength:3,
    shipsSunk:0,

    ships: [{ locations: ["A1","B1","C1"], hits:["","",""]}],

    fire: function(guess){
        for (var i=0;i <this.numShips;i++){
            var ship = this.ships[i];
            var ind = ship.locations.indexOf(guess);
            if (ind !=-1){
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
        for (var i=0;i<ship.shipLength;i++){
            if (ship.hits[i] == ""){
                return false;
            }
        }
        return true;
    }
};


model.fire("A6");
