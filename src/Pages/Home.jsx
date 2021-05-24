import React, { useEffect, useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider, withWidth } from '@material-ui/core';
import {motion} from 'framer-motion';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import Slide from '@material-ui/core/Slide';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import GamepadOutlinedIcon from '@material-ui/icons/GamepadOutlined';

import './home.css';
import VideoPlayer from '../Components/VideoPlayer';
import VideoPlayerDisplay from '../Components/VideoPlayerDisplay';
import RuleModal from '../Components/RuleModal';

import useApi from '../hooks/useApi';
import gameApi from '../api/game';
import colors from '../config/colors';
import CustomBottomNavBar from '../Components/CustomBottomNavBar';
import HelpView from '../Components/HelpView';
import OptionsView from '../Components/OptionsView';

// for snackbar
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme)=>{
    return {
        root: {
            flexGrow: 1,
            padding: theme.spacing(3),
            background: colors.background,
            height: '100%'
        },
        container: {
            background: colors.background,
            height: '100%'
        },
        contentBox: {
            display: 'inline-block',
            padding: theme.spacing(2),
            backgroundColor: colors.homeElements
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
            // paddingTop: theme.spacing(5),
            // paddingBottom: theme.spacing(5),
            paddingInline: theme.spacing(1),
            // backgroundColor: theme.palette.primary.light
            // paddingLeft: theme.spacing(1)
        },
        expandButton: {
            marginBottom: theme.spacing(3),
        },
        performSubmitButton: {
            margin: theme.spacing(1, 5, 0, 0),
        },
        progress: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(5)
        },
        progressTasker: {
            marginLeft: theme.spacing(1)
        },
        radioOption: {
            marginLeft: theme.spacing(5)
        },
        snackNotif: {
            maxWidth: '600px',
            [theme.breakpoints.down('md')]: {
                width: '400px',
            },
        },
        spinner: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        spinImg: {
            width: '100px',
            height: '100px'
        },
        floatingExpand: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
            zIndex: 1
        },
        // mobileContainer: {

        // }

        
    };
});

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

// rotation of the bottle
const rotateVariant = {
    hidden: {rotate: 0},
    visible: {
        rotate: 360*10,
        transition: {
            type: "spring",
            stiffness: 9,
        }
    }
};

// button bar animations
const buttonBarVariant = {
    initial: {opacity: 0},
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};


// stores performer name in task_giver session
let performer_identity = "";

