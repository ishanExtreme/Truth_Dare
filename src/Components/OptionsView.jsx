import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';


import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
    return {
        progressBar: {
            marginBottom: theme.spacing(5),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
        },
        performSubmitButton: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(6),
            width: '200px'
        },
        radioForm: {
            maxWidth: '300px',
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        }
       
    };
});

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

function OptionsView({sendMessage, localParticipantIdentity, concluding, spinning, handleOpenNotif, participants, emojiCooldown, handleEmojiCooldown}) {

    const classes = useStyles();
    
    // show sticker form
    // define it in home page to stop re rendering on every notifications
    const [stickerForm, setStickerForm] = useState(false);
    // form user name
    const [name, setName] = useState("");
    // form helper text
    const [helper, setHelper] = useState("Select whom to send sticker");
    // form error
    const [error, setError] = useState(false);
    // form emoji
    const [emoji, setEmoji] = useState("❤️");

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(name)
        {
            setHelper(`${name} selected`);
            sendMessage(`${localParticipantIdentity} sent ${emoji}`, "emoji_send", `${emoji},${name}`);
            // button disabled for 30 seconds
            handleEmojiCooldown(true);

            handleOpenNotif("Sticker Sent", "success");

            setTimeout(()=>{
                handleEmojiCooldown(false);
            }, 30000);
        }
        else
        {
            setError(true);
            setHelper("Select a username!!!");
        }
    };

    const handleChange = (event)=>{
        setError(false);
        setName(event.target.value);
        setHelper("Select whom to send sticker");
    };

    const handleRadioChange = (event)=>{
        setEmoji(event.target.value);
    }

    const RenderSendSticker = ()=>{

        return (
            <>
            <form onSubmit={handleSubmit}>
                <FormControl className={classes.formControl} error={error}>
                    <InputLabel htmlFor="username-select">Select Username</InputLabel>
                    <Select
                    native
                    value={name}
                    onChange={handleChange}
                    inputProps={{
                        name: "name",
                        id: "username-select"
                    }}
                    >
                        <option aria-label="None" value=""/>
                        {/* render all participants options */}
                        {participants.map((participant)=>{
                            return (
                             <option
                             key={participant.identity}
                             value={participant.identity}>
                                 {participant.identity}
                            </option>
                            );
                        })}
                        
                    </Select>
                    <FormHelperText>{helper}</FormHelperText>
                </FormControl>

                <br/>

                <FormControl component="fieldset" className={classes.radioForm}>
                    <FormLabel component="legend">Select Emoji</FormLabel>
                    <RadioGroup row aria-label="choose-emoji" name="choose-emoji" value={emoji} onChange={handleRadioChange}>
                        <FormControlLabel value="❤️" control={<Radio />} label="❤️"/>
                        <FormControlLabel value="😍" control={<Radio />} label="😍"/>
                        <FormControlLabel value="😂" control={<Radio />} label="😂"/>
                        <FormControlLabel value="😎" control={<Radio />} label="😎"/>
                        <FormControlLabel value="😭" control={<Radio />} label="😭"/>
                        <FormControlLabel value="😱" control={<Radio />} label="😱"/>
                    </RadioGroup>
                </FormControl>

                <br/>

                <Button type="submit" variant="outlined" color="primary" className={classes.performSubmitButton}>
                    SEND
                </Button>
            </form>

            {/* Back Button */}
            <Button
            onClick={()=>setStickerForm(false)}
            variant="outlined" 
            color="secondary"
            size="large"
            style={{marginBottom: '20px', marginTop: '20px'}}
            >  
            BACK
            </Button>
            </>
        );
        
    };

    return (
    <ThemeProvider theme={theme}>

        {!stickerForm?
        <>
            {/* Conclude Game Button */}
            {!concluding?
                <Grid item>
                    <Button
                    onClick={()=>sendMessage(`${localParticipantIdentity} concluded the game`, "conclude")}
                    variant="outlined" 
                    color="secondary"
                    size="large"
                    style={{marginBottom: '20px'}}
                    // disable the button while spinning is going on
                    disabled={spinning}
                    endIcon={<TouchAppOutlinedIcon />}
                    >
                        Conclude Game
                    </Button>
                </Grid>
                :
                <CircularProgress color="prmary" className={classes.progressBar}/>
                } 

                <Grid item>

                    <Typography variant="h6" color="secondary">
                        You Can Send Only One Sticker Per 30 Seconds
                    </Typography>

                </Grid>
                {/* Send Stickers button */}
                <Grid item>
                   
                    <Button
                    onClick={()=>setStickerForm(true)}
                    variant="outlined" 
                    color="secondary"
                    size="large"
                    style={{marginBottom: '20px', marginTop: '20px'}}
                    disabled={emojiCooldown}
                    endIcon={<SendOutlinedIcon />}
                    >
                        Send Stickers
                    </Button>
                    
                </Grid>
            </>
            :
            // sticker send form
            <RenderSendSticker />
        }
        

        {/* Kick Player button */}
        

    </ThemeProvider>
    );
}

export default OptionsView;