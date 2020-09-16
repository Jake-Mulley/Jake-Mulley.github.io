let canvas;
let context;

// width and height of canvas
let canvasWidth;
let canvasHeight;

// boolean movement variables
let moveRight;
let moveDown;
let moveLeft;
let moveUp;

// interval
let interval_id;

// tile size to later be used for scaling
let tileSize = 16*3;

// loading all images
let rockImg = new Image();
rockImg.src = "images/rock.png";
let platformImg = new Image();
platformImg.src = "images/platform.png";
let charRight = new Image();
charRight.src = "images/charRight.png";
let charLeft = new Image();
charLeft.src = "images/charLeft.png";
let background = new Image();
background.src = "images/background.png";

let charUpLeft = new Image();
charUpLeft.src = "images/charUpLeft.png";
let charUpRight = new Image();
charUpRight.src = "images/charUpRight.png";
let coinUp = new Image();
coinUp.src = "images/coinUp.png";
let coinDown = new Image();
coinDown.src = "images/coinDown.png";

let enemyLeft = new Image();
enemyLeft.src = "images/enemyLeft.png";
let enemyRight = new Image();
enemyRight.src = "images/enemyRight.png";

let keyOne = new Image();
keyOne.src = "images/keyOne.png";
let keyTwo = new Image();
keyTwo.src = "images/keyTwo.png";
let door = new Image();
door.src = "images/door.png";

let youDied = new Image();
youDied.src = "images/youDied.png";


let coinImg = coinDown;
// player
let player = {
    x : tileSize*6,
    y : tileSize*9,
    previousX: 0,
    previousY: 0,
    velocityX: 0,
    velocityY: 0,
    hop: false,
    width : tileSize,
    height : tileSize,
    charImg : charRight
}
// enemy
let enemyOne = {
    x : tileSize*7,
    y : tileSize*10,
    velocityX: 5,
    velocityY: 0,
    width : tileSize,
    height : tileSize,
    turn : 0,
    img : enemyLeft
};
let enemyTwo = {
    x : tileSize*29,
    y : tileSize*8,
    velocityX: 5,
    velocityY: 0,
    width : tileSize,
    height : tileSize,
    turn : 0,
    img : enemyLeft
};

// movement of player used in translate function
let movement = 0


// check with static vars for static object

let map = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 4, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 2, 2, 2, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
           1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
           1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

let mapColumns = 64;
let mapRows = 12;
let mapLength = map.length;

let mapEnd = tileSize * mapColumns;
let mapStart = 0

let randomNumber;

let direction;

let backgroundSound;
backgroundSound = new Audio("");
backgroundSound.src = "audio/backgroundSound.mp3";
backgroundSound.volume = 0.04;

let left;
let right;
let up;
let down;

// how many coins the player has collected per round
let coinCount = 0;
// how many keys the player has collected per round
let keyCount = 0;

let tileX = Math.floor((player.x + player.width) / tileSize);

let tileY = Math.floor((player.y + player.height) / tileSize);

// what tile the player is in
let tileNum = tileY*64 + tileX;

let keyImg = keyOne;

let youDiedCountDown = 0;

let score = 0;
let time = 0;
let userName;
let request;

let timeElement;
let timeText;

let coinElement;
let coinText;

let keysElement;
let keysText;

let lastScore;
let scoreText;

document.addEventListener('DOMContentLoaded', init, false);


// Content loaded event listener

