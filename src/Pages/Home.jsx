import React from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

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

        
    };
});

const theme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

function Home(props) {

    const classes = useStyles();

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

                {/* Video Player Pair one */}
                <Grid item xs={12}>
                    <Grid 
                    container
                    justify="space-between">
                        <Grid item>
                            <VideoPlayer />
                        </Grid>

                        {/* Buttons */}
                        <Grid item>    

                            <Grid
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="center"
                            style={{height: '100%'}}
                            >
                                
                                <Grid item>
                                    <Button
                                    variant="outlined" 
                                    color="secondary"
                                    size="large"
                                    endIcon={<ThreeSixtyIcon />}
                                    style={{marginTop: '100px'}}
                                    >   
                                    SPIN
                                    </Button>
                                </Grid>

                                <Grid item>

                                    <ButtonGroup>
                                        <Button
                                        variant="outlined" 
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
                                        endIcon={<AssignmentTurnedInOutlinedIcon />}
                                        >   
                                        Task Done?
                                        </Button>
                                    </ButtonGroup>

                                </Grid>

                            </Grid>

                        </Grid>
                        {/* Button End */}

                        <Grid item>
                            <VideoPlayer />
                        </Grid>
                    </Grid>
                </Grid>
                {/* Pair one end */}

                {/* Video Player Pair two */}
                <Grid item xs={12}>
                    <Grid 
                    container
                    justify="space-between">
                        <Grid item>
                            <VideoPlayer />
                        </Grid>

                        {/* Buttons */}
                        <Grid item>    
                          
                            <Button
                            variant="outlined" 
                            color="secondary"
                            size="large"
                            endIcon={< ExitToAppOutlinedIcon/>}
                            style={{marginTop: '100px'}}
                            >   
                            Leave Room
                            </Button>
                                
                        </Grid>
                        {/* Button End */}

                        <Grid item>
                            <VideoPlayer />
                        </Grid>
                    </Grid>
                </Grid>
                {/* Pair two end */}

            </Grid>
            {/* Main Container End */}

        </ThemeProvider>
        </div>
    );
}

export default Home;