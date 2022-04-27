
var canvas = null;
var video = null;
var photo = null;
var context = null;
var snap = false;

function preventBehavior(e) {
    e.preventDefault(); 
};

function requestSave(data_uri){

    const newDiv = document.createElement("div");
    const newContent = document.createTextNode("AAAAAAAAAAAAAAA");
    newDiv.appendChild(newContent);
    const currentDiv = document.getElementById("rootElement");
    currentDiv.appendChild(newDiv)

    $.ajax(
        {
            data: {
                image: "data_uri"
            },
            method : 'POST',
            url : '/foto/save_info',
            success: function(resp) {
                const newDiv = document.createElement("div");
                const newContent = document.createTextNode("hello " + resp["name"] + " " + resp["w"] + " " + resp["h"]);
                newDiv.appendChild(newContent);
                const currentDiv = document.getElementById("rootElement");
                currentDiv.appendChild(newDiv)

                //var table = document.getElementById("model-table");
                //var row = table.insertRow(0);
                //var cell = row.insertCell(0);
                //cell.innerHTML = "<div onmouseup=\"modelLinkOnMouseUp(event)\" class=\"model_link\" id=" + resp["name"] + ">" + resp["name"] + "</div>";

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

function takepicture() {
    try {
        var width = window.innerWidth;
        var height = window.innerWidth*3/4;
        if(!canvas){
            canvas = document.getElementById('canvas');
            canvas.width = 480;
            canvas.height = 640;
            canvas.style.width = width+"px";
            canvas.style.height = height+"px";
            context = canvas.getContext('2d');
            video = document.querySelector('video');
            photo = document.getElementById('photo');
        }
        document.getElementById("message").innerHTML = video.videoWidth + " " + video.videoHeight;
        context.drawImage(video, 0, -460, 480, 640+460);

        //var data = canvas.toDataURL('image/png');
        //photo.setAttribute('src', data);
    }
    catch(err) {
        document.getElementById("message").innerHTML = err.message;
    }
  }

function handleStart(){
    el = document.getElementById( "save-label");
    el.style.background = "#FFFFFF";
    el.style.color = "#101010";
}

function handleEnd(){
    var el = document.getElementById("save-label");
    el.style.background = "#101010";
    el.style.color = "#FFFFFF"; 
    //Webcam.snap( function(data_uri) {
    //    document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
    //} );
    snap = true;
}


function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

if (hasGetUserMedia()) {
// Good to go!
} else {
    alert("getUserMedia() is not supported by your browser");
}

function animationLoop(){
    
    if(!snap)
        takepicture();
    
    window.requestAnimationFrame(animationLoop);
}

$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
 
    document.getElementById('save-label').addEventListener('touchstart', handleStart);
    document.getElementById('save-label').addEventListener('touchend', handleEnd);

    Webcam.set({
        width: 480,
        height: 640,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach( '#player' );

    
    document.getElementById('player').style.opacity = 0;

    window.requestAnimationFrame(animationLoop);
    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});