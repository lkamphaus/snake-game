const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 8;

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

let score = 0;

//game loop
function drawGame() {
  changeSnakePosition();

  let result = gameOver();
  if (result) {
    return;
  }

  clearScreen();

  checkFoodCollision();
  drawFood();
  drawSnake();

  drawScore();

  if (score > 2) {
    speed = 11;
  }

  if (score > 5) {
    speed = 15;
  }

  setTimeout(drawGame, 1000 / speed);
}

function gameOver() {
  let gameOver = false;

  if (velocityY === 0 && velocityX === 0) {
    return false;
  }

  //borders
  if (headX < 0) {
    gameOver = true;
  } else if (headX >= tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY >= tileCount) {
    gameOver = true;
  }

  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }


  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "12px Roboto";
  ctx.fillText("Score " + score, canvas.width - 50, 10)
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

function changeSnakePosition() {
  headX = headX + velocityX;
  headY = headY + velocityY;
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function checkFoodCollision() {
  if (foodX === headX && foodY === headY) {
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    tailLength++
    score++
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