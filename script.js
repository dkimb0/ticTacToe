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
let counter = 1;




//display
function updateDisplay(gameBoard){
    for (let i = 0; i < 9; i++){
        document.getElementById(`${i+1}`).textContent = gameBoard[i];
    }
}

updateDisplay(gameBoard);


//make a move
//also changes gameBoard
function makeMove(counter, gameBoard, event){
    
    checkMove(gameBoard, event.target.id-1)
    if (counter%2 === 1  && checkMove(gameBoard, event.target.id-1)){
        gameBoard[event.target.id - 1] = 'x';
    }else if (counter%2 === 0 && checkMove(gameBoard, event.target.id-1)){
        gameBoard[event.target.id - 1] = 'o';
    }

    winCheck(gameBoard);
    counter++;

    return counter;
}

function checkMove(gameBoard, cell){
    if (gameBoard[cell] === ' '){
        return true;
    }
}


//click initialize
for (i = 0; i < 9; i++){
    document.querySelectorAll('.box')[i].addEventListener('click', function (event){
        counter = makeMove(counter, gameBoard, event);
        updateDisplay(gameBoard);
    });
}

//check if game over
function winCheck(gameBoard){
    if (checkRow(gameBoard) || checkCol(gameBoard) || checkDiag(gameBoard)){
        if (counter%2 === 1){
            console.log('x won');
        }else{
            console.log('o won');
        }
    }else if (checkOpenMoves(gameBoard) === 0){
        console.log('tie');
    }
}


function checkRow(gameBoard){
    for(let i = 0; i < 9; i+=3){
        if (gameBoard[i] === gameBoard[i+1] &&
            gameBoard[i] === gameBoard[i+2] &&
            gameBoard[i] !== ' '){

            return true;
        }
    }
    return false;
}

function checkCol(gameBoard){
    for (let i=0; i<3; i++){
        if (gameBoard[i] === gameBoard[i+3] &&
            gameBoard[i] === gameBoard[i+6] &&
            gameBoard[i] !== ' '){

            return true;
        }
    }
    return false;
}

function checkDiag(gameBoard){
    if (gameBoard[0] === gameBoard[4] &&
        gameBoard[0] === gameBoard[8] &&
        gameBoard[0] !== ' '){

        return true;
    }else if
        (gameBoard[2] === gameBoard[4] &&
         gameBoard[2] === gameBoard[6] &&
         gameBoard[2] !== ' '){

         return true;
    }else{
        return false;
    }
}

function checkOpenMoves(gameBoard){
    return gameBoard.filter(value => value.includes(' ')).length;
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