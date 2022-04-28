var previewLabel = null;
var sessionLabel = null;

function handleSessionStart(){
    sessionLabel.style.background = "#FFFFFF";
    sessionLabel.style.color = "#101010";
}

function handleSessionEnd(){
    sessionLabel.style.background = "#101010";
    sessionLabel.style.color = "#FFFFFF";

    window.location.href = '/foto/session';
}

function handlePreviewStart(){
    previewLabel.style.background = "#FFFFFF";
    previewLabel.style.color = "#101010";
}

function handlePreviewEnd(){
    previewLabel.style.background = "#101010";
    previewLabel.style.color = "#FFFFFF";
    window.location.href = '/foto/preview';
}

function animationLoop(){
    
    form = document.getElementById("form");
    nameLabel = document.getElementById("fname");
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