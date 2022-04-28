
        
$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
    
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

    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});