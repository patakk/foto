

function preventBehavior(e) {
    e.preventDefault(); 
};


function saveOnMouseDown(){
    el = document.getElementById( "save-label");
    el.style.background = "#FFFFFF";
    el.style.color = "#101010";
}

function saveOnMouseUp(){
    var el = document.getElementById("save-label");
    el.style.background = "#101010";
    el.style.color = "#FFFFFF"; 

    requestSave()
}


$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
 
    document.getElementById('save-label').onmouseup = saveOnMouseUp;
    document.getElementById('save-label').onmousedown = saveOnMouseDown;

    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});