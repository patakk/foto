var form = null;
var nameLabel = null;
var submitLabel = null;

function handleSubmitStart(){
    submitLabel.style.background = "#FFFFFF";
    submitLabel.style.color = "#101010";
}

function handleSubmitEnd(){
    submitLabel.style.background = "#101010";
    submitLabel.style.color = "#FFFFFF";

    var userName = document.getElementById("userName").value;

    
    window.location.href = '/foto/preview?userName=' + userName;
}

function animationLoop(){
    
    form = document.getElementById("form");
    nameLabel = document.getElementById("userName");
    submitLabel = document.getElementById("submit-button");

    var nameRect = nameLabel.getBoundingClientRect();
    var submitRect = submitLabel.getBoundingClientRect();

    var width = window.innerWidth;
    form.style.position = "absolute";
    form.style.left = width*.075 + "px";
    form.style.top = window.innerHeight*.5 + "px";
    form.style.width = width*.85 + "px";
    var formRect = form.getBoundingClientRect();
    nameLabel.style.width = width*.85 - 8 + "px";

    submitLabel.style.position = "absolute";
    submitLabel.style.left = width*.075 + "px";
    submitLabel.style.top = formRect['bottom'] + "px";
    //submitLabel.style.width = width*.85 - 8 + "px";

    submitLabel.addEventListener('touchstart', handleSubmitStart);
    submitLabel.addEventListener('touchend', handleSubmitEnd);
    
    submitLabel.addEventListener('mousedown', handleSubmitStart);
    submitLabel.addEventListener('mouseup', handleSubmitEnd);
    window.requestAnimationFrame(animationLoop);
}
       
function preventBehavior(e) {
    e.preventDefault(); 
}; 
$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
        

    window.requestAnimationFrame(animationLoop);

    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});