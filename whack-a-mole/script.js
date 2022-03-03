const $squares = document.querySelectorAll('.square')
const $score = document.querySelector('.score')
const $timeLeft = document.querySelector('.time-left')

let count = 60;
let score = 0;

// references the id of the current square where the mole is. Used in whackMole
let currentSquareId;

const countDown = () => {
    count--;
    $timeLeft.textContent = count

    if(count === 0){ // ends up the game
        alert(`Game\´s over! Your score: ${score}`)
        clearInterval(moleTimer) //stops moles generating
        clearInterval(countTimer) //stops countdown
        createResetBtn()
    }
}; const countTimer = setInterval(countDown, 1000)

// generates randomly the mols
const showMole = () => {
    // removes the current mole
    $squares.forEach(square => square.classList.remove('mole'))
    
    // sets a new mole randomly
    const targetSquare = $squares[Math.floor(Math.random() * 9)] 
    targetSquare.classList.add('mole')

    currentSquareId = targetSquare.id
}; const moleTimer = setInterval(showMole, 500)

// hits the mol and increase the score
const whackMole = e => {
    if(e.target.id !== currentSquareId) return
    score++;
    $score.textContent = score
    currentSquareId = null
}; $squares.forEach(square => {
    square.addEventListener('mouseover', whackMole)
})

// creates a button to refresh when time´s over
const createResetBtn = () => {
    const $footer = document.querySelector('.footer')
    const button = document.createElement('a')
    button.classList.add('reset')
    button.textContent = 'reset';
    button.setAttribute('href', 'index.html')
    $footer.append(button)
}