// initiate function
function init() {

    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    context.save();

    userName = document.getElementById('name').value;
    // canvas height and width
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    timeElement = document.querySelector('#time');
    timeText = document.createTextNode(time);
    timeElement.appendChild(timeText);

    coinElement = document.querySelector('#coins');
    coinText = document.createTextNode(coinCount);
    coinElement.appendChild(coinText);

    keysElement = document.querySelector('#keys');
    keysText = document.createTextNode(keyCount);
    keysElement.appendChild(keysText);

    lastScore = document.querySelector('#score');
    scoreText = document.createTextNode(score);
    lastScore.appendChild(scoreText);

    window.addEventListener('keydown', activate, false);
    window.addEventListener('keyup', deactivate, false);

    // interval every 66 milliseconds
    interval_id = window.setInterval(draw, 66);
}
function reset(){
   player = {
        x : tileSize*6,
        y : tileSize*9,
        previousX: 0,
        previousY: 0,
        velocityX: 0,
        velocityY: 0,
        hop: false,
        width : tileSize,
        height : tileSize,
        charImg : charRight
    };
    keyCount = 0;
    coinCount = 0;
    score = 0;
    time = 0;
    // reset all items once died
    map[mapColumns*2+12] = map[mapColumns*2+28] = map[mapColumns*2+29] = map[mapColumns*3+28] = map[mapColumns*3+29] = 4;
    map[mapColumns*4+3] = map[mapColumns*5+3] = map[mapColumns*6+8] = map[mapColumns*6+9] =  map[mapColumns*8+14] = map[mapColumns*8+15] = 4;
    map[mapColumns*5+50] = map[mapColumns*5+49] = 4;
    map[mapColumns*3+30] = map[mapColumns*5+4] = map[mapColumns*7+55] = 5;
    map[637] = 0;
    context.restore();
    context.save();
}
function died(){
    reset()
    context.drawImage(youDied, tileSize*6, tileSize*6, tileSize*10, tileSize*5);
    youDiedCountDown = 40;
}
function finished(){
    score = 320 - (time / coinCount);
    scoreText.nodeValue = Math.floor(score);
    let url = 'updateScore.py?score=' + Math.floor(score) + '&name=' + userName;
    request = new XMLHttpRequest();
    request.addEventListener('readystatechange', handleResponse, false);
    request.open('GET', url, true);
    request.send(null);
    reset()
}
function handleResponse() {
    if (request.readyState === 4) {
        if (request.status === 200) {
            console.log(request.responseText);
            if (request.responseText.trim() === 'success') {
                console.log('success')
            }else{
                console.log('fail')
            }
        }
    }
}
function drawMap() {
    for (let index = 0; index < mapLength; index += 1){
        // number or name of the image file to add to the map
        let block = map[index];

        let mapBlockX = (index % mapColumns) * tileSize;
        let mapBlockY = (Math.floor(index / mapColumns)) * tileSize;
        if (block === 1){
               context.drawImage(rockImg, mapBlockX, mapBlockY, tileSize, tileSize);
        }else if (block === 2){

               context.drawImage(platformImg, mapBlockX, mapBlockY, tileSize, tileSize);
        }else if (block === 4){
            if (coinImg === coinDown){
                coinImg = coinUp
            }else{
                coinImg = coinDown
            }
            context.drawImage(coinImg, mapBlockX, mapBlockY, tileSize, tileSize);
        }else if (block === 5){
            if (keyImg === keyOne){
                keyImg = keyTwo;
            }else{
                keyImg = keyOne;
            }
            context.drawImage(keyImg, mapBlockX, mapBlockY, tileSize, tileSize);
        }else if (block === 6){
            context.drawImage(door, mapBlockX, mapBlockY, tileSize, tileSize);
        }
    }
}
function writeCounters(){
    timeText.nodeValue = time;
    coinText.nodeValue = coinCount;
    keysText.nodeValue = keyCount;

}
function draw() {
    context.imageSmoothingEnabled = false;
    // canvas point of origin to be player
    context.clearRect(player.x-6*tileSize, 0, mapColumns*tileSize, mapRows*tileSize);
    context.fillRect(-5*tileSize, 0, tileSize*mapColumns+canvasWidth, tileSize*mapRows)
    context.drawImage(background, 0, 0, tileSize*mapColumns, tileSize*mapRows);
    writeCounters()
    time += 1;
    drawMap()

    context.drawImage(player.charImg, player.x, player.y, player.width, player.height);
    context.drawImage(enemyOne.img, enemyOne.x, enemyOne.y, enemyOne.width, enemyOne.height)
    context.drawImage(enemyTwo.img, enemyTwo.x, enemyTwo.y, enemyTwo.width, enemyTwo.height)
    if (youDiedCountDown > 0){
        context.drawImage(youDied, tileSize*6, tileSize*6, tileSize*10, tileSize*5);
        youDiedCountDown -= 1;
    }
    if (moveRight) {
        player.velocityX += tileSize/10;
        player.charImg = charRight;
        backgroundSound.play();
    }if (moveDown) {
        player.y += 0;
    }if (moveUp && player.hop === false) {
        player.velocityY -= tileSize*1
        moveUp = false;
        player.hop = true;
        backgroundSound.play();
    }if (moveLeft) {
        player.velocityX -= tileSize/10;
        player.charImg = charLeft;
        backgroundSound.play();

    }
    if (player.velocityY < 0){
        if(player.velocityX < 0){
            player.charImg = charUpLeft;
        }else{
            player.charImg = charUpRight;
        }
    }

    // enemy path
    enemyOne.turn += 1;
    if (enemyOne.turn % 150 === 0){
        enemyOne.velocityX *= -1
    }
    if (enemyOne.velocityX > 0){
        enemyOne.img = enemyRight;
    }else{
        enemyOne.img = enemyLeft;
    }
    enemyOne.x += enemyOne.velocityX

    enemyTwo.turn += 1;
    if (enemyTwo.turn % 70 === 0){
        enemyTwo.velocityX *= -1
    }
    if (enemyTwo.velocityX > 0){
        enemyTwo.img = enemyRight;
    }else{
        enemyTwo.img = enemyLeft;
    }
    enemyTwo.x += enemyTwo.velocityX


    // saving previous co-ordinates
    player.previousX = player.x
    player.previousY = player.y

    // adding friction to the velocity
    player.velocityX = player.velocityX * 0.85
    player.velocityY = player.velocityY * 0.85

    // gravity
    player.velocityY += tileSize/18


    // move x based on velocity
    player.x = player.x + player.velocityX;
    player.y = player.y + player.velocityY;

    // runs into enemy restart game
    if (player.x + player.width >= enemyOne.x && !(player.x + player.width > enemyOne.x + enemyOne.width) && player.y + player.height >= enemyOne.y){
        died()
    }else if (player.x + player.width >= enemyTwo.x && !(player.x + player.width > enemyTwo.x + enemyTwo.width) && player.y + player.height >= enemyTwo.y){
        died()
    }

    // moving down
    if (player.velocityY > 0){
        // co-ordinates
        tileX = Math.floor((player.x + player.width)/ tileSize);
        tileY = Math.floor((player.y + player.height) / tileSize);
        tileNum = (tileY)*64 + tileX;

        if ((map[tileNum] != 0 || map[tileNum - 1] != 0) && (map[tileNum] != 4 || map[tileNum - 1] != 4)){
            collisionD()
        }
    }
    // moving up
    if (player.velocityY < 0){
        tileX = Math.floor((player.x + player.width )/ tileSize);
        tileY = Math.floor((player.y) / tileSize);
        tileNum = tileY*64 + tileX;

        if (map[tileNum] != 0 || map[tileNum - 1] != 0){
            collisionU()
        }
    }
    // moving right
    if (player.velocityX > 0){
        tileX = Math.floor((player.x + player.width) / tileSize);
        tileY = Math.floor((player.y + player.height)/ tileSize);
        tileNum = tileY*64 + tileX;
        if (map[tileNum] != 0 && map[tileNum] != 4 && map[tileNum] != 5 && map[tileNum] != 6){
            collisionR()
        }
        if (map[tileNum] === 4){
            map[tileNum] = 0
            coinCount += 1
        }else if (map[tileNum] === 5){
            map[tileNum] = 0
            keyCount += 1
        }else if (map[tileNum] === 6){
            finished()
        }


    }
    // moving left
    if (player.velocityX < 0){
        tileX = Math.floor(player.x/ tileSize);
        tileY = Math.floor((player.y + tileSize)/ tileSize);
        tileNum = tileY*64 + tileX;
        if (map[tileNum] != 0 && map[tileNum] != 4 && map[tileNum] != 5 && map[tileNum] != 6){
            collisionL()
        }
        if (map[tileNum] === 4){
            map[tileNum] = 0
            coinCount += 1
        }else if (map[tileNum] === 5){
            map[tileNum] = 0
            keyCount += 1
        }else if (map[tileNum] === 6){
            finished()
        }
    }
    if (keyCount === 3){
        map[637] = 6;
    }
    if (player.x <= 0){
        player.x = previousX
        player.velocityX = 0
    }else if (player.x >= mapEnd - tileSize){
        player.velocityX = 0
        player.x = mapEnd - tileSize
    }
    context.translate(-player.velocityX, 0);
}


