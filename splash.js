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
  console.log("Hello world!");
  
  if (document.getElementById("nav").style.display === "none") {
    document.getElementById("nav").style.display = "block"
  }else{
    document.getElementById("nav").style.display = "none"
  }
  console.log("Test!");
}
