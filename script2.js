const Player = () => {
    'use strict'
    let player = {};

    const _setName = (playerCount) => {
        let name = prompt(`Player ${playerCount}, what is your name?`);
        player.name = name;
    }

    const initName = (playerCount) => {
        _setName(playerCount);
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
    // let botFlag = false;
    // let botCell;
    let playerCount;
    const player1 = Player();
    const player2 = Player();


    const init = () => {
        //initialize new game/players buttons
        let restart = document.querySelector('.restart');

         document.querySelector('.newPlayers').addEventListener('click', function (){
            _newPlayers();
        })
        restart.addEventListener('click', function (){
            _newGame();
        })

        // document.querySelector('.newBotGame').addEventListener('click', function (){
        //     _newBotGame();
        // })

        _initDivs();

        //set up first game and players
    }

    const _initDivs = () => {
        for (let i = 0; i < 9; i++){
            document.querySelectorAll('.box')[i].addEventListener('click', function (event){
                _makeMove(event);
                displayController.updateDisplay();
                // if (botFlag === true){
                //     _botMove();
                //     setTimeout(() => {
                //         displayController.updateDisplay();
                //     }, "1000");
                //     ;
                // }

            })
        }
    }

    


    //reset board and counter, update display
    const _newGame = () => {
        board = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ');
        counter = 0;
        displayController.updateDisplay();
        _clearWinMessage();
    }

    // const _newBotGame = () => {
    //     _newGame();
    //     _newPlayerBot();
    //     botFlag = true;
    //     //add bot specific things to initialize
    // }

    const _newPlayers = () => {
        _clearPlayerMessage();
        player1.initName(1);
        document.getElementById(`p1`).textContent += ' vs ';   
        player2.initName(2);
        _newGame();
    }

    // const _newPlayerBot = () => {
    //     _clearPlayerMessage();
    //     player1.initName();
    //     document.getElementById(`p1`).textContent += ' vs Bot';  
    // }

    // const _botMove = () => {
    //     botCell = Math.floor(Math.random()*9);
        
    //     if (_checkMove(botCell)){
    //         board[botCell] = 'o';
    //         ++counter;
    //         _winCheck();
    //     }else{
    //         _botMove();
    //     }
    // }

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
        }else{
            return false;
        }
    }

    //changes board array upon user click of cell, moves to next turn
    const _makeMove = (event) => {
        if (_winCheck()){
            return;
        }else{
            if (_checkMove(event.target.id - 1)){
                ++counter;                
                if (counter%2 === 1){
                    board[event.target.id - 1] = 'x';
                    document.getElementById(event.target.id).style.color = 'var(--blue)';
                }else{
                    board[event.target.id - 1] = 'o';
                    document.getElementById(event.target.id).style.color = 'var(--red)';
                }

                _winCheck();
            }
            


            // if (counter%2 === 1 && _checkMove(event.target.id - 1)){
            //     board[event.target.id - 1] = 'x';
    
            // }else if(counter%2 === 0 && _checkMove(event.target.id - 1)){
            //     board[event.target.id - 1] = 'o';
            // }
    
            // _winCheck();
            
        }
        
    }

    //if no open moves and no win condition, then its a tie
    const _winCheck = () => {
        if (player1.getName() === undefined){
            return;
        }
        
        if (_checkRow() || _checkCol() || _checkDiag()){
            if (counter%2 === 1){
                document.getElementById('message').textContent = player1.getName() + ' wins';
            }else{
                document.getElementById('message').textContent = player2.getName() + ' wins';
            }
            // else{
            //     document.getElementById('message').textContent = 'Bot wins';
            // }
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



//fix boot to wait for new game/players instead of auto loading players
//fix message for new player, reference player 1 or 2?
//fix win message if bot wins
//