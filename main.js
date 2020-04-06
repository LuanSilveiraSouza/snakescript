const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const points = document.getElementById('points');

//GAME VARIABLES
const tile = 30;

const food = {
  x: 0,
  y: 0,
  color: 'red',
};

const snake = {
  body: [],
  direction: 'right',
  bodyColor: 'blue',
  headColor: 'green',
}

let newHead;

let won = false;

//CORE METHODS
startGame();
const loop = setInterval(update, 150);

function startGame() {
  snake.size = 3;
  snake.direction = 'right';
  snake.body = [];
  for (let i = 3; i > 0; i--) {
    newHead = {
      x: (tile * i),
      y: tile,
    }
    snake.body.push(newHead);
  }

  randomizeFood();

  won = false;

  document.addEventListener('keydown', keyEvent);
}

function update() {
  render();

  points.innerHTML = 'Points: '+ snake.body.length;

  newHead = {...snake.body[0]};
  switch(snake.direction) {
    case 'right': 
      if((newHead.x + tile) === canvas.width) {
        newHead.x = 0;
      } else {
        newHead.x += tile;
      }
      break;
    case 'left': 
      if((newHead.x) === 0) {
        newHead.x = canvas.width - tile;
      } else {
        newHead.x -= tile;
      }
      break;
    case 'up': 
      if((newHead.y) === 0) {
        newHead.y = canvas.height - tile;
      } else {
        newHead.y -= tile;
      }
      break;
    case 'down': 
      if((newHead.y + tile) === canvas.height) {
        newHead.y = 0;
      } else {
        newHead.y += tile;
      }
      break;
  }

  if (newHead.x !== food.x || newHead.y !== food.y) {
    snake.body.pop();
  } else {
    randomizeFood();
  }
  snake.body.unshift(newHead);
} 

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.body.forEach((element, index) => {
    context.fillStyle = snake.bodyColor;
    if(index === 0) {
      context.fillStyle = snake.headColor;  
    }

    context.fillRect(element.x, element.y, tile, tile);

    context.fillStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(element.x, element.y, tile - 1, tile - 1);
  });

  context.fillStyle = food.color;
  context.fillRect(food.x, food.y, tile, tile);

  context.fillStyle = 'black';
  context.lineWidth = 1;
  context.strokeRect(food.x, food.y, tile - 1, tile - 1);
}

function keyEvent() {
  if (event.keyCode == 65 && snake.direction !== 'right') {
    snake.direction = 'left';
  }
  if (event.keyCode == 68 && snake.direction !== 'left') {
    snake.direction = 'right';
  }
  if (event.keyCode == 87 && snake.direction !== 'down') {
    snake.direction = 'up';
  }
  if (event.keyCode == 83 && snake.direction !== 'up') {
    snake.direction = 'down';
  }
}

function randomizeFood() {
  food.x = Math.floor(Math.random() * canvas.width / tile) * tile;
  food.y = Math.floor(Math.random() * canvas.height / tile) * tile;
}