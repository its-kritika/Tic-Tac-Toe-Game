// import { useState } from 'react';

export default function GameBoard( {selectSquare, board} ){
    
//     const [gameBoard, setGameBoard] = useState(initialGameBoard);
//     function handleSymbolChange(rowIndex, colIndex){
//         setGameBoard((gameBoard) => {
//             const updatedArray = [...gameBoard.map((innerArray) => ([...innerArray]))];
//             updatedArray[rowIndex][colIndex] = curActivePlayer;

//             return updatedArray
//         });

//         selectSquare();
//     }

    return(
        <ol id = 'game-board'>
            {board.map((row, rowIndex) => (
                <li key = {rowIndex}>
                    <ol className="game-items">
                        {row.map((playerSymbol, colIndex) => (
                            <li key = {colIndex}>
                                <button onClick = {() => selectSquare(rowIndex, colIndex)} 
                                className = {playerSymbol === 'X' ? 'x-player' : 'o-player'}
                                disabled = {playerSymbol !== null}>
                                    {playerSymbol}</button>
                            </li>)
                            )}
                    </ol>
                </li>
                ))
            }
        </ol>
    );
}