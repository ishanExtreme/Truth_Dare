import React, { useCallback, useEffect, useState } from 'react';
import {connect, LocalDataTrack} from 'twilio-video';

import Home from './Home';
import Start from './Start';
import useApi from '../hooks/useApi';
import videoApi from '../api/video';
import roomApi from '../api/room';

function Main(props) {
    const [userName, setUserName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState(null);
    const getTokenApi = useApi(videoApi.video);
    const createRoomApi = useApi(roomApi.room);

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

    const validate = ()=>{

        if(userName === '') return "User Name is required!!!"
        else if(roomName === '') return "Room Name is required!!!"
        else if(userName.length < 4 || userName.length > 128) return "User Name must be between 4 to 128 characters long"
        else if(roomName.length < 4 || roomName.length > 128) return "Room Name/ID must be between 4 to 128 characters long"

        return ""
    }

    const handleJoinRoom = useCallback(async event=>{

        event.preventDefault();
        setLoading(true);
        setError('');
        const error = validate();

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

            try
            {
                
                const room = await connect(result.data.token, {
                    name: roomName,
                });

                // Local datatrack to publish in a room(for sending messages)
                const dataTrack = new LocalDataTrack();
                // publish the track
                await room.localParticipant.publishTrack(dataTrack);


                setRoom(room);
            }
            catch(err)
            {
                setError("Room does not exists");
                setLoading(false);
            }

            setLoading(false);
        }

    }, [userName, roomName])



    const handleCreateRoom = useCallback(async event=>{

        event.preventDefault();
        setLoading(true);
        setError('');
        const error = validate();

        if(error) 
        {
            setError(error);
            setLoading(false);
        }
        else
        {
            const create_room_body = {room: roomName};
            const room_result = await createRoomApi.request(create_room_body);

            if(!room_result.ok)
            {
                if(room_result.data) setError(room_result.data.error);
                else setError("An unexpected error occurred.");
                setLoading(false);
                return;
            }

            const token_body = {identity: userName, room: roomName};
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
                    name: roomName,
                });

                // Local datatrack to publish in a room(for sending messages)
                const dataTrack = new LocalDataTrack();
                // publish the track
                await room.localParticipant.publishTrack(dataTrack);

                setRoom(room);

            }
            catch(err)
            {
                setError(err.message);
                setLoading(false);
            }
            setLoading(false);
        }

    }, [userName, roomName])


    let render;
    // Render Start or Game(Home) screen
    if(room)
    {
        render = (
            <Home roomName={roomName} room={room} handleLogout={handleLogout}/>
            
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
            />
        );
    }

    return render;
}

export default Main;