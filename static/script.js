


function preventBehavior(e) {
    e.preventDefault(); 
};

function requestSave(){
    $.ajax(
        {
            data: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            method : 'POST',
            url : '/foto/save_info',
            success: function(resp) {
                /*const newDiv = document.createElement("div");
                const newContent = document.createTextNode("hello " + resp["name"] + " " + resp["w"] + " " + resp["h"]);
                newDiv.appendChild(newContent);
                const currentDiv = document.getElementById("rootElement");
                currentDiv.appendChild(newDiv)*/

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


function saveOnMouseDown(){
    el = document.getElementById("save-label");
    el.style.background = "#FFFFFF";
    el.style.color = "#101010";
}

function saveOnMouseUp(){
    var el = document.getElementById("save-label");
    el.style.background = "#101010";
    el.style.color = "#FFFFFF"; 

    requestSave()
}

function animLoop(){


}


$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
 
    document.getElementById('save-label').onmouseup = saveOnMouseUp;
    document.getElementById('save-label').onmousedown = saveOnMouseDown;


    let video = document.querySelector("#player");
    let click_button = document.querySelector("#click-photo");
    let canvas = document.querySelector("#canvas");
    
    const constraints = {
        audio: false,
        video:
        {
            facingMode: { exact: "environment" }
        }
    }

    var getMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    getMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
        });

    click_button.addEventListener('click', function() {
        
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');

        // data url of the image
        console.log(image_data_url);
    });
    


    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});