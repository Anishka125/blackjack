let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

let sum = 0
let cards = []
let hasBlackjack = false
let isAlive = false
let message = ""

// Player object
let player = {
    name: "POINTS",
    chips: 50,     // 🎯 starting points
    bet: 10
}

// Initial UI update
updatePlayer()

function updatePlayer() {
    playerEl.textContent = `${player.name}: ${player.chips}`
}

function startGame() {
    if (player.chips < player.bet) {
        messageEl.textContent = "Not enough points to play!"
        return
    }

    resetRound()
    isAlive = true
    player.chips -= player.bet   // place bet
    updatePlayer()

    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    renderGame()
}

function resetRound() {
    cards = []
    sum = 0
    hasBlackjack = false
    isAlive = false
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) return 10
    if (randomNumber === 1) return 11
    return randomNumber
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum

    if (sum < 21) {
        message = "Do you want a new card?"
    } 
    else if (sum === 21 && !hasBlackjack) {
        message = "🎉 Blackjack! You win!"
        hasBlackjack = true
        player.chips += player.bet * 2   // 🔥 reward
        updatePlayer()
    } 
    else if (sum > 21) {
        message = "💥 You are out!"
        isAlive = false
    }

    messageEl.textContent = message
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        let card = getRandomCard()
        cards.push(card)
        sum += card
        renderGame()
    }
}

function resetGame() {
    resetRound()
    cardsEl.textContent = "Cards:"
    sumEl.textContent = "Sum:"
    messageEl.textContent = "Game reset. Click START."
}
