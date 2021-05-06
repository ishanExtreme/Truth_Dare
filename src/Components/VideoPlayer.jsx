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
            backgroundColor: '#212121'
        },
        // remove it
        constainer: {
            padding: theme.spacing(20)
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

function VideoPlayer(props) {

    const classes = useStyles();

    const [videoOn, setVideoOn] = useState(false);
    const [micOn, setMicOn] = useState(false);

    return (
        <div className={classes.constainer}>
        <Card className={classes.root}>

            {/* full screen icon */}
            <div className={classes.screenIcon}>

                <Typography variant="h5" className={classes.userName}>
                    Ishan Mishra
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
        </div>
    );
}

export default VideoPlayer;