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
  splash  = document.getElementById("splashScreen");
  splash.style.display = "block";
  context.fillStyle = white;
  context.fillRect(20, 20, 20, 20);
  interval_id = window.setInterval(draw, 105);
}
  
