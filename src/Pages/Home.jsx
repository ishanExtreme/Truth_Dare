import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider, withWidth } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AppBar from '@material-ui/core/AppBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import './home.css';
import VideoPlayer from '../Components/VideoPlayer';
import VideoPlayerDisplay from '../Components/VideoPlayerDisplay';

import useApi from '../hooks/useApi';
import gameApi from '../api/game';


// for snackbar
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        performSubmitButton: {
            margin: theme.spacing(1, 1, 0, 0),
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

function Home({roomName, room, handleLogout, initial_score}) {

    // participants list
    const [participants, setParticipants] = useState([]);
    // score
    const [score, setScore] = useState(initial_score);
    // spinning the bottle
    const [spinning, setSpinning] = useState(false); 
    // open snackbar
    const [openNotif, setOpenNotif] = useState(false);
    // notif type
    const [notifType, setNotifType] = useState('success');
    // notif message
    const [notifMsg, setNotifMsg] = useState('');
    // App Bar message
    const [barMsg, setBarMsg] = useState('');
    // is task giver
    const [taskGiver, setTaskGiver] = useState(false);
    // is performer
    const [performer, setPerformer] = useState(false);
    // performer form error
    const [performerError, setPerformerError] = useState(false);
    // performer choosen task
    const [taskValue, setTaskValue] = useState('');
    // form helper
    const [helperText, setHelperText] = useState("Lets go for dare...")

    // to be run after spinning is completed
    const cleanUp = ()=>{

        setSpinning(false);
        setBarMsg('');
        setTaskGiver(false);
        setPerformer(false);
        setPerformerError(false);
        setTaskValue('');
        setHelperText("Lets go for dare...");

    }
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

        
        // listener on participants connect   
        room.on('participantConnected', participantConnected);
        // listener on participant disconnects   
        room.on('participantDisconnected', participantDisconnected);
        // initial mounting store all current users  
        room.participants.forEach(participantConnected);


        return ()=> {
            // ------- Not Known --------
            room.off("participantConnected", participantConnected);
            room.off("participantDisconnected", participantDisconnected);
            // ------- Not Known --------
        };

    }, [room]);

    const classes = useStyles();

    const getPerformerApi = useApi(gameApi.performer);

    // format of instruction codes are=>
    // #code%params*msg
    // params are comma seperated(not implemented)
    // %params is optional
    const sendMessage = (msg, code, params="")=> {
        // Get the LocalDataTrack that we published to the room.
        const [localDataTrackPublication] = [...room.localParticipant.dataTracks.values()];
        
        if(params)
        {
            const instruction = `#${code}%${params}*${msg}`;
            localDataTrackPublication.track.send(instruction);
        }
        else
        {
            const instruction = `#${code}*${msg}`;
            localDataTrackPublication.track.send(instruction);
        }


        switch(code)
        {
            case "spin": handleSpin();
            break;
            
            case "performer_found": handlePerformerFound(msg, params);
            break;
        }
    }

    // types: error, warning, info, success
    const handleOpenNotif = (msg, type)=>{
        setNotifMsg(msg);
        setNotifType(type);
        setOpenNotif(true);
    }
    // handle spin event for rest
    const handleRemoteSpin = (msg, params)=>{
        handleOpenNotif(`${params} ${msg}`, "success");
        setSpinning(true);
        setBarMsg("Spinning...");
    }

    // hanle spin event for spinner
    const handleSpin = async ()=>{

        // to prevent multiple spin requests
        if(!spinning)
        {
            setSpinning(true);
            setBarMsg("Spinning...");
            
            // get random participant from server
            const result = await getPerformerApi.request({room: roomName});

            if(!result.ok)
            {
                if(result.data) {
                    // set error notif
                    handleOpenNotif(result.data.error, 'error');
                    sendMessage(result.data.error, 'error')
                }
                else {
                    // set error notif
                    handleOpenNotif("An unexpected error occurred.", 'error');
                    sendMessage("An unexpected error occurred.", 'error');
                }
                setSpinning(false)
                return;
            }

            // wait for some time before displaying result(10 seconds delay)
            setTimeout(()=>sendMessage(`Bottle 🍾 is pointing towards ${result.data.participant}.\nWaiting for ${result.data.participant} to choose`, "performer_found", result.data.participant),  5000)
            // sendMessage(`Bottle is pointing towards ${result.participant}. Waiting for ${result.participant} to choose`, "performer_found")
        }

    }

    const handlePerformerFound = (msg, params)=>{
        if(params === room.localParticipant.identity)
        {
            handleOpenNotif("Bottle stopped while poiting to You!!!", "info")
            setPerformer(true);
        }
        else
            setBarMsg(msg);
    }

    const handleCancelEvent = ()=>{

        cleanUp();
        sendMessage("cancelled the game", "perform_cancel", room.localParticipant.identity);
    }

    const handleRemoteCancelEvent = (msg, params)=>{

        handleOpenNotif(`${params} ${msg}`, "error");
        cleanUp();
    }

    const handleNotifClose = (event, reason)=>{
        // from material UI docs
        if (reason === 'clickaway') {
            return;
          }
      
          setOpenNotif(false);
    }

    const handleRadioChange = (event)=>{
        setTaskValue(event.target.value);
        setHelperText(' ');
        setPerformerError(false);
    }

    const handleTaskSubmit = (event)=>{
        event.preventDefault();

        if(taskValue === "truth")
        {
            setHelperText("Speak truth only 😇");
            setPerformerError(false);
        }
        else if(taskValue === "stare")
        {
            setHelperText("🧐🧐🧐");
            setPerformerError(false);
        }
        else if(taskValue === "dare")
        {
            setHelperText("Be carefull!!! 🤕🤕");
            setPerformerError(false);
        }
        else
        {
            setHelperText("Please select an option");
            setPerformerError(true);
        }


    }

    const RenderSpinning = ()=>{

        if(performer)

            return (
                <form onSubmit={handleTaskSubmit}>
                    <FormControl component="fieldset" error={performerError}>
                        <FormLabel component="legend">Choose Your Task Type</FormLabel>
                        <RadioGroup aria-label="choose_task" name="choose_task" value={taskValue} onChange={handleRadioChange}>
                            <FormControlLabel value="truth" control={<Radio />} label="Truth 😐"/>
                            <FormControlLabel value="dare" control={<Radio />} label="Stare 😳"/>
                            <FormControlLabel value="stare" control={<Radio />} label="Dare 😲"/>
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>

                        <Button type="submit" variant="outlined" color="primary" className={classes.performSubmitButton}>
                            Perform Task
                        </Button>
                    </FormControl>
                </form>
            );

            else if(taskGiver)

                return (
                        <>
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
                        
                    
                        <Hidden smUp>

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
                        </>
                );
            else 

                return (
                    <Typography 
                    variant="h6" 
                    align="center" 
                    color="secondary">
                        {barMsg}
                        <br/>
                        <CircularProgress color="secondary"/>
                    </Typography>
                );
    }

    return (
        
        <div className={classes.root}>
        {/* dark theme */}
        <ThemeProvider theme={theme}>
            {/* Snack Bar */}
            <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
            open={openNotif} 
            autoHideDuration={120000} 
            onClose={handleNotifClose}>

                <Alert onClose={handleNotifClose} severity={notifType}>
                    {notifMsg}
                </Alert>

            </Snackbar>
            {/* Snack Bar end */}

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
                                        {roomName}
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
                                        {score}
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
                            {/* Local Participant always availaible*/}
                            <VideoPlayer 
                            participant={room.localParticipant} 
                            local={true}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            />
                        </Grid>

                        <Grid item>
                            {/* Participant 1 */}
                            {participants[0]?
                            <VideoPlayer 
                            participant={participants[0]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}/>
                            :
                            <VideoPlayerDisplay />
                            }
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
                            {participants[1]?
                            <VideoPlayer 
                            participant={participants[1]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}/>
                            :
                            <VideoPlayerDisplay />
                            }
                        </Grid>

                        <Grid item>
                            {/* participant 3 */}
                            {participants[2]?
                            <VideoPlayer 
                            participant={participants[2]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}/>
                            :
                            <VideoPlayerDisplay />
                            }
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
                            {/* Local participant video */}
                            <VideoPlayer 
                            participant={room.localParticipant} 
                            local={true}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            />
                        </Grid>

                        <Grid item className={classes.mobileGridItem}>
                            {/* participant 1 */}
                            {participants[0]?
                            <VideoPlayer 
                            participant={participants[0]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}/>
                            :
                            <VideoPlayerDisplay />
                            }
                        </Grid>

                        <Grid item className={classes.mobileGridItem}>
                            {/* participant 2 */}
                            {participants[1]?
                            <VideoPlayer 
                            participant={participants[1]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}/>
                            :
                            <VideoPlayerDisplay />
                            }
                        </Grid>

                        <Grid item className={classes.mobileGridItem}>
                            {/* participant 3 */}
                            {participants[2]?
                            <VideoPlayer 
                            participant={participants[2]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}/>
                            :
                            <VideoPlayerDisplay />
                            }
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
                        {spinning?
                        // While spinning
                        <>

                            <RenderSpinning />
                            <Button
                            onClick={handleCancelEvent}
                            variant="outlined" 
                            color="secondary"
                            size="large"
                            style={{marginTop: '20px'}}
                            endIcon={<CancelOutlinedIcon />}
                            >   
                            Cancel
                            </Button>
                        </>
                        :
                        // Main Buttons
                        <>
                            <Grid item >
                                <Button
                                onClick={()=>sendMessage("spun the bottle", "spin", room.localParticipant.identity)}
                                variant="outlined" 
                                color="secondary"
                                size="large"
                                style={{marginBottom: '20px'}}
                                endIcon={<ThreeSixtyIcon />}
                                >   
                                SPIN
                                </Button>
                            </Grid>

                            <Grid item>
                                <Button
                                onClick={handleLogout}
                                variant="outlined" 
                                color="secondary"
                                size="large"
                                style={{marginTop: '20px '}}
                                endIcon={< ExitToAppOutlinedIcon/>}
                                >   
                                Leave Room
                                </Button>
                            </Grid>
                        </>
                        }
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