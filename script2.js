const gameBoard = (() => {
    'use strict';

    let board = [];
    let counter;

    const init = () => {
        for (let i = 0; i < 9; i++){
            document.querySelectorAll('.box')[i].addEventListener('click', function (event){
                _makeMove(event);
                _updateBoard();

            })
        }
    }

    const newGame = () => {
        board = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
        counter = 1;
        _updateBoard();
    }

    const _updateBoard = () => {
        for (let i = 0; i < 9; i++){
            document.getElementById(`${i+1}`).textContent = board[i];
        }
    }

    const _checkMove = (cell) => {
        if (board[cell] === ' '){
            return true;
        }
    }

    const _makeMove = (event) => {
        if (counter%2 === 1 && _checkMove(event.target.id - 1)){
            board[event.target.id - 1] = 'x';

        }else if(counter%2 === 0 && _checkMove(event.target.id -1)){
            board[event.target.id - 1] = 'o';
        }

        _winCheck();
        counter++;
    }

    const _winCheck = () => {
        if (_checkRow() || _checkCol() || _checkDiag()){
            if (counter%2 === 1){
                console.log('x won');
            }else{
                console.log('o won');
            }
        }else if (_checkOpenMoves() === 0){
            console.log('tie');
        }
    }

    const _checkRow = () => {
        for(let i = 0; i < 9; i +=3){
            if (board[i] === board[i+1] &&
                board[i] === board[i+2] &&
                board[i] !== ' '){
                    return true;
                }
        }
        return false;
    }

    const _checkCol = () => {
        for (let i = 0; i < 3; i++){
            if (board[i] === board[i+3] &&
                board[i] === board[i+6] &&
                board[i] !== ' '){
                    return true;
                }
        }
        return false;
    }

    const _checkDiag = () => {
        if (board[0] === board[4]&&
            board[0] === board[8]&&
            board[0] !== ' '){
            
                return true;
        }else if(board[2] === board[4]&&
                 board[2] === board[6]&&
                 board[2] !== ' '){
                    return true;
                 }
        return false;
    }

    const _checkOpenMoves = () => {
        return board.filter(value => value.includes(' ')).length;
    }


    return {
        init: init,
        newGame: newGame
    }
})();

//initialize array, update display
gameBoard.init();
gameBoard.newGame();
