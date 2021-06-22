let canvas;
let context;
let width;
let height;
let splash;
let nav;
let interval_id;


document.addEventListener('DOMContentLoaded', init, false);
function init(){
  setTimeout(function(){document.getElementById("splashScreen").style.display = "none";}, 2500);
}


function displayNav(){  
  if (document.getElementById("nav").style.display === "none") {
    document.getElementById("nav").style.display = "block"
  }else{
    document.getElementById("nav").style.display = "none"
  }
}
