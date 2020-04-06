const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

//GAME VARIABLES
const tile = 30;

const snake = {
  size: 3,
  body: [],
  direction: 'right',
  bodyColor: 'blue',
  headColor: 'green',
}

let newHead;

let won = false;

//CORE METHODS
startGame();
const loop = setInterval(update, 1000);

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

  won = false;
}

function update() {
  render();

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

  snake.body.pop();
  
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
}


