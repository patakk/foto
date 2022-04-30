var form = null;
var nameLabel = null;
var submitLabel = null;
var userName = null;

function handleRollClick(e){
    userName = window.location.search.split("&")[0].split("=")[1];
    window.location.href = '/foto/preview?userName=' + userName + "&rollName=" + e.srcElement.attributes.name.value;
}


function preventBehavior(e) {
    e.preventDefault(); 
}; 


function reportWindowSize() {
    if(window.innerWidth > window.innerHeight){
        document.getElementById('rootElement').style.width = "800px";
        document.getElementById('rootElement').style.margin = "auto";
    }
    else{
        document.getElementById('rootElement').style.width = "100%";
        document.getElementById('rootElement').style.margin = "0px";
    }
  }
  
$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 


    window.onresize = reportWindowSize;

    if(window.innerWidth > window.innerHeight){
        document.getElementById('rootElement').style.width = "800px";
        document.getElementById('rootElement').style.margin = "auto";
    }
    else{
        document.getElementById('rootElement').style.width = "100%";
        document.getElementById('rootElement').style.margin = "0px";
    }
});