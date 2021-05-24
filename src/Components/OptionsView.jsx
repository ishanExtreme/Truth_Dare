import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
    return {
        progressBar: {
            marginBottom: theme.spacing(5),
        }
       
    };
});

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

function OptionsView({sendMessage, localParticipantIdentity, concluding}) {

    const classes = useStyles();
    

    return (
    <ThemeProvider theme={theme}>

        {/* Conclude Game Button */}
        {!concluding?
        <Grid item>
            <Button
            onClick={()=>sendMessage(`${localParticipantIdentity} concluded the game`, "conclude")}
            variant="outlined" 
            color="secondary"
            size="large"
            style={{marginBottom: '20px'}}
            endIcon={<TouchAppOutlinedIcon />}
            >
                Conclude Game
            </Button>
        </Grid>
        :
        <CircularProgress color="prmary" className={classes.progressBar}/>
        } 

        {/* Send Stickers button */}
        <Grid item>
            <Button
            // onClick={()=>window.open("https://github.com/ishanExtreme")}
            variant="outlined" 
            color="secondary"
            size="large"
            style={{marginBottom: '20px'}}
            endIcon={<SendOutlinedIcon />}
            >
                Send Stickers
            </Button>
        </Grid>

        {/* Kick Player button */}
        <Grid item>
            <Button
            // onClick={()=>window.open("https://github.com/ishanExtreme")}
            variant="outlined" 
            color="secondary"
            size="large"
            style={{marginBottom: '20px'}}
            endIcon={<RemoveCircleOutlineOutlinedIcon />}
            >
                Kick Player
            </Button>
        </Grid>

    </ThemeProvider>
    );
}

export default OptionsView;