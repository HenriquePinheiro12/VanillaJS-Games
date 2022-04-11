const $start = document.querySelector('.start')
const $score = document.querySelector('.score')
const $container = document.querySelector('.grid')
const snake = {
    length : 3,
    direction : 1,
    speed : 500,
}
let applePosition;


// renders game board and return its children
const renderBoard = () => {
    for(var i = 0; i < 100; i++){
        const div = document.createElement('div')
        $container.append(div)
    }
    return $container.querySelectorAll('div')
}
const $squares = renderBoard();

const startGame = () => {
    snake.length = 3;
    snake.direction = 1;
    snake.speed = 500
    
    
}

const changeSnakeDirection = ({keyCode}) => {
    // Arrow left = 37 
    // Arrow up = 38
    // Arrow right = 39
    // Arrow down = 40
    if(keyCode > 40 || keyCode < 37) return

    switch(keyCode){
        case 37:
            snake.direction = -1
            break;
        case 38:
            snake.direction = -10
            break;
        case 39:
            snake.direction = 1
            break;
        case 40:
            snake.direction = 10
            break;
    }
}

$start.addEventListener('click', startGame)
document.addEventListener('keyup', changeSnakeDirection)