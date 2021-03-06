import React from 'react';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme)=>{
    return {
        inputContainer: {
            backgroundColor: "#e0e0e0",
            // padding: theme.spacing(10)
        },
        iconContainer: {
            display: "flex",
            justifyContent: "flex-start"
        },
        fieldContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
            paddingBottom: theme.spacing(10),
            paddingTop: theme.spacing(5)
        },
    }
});

const divVariant = {
    initial: {
        opacity: 0,
        y:"10vw"
    },
    animate: {
        opacity: 1,
        y:0,
        transition: {
            duration: 0.5
        }
    }
}

function InputContainer({children, handleClick, style}) {

    const classes = useStyles();

    return (
        <motion.div
        variants={divVariant}
        initial='initial'
        animate='animate'
        style={style}
        >
            <Paper className={classes.inputContainer}>
                
                <div className={classes.iconContainer}>
                    <IconButton
                    onClick={()=>handleClick('option')}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </div>

                <div className={classes.fieldContainer}>
                    {children}
                </div>

            </Paper>
        </motion.div>
    );
}

export default InputContainer;