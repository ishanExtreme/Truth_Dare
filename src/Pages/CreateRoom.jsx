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

// handleClick = back button
function CreateRoom({handleClick, handleNameChange, handleCreateRoom, error, loading}) {

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <InputContainer handleClick={handleClick}>
                <InputField 
                handleSubmit={handleCreateRoom}
                buttonLabel="Create Room"
                onNameChange={handleNameChange}
                error={error}
                loading={loading}
                isJoin={false}
                />
            </InputContainer>

        </div>
    );
}

export default CreateRoom;