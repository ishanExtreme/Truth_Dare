import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider, withWidth } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import {connect} from 'twilio-video';

import './home.css';
import VideoPlayer from '../Components/VideoPlayer';

const useStyles = makeStyles((theme)=>{
    return {
        root: {
            flexGrow: 1,
            padding: theme.spacing(3),
            backgroundColor: '#212121',
        },
        container: {
            backgroundColor: '#212121',
        },
        contentBox: {
            display: 'inline-block',
            padding: theme.spacing(2),
        },

        inviteText: {
            marginBottom: theme.spacing(2),
            
        },
        
        mobileGridItem: {
            marginBottom: theme.spacing(3),
        },

        appBar: {
            top: 'auto',
            bottom: 0,
            backgroundColor: "#263238",
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            paddingInline: theme.spacing(1),
            // paddingLeft: theme.spacing(1)
        },

        // mobileContainer: {

        // }

        
    };
});

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

function Home({roomName, token, handleLogout}) {

    useEffect(()=> {
        
        // when a participant connects
        const participantConnected = participant => {
            setParticipants(prevParticipants=> [...prevParticipants, participant]);
        };
        
        // when a participant disconnects
        const participantDisconnected = participant => {
            setParticipants(prevParticipants=> 
                prevParticipants.filter(p=> p!==participant)
            );
        };

        const room = joinRoom();
        console.log(room);
        setRoom(room);
        // listener on participants connect   
        room.on('participantConnected', participantConnected);
        // listener on participant disconnects   
        room.on('participantDisconnected', participantDisconnected);
        // initial mounting store all current users  
        room.participants.forEach(participantConnected);


        return ()=> {
            setRoom(currentRoom => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
                      trackPublication.track.stop();
                    });
                    // ------SEEE---------
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            });
        };

    }, [roomName, token]);

    const classes = useStyles();

    // Room object
    const [room, setRoom] = useState(null);
    // participants list
    const [participants, setParticipants] = useState([]);

    const joinRoom = async ()=>
    {
        return await connect(token, {
            name: roomName
        })
    }

    return (
        
        <div className={classes.root}>
        <ThemeProvider theme={theme}>
            {/* Main Container */}
            <Grid
            container
            spacing={3}
            >
                {/* Detail Row */}
                <Grid item xs={12}>
                    {/* Detail Container */}
                    <Grid 
                    container justify="space-between">
                        {/* Invite Box */}
                        <Grid item>
                            <Paper elevation={3} className={classes.contentBox}>
                                    <Typography 
                                    variant="subtitle2"
                                    align="center"
                                    color="secondary"
                                    className={classes.inviteText}> 
                                        Room Code
                                    </Typography>
                                    <Button 
                                    variant="outlined" 
                                    color="secondary"
                                    endIcon={<FileCopyOutlinedIcon/>}>
                                        111554
                                    </Button>
                            </Paper>
                        </Grid>
                        {/* Invite Box End*/}
                        
                        {/* Score Box */}
                        <Grid item>
                            <Paper elevation={3} className={classes.contentBox}>
                                    <Typography 
                                    variant="subtitle2"
                                    align="center"
                                    color="secondary"
                                    className={classes.inviteText}> 
                                        Score
                                    </Typography>
                                    
                                    <Typography 
                                    variant="h5"
                                    align="center"
                                    color="secondary"
                                    className={classes.inviteText}> 
                                        21
                                    </Typography>
                            </Paper>
                        </Grid>
                        {/* Score Box End*/}
                    </Grid>
                    {/* Detail Container End*/}
                    
                </Grid>
                {/* Detail Row End*/}

                {/* Desktop View Implementation */}
                {/* Video Player Pair one */}
                <Hidden lgDown>
                <Grid item xs={12}>
                    <Grid 
                    container
                    justify="space-between">
                        <Grid item>
                            {/* Local Participant */}
                            <VideoPlayer participant={room.localParticipant} local={true}/>
                        </Grid>

                        <Grid item>
                            {/* Participant 1 */}
                            <VideoPlayer participant={participants[0]}/>
                        </Grid>
                    </Grid>
                </Grid>
                </Hidden>
                {/* Pair one end */}

                {/* Video Player Pair two */}
                <Hidden lgDown>
                <Grid item xs={12}>
                    <Grid 
                    container
                    justify="space-between">
                        <Grid item>
                            {/* participant 2 */}
                            <VideoPlayer participant={participants[1]}/>
                        </Grid>

                        <Grid item>
                            {/* participant 3 */}
                            <VideoPlayer participant={participants[2]}/>
                        </Grid>
                    </Grid>
                </Grid>
                </Hidden>
                {/* Pair two end */}
                {/* Desktop View End */}


                {/* Mobile View Implementation */}
                {/* Video Players */}
                <Hidden xlUp >
                    <Grid
                    container
                    justify="center"
                    >
                        <Grid item className={classes.mobileGridItem}>
                            <VideoPlayer />
                        </Grid>

                        <Grid item className={classes.mobileGridItem}>
                            <VideoPlayer />
                        </Grid>

                        <Grid item className={classes.mobileGridItem}>
                            <VideoPlayer />
                        </Grid>

                        <Grid item className={classes.mobileGridItem}>
                            <VideoPlayer />
                        </Grid>
                        
                    </Grid>

                    
                </Hidden>
                {/* Mobile View End */}

                {/* Button Bar */}
                <AppBar 
                position="sticky"
                // color="dark"
                className={classes.appBar}
                >
                    <Grid
                    container
                    direction="column"
                    alignItems="center"
                    >
                        <Grid item >
                            <Button
                            variant="outlined" 
                            color="secondary"
                            size="large"
                            style={{marginRight: '20px', marginBottom: '20px'}}
                            endIcon={<ThreeSixtyIcon />}
                            >   
                            SPIN
                            </Button>
                        </Grid>

                        {/* Task Button Group small to xl view */}
                        <Hidden xsDown>
                            <Grid item>
                                <ButtonGroup>
                                    <Button
                                    variant="outlined" 
                                    color="primary"
                                    size="large"
                                    endIcon={<AssignmentTurnedInOutlinedIcon />}
                                    >   
                                    Task Completed
                                    </Button>

                                    <Button
                                    variant="contained" 
                                    color="primary"
                                    size="large"
                                    endIcon={<AssignmentIndOutlinedIcon />}
                                    >   
                                    Give Task
                                    </Button>

                                    <Button
                                    variant="outlined" 
                                    color="primary"
                                    size="large"
                                    endIcon={<CancelOutlinedIcon />}
                                    >   
                                    Task Not Completed
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Hidden>
                        {/* End small to xl view */}

                        {/* Task Button Group xs view */}
                        <Hidden smUp>

                            <Grid item>

                                <Button
                                    variant="contained" 
                                    color="primary"
                                    size="large"
                                    style={{marginRight: '20px', marginBottom: '20px'}}
                                    endIcon={<AssignmentIndOutlinedIcon />}
                                    >   
                                    Give Task
                                </Button>

                            </Grid>
                            <Grid item>
                                <ButtonGroup>
                                    <Button
                                    variant="outlined" 
                                    color="primary"
                                    size="large"
                                    endIcon={<AssignmentTurnedInOutlinedIcon />}
                                    >   
                                    Task Completed
                                    </Button>

                                    <Button
                                    variant="outlined" 
                                    color="primary"
                                    size="large"
                                    endIcon={<CancelOutlinedIcon />}
                                    >   
                                    Task Not Completed
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Hidden>
                        {/* End xs view */}

                        <Grid item>
                            <Button
                            onClick={handleLogout}
                            variant="outlined" 
                            color="secondary"
                            size="large"
                            style={{marginRight: '20px', marginTop: '20px '}}
                            endIcon={< ExitToAppOutlinedIcon/>}
                            >   
                            Leave Room
                            </Button>
                        </Grid>

                    </Grid>
                </AppBar>
                {/* Bar End */}

            </Grid>
            {/* Main Container End */}

        </ThemeProvider>
        </div>
    );
    
}

export default withWidth()(Home);