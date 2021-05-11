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

function JoinRoom({handleClick, handleNameChange, handleRoomChange}) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            
            <InputContainer handleClick={handleClick}>

                <InputField 
                label="Room ID"
                // handleSubmit={onSubmit}
                buttonLabel="Join Room"
                onRoomChange={handleRoomChange}
                onNameChange={handleNameChange}
                // error={error}
                />

            </InputContainer>

        </div>
    );
}

export default JoinRoom;