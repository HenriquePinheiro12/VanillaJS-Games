const $start = document.querySelector('.start')
const $score = document.querySelector('.score')
const $container = document.querySelector('.grid')

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
    
}

const changeSnakeDirection = e => {
    // Arrow left = 37 
    // Arrow up = 38
    // Arrow right = 39
    // Arrow down = 40
}

$start.addEventListener('click', startGame)
document.addEventListener('keyup', changeSnakeDirection)