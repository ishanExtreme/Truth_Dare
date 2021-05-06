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
        backgroundColor: "black",
    }
}
})

function CreateRoom(props) {

    const classes = useStyles();

    // room name
    const [room, setRoom] = useState('');
    // errors
    const [error, setError] = useState('');

    const onSubmit = (e)=> {
        e.preventDefault();

        setError('');

        // validations
        if(room === '')
        {
            setError("Room Name is Required!!!");
        }

        if(room)
        {
            console.log(room);
        }
    }


    return (
        <div className={classes.container}>

            <InputContainer>
                <InputField 
                label="Room Name"
                handleSubmit={onSubmit} 
                buttonLabel="Create Room"
                onChange={name=>setRoom(name)}
                error={error}
                />
            </InputContainer>

        </div>
    );
}

export default CreateRoom;