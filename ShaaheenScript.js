/**
 * Created by Shaaheen on 6/6/2015.
 */
var currWallPaper = 0;
var backgrounds = ["'images/space.jpg'","'images/outer.jpg'","'images/space2.jpg'","'images/space3.jpg'","'images/space4.jpg'"];
var numOfWallpapers = backgrounds.length - 1;
function init(){
    var leftArrow = document.getElementById('leftArrow');
    var rightArrow = document.getElementById('rightArrow');
    if (leftArrow){
        leftArrow.addEventListener('click',leftArrw,false);
        rightArrow.addEventListener('click',rightArrw,false);
    }
    else{
        console.log("NULL");
    }
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

function handleKeyArrows(e){
    console.log("dbhjbfkdfnkj");
    if (e === 37){
        leftArrw();
    }
    else if (e ===38 ){
        rightArrw();
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
}

window.onload = init;

