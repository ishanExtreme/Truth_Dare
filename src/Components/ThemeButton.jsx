import React from 'react';
import Button from '@material-ui/core/Button';
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: blue
    }
})

function ThemeButton({color, text, style, onClick}) {

    return (
        <ThemeProvider theme={theme}>
            <Button
                variant="contained"
                color={color}
                size="large"
                className={style}
                onClick={onClick}
            >
                {text}
            </Button>
        </ThemeProvider>
    );
}

export default ThemeButton;