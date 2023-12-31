import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleClick(){
        setIsEditing((editing) => !editing);   //anonymous function that basically reverses the isEditing value, i.e, if true sets
                                               //false and vice versa

        if (isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }
    return(
        <li className = {isActive ? 'active' : undefined}>
            <span className = 'player-symbol'>
                {isEditing ? <input type = 'text' value = {playerName} className='player-input' onChange = {handleChange} required/> 
                : <span className = 'player-name'>{playerName}</span>}
                <span>{symbol}</span>
            </span>
            <button className = 'edit-button' onClick = {handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    );
}