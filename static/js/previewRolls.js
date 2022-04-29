var form = null;
var nameLabel = null;
var submitLabel = null;
var userName = null;

function handleRollClick(e){
    userName = window.location.search.split("&")[0].split("=")[1];
    window.location.href = '/foto/preview?userName=' + userName + "&rollName=" + e.srcElement.id;
}


function preventBehavior(e) {
    e.preventDefault(); 
}; 

$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
});