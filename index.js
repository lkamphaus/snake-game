const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 10;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let foodX = 5;
let foodY = 5;

let velocityX = 0;
let velocityY = 0;

//game loop
function drawGame() {
  clearScreen();
  changeSnackPosition();

  checkFoodCollision();

  drawFood();
  drawSnake();
  setTimeout(drawGame, 1000 / speed);
}

function clearScreen() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {

  ctx.fillStyle = "yellow";

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY));

  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "black";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnackPosition() {
  headX = headX + velocityX;
  headY = headY + velocityY;
}

function drawFood() {
  ctx.fillStyle = "brown";
  ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function checkFoodCollision() {
  if (foodX === headX && foodY === headY) {
    tailLength++
  }
}

checkFoodCollision();

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
  //up key code
  if (event.keyCode === 38) {
    //prevent two directions
    if (velocityY === 1) {
      return;
    }
    velocityY = -1;
    velocityX = 0;
  }

  //down key code
  if (event.keyCode === 40) {
    //prevent two directions
    if (velocityY === -1) {
      return;
    }
    velocityY = 1;
    velocityX = 0;
  }

  //left key code
  if (event.keyCode === 37) {
    //prevent two directions
    if (velocityX === -1) {
      return;
    }
    velocityY = 0;
    velocityX = -1;
  }

   //right key code
   if (event.keyCode === 39) {
    //prevent two directions
    if (velocityX === 1) {
      return;
    }
    velocityY = 0;
    velocityX = 1;
  }
}

drawGame();