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
  setTimeout(function(){document.getElementById("splashScreen").style.display = "none";}, 3000);
 
}

