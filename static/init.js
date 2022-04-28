var previewLabel = null;
var sessionLabel = null;

function handleSessionStart(){
    sessionLabel.style.background = "#FFFFFF";
    sessionLabel.style.color = "#101010";
}

function handleSessionEnd(){
    sessionLabel.style.background = "#101010";
    sessionLabel.style.color = "#FFFFFF";
}

function handlePreviewStart(){
    previewLabel.style.background = "#FFFFFF";
    previewLabel.style.color = "#101010";
}

function handlePreviewEnd(){
    previewLabel.style.background = "#101010";
    previewLabel.style.color = "#FFFFFF";
}

function animationLoop(){
    
    previewLabel = document.getElementById("session-button");
    sessionLabel = document.getElementById("preview-button");

    var sessionRect = sessionLabel.getBoundingClientRect();
    var previewRect = previewLabel.getBoundingClientRect();

    sessionLabel.style.left = window.innerWidth/2 - sessionRect['width']/2 + "px";
    sessionLabel.style.top = window.innerHeight/2 - sessionRect['height'] + "px";
    previewLabel.style.left = window.innerWidth/2 - previewRect['width']/2 + "px";
    previewLabel.style.top = window.innerHeight/2 + "px"
    sessionLabel.style.left =222 + "px";
    sessionLabel.style.top = 222 + "px";
    previewLabel.style.left = 333 + "px";
    previewLabel.style.top = 555 + "px";
    window.requestAnimationFrame(animationLoop);
}
        
$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
        
    window.requestAnimationFrame(animationLoop);

    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});