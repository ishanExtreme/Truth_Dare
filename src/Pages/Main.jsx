import React, { useCallback, useState } from 'react';

import Home from './Home';
import Start from './Start';

function Main(props) {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState('');

    const handleNameChange = useCallback(event=>{
        setUserName(event.target.value);
    }, []);

    const handleRoomChange = useCallback(event=>{
        setRoomName(event.target.value);
    }, []);


    let render;
    // Render Start or Game(Home) screen
    if(token)
    {
        render = (
            <Home />
        );
    }
    else
    {
        render = (
            <Start 
            handleNameChange={handleNameChange}
            handleRoomChange={handleRoomChange}
            />
        );
    }

    return render;
}

export default Main;