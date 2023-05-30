/*****************************
 Part 1
 ****************************/

const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

/*****************************
 Part 2
 ****************************/

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false;

/*****************************
 Part 3
 ****************************/

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    isPlayer_O_Turn = false;
    cellElements.forEach(cell =>{
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
/*****************************
 Part 4
 ****************************/

function handleCellClick(e){
    const cell = e.target
    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

/*****************************
 Part 5
 ****************************/

 function endGame(draw){
    if (draw){
        winningMessageElement.innerText = "It's a draw!"
    } else{
        winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
 }

 /*****************************
 Part 6
 ****************************/

 function isDraw() {
    return [...cellElements].every(cell=> {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
    })
 }

 /*****************************
 Part 7
 ****************************/

 function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
 }

 function swapTurns(){
    isPlayer_O_Turn = !isPlayer_O_Turn
 }

 /*****************************
 Part 8
 ****************************/

 function setBoardHoverClass(){
    boardElement.classList.remove(PLAYER_X_CLASS)
    boardElement.classList.remove(PLAYER_O_CLASS)
    if(isPlayer_O_Turn){
        boardElement.classList.add(PLAYER_O_CLASS)
    } else{
        boardElement.classList.add(PLAYER_X_CLASS)
    }
 }

 /*****************************
 Part 8
 ****************************/

 function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
 }