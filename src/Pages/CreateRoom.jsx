import React, { useState } from 'react';
import {makeStyles} from '@material-ui/core';
import InputField from '../Components/InputField';
import InputContainer from '../Components/InputContainer';

const useStyles = makeStyles((theme)=> {
    return {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#212121",
    }
}
})

function CreateRoom({handleClick, handleNameChange, handleRoomChange, handleCreateRoom, error, loading}) {

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <InputContainer handleClick={handleClick}>
                <InputField 
                label="Room Name"
                handleSubmit={handleCreateRoom}
                buttonLabel="Create Room"
                onRoomChange={handleRoomChange}
                onNameChange={handleNameChange}
                error={error}
                loading={loading}
                />
            </InputContainer>

        </div>
    );
}

export default CreateRoom;