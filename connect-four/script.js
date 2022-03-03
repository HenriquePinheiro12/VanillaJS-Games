const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
]

const $container = document.querySelector('.grid')
const $colorSwapper = $container.parentElement
const $currentPlayerDisplay = document.querySelector('.current-player')
const $result = document.querySelector('.result')
let currentPlayer = 1

// renders the squares in the board and returns the NodeList of elements
const renderBoard = () => {
    for(var i = 0; i<49; i++){
        const div = document.createElement('div')
        if(i > 41) div.classList.add('taken')
        $container.append(div)
    }
    return document.querySelectorAll('.grid div')
}
const $squares = renderBoard()

const handleClick = index => {
    // Unvalid plays
    if(!$squares[index + 7].classList.contains('taken') || $squares[index].classList.contains('taken')){
        $squares[index].classList.add('misclicked')
        setTimeout(() => $squares[index].classList.remove('misclicked'), 500)
        return
    }
        

    const squareClassToAdd = 
        currentPlayer === 1 ? 'player-one' : 
        currentPlayer === 2 ?  'player-two' : null;

    $squares[index].classList.add('taken', squareClassToAdd)
    
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    $currentPlayerDisplay.textContent = currentPlayer

    $colorSwapper.classList.toggle('current-player-one')
    $colorSwapper.classList.toggle('current-player-two')
    checkBoard()
}

const checkBoard = () => {
    // iterates over winigArrays checking if the board is won
    winningArrays.forEach(combination => {
        const [i1, i2, i3, i4] = combination
        if(
            $squares[i1].classList.contains('player-one') &&
            $squares[i2].classList.contains('player-one') &&
            $squares[i3].classList.contains('player-one') &&
            $squares[i4].classList.contains('player-one')
        ){
            $result.textContent = 'Player 1 won!'
            $result.classList.add('player-one')
            $result.classList.remove('player-two')
            createResetBtn()
        } else
        if(
            $squares[i1].classList.contains('player-two') &&
            $squares[i2].classList.contains('player-two') &&
            $squares[i3].classList.contains('player-two') &&
            $squares[i4].classList.contains('player-two')
        ){
            $result.textContent = 'Player 2 won!'
            $result.classList.add('player-two')
            $result.classList.remove('player-one')
            createResetBtn()
        }
    })
}

const createResetBtn = () => {
    const $container = document.querySelector('.content')
    const $button = document.createElement('a')
    $button.classList.add('reset')
    $button.setAttribute('href', './index.html')
    $button.textContent = 'Reset'
    $button.style['color'] = currentPlayer === 1 ? 'red' : 'blue';
    $button.style['border-color'] = currentPlayer === 1 ? 'red' : 'blue';
    $container.append($button)
}

$squares.forEach((square, index) => {
    square.addEventListener('click', e => handleClick(index))
})

// handleClick => set square
// check board => check winner