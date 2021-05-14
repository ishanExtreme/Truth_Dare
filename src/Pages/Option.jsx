import React from 'react';
import {makeStyles} from '@material-ui/core';
import ThemeButton from '../Components/ThemeButton';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

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
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: "#212121",
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingInline: theme.spacing(1),
        // borderTop: '1px solid #c51162'
        // paddingLeft: theme.spacing(1)
    },
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: theme.spacing(1),
    },
    avatar: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    link: {
        marginLeft: theme.spacing(1)
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

function Option({handleClick}) {

    const classes = useStyles();

    return (
        <>
       
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
            onClick={()=>handleClick('create')}
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
            onClick={()=>handleClick('join')}
            />
            </motion.div>
       </div>

        {/* footer */}
        <AppBar
        className={classes.appBar}
        >   
        <div className={classes.footer}>
            <Typography variant="h6"  color="secondary" display="inline">
                Made With
            </Typography>

            <Avatar alt="footer" src="./footer.png" className={classes.avatar}/>

            <Typography variant="h6"  color="secondary" display="inline">
                By
            </Typography>

            <Link
            color="secondary"
            component="button"
            variant="h6"
            className={classes.link}
            onClick={()=>window.open("https://github.com/ishanExtreme")}
            >
                Ishan Mishra
            </Link>
        
        </div>
        </AppBar>
        </>
    );
}

export default Option;