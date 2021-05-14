import React from 'react';
import {makeStyles} from '@material-ui/core';

import InputField from '../Components/InputField';
import InputContainer from '../Components/InputContainer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme)=>{
    return {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#212121",
        },
        appBar: {
            top: 'auto',
            bottom: 0,
            backgroundColor: "#212121",
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            paddingInline: theme.spacing(1),
            // borderTop: '1px solid #c51162'
            // paddingLeft: theme.spacing(1)
        },
        footer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: theme.spacing(1),
        },
        avatar: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        link: {
            marginLeft: theme.spacing(1)
        }
    }
});

function JoinRoom({handleClick, handleNameChange, handleRoomChange, handleJoinRoom, error, loading, name, room}) {

    const classes = useStyles();

    return (
        <>
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
        <AppBar
        className={classes.appBar}
        >   
        <div className={classes.footer}>
            <Typography variant="h6"  color="secondary" display="inline">
                Made With
            </Typography>

            <Avatar alt="footer" src="./footer.png" className={classes.avatar}/>

            <Typography variant="h6"  color="secondary" display="inline">
                By
            </Typography>

            <Link
            color="secondary"
            component="button"
            variant="h6"
            className={classes.link}
            onClick={()=>window.open("https://github.com/ishanExtreme")}
            >
                Ishan Mishra
            </Link>
        
        </div>
        </AppBar>
        </>
    );
}

export default JoinRoom;