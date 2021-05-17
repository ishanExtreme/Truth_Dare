import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Option from './Option';

function Start({handleNameChange, handleRoomChange, handleJoinRoom, handleCreateRoom, error, loading, resetError, name, room, playersNumber, handleRadioChange}) {

    // switch between component "create", "join" and "option"
    const [component, setComponent] = useState('option');

    const handleClick = (component_name)=>{
        setComponent(component_name);
        resetError();
    };

    
    let render;
    if(component === 'option')
    {
        render = (
            <Option 
            handleClick={handleClick} 
            handleNameChange={handleNameChange}
            handleRoomChange={handleRoomChange}
            />
        );
    }
    else if(component === 'create')
    {
        render = (
            <CreateRoom 
            handleClick={handleClick}
            handleNameChange={handleNameChange}
            handleCreateRoom={handleCreateRoom}
            error={error}
            loading={loading}
            name={name}
            playersNumber={playersNumber}
            handleRadioChange={handleRadioChange}
            />
        );
    }

    else
    {
        render = (
            <JoinRoom 
            handleClick={handleClick}
            handleNameChange={handleNameChange}
            handleRoomChange={handleRoomChange}
            handleJoinRoom={handleJoinRoom}
            error={error}
            loading={loading}
            name={name}
            room={room}
            />
        );
    }

    return render;
}

export default Start;