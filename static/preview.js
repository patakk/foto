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

    var userName = document.getElementById("fname").value;

    $.ajax(
        {
            data: {
                userName: userName,
            },
            method : 'POST',
            url : '/foto/preview',
            success: function(resp) {
                const newDiv = document.createElement("div");
                const newContent = document.createTextNode(resp["message"]);
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