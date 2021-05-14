import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { blue, purple } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    onNameChange, onRoomChange ,error, loading, isJoin, name, room}) {

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
            

                {/* Dynamic Input Field */}
                {isJoin&&
                <>
                <br/>
                <TextField
                onChange={onRoomChange}
                className={classes.input}
                color="primary"
                required 
                label={label}
                error={error?true:false}
                value={room}
                />
                </>
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