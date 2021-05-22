import React from 'react';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import ThemeButton from '../Components/ThemeButton';

import { motion} from 'framer-motion';
import {makeStyles} from '@material-ui/core';

import colors from '../config/colors';

const useStyles = makeStyles((theme)=> {
    return {
    btn_1: {
        marginRight: theme.spacing(4),
    },
    btn_2: {
        marginLeft: theme.spacing(4) 
    },
    itemContainer: {
        marginTop: theme.spacing(20)
    },
    btnContainer: {
        display: "flex",
        justifyContent: "center",
    },
    bottleContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(10)
        // alignItems: "center"
    },
    table: {
        height: "300px",
        width: "300px",
        [theme.breakpoints.down('sm')]: {
            height: "200px",
            width: "200px",
        },
        backgroundColor: colors.text
    },
    bottle: {
        height: "150px",
        width: "150px",
        [theme.breakpoints.down('sm')]: {
            height: "80px",
            width: "80px",
        },
    }
}
});

const divVariant = {
    initial: {opacity: 0},
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};

// rotation of the bottle infinity
const rotateVariant = {
    hidden: {rotate: 0},
    visible: {
        rotate: 360*10,
        transition: {
            type: "spring",
            stiffness: 9,
            repeat: Infinity
        }
    }
}

function Option({handleClick}) {

    const classes = useStyles();

    return (

        <Grid
        container
        alignItems="center"
        style={{overflow: "hidden"}}
        >
            {/* vertically Centered Container */}
            <Grid item xs={12} >

                {/* Item Container */}
                <Grid
                container
                direction="column"
                className={classes.itemContainer}
                // spacing={3}
                >
                    {/* Option Buttons */}
                    <Grid item xs={12} >

                        <div className={classes.btnContainer}>
                        <motion.div
                        variants={divVariant}
                        initial='initial'
                        animate='animate'
                        whileHover={{scale:1.2}}
                        style={{display: "inline-block"}} 
                        >
                        <ThemeButton 
                        color="primary" 
                        text="CREATE ROOM" 
                        style={classes.btn_1}
                        onClick={()=>handleClick('create')}
                        />
                        </motion.div>
                        
                        <motion.div
                        variants={divVariant}
                        initial='initial'
                        animate='animate'
                        whileHover={{scale:1.2}}  
                        style={{display: "inline-block"}}
                        >
                        <ThemeButton 
                        color="secondary" 
                        text="JOIN ROOM" 
                        style={classes.btn_2}
                        onClick={()=>handleClick('join')}
                        />
                        </motion.div>
                        </div>

                    </Grid>
                    {/* Option Buttons End*/}
                    
                    {/* Bottle spin */}
                    <Grid item xs={12}>

                        <motion.div 
                        variants={divVariant}
                        initial='initial'
                        animate='animate'
                        className={classes.bottleContainer}>

                            <Avatar alt="table" className={classes.table}>

                                {/* Spin animation */}
                                <motion.div
                                variants={rotateVariant}
                                initial="hidden"
                                animate={"visible"}
                                >
                                    <Avatar alt="bottle" src="./spinner.png" className={classes.bottle}/>
                                </motion.div>
                            </Avatar>
                            
                        
                        </motion.div>

                    </Grid>
                    {/* Bottle spin Ends*/}

                </Grid>
                {/* Item Container End */}

            </Grid>
            {/* Centered Container end */}
            
            
                
        </Grid>
    
    );
}

export default Option;