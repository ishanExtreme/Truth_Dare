import React, { useEffect, useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme)=>{

    return {
        video: {
            width: '550px',
            height: '300px',
            [theme.breakpoints.down('xs')]: {
                width: '300px',
            },
            backgroundColor: 'black'
        },
        rootLeft: {
            display: "flex",
            flexDirection: 'column',
            maxWidth: '550px',
            maxHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#424242',
            [theme.breakpoints.between('lg', 'xl')]: {
                marginRight: theme.spacing(5)
            },
        },
        rootRight: {
            display: "flex",
            flexDirection: 'column',
            maxWidth: '550px',
            maxHeight: '450px',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#424242',
            [theme.breakpoints.between('lg', 'xl')]: {
                marginLeft: theme.spacing(5)
            },
        },
        screenIcon: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%'
        },
        userName: {
            color: 'white',
            width: '100%',
            textAlign: 'center',
            marginLeft: '80px'
        }
    };
});

function VideoPlayer({participant, local=false, handleRemoteSpin, handlePerformerFound, handleRemoteCancelEvent, handleTaskerFound, handleRemoteError, handleSpinOverEvent, side}) {

    const classes = useStyles();

    const [videoOn, setVideoOn] = useState(true);
    const [micOn, setMicOn] = useState(true);
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const videoRef = useRef();
    const audioRef = useRef();

    const trackpubsToTracks = (trackMap, type) => {
        const Trackarray = Array.from(trackMap.values())
        .map(publication => publication.track)
        .filter(track => track!=null);

        Trackarray.forEach(track=>{
            
            if(type === 'video')
            {
                track.on('disabled', ()=> {
                    setVideoOn(false);
                    
                });
                track.on('enabled', ()=>{
                    setVideoOn(true);
                });
            }
            else
            {
                track.on('disabled', ()=> {
                    setMicOn(false);
                    
                });
                track.on('enabled', ()=>{
                    setMicOn(true);
                }) 
            }
            
        })

        return Trackarray;
    };

    const handleMessage = (instruction)=>{

        let code="";
        let msg="";
        let params="";

        // params present
        // format-> #code%params*msg
        if(instruction.includes("%"))
        {
            code = instruction.substring(instruction.indexOf("#")+1, instruction.indexOf("%"));
            params = instruction.substring(instruction.indexOf("%")+1, instruction.indexOf("*"))
            msg = instruction.substring(instruction.indexOf("*")+1);
            
            params = params.split(",");
        }
        // params not present
        // format-> #code*msg
        else
        {
            code = instruction.substring(instruction.indexOf("#")+1, instruction.indexOf("*"));
            msg = instruction.substring(instruction.indexOf("*")+1);
        }
        switch(code)
        {
            case 'spin': handleRemoteSpin(msg, params);
            break;
            case 'performer_found': handlePerformerFound(msg, params[0]);
            break;
            case 'perform_cancel': handleRemoteCancelEvent(msg, params[0]);
            break;
            case 'tasker_found': handleTaskerFound(msg, params[0], params[1], params[2]);
            break;
            case 'error': handleRemoteError(msg);
            break;
            case 'spin_over': handleSpinOverEvent(msg, params[0], params[1]);
            break;
        }
    }

    const getNonNullDataTracks = (trackMap)=>{
        const trackArray = Array.from(trackMap.values())
        .map(publication => publication.track)
        .filter(track => track!=null);

        trackArray.forEach(track => {
            track.on('message', handleMessage);
        })
    }
    
    useEffect(() => {
        const trackSubscribed = track =>{
            if(track.kind === 'video'){
                track.on('disabled', ()=> {
                    setVideoOn(false);
                    
                });
                track.on('enabled', ()=>{
                    setVideoOn(true);
                })
                setVideoTracks(videoTracks=> [...videoTracks, track]);
            } else if(track.kind === 'audio') {
                track.on('disabled', ()=> {
                    setMicOn(false);
                    
                });
                track.on('enabled', ()=>{
                    setMicOn(true);
                }) 
                setAudioTracks(audioTracks=> [...audioTracks, track]);
            } 
            else if(track.kind === 'data'){
                track.on('message', handleMessage);
            }

        }

        const trackUnSubscribed = track =>{
            if(track.kind === 'video') {
                setVideoTracks(videoTracks=> videoTracks.filter(v=> v!==track));
            } else if(track.kind === 'audio') {
                setAudioTracks(audioTracks=> audioTracks.filter(a=> a!==track));
            } 
        }

        // get all the "non null" tracks
        setVideoTracks(trackpubsToTracks(participant.videoTracks, 'video'));
        setAudioTracks(trackpubsToTracks(participant.audioTracks, 'audio'));
        getNonNullDataTracks(participant.dataTracks)

        participant.on('trackSubscribed', trackSubscribed);
        participant.on('trackUnsubscribed', trackUnSubscribed);

        // clear listeners(cleanup)
        return () => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };


    }, [participant]);

    // attaching video track
    useEffect(() => {
        const videoTrack = videoTracks[0];
        if(videoTrack) {
            videoTrack.attach(videoRef.current);
            return ()=> {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    // attaching audio track
    useEffect(() => {
        const audioTrack = audioTracks[0];
        if(audioTrack) {
            audioTrack.attach(audioRef.current);
            return ()=> {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);
    

    const toogleVideo = ()=>{
        // if initally video is on than disable it
        if(videoOn)
        {
            participant.videoTracks.forEach(publication => {
                if(publication.track)
                    publication.track.disable();
            })
        }
        // else enable it
        else
        {
            participant.videoTracks.forEach(publication => {
                publication.track.enable();
            })
        }

        // toogle
        // setVideoOn(!videoOn);
    };

    const toogleAudio = ()=>{

        // if mic on than disable it
        if(micOn)
        {
            participant.audioTracks.forEach(publication=>{
                publication.track.disable();
            })
        }
        // else enable it
        else
        {
            participant.audioTracks.forEach(publication=>{
                publication.track.enable();
            })
        }

        // toogle
        // setMicOn(!micOn);
    };

    return (
        <Card className={side==="left"?classes.rootLeft: classes.rootRight}>

            {/* full screen icon */}
            <div className={classes.screenIcon}>

                <Typography variant="h5" className={classes.userName}>
                    {local?"You":participant.identity}
                </Typography>

                <IconButton
                // onClick={()=>sendMessage("Working!!!!")}
                >
                    <FullscreenIcon
                    style={{color: 'white'}}
                    fontSize="large" 
                    />
                </IconButton>


            </div>

           <CardContent>

               {/* Video */}
               <video 
               playsInline 
               autoPlay 
               ref={videoRef}
               className={classes.video}
               />

               {/* Audio */}
               <audio 
               ref={audioRef} 
               autoPlay 
               />
           </CardContent>

           <CardActions disableSpacing >
                <IconButton 
                style={{marginRight:'50px'}}
                onClick={toogleVideo}
                // enable button for local participants only
                disabled={!local}
                >
                    {
                        videoOn?
                        <VideocamIcon 
                        fontSize="large"
                        style={{color:'green'}}
                        />
                        :
                        <VideocamOffIcon
                        fontSize="large"
                        style={{color:'red'}}
                        />
                    }
                    
                </IconButton>
        
                <IconButton 
                style={{marginLeft:'50px'}}
                onClick={toogleAudio}
                // enable button for local participants only
                disabled={!local}
                >
                    {
                        micOn?
                        <MicIcon 
                        fontSize="large"
                        style={{color:'green'}}
                        />
                        :
                        <MicOffIcon 
                        fontSize="large"
                        style={{color:'red'}}
                        />
                    }
                    
                </IconButton>
           </CardActions>
        </Card>
    );
}

export default VideoPlayer;