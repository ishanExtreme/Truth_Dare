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

function JoinRoom({handleClick}) {

    const classes = useStyles();

    // room ID
    const [id, setID] = useState('');
    // error
    const [error, setError] = useState('');

    const onSubmit = (e)=>{

        e.preventDefault();

        setError('');

        // validation
        if(id === '')
        {
            setError("Room ID is Required!!!");
        }

        if(id)
        {
            console.log(id);
        }
    }


    return (
        <div className={classes.container}>
            
            <InputContainer handleClick={handleClick}>

                <InputField 
                label="Room ID"
                handleSubmit={onSubmit} 
                buttonLabel="Join Room"
                onChange={id=>setID(id)}
                error={error}
                />

            </InputContainer>

        </div>
    );
}

export default JoinRoom;