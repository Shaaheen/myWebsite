/**
 * Created by Shaaheen on 12/7/2015.
 */

var myFirebaseRef = new Firebase("https://boiling-torch-6214.firebaseio.com/CheckList");
var keys = [];
var result;
function initList(){
    console.log("Got to the list init()")
    /*
     var usersRef = myFirebaseRef.child("users");
     usersRef.set({
     alanisawesome: {
     date_of_birth: "June 23, 1912",
     full_name: "Alan Turing"
     },
     gracehop: {
     date_of_birth: "December 9, 1906",
     full_name: "Grace Hopper"
     }
     });


    var listsRef = myFirebaseRef.child("CheckList");

    var newItemRef = listsRef.push();
    newItemRef.set({
        item: "Add an 'Add' Button",
    });
    */

    var listDisplay = document.getElementById("CheckList");
    var count = 0;
    result = document.getElementById("Result");
    // Retrieve new posts as they are added to our database
    myFirebaseRef.on("child_added", function(snapshot, prevChildKey) {

        var newPost = snapshot.val();
        console.log("Value: " + snapshot.key());
        console.log("Previous Post ID: " + prevChildKey);
        keys.push([newPost.item,snapshot.key()]);
        console.log("Key:" + keys[count-1]);
        listDisplay.innerHTML = listDisplay.innerHTML + "Item " + (count+1)
            + ": " + newPost.item + "     <input type='button' value='X'  id='" + count + "' onclick='removeItem(this.id)'>"
            + "<br/>";
        count++;
        result.innerHTML = "Added Item: ' " + newPost.item  + " '";
    });

    myFirebaseRef.on("child_removed", function(snapshot) {
        result.innerHTML = "Removed Item: ' " + snapshot.val().item+ " ' ";
        count = 0;
        myFirebaseRef.once("value", function(snap) {
            listDisplay.innerHTML = "";
            keys = [];
            snap.forEach(function(data) {
                var newPost = data.val();
                keys.push([newPost.item,data.key()]);
                listDisplay.innerHTML = listDisplay.innerHTML + "Item " + (count+1)
                    + ": " + newPost.item + "     <input type='button' value='X'  id='" + count + "' onclick='removeItem(this.id)'>"
                    + "<br/>";
                count++;
            });
            console.log(keys);
        });
    });
    myFirebaseRef.once("value", function(snap) {
        result.innerHTML = "Done Loading.";
        snap.forEach(function(data) {
            console.log("The " + data.key() + " dinosaur's score is " + data.val().item);
        });
    });

}

//Function to add a new item to the check list
function addNewItem(){
    var newItemRef = myFirebaseRef.push();
    var inputVal = document.getElementById("newItem");
    newItemRef.set({
        item: inputVal.value,
    });

    inputVal.value = "";
}

function removeItem(clicked_buttonID){
        var removeKey = keys[clicked_buttonID][1];
        console.log(removeKey);
        var removeRef = new Firebase("https://boiling-torch-6214.firebaseio.com/CheckList/" + removeKey);
        removeRef.remove()

    //console.log("Remove : " + removeRef);
    //console.log(clicked_buttonID);
}

window.addEventListener('load',initList,false);
