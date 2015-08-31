/**
 * Created by Shaaheen on 6/6/2015.
 * Program to allow user to dynamically change the website background
 */

var currWallPaper = 0;
var child = false;
var backgrounds = ["'images/outer.jpg'","'images/space.jpg'","'images/space2.jpg'","'images/space3.jpg'","'images/space4.jpg'","'images/space5.jpg'","'images/space6.jpg'","'images/space7.jpg'","'images/space8.jpg'"];
var numOfWallpapers = backgrounds.length - 1;
var showThankYou = false;

function init(){

    //If first time loading page, set default values
    if (localStorage.getItem("showThankYou") == NaN){
        localStorage.setItem("showThankYou", false);
    }

    //Set Thank you message if submit button was previously clicked
    var thankYou = (localStorage.getItem("showThankYou") === 'true');

    console.log("The var is " + thankYou);
    var ThanksElement = document.getElementById("ThankYou");
    if (ThanksElement != null && (thankYou === true)){
        ThanksElement.innerHTML = "Thank You :) <br/> Your message has been sent.";
        localStorage.setItem("showThankYou",false);
    }

    //give the buttons their events
    var leftArrow = document.getElementById('leftArrow');
    var rightArrow = document.getElementById('rightArrow');
    leftArrow.addEventListener('click',leftArrw,false);
    rightArrow.addEventListener('click',rightArrw,false);


    console.log("Updated");
    //For the Contact Form
    var form = document.getElementById("FormT");

    var submit = document.getElementById("Submit");
    if (form != null){
        //submit.addEventListener('submit',submit,false);
        form.addEventListener("submit",submitted,false);
        console.log("Contact Page");
    }
    else{
        console.log("Not Contact page");
    }

    //For arrows to do the same as buttons
    document.onkeydown = function(e){
        console.log(e.keyCode);
        if (e.keyCode === 37){
            e.preventDefault();
            leftArrw();
        }
        else if (e.keyCode ===39 ){
            e.preventDefault();
            rightArrw();
        }
    }
}
//If left arrow clicked
function leftArrw(){
    if (currWallPaper == 0){ //if end of left images then wrap around
        currWallPaper = numOfWallpapers;
    }
    else{
        currWallPaper --; //go back one in array
    }
    var newBack = backgrounds[currWallPaper]; //set directory text
    //Change CSS background image
    document.body.style.backgroundImage = "url(" + newBack + ")";
    //Stores which background is being used locally
    //This allows wallpaper to be kept between web pages
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

function submitted(){
    console.log("Submit Triggered");
    //alert("TRIGGERED");
    localStorage.setItem("showThankYou",true);
}

//Function to set background to correct set wallpaper
function setBackgroundBeforeLoad(){

    //if first time on page, set to default 0
    if (localStorage.getItem("currBack") == null){
        localStorage.setItem("currBack", 0);
    }

    //Gets current html page name
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    console.log("The current page is " + sPage);

    //Set directory depending on where html is
    if (sPage != "index.html"){
        console.log("child");
        backgrounds = ["'../images/outer.jpg'","'../images/space.jpg'","'../images/space2.jpg'","'../images/space3.jpg'","'../images/space4.jpg'","'../images/space5.jpg'","'../images/space6.jpg'","'../images/space7.jpg'","'../images/space8.jpg'"];
    }
    else{
        backgrounds = ["'images/outer.jpg'","'images/space.jpg'","'images/space2.jpg'","'images/space3.jpg'","'images/space4.jpg'","'images/space5.jpg'","'images/space6.jpg'","'images/space7.jpg'","'images/space8.jpg'"];
        console.log("parent");
    }

    //Set background to current set background
    currWallPaper = parseInt(localStorage.getItem("currBack"));
    console.log("the current wallpaper num is: " + currWallPaper);
    var newBack = backgrounds[currWallPaper];
    document.body.style.backgroundImage = "url(" + newBack + ")";

}

setBackgroundBeforeLoad();
//window.onload = init;
window.addEventListener('load',init,false);

