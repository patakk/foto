
var canvas = null;
var video = null;
var photo = null;
var context = null;
var snap = false;
var snapLabel = null;
var saveLabel = null;
var form = null;
var innerH = null;
var timer = 0;
var snapsnap = false;
var canvasRect;
var displayDefault = null;

function preventBehavior(e) {
    e.preventDefault(); 
};

function requestSave(data_uri){

    var userName = document.getElementById("userName").value;
    var rollName = document.getElementById("lname").value;
    var filmName = document.getElementById("films").value;
    var isoValue = document.getElementById("iso").value;
    var apertureValue = document.getElementById("aperture").value;
    var shutterValue = document.getElementById("shutterspeed").value;

    //const newDiv = document.createElement("div");
    //const newContent = document.createTextNode("hello " + userName + " " + rollName + " " + filmName);
    //newDiv.appendChild(newContent);
    //const currentDiv = document.getElementById("rootElement");
    //currentDiv.appendChild(newDiv)

    $.ajax(
        {
            data: {
                image: data_uri,
                userName: userName,
                rollName: rollName,
                filmName: filmName,
                isoValue: isoValue,
                apertureValue: apertureValue,
                shutterValue: shutterValue
            },
            method : 'POST',
            url : '/foto/save_info',
            success: function(resp) {
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
            canvas.style.width = width*.85 + 1 + "px";
            canvas.style.height = height*.85 + 1 + "px";
            //canvas.style.left = width*(1-.85)/2 + "px";
            //canvas.style.top = height*(1-.85)/2 + "px";
            context = canvas.getContext('2d');
            video = document.querySelector('video');
            photo = document.getElementById('photo');
        }
        context.drawImage(video, 0, -460, 480, 640+460); 
        if(document.getElementById("films").value.includes("Ilford") ||
            document.getElementById("films").value.includes("Tri-X") ||
            document.getElementById("films").value.includes("T-Max"))
            makeGray();
        //var data = canvas.toDataURL('image/png');
        //photo.setAttribute('src', data);
    }
    catch(err) {
        //document.getElementById("message").innerHTML = err.message;
    }
  }

  function handleSnapStart(){
    snapLabel.style.background = "#FFFFFF";
    snapLabel.style.color = "#101010";
}

function handleBackStart(){
    window.location.href = '/foto';
}

function handleSaveStart(){
    if(!snap)
        return;
    saveLabel.style.background = "#2080FF";
    saveLabel.style.color = "#FFFFFF"; 
    saveLabel.innerHTML = "SAVING...";
    timer = 800;
}

function handleSnapEnd(){
    snapLabel.style.background = "#121212";
    snapLabel.style.color = "#FFFFFF"; 
    //Webcam.snap( function(data_uri) {
    //    document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
    //} );
    if(!snap){
        snapLabel.style.background = "#121212";
        snapLabel.innerHTML = 'NEW FRAME';
        snapsnap = false;
    }
    else{
        snapLabel.style.background = "#121212";
        snapLabel.innerHTML = 'SHOOT!'
    }
    snap = !snap;
}

function handleSaveEnd(){
    if(!snap)
        return;
    saveLabel.style.background = "#2080FF";
    saveLabel.style.color = "#FFFFFF"; 
    saveLabel.innerHTML = "SAVING...";
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

    //innerH = window.innerHeight;
    document.getElementById("rootElement").style.height = innerH + "px";

    var width, height, rect;

    if(timer <= 0){
        if(snap){
            saveLabel.style.background = "#121212";
            //snapLabel.style.background = "#121212";
            snapLabel.innerHTML = 'NEW FRAME'
        }
        else{
            saveLabel.style.background = "#777777";
            //snapLabel.style.background = "#121212";
            snapLabel.innerHTML = 'SHOOT!'
            snapsnap = true;
        }
        saveLabel.style.color = "#FFFFFF"; 
        saveLabel.innerHTML = "SAVE";
    }
    else{
        if(timer > 400){
            saveLabel.style.background = "#2080FF";
            saveLabel.style.color = "#FFFFFF"; 
            saveLabel.innerHTML = "SAVING...";
        }
        else{
            saveLabel.style.background = "#20CCAA";
            saveLabel.style.color = "#FFFFFF";
            saveLabel.innerHTML = "SAVED!";
        }
        timer = timer - 33;
    }

  
    width = window.innerWidth;
    height = window.innerWidth*3/4;

    try{
        if(!canvasRect)
            canvasRect = canvas.getBoundingClientRect();
    
        if(window.innerHeight < innerH){
            canvas.style.display = "none";
            snapLabel.style.display = "none";
            saveLabel.style.display = "none";
        }
        else{
            canvas.style.display = "inline-block";
            snapLabel.style.display = "inline-block";
            saveLabel.style.display = "inline-block";
        }

        //snapLabel.style.top = canvasRect['bottom']*1. + innerH*0.02 + "px";
        var snapRect = snapLabel.getBoundingClientRect();
        //snapLabel.style.left = window.innerWidth*0.5 - snapRect["width"]/2;
        //snapLabel.style.position = "absolute";
        //snapLabel.style.width = "calc(80% - 8px)";
        //saveLabel.style.width = "calc(80% - 8px)";
        
        //form.style.left = width*.075 + "px";
        //form.style.top = snapRect["bottom"] + innerH*0.02 + "px";
        //form.style.width = width*.85 + "px";
        //form.style.position = "absolute";
        var formRect = form.getBoundingClientRect();
    
        var saveRect = saveLabel.getBoundingClientRect();
        //saveLabel.style.top = formRect['bottom']*1. + innerH*0.02 + "px";
        //saveLabel.style.left = window.innerWidth*0.5 - saveRect["width"]/2;
        //saveLabel.style.position = "absolute";
        //document.getElementById("back-button").style.top = formRect['bottom']*1. + innerH*0.02 + "px";
        //document.getElementById("back-button").style.left = "10px";
    }
    catch(err) {
        //document.getElementById("message").innerHTML = err.message;
    }


    document.getElementById("userName").style.width = width*.85 - 8 + "px";
    document.getElementById("lname").style.width = width*.85 - 8 + "px";
    document.getElementById("films").style.width = width*.85 - 8 + "px";
    document.getElementById("iso").style.width = width*.85 - 8 + "px";
    document.getElementById("shutterspeed").style.width = width*.85 - 8 + "px";
    document.getElementById("aperture").style.width = width*.85 - 8 + "px";

    if(!snap && snapsnap)
        takepicture();
    
    window.requestAnimationFrame(animationLoop);
}

function makeGray(){
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (i = 0; i < imgData.data.length; i += 4) {
        let colour = (0.2126*imgData.data[i] + 0.7152*imgData.data[i + 1] + 0.0722*imgData.data[i + 2])
        imgData.data[i] = colour;
        imgData.data[i + 1] = colour;
        imgData.data[i + 2] = colour;
        imgData.data[i + 3] = 255;
    }
    context.putImageData(imgData, 0, 0);
}

function reportWindowSize() {
    //document.getElementById('rootElement').style.display = "none";
}
  
$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
    
    window.onresize = reportWindowSize;

    form = document.getElementById("form");
    snapLabel = document.getElementById("snap-button");
    snapLabel.addEventListener('touchstart', handleSnapStart);
    snapLabel.addEventListener('touchend', handleSnapEnd);
    
    saveLabel = document.getElementById("save-button");
    saveLabel.addEventListener('touchstart', handleSaveStart);
    saveLabel.addEventListener('touchend', handleSaveEnd);

    //document.getElementById("back-button").addEventListener('touchstart', handleBackStart);

    document.getElementById("films").addEventListener('change', function() {
        if(document.getElementById("films").value.includes("Ilford") ||
            document.getElementById("films").value.includes("Tri-X") ||
            document.getElementById("films").value.includes("T-Max"))
            makeGray();
    });

    innerH = window.innerHeight;
    
    Webcam.set({
        width: 480,
        height: 640,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach( '#player' );
    
    document.getElementById('player').style.opacity = 0;
    document.getElementById('player').style.zIndex = -1000;

    window.requestAnimationFrame(animationLoop);
    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});