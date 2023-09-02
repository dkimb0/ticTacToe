//Gameboard module object:

//displayController module obj

//player factory object:
const personFactory = (name) => {
    return {name};
}
//game flow control object:
//




//initialize
let gameBoard = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
const gameStatus = {
    currentPlayer: 1,
    winState: false,
    tieState: false,
}

//player creation
function createPlayer(name){
    return {name};
}

let player = 1;

//display
function updateBoard(gameBoard){
    for (let i = 0; i < 9; i++){
        document.getElementById(`${i+1}`).textContent = gameBoard[i];
    }
}

updateBoard(gameBoard);


//make a move
//also changes gameBoard
function makeMove(player, gameBoard, event){
    if (player === 1  && gameBoard[event.target.id - 1] === ' '){
        gameBoard[event.target.id - 1] = 'x';
        player = 2;
    }else if (player === 2 && gameBoard[event.target.id - 1] === ' '){
        gameBoard[event.target.id - 1] = 'o';
        player = 1;
    }else{
        alert('Pick an empty box');
    }
    return player;
}

//click initialize
for (i = 0; i < 9; i++){
    document.querySelectorAll('.box')[i].addEventListener('click', function (event){
        player = makeMove(player, gameBoard, event);
        updateBoard(gameBoard);
    });
}

//check if game over
// function winCheck(gameBoard){
    
// }


function checkRow(gameBoard){
    for(let i = 0; i < 9; i+=3){
        if (gameBoard[i] === gameBoard[i+1] &&
            gameBoard[i] === gameBoard[i+2] &&
            gameBoard[i] !== ' '){
            console.log('row three in a row, ' + gameBoard[i]);
            return gameBoard[i];
        }
    }
    return false;
}

function checkCol(gameBoard){
    for (let i=0; i<3; i++){
        if (gameBoard[i] === gameBoard[i+3] &&
            gameBoard[i] === gameBoard[i+6] &&
            gameBoard[i] !== ' '){
            console.log('column three in a row, ' + gameBoard[i]);
            return gameboard[i];
        }
    }
    return false;
}

function checkDiag(gameBoard){
    if (gameBoard[0] === gameBoard[4] &&
        gameBoard[0] === gameBoard[8] &&
        gameBoard[0] !== ' '){
        console.log('diagonal three in a row, ' + gameBoard[0]);
        return gameBoard[0];
    }else if
        (gameBoard[2] === gameBoard[4] &&
         gameBoard[2] === gameBoard[6] &&
         gameBoard[2] !== ' '){
         console.log('diagonal three in a row, ' + gameBoard[2]);
         return gameBoard[2];
    }else{
        return false;
    }
}

function checkOpenMoves(gameBoard){
    return gameBoard.filter(value => value.includes(' ')).length;
}

function checkTie(gameBoard){
    if (checkOpenMoves(gameBoard) === 0 &&
        !checkDiag(gameBoard) &&
        !checkRow(gameBoard) &&
        !checkCol(gameBoard)){
            console.log('tie!');
        }

}



// const gameBoardObj = (() => {
//     'use strict';
//     const gameBoardInit = () => {
//         
//     }

//     return gameBoard;

// })();

// const displayController = (() => {
//     'use strict';

//     const _displayUpdate = (gameBoard, position, player) => {
        
//         if (player === 1 && gameBoard[position] === '-'){
//             gameBoard[position] = 'x';
//         }else if (player === 2 && gameBoard[position] === '-'){
//             gameBoard[position] = 'o';
//         }

//         return gameBoard;
//     }

//     const _displayHTML = () =>{
//         document.getElementById("gameBoard").innerHTML = gameBoard;
//     }    

//     return {
//         publicMethod: function(){
//             _displayUpdate(gameBoard, position, player);
//     }
// };

// })();