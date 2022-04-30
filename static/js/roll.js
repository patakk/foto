function goBack() {
    userName = window.location.search.split("&")[0].split("=")[1];
    window.location.href = '/foto/preview?userName=' + userName;
}

function preventBehavior(e) {
    e.preventDefault(); 
};

function reportWindowSize() {
    if(window.innerWidth > window.innerHeight){
        document.getElementById('rootElement').style.width = "800px";
    }
  }
  


$(document).ready(function(){
    document.addEventListener("touchmove", preventBehavior, {passive: false}); 
        

    window.onresize = reportWindowSize;
    console.log("xxx")

    if(window.innerWidth > window.innerHeight){
        console.log("aaa")
        document.getElementById('rootElement').style.width = "800px";
    }

    //var path = document.getElementById('img').src;
    //var ext = path.slice(path.length-3, path.length);
    //if (ext == "png" || ext == "jng")
    //    document.getElementById('img').style.visibility = "visible";
});