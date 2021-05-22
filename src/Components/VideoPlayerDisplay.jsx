import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import colors from '../config/colors';

const useStyles = makeStyles((theme)=>{

    return {
        img: {
            width: '350px',
            height: '450px',
            [theme.breakpoints.down('xs')]: {
                width: '330px',
                height: '300px'
            },
        },
        imgContainer: {
            display: "flex",
            width: '550px',
            [theme.breakpoints.down('xs')]: {
                width: '330px',
            },
            backgroundColor: colors.videoPlayer,
            justifyContent: 'center',
            alignItems: 'center',
        },
        rootLeft: {
            display: "flex",
            flexDirection: 'column',
            maxWidth: '550px',
            maxHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: colors.videoPlayerColor,
            // backgroundImage: colors.videoPlayerImage,
            background: colors.videoPlayerBackground,
            [theme.breakpoints.between('lg', 'xl')]: {
                marginRight: theme.spacing(5)
            },
        },
        rootRight: {
            display: "flex",
            flexDirection: 'column',
            maxWidth: '550px',
            maxHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: colors.videoPlayerColor,
            // backgroundImage: colors.videoPlayerImage,
            background: colors.videoPlayerBackground,
            [theme.breakpoints.between('lg', 'xl')]: {
                marginLeft: theme.spacing(5)
            },
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
        },
    };
});

function VideoPlayerDisplay({side}) {

    const classes = useStyles();

    return (
        <Card className={side==="left"?classes.rootLeft: classes.rootRight}>

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

           <CardContent className={classes.imgContainer}>
               {/* Image here */}
               <Avatar variant="circle" alt="Empty" src="./empty.png" className={classes.img}/>
           </CardContent>
        </Card>
    );
}

export default VideoPlayerDisplay;