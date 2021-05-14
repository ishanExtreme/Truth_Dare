import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

const useStyles = makeStyles((theme)=> {
    return {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#212121",
    },
    paper: {
        alignItems: "center",
        position: "absolute",
        backgroundColor: "#212121",
        padding: 20,
        [theme.breakpoints.down('xs')]: {
            width: '300px',
            marginTop: theme.spacing(35),
        },
        [theme.breakpoints.between('sm', 'lg')]: {
            width: '500px',
        },
        border: 'solid 2px #ffab00'
    },

    modalStyle:{
        [theme.breakpoints.down('sm')]: {         
            overflow:'scroll',
        },
    }
}
})

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

function Test(props) {

    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalClose = ()=>{
        setModalOpen(false);
    }

    const handleModalOpen = ()=>{
        setModalOpen(true);
    }

    

    return (
        <div className={classes.container}>
        <ThemeProvider theme={theme}>

            <CssBaseline />
            <Button onClick={handleModalOpen} variant="outlined" color="secondary">
                Open
            </Button>

            <Modal
            open={modalOpen}
            onClose={handleModalClose}
            className={classes.modalStyle}
            
            >
                <div style={getModalStyle()} className={classes.paper}>
                {/* heading */}
                <Typography variant="h4" color="secondary" align="center">
                    How To Play??
                </Typography>
                <br/>
                {/* step 1 */}
                <Typography variant="subtitle2" color="secondary">
                    1. Share room id with friends and invite 
                    them to room(atleast two player are required to play the game).
                </Typography>
                <br/>
                {/* step 2 */}
                <Typography variant="subtitle2" color="secondary">
                    2. Any "one" player clicks the "SPIN" button to start the game.
                </Typography>
                <br/>
                {/* step 3 */}
                <Typography variant="subtitle2" color="secondary">
                    3. After spin is completed one player is choosen as the "Performer"
                    and is given option to choose "Truth", "Dare" or "Stare".
                </Typography>
                <br/>
                {/* step 4 */}
                <Typography variant="subtitle2" color="secondary">
                    4. "Performer" will now choose a "task type" and from rest of
                    the players a "Task Giver" is choosen who gives task and assigns score
                    to the "Perfomer".
                </Typography>
                <br/>
                {/* step 5 */}
                <Typography variant="subtitle2" color="secondary">
                    5. After "Performer" finishes the assigned task now "Task Giver"
                    whill click on either "Task Completed"(awards 1 score to "Performer")
                    or "Task Not Completed"(awards 0 score to "Performer").
                </Typography>
                <br/>
                <br/>
                {/* notes */}
                <Typography variant="h4" color="secondary" align="center">
                    Note:
                </Typography>
                <br/>
                {/* note 1 */}
                <Typography variant="subtitle2" color="secondary">
                    1. Maximum number of participants joined at a time is 4.
                </Typography>
                <br/>
                {/* note 2 */}
                <Typography variant="subtitle2" color="secondary">
                    2. Once the "Spinning" is started no other player can join
                    the room until "Spin" is finished or any player presses the
                    "Cancel" button.
                </Typography>
                <br/>
                {/* note 3 */}
                <Typography variant="subtitle2" color="secondary">
                    3. If for some reason "Performer" or "Task Giver" gets
                    disconnected from the room other players needs to press
                    the "Cancel" button to stop the unfinished game.
                </Typography>
                <br/>
                {/* note 4 */}
                <Typography variant="subtitle2" color="secondary">
                    4. If for some reason player gets disconnected from the room
                    his/her score is stored and can join with the "exact same" name
                    to start from where he/she left
                </Typography>
                <br/>
                <br/>
                <Typography align="center">
                    <Button 
                    variant="outlined" 
                    color="secondary"
                    onClick={handleModalClose}
                    size="large"
                    >
                        Start Playing
                    </Button>
                </Typography>
                </div>

            </Modal>
        </ThemeProvider>
        </div>
    );
}

export default Test;