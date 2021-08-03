const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 10;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let velocityX = 0;
let velocityY = 0;

//game loop
function drawGame() {
  clearScreen();
  changeSnackPosition();
  drawSnake();
  setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "black";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnackPosition() {
  headX = headX + velocityX;
  headY = headY + velocityY;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  //up key code
  if (event.keyCode == 38) {
    velocityY = -1;
    velocityX = 0;
  }

  //down key code
  if (event.keyCode == 40) {
    velocityY = 1;
    velocityX = 0;
  }

  //left key code
  if (event.keyCode == 37) {
    velocityY = 0;
    velocityX = -1;
  }

   //right key code
   if (event.keyCode == 39) {
    velocityY = 0;
    velocityX = 1;
  }
}

drawGame();