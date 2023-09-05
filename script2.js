const Player = () => {
    'use strict'
    let player = {};

    const _setName = () => {
        let name = prompt(`What is your name?`);
        player.name = name;
    }

    const initName = () => {
        _setName();
        _displayName();
    }

    const _displayName = () => {
        document.getElementById(`p1`).textContent += `${player.name}`;   
    }

    const getName = () => player.name;



    return {
        initName: initName,
        getName: getName
    };
};

const GameBoard = (() => {
    'use strict';

    let board = [];
    let counter;
    const player1 = Player();
    const player2 = Player();


    const init = () => {
        //initialize new game/players buttons
        document.querySelector('.newGame').addEventListener('click', function (){
            _newGame();
        })
        document.querySelector('.newPlayers').addEventListener('click', function (){
            _newPlayers();
        })

        _initDivs();

        //set up first game and players
        _newGame();
        _newPlayers();
    }

    const _initDivs = () => {
        for (let i = 0; i < 9; i++){
            document.querySelectorAll('.box')[i].addEventListener('click', function (event){
                _makeMove(event);
                displayController.updateDisplay();

            })
        }
    }

    


    //reset board and counter, update display
    const _newGame = () => {
        board = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
        counter = 0;
        console.log(counter);
        displayController.updateDisplay();
        _clearWinMessage();
    }

    const _newPlayers = () => {
        _clearPlayerMessage();
        player1.initName();
        document.getElementById(`p1`).textContent += ' vs ';   
        player2.initName();
    }

    const _clearPlayerMessage = () => {
        document.getElementById('p1').textContent = '';
    }

    const _clearWinMessage = () => {
        document.getElementById('message').textContent = '';
    }



    // const _updateDisplay = () => {
    //     for (let i = 0; i < 9; i++){
    //         document.getElementById(`${i+1}`).textContent = board[i];
    //     }
    // }

    //checks that selected cell is not already taken
    const _checkMove = (cell) => {
        if (board[cell] === ' '){
            return true;
        }
    }

    //changes board array upon user click of cell, moves to next turn
    const _makeMove = (event) => {
        console.log(counter);
        if (_winCheck()){
            return;
        }else{
            ++counter;
            if (counter%2 === 1 && _checkMove(event.target.id - 1)){
                board[event.target.id - 1] = 'x';
    
            }else if(counter%2 === 0 && _checkMove(event.target.id - 1)){
                board[event.target.id - 1] = 'o';
            }
    
            _winCheck();
            
        }
        
    }

    //if no open moves and no win condition, then its a tie
    const _winCheck = () => {
        if (_checkRow() || _checkCol() || _checkDiag()){
            if (counter%2 === 1){
                document.getElementById('message').textContent = player1.getName() + ' wins';
            }else{
                document.getElementById('message').textContent = player2.getName() + ' wins';
            }
            return true;
        }else if (_checkOpenMoves() === 0){
            document.getElementById('message').textContent = 'tie';
            return true;
        }
        return false;
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

    const getBoard = () => board;

    return {
        init: init,
        getBoard: getBoard
    }
})();


const displayController = (() => {
    'use strict';
    //update display to state of board
    console.log(GameBoard.getBoard());
    const updateDisplay = () => {
        for (let i = 0; i < 9; i++){
            document.getElementById(`${i+1}`).textContent = GameBoard.getBoard()[i];
        }
    }

    return {
        updateDisplay: updateDisplay
    }

})();

//initialize array, update display
GameBoard.init();
