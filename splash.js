let canvas;
let context;
let width;
let height;
let splash;
let nav;


document.addEventListener('DOMContentLoaded', init, false);

function init(){
  setTimeout(function(){document.getElementById("splashScreen").style.display = "none";}, 2500);
  document.getElementById("testBox").addEventListener("click", displayNav());
  
}
function displayNav(){
  nav = document.getElementsByTagName("nav");
  if (nav.style.display === "none") {
    nav.style.display = "block"
  }else{
    nav.style.display = "none"
  }
}
