import React from 'react';
import {makeStyles} from '@material-ui/core';
import InputField from '../Components/InputField';
import InputContainer from '../Components/InputContainer';

import colors from '../config/colors';

const useStyles = makeStyles((theme)=> {
    return {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: colors.background,
    },
}
});

// handleClick = back button
function CreateRoom({handleClick, handleNameChange, handleCreateRoom, error, loading, name, playersNumber, handleRadioChange}) {

    const classes = useStyles();

    return (
        <>

        {/* Header */}
        {/* <Header /> */}

        <div className={classes.container}>

            <InputContainer handleClick={handleClick} style={{marginTop: "50px"}}>
                <InputField 
                handleSubmit={handleCreateRoom}
                buttonLabel="Create Room"
                onNameChange={handleNameChange}
                error={error}
                loading={loading}
                isJoin={false}
                name={name}
                playersNumber={playersNumber}
                handleRadioChange={handleRadioChange}
                />
            </InputContainer>

        </div>

        {/* footer */}
        {/* <Footer /> */}
        
        </>
    );
}

export default CreateRoom;