/**
 * Created by Shaaheen on 6/6/2015.
 * Program to allow user to dynamically change the website background
 */

var currWallPaper = 0;
var child = false;
var backgrounds = ["'images/outer.jpg'","'images/space.jpg'","'images/space2.jpg'","'images/space3.jpg'","'images/space4.jpg'"];
var numOfWallpapers = backgrounds.length - 1;

function init(){
    if (localStorage.getItem("currBack", currWallPaper) == NaN){
        localStorage.setItem("currBack", 0);
    }
    console.log("Gets here");
    if (document.getElementById("Intro") == null){
        console.log("child");
        backgrounds = ["'../images/outer.jpg'","'../images/space.jpg'","'../images/space2.jpg'","'../images/space3.jpg'","'../images/space4.jpg'"];
    }
    else{
        backgrounds = ["'images/outer.jpg'","'images/space.jpg'","'images/space2.jpg'","'images/space3.jpg'","'images/space4.jpg'"];
        console.log("parent");
    }

    var currWalll = parseInt(localStorage.getItem("currBack"));
    console.log(currWalll);
    var newBack = backgrounds[currWalll];
    document.body.style.backgroundImage = "url(" + newBack + ")";

    //give the buttons their events
    var leftArrow = document.getElementById('leftArrow');
    var rightArrow = document.getElementById('rightArrow');
    leftArrow.addEventListener('click',leftArrw,false);
    rightArrow.addEventListener('click',rightArrw,false);4

    //For arrows to do the same as buttons
    document.onkeydown = function(e){
        console.log(e.keyCode);
        if (e.keyCode === 37){
            leftArrw();
        }
        else if (e.keyCode ===39 ){
            rightArrw();
        }
    }
}
function leftArrw(){
    if (currWallPaper == 0){
        currWallPaper = numOfWallpapers;
    }
    else{
        currWallPaper --;
    }
    var newBack = backgrounds[currWallPaper];
    document.body.style.backgroundImage = "url(" + newBack + ")";
    localStorage.setItem("currBack", currWallPaper);
}

function rightArrw(){
    if (currWallPaper == numOfWallpapers){
        currWallPaper = 0;
    }
    else{
        currWallPaper ++;
    }
    var newBack = backgrounds[currWallPaper];
    document.body.style.backgroundImage = "url(" + newBack + ")";
    localStorage.setItem("currBack", currWallPaper);
}

window.onload = init;

