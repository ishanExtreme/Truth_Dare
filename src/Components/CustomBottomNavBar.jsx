import React, { useState } from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme)=>{
    return {

        bottomNav: {
            width: 500,
            [theme.breakpoints.down('xs')]: {
               width: 350
            },
            marginTop: theme.spacing(3),
            backgroundColor: "transparent"
        },
        
    };
});

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: yellow
    }
});

function CustomBottomNavBar({navValue, handleBottomNavChange}) {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <BottomNavigation
            value={navValue}
            onChange={handleBottomNavChange}
            className={classes.bottomNav}
            >
                <BottomNavigationAction label="Help" value="help" icon={<HelpIcon />}/>
                <BottomNavigationAction label="Game" value="game" className={classes.iconBottomNav} icon={<SportsEsportsIcon />}/>
                <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />}/>
            </BottomNavigation>
        </ThemeProvider>
    );
}

export default CustomBottomNavBar;