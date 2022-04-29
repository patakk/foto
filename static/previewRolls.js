var form = null;
var nameLabel = null;
var submitLabel = null;


function handleRollClick(e){
    
    console.log(window.location.search);
    //window.location.href = '/foto/previewRolls?userName=' + e.srcElement.id;
}

function preventBehavior(e) {
    e.preventDefault(); 
}; 

$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
        

});