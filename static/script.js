

function preventBehavior(e) {
e.preventDefault(); 
};
document.addEventListener("touchmove", preventBehavior, {passive: false}); 
 