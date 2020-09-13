let canvas;
let context;
let width;
let height;
let splash;


document.addEventListener('DOMContentLoaded', init, false);

function init(){
  canvas = document.querySelector('canvas');
  context = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  document.getElementById("splashScreen").style.display = "none";
  //splash.style.display = "block";
  //context.fillStyle = "white";
  //context.fillRect(20, 20, 20, 20);

}
  