function collisionR(){
    left = tileX * tileSize;
    if (player.x + player.width > left) {
        player.velocityX = 0;
        player.x = player.previousX

    }
}

function collisionL(){
    right = (tileX * tileSize) + tileSize;

    if (player.x < right) {
        player.velocityX = 0;
        player.x = player.previousX
    }
}

function collisionD(){
    down = tileY * tileSize;
    if (player.y + player.height > down && player.previousY <= down) {
        player.velocityY = 0;
        player.y = player.previousY
        player.hop = false
    }
}

function collisionU(){
    up = tileY * tileSize;
    if (player.y < up && player.previousY >= up) {
        player.velocityY = 0;
        player.y = player.previousY
    }
}



function activate(event){
    let keyCode = event.keyCode;
    if (keyCode === 37){
        moveLeft = true;
        moveRight = false;
        moveDown = false;
    }else if (keyCode === 38){
        moveUp = true;
    }else if (keyCode === 39){
        moveRight = true;
        moveLeft = false;
        moveDown = false;
    }else if (keyCode === 40){
        moveDown = true;
        moveRight = false;
        moveLeft = false;
    }
}

function deactivate(event){
    let keyCode = event.keyCode;
    if (keyCode === 38){
        moveUp = false;
    }else if (keyCode === 39){
        moveRight = false;
    }else if (keyCode === 40){
        moveDown = false;
    }else if (keyCode === 37){
        moveLeft = false;
    }
}


function getRandomNumber(min, max){
    randomNumber =  Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber
}