import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{
    return {

        coffeeButton: {
            marginRight: theme.spacing(30),
            [theme.breakpoints.down('lg')]: {
                marginRight: theme.spacing(0),
            },
            cursor: 'pointer'

        }
    };
});

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

function HelpView({handleModalOpen}) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            {/* How to play button */}
            <Grid item>
                <Button
                onClick={handleModalOpen}
                variant="outlined" 
                color="secondary"
                size="large"
                style={{marginBottom: '20px'}}
                >
                    How To Play?
                </Button>
            </Grid>

            {/* contact me button */}
            <Grid item>
                <Button
                // open my github id in new tab
                onClick={()=>window.open("https://github.com/ishanExtreme")}
                variant="outlined" 
                color="secondary"
                size="large"
                style={{marginBottom: '20px'}}
                endIcon={<PermContactCalendarOutlinedIcon />}
                >
                    Contact Me
                </Button>
            </Grid>

            {/* Donate Button */}
            <Grid item>
                <a 
                onClick={()=>window.open("https://www.buymeacoffee.com/ishanExtreme")}
                className={classes.coffeeButton}
                >
                    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=ishanExtreme&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"/>

                </a>
            </Grid>

        </ThemeProvider>
    );
}

export default HelpView;