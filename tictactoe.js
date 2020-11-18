
const playerRedDisplay = document.getElementById('player1Display')
const playerBlueDisplay = document.getElementById('player2Display')

const newGameButton = document.getElementById('new-game-button')

const boxes = Array.from(document.querySelectorAll('[data-box]'))

let winningMessage = document.createTextNode(' IS WINNER!')
let drawMessage = document.createTextNode('DRAW!')

let playerRedWin = false
let playerBlueWin = false

let boxIndexRed = []
let boxIndexBlue = []

const winningCombinations = {

    columnFirst: [0, 3, 6],
    columnSecond: [1, 4, 7],
    columnThird: [2, 5, 8],
    rowFirst: [0, 1, 2],
    rowSecond: [3, 4, 5],
    rowThird: [6, 7, 8],
    diagonalOne: [0, 4, 8],
    diagonalTwo: [2, 4, 6]
}

const box = {
    red: [],
    blue: []
}

function restartGame(e) {

    document.querySelectorAll('.one-panel')
        .forEach(box => {
            box.classList.remove('hide')
            box.classList.remove('blue')
            box.classList.remove('red')
        })
    e.target.classList.add('hide')
    box.blue = []
    box.red = []
    boxIndexRed = []
    boxIndexBlue = []
    clearPlayerData()
}

function stopGame() {

    document.querySelectorAll('.one-panel')
        .forEach(box => {
            box.classList.add('hide')
        })
    newGameButton.classList.remove('hide')
}

function checkWinner() {
    for (const combo in winningCombinations) {
        compareBoxWithCombination(box.red, winningCombinations[combo])
        compareBoxWithCombination(box.blue, winningCombinations[combo])
    }
}

function checkDraw() {

    if (playerBlueWin === true || playerRedWin === true) { return }

    else {
        const check = Array.from(document.querySelectorAll('.one-panel'))
            .every(box => box.classList.contains('blue') || box.classList.contains('red'))
        if (check) {
            declareDraw()
            stopGame()
        }
        else return
    }
}


function declareWinner(player) {
    winningMessage.textContent = ' IS WINNER!'
    player.appendChild(winningMessage)
    player.parentElement.style.backgroundColor = 'green'
    player.parentElement.style.borderRadius = '25px'

}

function declareDraw() {
    drawMessage.textContent = 'DRAW!'
    playerRedDisplay.classList.add('hide')
    playerBlueDisplay.classList.add('hide')
    document.getElementById('player-on-move').appendChild(drawMessage)
}

function clearPlayerData() {

    drawMessage.textContent = ''
    winningMessage.textContent = ''
    if (playerBlueDisplay.classList.contains('hide')) {
        playerRedDisplay.classList.remove('hide')
    }
    if (playerRedDisplay.classList.contains('hide')) {
        playerRedDisplay.classList.remove('hide')
        playerBlueDisplay.classList.add('hide')
    }
    playerRedDisplay.classList.remove('hide')
    playerRedDisplay.parentElement.style.backgroundColor = ''
    playerRedDisplay.parentElement.style.borderRadius = ''
    playerBlueDisplay.parentElement.style.backgroundColor = ''
    playerBlueDisplay.parentElement.style.borderRadius = ''
    playerBlueWin = false
    playerRedWin = false

}

function compareBoxWithCombination(array_box, array_comb) {
    if (array_comb.every(element => array_box.includes(element))) {
        if (playerRedDisplay.classList.contains('hide')) {
            playerRedWin = true
            switchHide(playerBlueDisplay, playerRedDisplay)
            declareWinner(playerRedDisplay)
            stopGame()
        }
        else {
            playerBlueWin = true
            switchHide(playerRedDisplay, playerBlueDisplay)
            declareWinner(playerBlueDisplay)
            stopGame()
        }
    }
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function fillBoxIndex() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].classList.contains('red')) {
            boxIndexRed.push(i)
        }
        if (boxes[i].classList.contains('blue')) {
            boxIndexBlue.push(i)
        }
    }
    box.red = boxIndexRed.filter(onlyUnique)
    box.blue = boxIndexBlue.filter(onlyUnique)
}


function switchHide(player1, player2) {
    player1.classList.add('hide')
    player2.classList.remove('hide')
    fillBoxIndex()

}

function panelClick(clickedPanel) {

    if (checkPanelDoubleClick(clickedPanel)) { return }
    else {
        if (playerBlueDisplay.classList.contains('hide')) {
            clickedPanel.classList.add('red')
            switchHide(playerRedDisplay, playerBlueDisplay)
        }
        else {
            clickedPanel.classList.add('blue')
            switchHide(playerBlueDisplay, playerRedDisplay)
        }

        checkWinner()
        checkDraw()
    }
}

function checkPanelDoubleClick(panel) {
    if (panel.classList.contains('red') || panel.classList.contains('blue'))
        return true

}

function init() {
    document.querySelectorAll('.one-panel')
        .forEach(panel => {
            panel.addEventListener('click', (e) => {
                panelClick(e.target)
            })
        })
    newGameButton.addEventListener('click', restartGame)
}

init()

