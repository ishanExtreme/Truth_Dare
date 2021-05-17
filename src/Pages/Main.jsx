import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {connect, LocalDataTrack} from 'twilio-video';

import Home from './Home';
import Start from './Start';
import useApi from '../hooks/useApi';
import videoApi from '../api/video';
import roomApi from '../api/room';

// stores user score
let score=0;

function Main(props) {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState(null);
    const [playersNumber, setPlayersNumber] = useState("two");

    const getTokenApi = useApi(videoApi.video);
    const createRoomApi = useApi(roomApi.room);
    const joinRoomApi = useApi(roomApi.join);

    const handleNameChange = useCallback(event=>{
        setUserName(event.target.value);
    }, []);

    const handleRoomChange = useCallback(event=>{
        setRoomName(event.target.value);
    }, []);

    const resetError = ()=>{
        setError('');
    }

    const handleLogout = useCallback(() => {
        setRoom((prevRoom) => {
          if (prevRoom) {
            //------------Giving error on stopping dataTracks------------
            prevRoom.localParticipant.tracks.forEach((trackPub) => {
                if(trackPub.track.kind !== 'data')
                    trackPub.track.stop();
            });
            // participantDisconnected event
            prevRoom.disconnect();
          }
          return null;
        });
    }, []);
    
    useEffect(() => {
        if (room) {
        const tidyUp = (event) => {
            if (event.persisted) {
            return;
            }
            if (room) {
            handleLogout();
            }
        };
        window.addEventListener("pagehide", tidyUp);
        window.addEventListener("beforeunload", tidyUp);
        return () => {
            window.removeEventListener("pagehide", tidyUp);
            window.removeEventListener("beforeunload", tidyUp);
        };
        }
    }, [room, handleLogout]);

    const handleRadioChange = (event)=>{
        setPlayersNumber(event.target.value);
        setError(false);
    };

    const validateJoin = ()=>{

        if(userName === '') return "User Name is required!!!"
        else if(roomName === '') return "Room Name is required!!!"
        else if(userName.length < 4 || userName.length > 128) return "User Name must be between 4 to 128 characters long";
        else if(roomName.length < 4 || roomName.length > 128) return "Room Name/ID must be between 4 to 128 characters long";
        else if(userName.includes("*") || userName.includes("#") || userName.includes("%"))
                return `User Name must not contain "*", "#" or "%"`;
        return "";
    }

    const validateCreate = ()=>{

        if(userName === '') return "User Name is required!!!"
        else if(userName.length < 4 || userName.length > 128) return "User Name must be between 4 to 128 characters long";
        else if(userName.includes("*") || userName.includes("#") || userName.includes("%"))
                return `User Name must not contain "*", "#" or "%"`;
        return "";
    }

    const handleJoinRoom = useCallback(async event=>{

        event.preventDefault();
        setLoading(true);
        setError('');
        const error = validateJoin();

        if(error) 
        {
            setError(error);
            setLoading(false);
        }
        else
        {
            const body = {identity: userName, room: roomName};
            const result = await getTokenApi.request(body);
            
            if(!result.ok){

                if(result.data) setError(result.data.error);
                else setError("An unexpected error occurred.");
                setLoading(false);
                return;
            }

            const join_result = await joinRoomApi.request(body);

            if(!join_result.ok){
                if(join_result.data) setError(join_result.data.error);
                else setError("An unexpected error occurred.");
                setLoading(false);
                return;
            }

            try
            {
                const room = await connect(result.data.token, {
                    name: roomName,
                });

                // Local datatrack to publish in a room(for sending messages)
                const dataTrack = new LocalDataTrack();
                // publish the track
                await room.localParticipant.publishTrack(dataTrack);

                score = parseInt(join_result.data.score);
                setRoom(room);
            }
            catch(err)
            {
                // ---------------SEE---------------------
                setError(err.message);
                setLoading(false);
            }

            setLoading(false);
        }

    }, [userName, roomName])



    const handleCreateRoom = useCallback(async event=>{

        event.preventDefault();
        setLoading(true);
        setError('');
        const error = validateCreate();


        if(error) 
        {
            setError(error);
            setLoading(false);
        }
        else
        {
            const uniqueRoomName = uuidv4().split("-")[0];

            let roomSize;
            if(playersNumber === "two") roomSize = 2;
            if(playersNumber === "three") roomSize = 3;
            if(playersNumber === "four") roomSize = 4;

            const create_room_body = {identity: userName, room: uniqueRoomName, roomSize: roomSize};
            const room_result = await createRoomApi.request(create_room_body);

            if(!room_result.ok)
            {
                if(room_result.data) setError(room_result.data.error);
                else setError("An unexpected error occurred.");
                setLoading(false);
                return;
            }

            const token_body = {identity: userName, room: uniqueRoomName};
            const result = await getTokenApi.request(token_body);

            if(!result.ok){

                if(result.data) setError(result.data.error);
                else setError("An unexpected error occurred.");
                setLoading(false);
                return;
            }

            try
            {

                const room = await connect(result.data.token, {
                    name: uniqueRoomName,
                });

                // Local datatrack to publish in a room(for sending messages)
                const dataTrack = new LocalDataTrack();
                // publish the track
                await room.localParticipant.publishTrack(dataTrack);

                setRoomName(uniqueRoomName);
                setRoom(room);

            }
            catch(err)
            {
                setError(err.message);
                setLoading(false);
            }
            setLoading(false);
        }

    }, [userName, roomName, playersNumber])


    let render;
    // Render Start or Game(Home) screen
    if(room)
    {
        render = (
            <Home roomName={roomName} room={room} handleLogout={handleLogout} initial_score={score}/>
            
        );
    }
    else
    {
        render = (
            <Start 
            handleNameChange={handleNameChange}
            handleRoomChange={handleRoomChange}
            handleCreateRoom={handleCreateRoom}
            handleJoinRoom={handleJoinRoom}
            error={error}
            loading={loading}
            resetError={resetError}
            name={userName}
            room={roomName}
            playersNumber={playersNumber}
            handleRadioChange={handleRadioChange}
            />
        );
    }

    return render;
}

export default Main;