var previewLabel = null;
var sessionLabel = null;

function handleSessionStart(){
    sessionLabel.style.background = "#FFFFFF";
    sessionLabel.style.color = "#101010";
}

function handleSessionEnd(){
    sessionLabel.style.background = "#101010";
    sessionLabel.style.color = "#FFFFFF";

    $.ajax(
        {
            data: {
                'mode': 'session'
            },
            method : 'POST',
            url : '/foto/session',
            success: function(resp) {
                
                const newDiv = document.createElement("div");
                const newContent = document.createTextNode("hellosafasa " );
                newDiv.appendChild(newContent);
                const currentDiv = document.getElementById("rootElement");
                currentDiv.appendChild(newDiv)
            },
            progress: function(e) {
                console.log(e);
            },
            fail: function(resp) {
                console.log("fail")
            }
        }
    );
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
    
    previewLabel = document.getElementById("preview-button");
    sessionLabel = document.getElementById("session-button");

    var sessionRect = sessionLabel.getBoundingClientRect();
    var previewRect = previewLabel.getBoundingClientRect();

    sessionLabel.style.left = window.innerWidth/2 - sessionRect['width']/2 + "px";
    sessionLabel.style.top = window.innerHeight/2 - sessionRect['height'] - 5 + "px";
    previewLabel.style.left = window.innerWidth/2 - previewRect['width']/2 + "px";
    previewLabel.style.top = window.innerHeight/2 + 5 + "px"
    sessionLabel.addEventListener('touchstart', handleSessionStart);
    sessionLabel.addEventListener('touchend', handleSessionEnd);
    previewLabel.addEventListener('touchstart', handlePreviewStart);
    previewLabel.addEventListener('touchend', handlePreviewEnd);
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