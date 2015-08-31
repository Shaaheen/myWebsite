/**
 * Created by Shaaheen on 8/29/2015.
 */
var visibilities =[false,false,false,false,false,false];
var currVisible = 2;

function init2(){
    console.log("After: Multiple JS files");
    console.log("Before Load")
    //if first time on page, set to default 2
    if (localStorage.getItem("currVisible") == null){
        localStorage.setItem("currVisible", 2);
    }

    visibilities[localStorage.getItem("currVisible")] = true;

    for (var i = 0; i < visibilities.length ; i++){

        if (visibilities[i]){
            document.getElementById("div" + i).style.visibility = "visible";
        }
        else{
            document.getElementById("div" + i).style.visibility = "hidden";
        }

    }
}

function skills(button_id){
    console.log("gets here yay");
    console.log(button_id);
    console.log(visibilities[ parseInt(button_id)]);
    if ( parseInt(button_id) != currVisible ){
        currVisible = localStorage.getItem("currVisible");
        document.getElementById("div" + currVisible).style.visibility = "hidden";

        localStorage.setItem("currVisible",parseInt(button_id));
        currVisible = localStorage.getItem("currVisible");
        document.getElementById("div" + button_id).style.visibility = "visible";

        visibilities[currVisible] = true;
    }
    console.log(visibilities[ parseInt(button_id)]);

}

function beforeLoad(){

    console.log("Before Load")
    //if first time on page, set to default 2
    if (localStorage.getItem("currVisible") == null){
        localStorage.setItem("currVisible", 2);
    }

    visibilities[localStorage.getItem("currVisible")] = true;

    for (var i = 0; i < visibilities.length ; i++){

        if (visibilities[i]){
            document.getElementById("div" + i).style.visibility = "visible";
        }
        else{
            document.getElementById("div" + i).style.visibility = "hidden";
        }

    }

}

//Done as their are multiple functions that need to be launched when the
//document is done loading
window.addEventListener('load',init2,false);

