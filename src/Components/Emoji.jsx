import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core';
import {motion} from 'framer-motion';

const useStyles = makeStyles((theme)=>{
    return {
        container: {
            position: 'fixed',
            top: '10%',
            left: '48%',
            [theme.breakpoints.down('xs')]: {
                top: '5%',
                left: '35%',
            },
            [theme.breakpoints.up('sm')]: {
                top: '5%',
                left: '42%',
            },
            [theme.breakpoints.up('lg')]: {
                top: '5%',
                left: '46%',
            },
            
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            overflow: "hidden",
            zIndex: 1
        },
        emoji: {
            fontSize: "30px"
        }
       
    };
});

// rotation of the emojis
const rotateVariant = {
    hidden: {rotate: 0},
    visible: {
        rotate: 20,
        transition: {
            from:-20,
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror"
        }
    }
};

// emoji enters
const visibleVariant = {
    hidden: {opacity:0},
    visible: {
        opacity: 1,
        transition: {
            duration: 1
        }
    }
};

// emoji exits
const exitVariant = {
    hidden: {opacity:1},
    visible: {
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}

function Emoji({length, emoji}) {

    const classes = useStyles();

    const [exit, setExit] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setExit(true);
        }, 5000)
    }, [])
    const randomMargins = Array.from({length:length}, ()=> Math.floor(Math.random() * 100));
 

    return (
        <motion.div 
        className={classes.container}
        variants={!exit?visibleVariant:exitVariant}
        initial="hidden"
        animate="visible"
        >

            {randomMargins.map((value, index)=>{
                return (
                    <motion.span 
                    key={index}
                    role="img" 
                    aria-label="emoji"
                    className={classes.emoji}
                    whileHover={{
                        scale: 2
                    }}
                    variants={rotateVariant}
                    initial="hidden"
                    animate="visible"
                    style={index%2===0?{marginLeft:value}:{marginRight:value}}
                    >
                    {emoji}
                    </motion.span>
                );
            })}
        </motion.div>
    );
}

export default Emoji;