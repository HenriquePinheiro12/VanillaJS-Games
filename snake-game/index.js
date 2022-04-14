const $start = document.querySelector('.start')
const $score = document.querySelector('.score')
const $container = document.querySelector('.grid')
const snake = {
    length : 3, // score
    direction : 1,
    speed : 1000,
    body : [13, 12, 11],
    score : 0,
    colisioned : false
}
let apples = [];
let gameOver = false

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
    snake.direction = 1;
    snake.speed = 1000
    snake.body = [13, 12, 11]
    snake.score = 0
    snake.colisioned = false

    apples = []
    $squares.forEach(sqr => sqr.classList.remove('snake', 'apple', 'snake-head'))
    for(i of snake.body) $squares[i].classList.add('snake')
    $squares[snake.body[0]].classList.add('snake-head')

    setTimeout(move, snake.speed)
    setTimeout(generateApple, snake.speed * 1.5)
}

const move = () => {
    console.log(snake.speed)
    const {body, direction} = snake

    // check colision
    if(
        body[0] < 10 && direction === -10 ||
        (body[0] + 1) % 10 === 0 && direction === 1 ||
        body[0] >= 90 && direction === 10 ||
        body[0] % 10 == 0 && direction === -1  ||
        // handle snake body colision
        // snake.body[0] === snake.body[i] | i > 0
        body.includes(body[0] + direction)
    ) return handleColision()

    // moving
    const removedEl = body.pop()
    body.unshift(body[0] + direction)

    // rendering
    $squares[removedEl].classList.remove('snake')
    $squares[body[0]].classList.add('snake', 'snake-head')
    $squares[body[1]].classList.remove('snake-head')


    if(apples.includes(body[0])){
        // handle apple eat
        body.push(removedEl)
        apples.splice(apples.indexOf(body[0]), 1)
        $squares[body[0]].classList.remove('apple')
        snake.speed = 
            snake.speed > 700 ? 
            snake.speed * 0.7 : snake.speed > 200 ? 
            snake.speed * 0.8 : snake.speed > 150  ? 
            snake.speed * 0.95 : snake.speed // ends up speed at 150ms
        snake.score++
        $score.innerText = snake.score
    }
    
    setTimeout(move, snake.speed)
}

const generateApple = () => {
    // stop apple generation when crash
    if(snake.colisioned) return

    let newApple;
    do{
        newApple = Math.floor(Math.random() * 100)
    } while(snake.body.includes(newApple))

    apples.push(newApple)
    $squares[newApple].classList.add('apple')

    setTimeout(generateApple, snake.speed * 5)
}

const changeSnakeDirection = ({keyCode}) => {
    // Arrow left = 37 
    // Arrow up = 38
    // Arrow right = 39
    // Arrow down = 40
    if(keyCode > 40 || keyCode < 37) return

    const {direction} = snake

    switch(keyCode){
        case 37:
            if(direction === 1) return
            snake.direction = -1
            break;
        case 38:
            if(direction === 10) return
            snake.direction = -10
            break;
        case 39:
            if(direction === -1) return
            snake.direction = 1
            break;
        case 40:
            if(direction === -10) return
            snake.direction = 10
            break;
    }
}

const handleColision = () => {
    alert(`Game over! Score: ${snake.score}`)
    snake.colisioned = true
}

$start.addEventListener('click', startGame)
document.addEventListener('keyup', changeSnakeDirection)