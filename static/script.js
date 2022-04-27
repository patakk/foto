
var canvas = null;
var video = null;
var photo = null;
var context = null;
var snap = false;
var snapLabel = null;
var saveLabel = null;
var form = null;

function preventBehavior(e) {
    e.preventDefault(); 
};

function requestSave(data_uri){

    $.ajax(
        {
            data: {
                image: data_uri
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
            canvas.style.width = width*.85 + "px";
            canvas.style.height = height*.85 + "px";
            canvas.style.left = width*(1-.85)/2 + "px";
            canvas.style.top = height*(1-.85)/2 + "px";
            context = canvas.getContext('2d');
            video = document.querySelector('video');
            photo = document.getElementById('photo');
        }
        context.drawImage(video, 0, -460, 480, 640+460);

        //var data = canvas.toDataURL('image/png');
        //photo.setAttribute('src', data);
    }
    catch(err) {
        document.getElementById("message").innerHTML = err.message;
    }
  }

function handleSnapStart(){
    snapLabel.style.background = "#FFFFFF";
    snapLabel.style.color = "#101010";
}

function handleSaveStart(){
    saveLabel.style.background = "#FFFFFF";
    saveLabel.style.color = "#101010";
}

function handleSnapEnd(){
    snapLabel.style.background = "#101010";
    snapLabel.style.color = "#FFFFFF"; 
    //Webcam.snap( function(data_uri) {
    //    document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
    //} );
    if(!snap){
        snapLabel.innerHTML = 'GET NEW PHOTO'
    }
    else{
        snapLabel.innerHTML = 'SNAP!'
    }
    snap = !snap;
}

function handleSaveEnd(){
    saveLabel.style.background = "#101010";
    saveLabel.style.color = "#FFFFFF"; 
    requestSave(canvas.toDataURL('image/png'));
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
    
    var width, height, rect;

    width = window.innerWidth;
    height = window.innerWidth*3/4;

    snapLabel.style.top = height*1.;
    rect = snapLabel.getBoundingClientRect();
    snapLabel.style.left = window.innerWidth*0.5 - rect["width"]/2;
    
    saveLabel.style.bottom = window.innerHeight*.05 + "px";
    rect = saveLabel.getBoundingClientRect();
    saveLabel.style.left = window.innerWidth*0.5 - rect["width"]/2;

    form.style.left = "0px";
    form.style.top = height*1.05 + rect["width"] + "px";
    form.style.width = width*.75 + "px";
    document.getElementById("lname").style.width = width*.75 + "px";

    if(!snap)
        takepicture();
    
    window.requestAnimationFrame(animationLoop);
}

$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
    
    form = document.getElementById("form");
    snapLabel = document.getElementById("snap-button");
    snapLabel.addEventListener('touchstart', handleSnapStart);
    snapLabel.addEventListener('touchend', handleSnapEnd);
    
    saveLabel = document.getElementById("save-button");
    saveLabel.addEventListener('touchstart', handleSaveStart);
    saveLabel.addEventListener('touchend', handleSaveEnd);
    
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