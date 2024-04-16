let canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const box = 20;
const canvasSize = 600;
let score = 0;
let candy = [];
let numCandy = 8;
let snake = [];
let d = 'RIGHT';
let gameSpeed = 150;
canvas.width = canvasSize;
canvas.height = canvasSize;

snake[0] = { x: Math.floor(canvasSize / 2 / box) * box, y: Math.floor(canvasSize / 2 / box) * box };

for (let i = 0; i < numCandy; i++) {
    candy.push({
        x: Math.floor(Math.random() * canvasSize / box) * box,
        y: Math.floor(Math.random() * canvasSize / box) * box
    });
}


document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') {
        d = 'LEFT';
    } else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    } else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGHT';
    } else if (event.keyCode == 40 && d != 'UP') {
        d = 'DOWN';
    }
}

function draw() {
    context.clearRect(0, 0, canvasSize, canvasSize);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? 'black' : 'grey';
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = 'red';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    for (let i = 0; i < candy.length; i++) {
        context.fillStyle = 'red';
        context.fillRect(candy[i].x, candy[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == 'LEFT') snakeX = (snakeX - box < 0) ? canvasSize - box : snakeX - box;
    if (d == 'UP') snakeY = (snakeY - box < 0) ? canvasSize - box : snakeY - box;
    if (d == 'RIGHT') snakeX = (snakeX + box >= canvasSize) ? 0 : snakeX + box;
    if (d == 'DOWN') snakeY = (snakeY + box >= canvasSize) ? 0 : snakeY + box;

    let ateCandy = false;

    for (let i = 0; i < candy.length; i++) {
      if (snakeX == candy[i].x && snakeY == candy[i].y) {
          score++;
          ateCandy = true;
          candy.splice(i, 1); // remove the eaten candy item
          candy.push({ // add a new candy item
              x: Math.floor(Math.random() * canvasSize / box) * box,
              y: Math.floor(Math.random() * canvasSize / box) * box
          });
          break;
      }
    }

    if (!ateCandy) {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX > canvasSize * box || snakeY > canvasSize * box || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    context.fillStyle = 'black';
    context.font = '20px Arial';
    context.fillText('Score: ' + score, box, box);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, gameSpeed);