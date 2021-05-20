import './font.css';

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ToolBar from '@material-ui/core/Toolbar';
// temp.
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

import {makeStyles} from '@material-ui/core';
import {motion} from 'framer-motion';

const useStyles = makeStyles((theme)=> {
    return {

    appBar: {
        marginTop: theme.spacing(5),
        // borderBlockEnd: `solid 2px #ffea00`
    },

    avatar: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },

    title: {
       
        fontSize: '35px',
        fontFamily: "'Pacifico', cursive",
        color: "#ffea00"
    },

    titleContainer: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(20) 
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },

    btn: {
        [theme.breakpoints.down('xs')]: {
           display: "none"
        },
    }
   
}
});

const floatIn = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
};
const floatVariant1 = {
    hidden: { y:'-10px'},
    visible: {
      y:'10px',
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
      }
    }
};

const floatVariant2 = {
    hidden: { y:'-10px'},
    visible: {
      y:'10px',
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        delay: 0.2
      }
    }
};

const floatVariant3 = {
    hidden: { y:'-10px'},
    visible: {
      y:'10px',
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        delay: 0.4
      }
    }
}

const floatVariant4 = {
    hidden: { y:'-10px'},
    visible: {
      y:'10px',
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        delay: 0.6
      }
    }
}

function Header(props) {

    const classes = useStyles();

    return (
       
        <AppBar 
        position="absolute" 
        color="transparent"
        elevation={0}
        className={classes.appBar}
        >

            <ToolBar>
                {/* Logo */}
                {/* <Avatar alt="Truth Dare" src="./headerLogo.png" className={classes.avatar}/> */}
                
                {/* middle text */}
                <motion.div
                variants={floatIn}
                initial='hidden'
                animate='visible' 
                className={classes.titleContainer}>
                    <motion.div
                    variants={floatVariant1}
                    initial='hidden'
                    animate='visible' 
                    >
                    <Typography 
                    variant="h6" 
                    // color="secondary"
                    align="center"
                    className={classes.title}
                    >
                        Truth&nbsp;
                    </Typography>
                    </motion.div>

                    <motion.div
                    variants={floatVariant2}
                    initial='hidden'
                    animate='visible' 
                    >
                    <Typography 
                    variant="h6" 
                    // color="secondary"
                    align="center"
                    className={classes.title}
                    >
                        Dare&nbsp;
                    </Typography>
                    </motion.div>

                    <motion.div
                    variants={floatVariant3}
                    initial='hidden'
                    animate='visible' 
                    >
                    <Typography 
                    variant="h6" 
                    // color="secondary"
                    align="center"
                    className={classes.title}
                    >
                        &&nbsp;
                    </Typography>
                    </motion.div>

                    <motion.div
                    variants={floatVariant4}
                    initial='hidden'
                    animate='visible' 
                    >
                    <Typography 
                    variant="h6" 
                    // color="secondary"
                    align="center"
                    className={classes.title}
                    >
                        Stare
                    </Typography>
                    </motion.div>
                </motion.div>
                {/* middle text end */}

                {/* Buy me a coffee button */}
                <Button
                color="primary"
                size="small"
                endIcon={<LocalCafeIcon/>}
                className={classes.btn}
                >
                    Buy Me A Coffee
                </Button>
                

            </ToolBar>

        </AppBar>

    );
}

export default Header;