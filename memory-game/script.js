const cards = [
    {
        name: 'cheeseburger',
        src: 'cheeseburger.png'
    },
    {
        name: 'fries',
        src: 'fries.png'
    },
    {
        name: 'hotdog',
        src: 'hotdog.png'
    }, 
    {
        name: 'ice-cream',
        src: 'ice-cream.png'
    },
    {
        name: 'milkshake',
        src: 'milkshake.png'
    },
    {
        name: 'pizza',
        src: 'pizza.png'
    },  
]; cards.splice(0, 0,...cards) // doubles the array
cards.sort((a, b) => Math.random() - 0.5)
const chosenCards = [];
const cardsWon = [];

const container = document.querySelector('.grid-container')
const score = document.querySelector('.score')
const total = document.querySelector('.total')

const renderBoard = () => {
    console.log(cardsWon)
    cards.forEach((card, index) => {
        const cardContainer = document.createElement('div')
        const cardImage = document.createElement('img')
        cardImage.setAttribute('src', './images/blank.png')
        cardImage.setAttribute('data-name', card.name)
        cardImage.setAttribute('data-id', index)
        cardImage.addEventListener('click', flipCard)

        cardContainer.append(cardImage)
        container.append(cardContainer)
    })
}

const flipCard = ({target}) => {
    const {id, name} = target.dataset
    target.setAttribute('src', `./images/${cards[id].src}`)
    chosenCards.push({id: id, name: name})

    if(chosenCards.length === 2)
        checkForMatch()
}

const checkForMatch = () => {
    const cards = container.querySelectorAll('img')
    // the list of elements is syncronized with the array, so I can handle it this way
    
    const [{id: chosen1, name: name1}, {id: chosen2, name: name2}] = chosenCards
    if(chosen1 === chosen2){
        cards[chosen1].setAttribute('src', `./images/blank.png`)
        cards[chosen2].setAttribute('src', `./images/blank.png`)
        chosenCards.splice(0, chosenCards.length)
        return 
    }
    if(name1 !== name2){
        setTimeout(()=> {
            cards[chosen1].setAttribute('src', './images/blank.png')
            cards[chosen2].setAttribute('src', './images/blank.png')
            chosenCards.splice(0, chosenCards.length)
        }, 1500)
        return
    }
    if(name1 === name2){
        setTimeout(() => {
            cards[chosen1].setAttribute('src', './images/white.png')
            cards[chosen2].setAttribute('src', './images/white.png')
            chosenCards.splice(0, chosenCards.length)
            cardsWon.push(name1)
            score.innerText = cardsWon.length
            if(cardsWon.length === cards.length / 2){
                createRefresh()
                alert('Congratulations! You Won the game!')
            }
        }, 1500)
    }
}

const createRefresh = () => {
    const refresh = document.createElement('a')
    refresh.classList.add('refresh')
    refresh.setAttribute('href', 'index.html')
    refresh.innerText = 'Refresh'
    total.append(refresh)
}

window.addEventListener('load', renderBoard)

/*
 LOGIC

 

 - Data
 . array for each card twice [{name, src}]
 . array for the current chosen cards {name}
 . array for the found cards

    (new concept!)
    . use arrays for manipulating states of the app


 - Building the boards (rendering)
 . sorts randomly the array
 . renders, inside the container, a block for each element of the array containig data-name={cardName}  | data-id={index} | src
 . addEventListenner -> flipCard()

 - Flipping the card (1st click)
 . gets the id of the element (only to find its relative card element in the array)
 . pushes the chosenCards array (refers with the id of the element)
 . sets the image in the element
 . if chosenCards.length === 2 -> checkForMatch
 
 - Checking for match (2nd click)
 . checks: same card | different | match
 . different / same -> reset array and blank images
 . match -> push foundCards, removeEventListenners, white images
 . resets chosenCards
 . all found -> ends the game
*/