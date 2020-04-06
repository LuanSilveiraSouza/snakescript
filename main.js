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

let won = false;

//CORE METHODS

startGame();
const loop = setInterval(update, 1000);

function startGame() {
  snake.size = 3;
  snake.direction = 'right';
  snake.body = [];
  for (let i = 3; i > 0; i--) {
    snake.body.push({
      x: (tile * i),
      y: tile,
    });
  }

  won = false;
}

function update() {
  let previousElement;
  let aux;
  snake.body.forEach((element, index) => {
    if (index === 0) {
      previousElement = element;
      switch(snake.direction) {
        case 'right': 
          if((element.x + tile) === canvas.width) {
            element.x = 0;
          } else {
            element.x += tile;
          }
          break;
        case 'left': 
          if((element.x) === 0) {
            element.x = canvas.width - tile;
          } else {
            element.x -= tile;
          }
          break;
        case 'up': 
          if((element.y) === 0) {
            element.y = canvas.height - tile;
          } else {
            element.y -= tile;
          }
          break;
        case 'down': 
          if((element.y + tile) === canvas.height) {
            element.y = 0;
          } else {
            element.y += tile;
          }
          break;
      }
    } else{
      aux = element;
      element = previousElement;
      previousElement = aux;
    }
  });
  console.log(snake.body);

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


