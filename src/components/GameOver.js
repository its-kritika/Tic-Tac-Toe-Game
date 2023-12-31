export default function GameOver({winner, onRestart}){
    return(
        <div id = 'game-over'>
            <h1>Game Over!</h1>
            {winner && <p className = "winner-details">{winner} won!</p>}
            {!winner && <p className = "winner-details">It's a draw!</p>}
            <p>
                <button onClick = {onRestart}>Rematch!</button>
            </p>
        </div>
    );
}