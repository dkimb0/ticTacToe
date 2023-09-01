//Gameboard module object:
//  -holds array
//      -pre-populate with 9 empty characters
//      -array items 1-3 top row, 4-6 middle, 7-9 bottom
//      -

//displayController module obj
//  -function to generate the new gameboard on the screen
//      -show 11, 12, 13 etc for row column designation

//player factory object:
//  -creates player

//game flow control object:
//




//initialize
let gameBoard = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
let player = 1;

//display
function updateBoard(){
    for (i = 0; i < 9; i++){
        document.getElementById(`${i+1}`).textContent = gameBoard[i];
    }
}

updateBoard();


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
        updateBoard();
    });
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