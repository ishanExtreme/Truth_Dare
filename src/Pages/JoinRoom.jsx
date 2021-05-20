import React from 'react';
import {makeStyles} from '@material-ui/core';

import InputField from '../Components/InputField';
import InputContainer from '../Components/InputContainer';
import colors from '../config/colors';


const useStyles = makeStyles((theme)=>{
    return {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colors.background,
        },
    }
});

function JoinRoom({handleClick, handleNameChange, handleRoomChange, handleJoinRoom, error, loading, name, room}) {

    const classes = useStyles();

    return (
        <>

        {/* Header */}
        {/* <Header /> */}

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
                name={name}
                room={room}
                />

            </InputContainer>

        </div>

        {/* footer */}
        {/* <Footer /> */}
        </>
    );
}

export default JoinRoom;