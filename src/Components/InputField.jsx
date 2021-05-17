import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { blue, purple } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles((theme)=>{
    return {

        input: {
            marginBottom: theme.spacing(3),
        },
        button: {
            marginLeft: theme.spacing(2)
        },
        loading: {
            marginLeft: theme.spacing(10)
        },
        error: {
            marginBottom: theme.spacing(1),
        },
        radioForm: {
            marginBottom: theme.spacing(3),
        }
    }
})

// Theme
const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: blue
    }
})

function InputField({label, handleSubmit, buttonLabel, 
    onNameChange, onRoomChange ,error, loading, isJoin, name, room, playersNumber, handleRadioChange}) {

    const classes = useStyles();
    
    return (
        <ThemeProvider theme={theme}>
            <form 
            noValidate autoComplete="off" 
            onSubmit={handleSubmit}
            >   
                {/* Name field */}
                <TextField
                onChange={onNameChange}
                className={classes.input}
                color="primary"
                required 
                label="User Name"
                error={error?true:false}
                value={name}
                />

                <br/>

                {isJoin?

                // Room Name Input 
                <TextField
                onChange={onRoomChange}
                className={classes.input}
                color="primary"
                required 
                label={label}
                error={error?true:false}
                value={room}
                />

                :

                // Select number of players
                <FormControl component="fieldset" className={classes.radioForm}>
                    <FormLabel component="legend">Maximum Number of Players</FormLabel>
                    <RadioGroup aria-label="choose_players" name="choose_players" value={playersNumber} onChange={handleRadioChange}>
                        <FormControlLabel value="two" control={<Radio />} label="Two(Including You)"/>
                        <FormControlLabel value="three" control={<Radio />} label="Three(Including You)"/>
                        <FormControlLabel value="four" control={<Radio />} label="Four(Including You)"/>
                    </RadioGroup>
                </FormControl>
                }

                {error && 
                 <Typography 
                 variant="subtitle2" 
                 color="error"
                 className={classes.error}>
                     {error}
                 </Typography>
                 }

                <br/>
                {loading?
                    <CircularProgress 
                    className={classes.loading}
                    color="secondary"/>
                    :
                    // Submit Button
                    <Button
                    className={classes.button}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    >
                    {buttonLabel}
                    </Button>
                }
                
            </form>
        </ThemeProvider>
    );
}

export default InputField;