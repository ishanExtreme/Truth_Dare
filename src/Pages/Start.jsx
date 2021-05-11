import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import Option from './Option';

function Start({handleUserName, handleRoomName, handleSubmit}) {

    // switch between component "create", "join" and "option"
    const [component, setComponent] = useState('option');

    const handleClick = (component_name)=>{
        setComponent(component_name);
    };

    let render;
    if(component === 'option')
    {
        render = (
            <Option handleClick={handleClick}/>
        );
    }
    else if(component === 'create')
    {
        render = (
            <CreateRoom handleClick={handleClick}/>
        );
    }

    else
    {
        render = (
            <JoinRoom handleClick={handleClick}/>
        );
    }
    
    return render;
}

export default Start;