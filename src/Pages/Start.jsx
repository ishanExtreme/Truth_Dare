import React from 'react';
import {makeStyles} from '@material-ui/core'
import ThemeButton from '../Components/ThemeButton';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const useStyles = makeStyles((theme)=> {
    return {
    btn_1: {
        marginRight: theme.spacing(4),
    },
    btn_2: {
        marginLeft: theme.spacing(4) 
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#212121",
    }
}
})

const divVariant = {
    initial: {opacity: 0},
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
}

function Start(props) {

    const classes = useStyles();
    const history = useHistory();

    return (
       <div className={classes.container}>
            <motion.div
            variants={divVariant}
            initial='initial'
            animate='animate'
            whileHover={{scale:1.2}} 
            >
            <ThemeButton 
            color="primary" 
            text="CREATE ROOM" 
            style={classes.btn_1}
            onClick={()=>history.push("/create")}
            />
            </motion.div>
            
            <motion.div
            variants={divVariant}
            initial='initial'
            animate='animate'
            whileHover={{scale:1.2}}  
            >
            <ThemeButton 
            color="secondary" 
            text="JOIN ROOM" 
            style={classes.btn_2}
            onClick={()=>history.push("/join")}
            />
            </motion.div>

       </div>
    );
}

export default Start;