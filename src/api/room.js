import client from './client';

const room = (body)=> client.post("/room/create", body)

export default {
    room,
};