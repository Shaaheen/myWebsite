/**
 * Created by Shaaheen on 12/7/2015.
 */

function initList(){
    console.log("Got to the list init()")
    var myFirebaseRef = new Firebase("https://boiling-torch-6214.firebaseio.com/CheckList");
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
    var itemsString = "";
    var count = 0;
    // Retrieve new posts as they are added to our database
    myFirebaseRef.on("child_added", function(snapshot, prevChildKey) {
        count++;
        var newPost = snapshot.val();
        console.log("Author: " + newPost.item);
        itemsString = itemsString + "Item " + count + ": " + newPost.item + "<br/>";
        console.log("Previous Post ID: " + prevChildKey);
    });
    console.log("Here");

    myFirebaseRef.once("value", function(data) {
        var allData = data.val();
        console.log("All data" + allData);
        console.log(itemsString);
        listDisplay.innerHTML = itemsString;
    });
}

window.addEventListener('load',initList,false);
