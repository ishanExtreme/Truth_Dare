import React, { useCallback, useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
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
        render =  (
            <>
            {/* Header */}
            <Header />

            <Option 
            handleClick={handleClick} 
            handleNameChange={handleNameChange}
            handleRoomChange={handleRoomChange}
            />

            {/* Footer */}
            {/* <Footer /> */}
            </>
        );
    }
    else if(component === 'create')
    {
        render =  (
            <>
            {/* Header */}
            <Header />

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

            {/* Footer */}
            {/* <Footer /> */}
            </>
        );
    }

    else
    {
        render =  (
            <>
            {/* Header */}
            <Header />

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

            {/* Footer */}
            {/* <Footer/> */}
            </>
        );
    }
    
    

    return render;
}

export default Start;