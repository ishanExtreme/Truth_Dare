import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core';

import InputField from '../Components/InputField';
import InputContainer from '../Components/InputContainer';


const useStyles = makeStyles((theme)=>{
    return {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#212121",
        },
    }
});

function JoinRoom({handleClick, handleNameChange, handleRoomChange, handleJoinRoom, error, loading}) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            
            <InputContainer handleClick={handleClick}>

                <InputField 
                label="Room ID"
                handleSubmit={handleJoinRoom}
                buttonLabel="Join Room"
                onRoomChange={handleRoomChange}
                onNameChange={handleNameChange}
                error={error}
                loading={loading}
                isJoin={true}
                />

            </InputContainer>

        </div>
    );
}

export default JoinRoom;