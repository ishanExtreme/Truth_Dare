import React from 'react';
import AppBar from '@material-ui/core/AppBar';
// import Typography from '@material-ui/core/Typography';
// import Avatar from '@material-ui/core/Avatar';
// import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme)=> {
    return {

    appBar: {
        top: 'auto',
        bottom: 0,
        backgroundColor: "transparent",
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
    },
    btn: {
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
        marginTop: theme.spacing(1)
    }
}
});

function Footer(props) {

    const classes = useStyles();
    
    return (
        // footer   
       <AppBar
       className={classes.appBar}
       >   
       <div className={classes.footer}>

            {/* My name */}
           {/* <Typography variant="h6"  color="secondary" display="inline">
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
           </Link> */}

            {/* Buy me a coffee button */}
            <Button
            color="primary"
            size="small"
            endIcon={<LocalCafeIcon/>}
            className={classes.btn}
            >
                Buy Me A Coffee
            </Button>
        
       </div>

       </AppBar>
    );
}

export default Footer;