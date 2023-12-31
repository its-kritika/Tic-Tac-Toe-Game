export default function Log({gameTurns}){
    return(
        <ol id = 'display-turn'>
            {gameTurns.map((turn) => 
            <li key = {`${turn.square.row}${turn.square.col}`}>
                {turn.player} selected {turn.square.row}, {turn.square.col}
            </li>)}
        </ol>
    );
}