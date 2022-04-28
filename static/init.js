
        
$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
    
    
    previewLabel = document.getElementById("session-button");
    sessionLabel = document.getElementById("preview-button");

    var sessionRect = sessionLabel.getBoundingClientRect();
    var previewRect = sessionLabel.getBoundingClientRect();

    sessionLabel.style.position = "absolute";
    sessionLabel.style.left = window.innerWidth/2 - sessionRect['width']/2 + "px";
    sessionLabel.style.top = window.innerHeight/2 - sessionRect['height'] + "px";
    previewLabel.style.position = "absolute";
    previewLabel.style.left = window.innerWidth/2 - previewRect['width']/2 + "px";
    previewLabel.style.top = window.innerHeight/2 + "px";

    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});