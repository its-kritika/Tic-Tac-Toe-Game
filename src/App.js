import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { Winning_Combination } from './winning_combinations';
import GameOver from './components/GameOver';

const playerInfo = {
  X : 'Player1',
  O : 'Player2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

//helper function used in App component
function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
      
      if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O';
      }
    
      return currentPlayer;
}

function deriveWinner( gameBoard, players ){
  let winner;

    for (const combination of Winning_Combination){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

      if ( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = players[firstSquareSymbol];
      }
    }

  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map((array) => [...array])];   //this is deep copy of initialGameBoard array so that 
  // initialGameBoard's data is not changed in memory and when a new game restarts, it is set back to what it was initially.

    for (const turn of gameTurns){
        const { square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {
  const [players, setPlayers] = useState( playerInfo );
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  let activePlayer = derivedActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner( gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurn) => {
      let currentPlayer = derivedActivePlayer(prevTurn);

      const updatedTurns = [
        { square : { row : rowIndex, col : colIndex}, player : currentPlayer},
        ...prevTurn,
      ];

      return updatedTurns;
    })
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
        return {
          ...prevPlayers,
          [symbol] : newName
      };
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id = 'game-container'>
        <ol id = 'players' className = 'highlight-list'>
          <Player 
          initialName = {playerInfo.X} symbol = 'X' isActive = {activePlayer === 'X'} onChangeName = {handlePlayerNameChange}/>
          <Player 
          initialName = {playerInfo.O} symbol = 'O' isActive = {activePlayer === 'O'} onChangeName = {handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner = { winner } onRestart = { handleRestart }/>}
        <GameBoard selectSquare = {handleSelectSquare} board = {gameBoard}/>
      </div>
      <Log gameTurns = {gameTurns}/>
    </main>
  );
}
export default App;
