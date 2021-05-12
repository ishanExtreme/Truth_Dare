import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{

    return {
        video: {
            width: '550px',
            [theme.breakpoints.down('xs')]: {
                width: '300px'
            },
            backgroundColor: 'black'
        },
        root: {
            display: "flex",
            flexDirection: 'column',
            maxWidth: '550px',
            maxHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#424242'
        },
        screenIcon: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%'
        },
        userName: {
            color: 'white',
            width: '100%',
            textAlign: 'center',
            marginLeft: '80px'
        }
    };
});

function VideoPlayer({participant, local=false}) {

    const classes = useStyles();

    const [videoOn, setVideoOn] = useState(false);
    const [micOn, setMicOn] = useState(false);

    return (
        <Card className={classes.root}>

            {/* full screen icon */}
            <div className={classes.screenIcon}>

                <Typography variant="h5" className={classes.userName}>
                    {local?"You":participant?participant.identity:"Waiting for Player..."}
                </Typography>

                <IconButton>
                    <FullscreenIcon
                    style={{color: 'white'}}
                    fontSize="large" 
                    />
                </IconButton>


            </div>

            {/* Name of the user */}
            <div>
                
            </div>

           <CardContent>
               <video 
               playsInline 
               autoPlay 
               red={null}
               className={classes.video}
               />
           </CardContent>

           <CardActions disableSpacing >
                <IconButton 
                style={{marginRight:'50px'}}
                onClick={()=>setVideoOn(!videoOn)}
                // enable button for local participants only
                disabled={!local}
                >
                    {
                        videoOn?
                        <VideocamIcon 
                        fontSize="large"
                        style={{color:'green'}}
                        />
                        :
                        <VideocamOffIcon
                        fontSize="large"
                        style={{color:'red'}}
                        />
                    }
                    
                </IconButton>
        
                <IconButton 
                style={{marginLeft:'50px'}}
                onClick={()=>setMicOn(!micOn)}
                // enable button for local participants only
                disabled={!local}
                >
                    {
                        micOn?
                        <MicIcon 
                        fontSize="large"
                        style={{color:'green'}}
                        />
                        :
                        <MicOffIcon 
                        fontSize="large"
                        style={{color:'red'}}
                        />
                    }
                    
                </IconButton>
           </CardActions>
        </Card>
    );
}

export default VideoPlayer;