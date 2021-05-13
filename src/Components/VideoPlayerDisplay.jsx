import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{

    return {
        img: {
            width: '550px',
            height: '350px',
            [theme.breakpoints.down('xs')]: {
                width: '300px',
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

function VideoPlayerDisplay(props) {

    const classes = useStyles();

    return (
        <Card className={classes.root}>

            {/* full screen icon */}
            <div className={classes.screenIcon}>

                <Typography variant="h5" className={classes.userName}>
                    {"Empty"}
                </Typography>

                <IconButton
                // onClick={()=>sendMessage("Working!!!!")}
                >
                    <FullscreenIcon
                    style={{color: 'white'}}
                    fontSize="large" 
                    />
                </IconButton>


            </div>

           <CardContent>
               {/* Image here */}
               <img src="./extreme_logo.png" className={classes.img}/>
           </CardContent>
        </Card>
    );
}

export default VideoPlayerDisplay;