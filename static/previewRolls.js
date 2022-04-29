var form = null;
var nameLabel = null;
var submitLabel = null;
var userName = null;

function handleRollClick(e){
    
    userName = window.location.search.split("&")[0].split("=")[1];
    window.location.href = '/foto/previewRolls?userName=' + userName + "&rollName=" + e.srcElement.innerHtml;
}

function preventBehavior(e) {
    e.preventDefault(); 
}; 

$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
        

});