// stores score of participants
let participantScoresValue = [];

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
    // when user start performing task
    const [performingTask, setPerformingTask] = useState(false);
    // while assigning score
    const [assigningScore, setAssigningScore] = useState(false);
    // for handle game rules modal
    const [modalOpen, setModalOpen] = useState(true);
    // for expanding appbar
    const [expand, setExpand] = useState(true);
    // navValue
    const [navValue, setNavValue] = useState("game");
    // players score value
    const [showScore, setShowScore] = useState(false);
    // score view loading
    const [scoreLoading, setScoreLoading] = useState(false);
    // conclude loading
    const [concluding, setConcluding] = useState(false);

    // to be run after spinning is completed
    const cleanUp = async ()=>{

        setSpinning(false);
        setBarMsg('');
        setTaskGiver(false);
        setPerformer(false);
        setPerformerError(false);
        setTaskValue('');
        setHelperText("Lets go for dare...");
        setPerformingTask(false);
        performer_identity = "";
        setAssigningScore(false);

        await spinOverApi.request({roomId: room.sid});

    }

    const handleTimeoutRemove = ()=>{

        // logout if single participant is present in the room
        // send notif after 3 minutes
        // disconnect after another 2 minutes
        if(room.participants.size === 0)
        {
            setTimeout(()=>{
                handleOpenNotif('Invite some players or the room will be "DISCONNECTED" in another 2 minutes...', "error")
                setTimeout(()=>{
                    if(room.participants.size === 0) handleLogout();
                        
                }, 120000)
            }, 180000)
        }

    }

    useEffect(()=> {
        
        // when a participant connects
        const participantConnected = participant => {
            setParticipants(prevParticipants=> [...prevParticipants, participant]);
            
            // notify when new participant joins
            handleOpenNotif(`${participant.identity} joined`, "success");
        };
        
        // when a participant disconnects
        const participantDisconnected = participant => {
            setParticipants(prevParticipants=> 
                prevParticipants.filter(p=> p!==participant)
            );
            
            // notify when participant leaves
            handleOpenNotif(`${participant.identity} left`, "warning");
            // when participant disconnect
            handleTimeoutRemove();
        };

        
        // listener on participants connect   
        room.on('participantConnected', participantConnected);
        // listener on participant disconnects   
        room.on('participantDisconnected', participantDisconnected);
        // initial mounting store all current users  
        room.participants.forEach(participantConnected);

        // for the first when joined
        handleTimeoutRemove();

        return ()=> {
            // ------- Not Known --------
            room.off("participantConnected", participantConnected);
            room.off("participantDisconnected", participantDisconnected);
            // ------- Not Known --------
        };

    }, [room]);

    const classes = useStyles();

    const getPerformerApi = useApi(gameApi.performer);
    const getTaskerApi = useApi(gameApi.task_giver);
    const scoreUpdateApi = useApi(gameApi.score_update);
    const spinOverApi = useApi(gameApi.spin_over);
    const getScoresApi = useApi(gameApi.get_scores);
    const getWinnersApi = useApi(gameApi.get_winners);

    // format of instruction codes are=>
    // #code%params*msg
    // params are comma seperated
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

            case "tasker_found": 
                params = params.split(",");
                handleTaskerFound(msg, params[0], params[1]);
            break;

            case "spin_over":
                params = params.split(",");
                handleSpinOverEvent(msg, params[0], params[1]);
            break;

            case "conclude":
                handleConcludeGame();
            break;

            case "winner_found":
                params = params.split(",");
                handleWinnerFound(msg, params);
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
    const handleRemoteSpin = async (msg, params)=>{
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
                cleanUp();
                return;
            }

            // wait for some time before displaying result(3 seconds delay)
            setTimeout(()=>sendMessage(`Bottle 🍾 is pointing towards ${result.data.participant}.Waiting for ${result.data.participant} to choose`, "performer_found", result.data.participant),  2000)
            // sendMessage(`Bottle is pointing towards ${result.participant}. Waiting for ${result.participant} to choose`, "performer_found")
        }

    }

    const handleSpinOverEvent = (msg, scoreValue, performer)=> {

        if(performer === room.localParticipant.identity)
        {
            if(scoreValue === '1'){
                setScore(prevScore=> prevScore+1);
                handleOpenNotif("Congratulations you successfully completed the task 🎉🎉", "success");

            }
            else
            {
                handleOpenNotif("You failed to complete the task 🙄🙄", "error");
            }
            cleanUp();
            
        }
        else
        {
            handleOpenNotif(msg, "info");
            cleanUp();
        }
    }
    const handlePerformerFound = (msg, params)=>{
        if(params === room.localParticipant.identity)
        {
            handleOpenNotif("Bottle stopped while pointing to You!!!", "info")
            setPerformer(true);
        }
        else
            setBarMsg(msg);
    }

    const handleTaskerFound = (msg, tasker, performer, task)=>{

        if(tasker === room.localParticipant.identity)
        {
            handleOpenNotif(`You are choosen to assign ${task.toUpperCase()} to ${performer}`, "info")
            setTaskGiver(true);

            performer_identity = performer;
        }
        else
            setBarMsg(msg);
    }

    const handleRemoteError = (msg)=>{
        
        handleOpenNotif(msg+'. Please press "Cancel"', "error");
    }

    const handleScoreUpdate = async (taskCompleted)=> {

        setAssigningScore(true);

        let scoreValue=0;
        if(taskCompleted) scoreValue = 1;

        const result = await scoreUpdateApi.request({roomId: room.sid, identity: performer_identity, score: scoreValue});

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
                cleanUp();
                return;
            }

            // msg, code, params
            if(scoreValue === 1)
                sendMessage(`${performer_identity} successfully completed the task`, "spin_over", `${scoreValue},${performer_identity}`);
            else
                sendMessage(`${performer_identity} was not able to complete the task`, "spin_over", `${scoreValue},${performer_identity}`);

    };

    const handleRemoteConcludeError = (msg)=>{

        setConcluding(false);

        handleOpenNotif(msg, "error");
    };

    const handleRemoteConcludeGame = (msg)=>{
        setConcluding(true);

        handleOpenNotif(msg, "info");

        // automatically set conclude to false after tirty seconds
        // to avoid infinite loading
        setTimeout(()=>{
            
            setConcluding(false);
            handleOpenNotif("Concluding failed", "error");
            
        }, 30000);
    }

    const handleConcludeGame = async ()=>{

        // if no other user has pressed the conclude button
        if(!concluding)
        {
            setConcluding(true);
            const result = await getWinnersApi.request({roomId: room.sid, room:roomName});

            if(!result.ok)
            {
                if(result.data) {
                    // set error notif
                    handleOpenNotif(result.data.error, 'error');
                }
                else {
                    // set error notif
                    handleOpenNotif("An unexpected error occurred.", 'error');
                }
                setConcluding(false);
                // send message to others to stop their conclude loading also
                sendMessage("Error occured while concluding the game", "conclude_error");
                return;
            }

            // comma seperated strings
            const stringResult = result.data.winners.toString();
            // send winners to every one
            sendMessage(`${stringResult} is/are the winner(s)`, "winner_found", stringResult);
        }
        
    };

    const handleWinnerFound = (msg, winnerList)=>{
        
        if(winnerList.includes(room.localParticipant.identity))
        {
            handleOpenNotif("Congratulations You Won The Match!!!!", "success");
            setScore(0);
            setConcluding(false);
            // ------TODO: winning stickers--------------//
        }
        else
        {
            handleOpenNotif(msg, "info");
            setScore(0);
            setConcluding(false);
        }

    };

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

    const handleTaskSubmit = async (event)=>{
        event.preventDefault();

        if(taskValue)
        {

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

            setPerformingTask(true);
            
            // get random participant from server
            const result = await getTaskerApi.request({
                room: roomName, 
                identity: room.localParticipant.identity
            });

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
                cleanUp();
                return;
            }

            
            sendMessage(`${result.data.participant} will assign and judge the task performed by ${room.localParticipant.identity}. Waiting for task to complete`, "tasker_found", `${result.data.participant},${room.localParticipant.identity},${taskValue}`);

        }
        else
        {
            setHelperText("Please select an option");
            setPerformerError(true);
        }


    };


    const handleCopyToClipboard = ()=>{

        navigator.clipboard.writeText(roomName)
        handleOpenNotif("Copied to Clipboard", "success");
    };

    const handleModalOpen = ()=>{
        setModalOpen(true);
    };

    const handleModalClose = ()=>{
        setModalOpen(false);
    }

    const SpinningBottle = ()=>{

        
        return (
            <motion.div
            variants={rotateVariant}
            initial='hidden'
            animate={barMsg==='Spinning...'?rotateVariant.visible:''}
            >
                <Avatar src="./spinner.png" className={classes.spinImg}/>
            </motion.div>
        
        );
    };

    const handleBottomNavChange = (event, newValue)=>{
        setNavValue(newValue);
    }

    const RenderSpinning = ()=>{

        if(performer)

            return (
                <form onSubmit={handleTaskSubmit}>
                    <FormControl component="fieldset" error={performerError} className={classes.radioOption}>
                        <FormLabel component="legend">Choose Your Task Type</FormLabel>
                        <RadioGroup aria-label="choose_task" name="choose_task" value={taskValue} onChange={handleRadioChange}>
                            <FormControlLabel value="truth" control={<Radio />} label="Truth 😐"/>
                            <FormControlLabel value="stare" control={<Radio />} label="Stare 😳"/>
                            <FormControlLabel value="dare" control={<Radio />} label="Dare 😲"/>
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                        {
                            performingTask?
                            <CircularProgress color="prmary" className={classes.progress}/>
                            :
                            <Button type="submit" variant="outlined" color="primary" className={classes.performSubmitButton}>
                            Perform Task
                            </Button>
                        }
                        
                    </FormControl>
                </form>
            );

            else if(taskGiver)

                return (
                <>
                {
                    assigningScore?
                    <CircularProgress color="prmary" className={classes.progressTasker}/>
                    :
                    <>
                    <Hidden xsDown>
                    <Grid item>
                        <ButtonGroup>
                            <Button
                            onClick={()=> handleScoreUpdate(true)}
                            variant="outlined" 
                            color="primary"
                            size="large"
                            endIcon={<AssignmentTurnedInOutlinedIcon />}
                            >   
                            Task Completed
                            </Button>

                            <Button
                            onClick={()=> handleScoreUpdate(false)}
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
                            onClick={()=> handleScoreUpdate(true)}
                            variant="outlined" 
                            color="primary"
                            size="large"
                            endIcon={<AssignmentTurnedInOutlinedIcon />}
                            >   
                            Task Completed
                            </Button>

                            <Button
                            onClick={()=> handleScoreUpdate(false)}
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
                }
                
                </>
                        
                );
            else 

                return (
                    <div className={classes.spinner}>
                        <Typography 
                        variant="h6" 
                        align="center" 
                        color="secondary">
                        {barMsg}
                        </Typography>
                        <br/>
                        <SpinningBottle />
                    </div>

                );
    }


    const handleScoreGetClick = async ()=>
    {

        setScoreLoading(true);
        if(participants.length !== 0)
        {
            const participantsBody = participants.map((participant)=>participant.identity);

            const result = await getScoresApi.request({
                participants: participantsBody,
                roomId: room.sid
            });

            if(!result.ok)
            {
                if(result.data) {
                    // set error notif
                    handleOpenNotif(result.data.error, 'error');
                }
                else {
                    handleOpenNotif("An unexpected error occurred.", 'error');
                }
                setScoreLoading(false);
                return;
            }

            participantScoresValue = result.data.scores;
            
        }
        // loading stops
        setScoreLoading(false);
        // score view visible
        setShowScore(true);

    }

    const RenderScoreView = ()=>{

        if(participants.length !== 0)
        {
            
            return (
                <>
                    {/* show score */}
                    {participants.map((participant)=>{
                        return (
                        <Typography 
                        color="primary" 
                        variant="h6"
                        style={{marginBottom: '10px'}}
                        >
                            {participant.identity}:{participantScoresValue[participant.identity]}
                            {/* ?participantScoresValue[participant.identity]:"Not Found"} */}
                        </Typography>
                        );
                    })}

                    {/* back button */}
                    <Button
                    onClick={()=>setShowScore(false)}
                    variant="outlined" 
                    color="secondary"
                    size="large"
                    style={{marginBottom: '20px', marginTop: '20px'}}
                    >  
                    BACK
                    </Button>
                </>
            );
        }
        else
        {
            return (
                <>       
                <Typography 
                color="primary" 
                variant="h6"
                style={{marginBottom: '10px'}}
                >
                    Invite Someone To Play :(
                </Typography>
                    

                {/* back button */}
                <Button
                onClick={()=>setShowScore(false)}
                variant="outlined" 
                color="secondary"
                size="large"
                style={{marginBottom: '20px', marginTop: '20px'}}
                >  
                BACK
                </Button>
                </>
            );
        }
    }
    // renders game window of bottom navigation
    const RenderGameWindow = ()=>{

        // While spinning
        if(spinning)
            return (
                <>
                    {!showScore?
                    // main game window
                    <>
                        <RenderSpinning />
                        <Button
                        onClick={handleCancelEvent}
                        variant="outlined" 
                        color="secondary"
                        size="large"
                        style={{marginTop: '20px', marginBottom: '20px'}}
                        endIcon={<CancelOutlinedIcon />}
                        >   
                        Cancel
                        </Button>

                        {
                        !scoreLoading?
                        <Button
                        onClick={handleScoreGetClick}
                        variant="outlined" 
                        color="secondary"
                        size="large"
                        endIcon={<GamepadOutlinedIcon />}
                        >   
                        Scores
                        </Button>
                        :
                        <CircularProgress color="prmary" className={classes.progressTasker}/>
                        }
                    </>
                    // score window
                    :
                    <RenderScoreView />
                    }
                </>
            );
        else
            return (

                <>
                    {!showScore?
                    // main window
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

                    <Grid item >
                        {
                        !scoreLoading?
                        <Button
                        onClick={handleScoreGetClick}
                        variant="outlined" 
                        color="secondary"
                        size="large"
                        endIcon={<GamepadOutlinedIcon />}
                        >   
                        Scores
                        </Button>
                        :
                        <CircularProgress color="prmary" className={classes.progressTasker}/>
                        }
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
                    :
                    // score window
                    <RenderScoreView />
                    }
                </>
            );
    }

    const RenderButtonBar = ()=>{
        
        if(navValue === "game")
            return (
                <RenderGameWindow />
            );
        else if(navValue === "help")
            return (
                <HelpView handleModalOpen={handleModalOpen}/>
            )
        else if(navValue === "options")
            return (
                <OptionsView sendMessage={sendMessage} localParticipantIdentity={room.localParticipant.identity} concluding={concluding}/>
            );
    }

    return (
        
        <div className={classes.root}>

        {/* Game rules */}
        <RuleModal modalOpen={modalOpen} handleModalClose={handleModalClose}/>

        {/* dark theme */}
        <ThemeProvider theme={theme}>
            {/* Snack Bar */}
            <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
            open={openNotif} 
            autoHideDuration={120000} 
            onClose={handleNotifClose}
            className={classes.snackNotif}
            >

                <Alert onClose={handleNotifClose} severity={notifType}>
                    {notifMsg}
                </Alert>

            </Snackbar>
            {/* Snack Bar end */}

            {/* Show(Floating) button */}
            {!expand&&
            <Fab 
            color="secondary" 
            variant="extended"
            className={classes.floatingExpand}
            onClick={()=>setExpand(prevValue=> !prevValue)}
            >
                <ExpandLessOutlinedIcon/>
                OPEN
            </Fab>}          
            {/* Show button end */}

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
                                    onClick={handleCopyToClipboard} 
                                    variant="outlined" 
                                    color="secondary"
                                    endIcon={<FileCopyOutlinedIcon/>}
                                    style={{textTransform: 'none'}}
                                    >
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
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            side="left"
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}
                            />
                        </Grid>

                        <Grid item>
                            {/* Participant 1 */}
                            {participants[0]?
                            <VideoPlayer 
                            participant={participants[0]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            side="right"
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}/>
                            :
                            <VideoPlayerDisplay side="right"/>
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
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            side="left"
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}/>
                            :
                            <VideoPlayerDisplay side="left"/>
                            }
                        </Grid>

                        <Grid item>
                            {/* participant 3 */}
                            {participants[2]?
                            <VideoPlayer 
                            participant={participants[2]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            side="right"
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}/>
                            :
                            <VideoPlayerDisplay side="right"/>
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
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}
                            />
                        </Grid>

                        <Grid item className={classes.mobileGridItem}>
                            {/* participant 1 */}
                            {participants[0]?
                            <VideoPlayer 
                            participant={participants[0]}
                            handleRemoteSpin={handleRemoteSpin}
                            handlePerformerFound={handlePerformerFound}
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}/>
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
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}/>
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
                            handleRemoteCancelEvent={handleRemoteCancelEvent}
                            handleTaskerFound={handleTaskerFound}
                            handleRemoteError={handleRemoteError}
                            handleSpinOverEvent={handleSpinOverEvent}
                            handleRemoteConcludeError={handleRemoteConcludeError}
                            handleWinnerFound={handleWinnerFound}
                            handleRemoteConcludeGame={handleRemoteConcludeGame}/>
                            :
                            <VideoPlayerDisplay />
                            }
                        </Grid>
                        
                    </Grid>

                    
                </Hidden>
                {/* Mobile View End */}
                    
                
                <Slide
                direction="up"
                in={expand}
                >
                    {/* Button Bar */}
                    <AppBar 
                    position={expand?"sticky":"fixed"}
                    // color="dark"
                    className={classes.appBar}
                    >
                        <Grid
                        container
                        direction="column"
                        alignItems="center"
                        >
                            {/* Hide button */}
                            <IconButton 
                            color="secondary" 
                            className={classes.expandButton}
                            onClick={()=>setExpand(prevValue=> !prevValue)}
                            >
                                <ExpandMoreOutlinedIcon/>
                            </IconButton>

                            {/* Render Options here */}
                            <RenderButtonBar />

                            {/* Bottmon nav */}
                            <Grid item>
                                <CustomBottomNavBar 
                                navValue={navValue} 
                                handleBottomNavChange={handleBottomNavChange}/>
                            </Grid>
                            {/* Bottmon nav ends*/}

                        </Grid>
                    </AppBar>
                    {/* Bar End */}
                </Slide>

            </Grid>
            {/* Main Container End */}

        </ThemeProvider>
        </div>
    );

}

export default withWidth()(Home);