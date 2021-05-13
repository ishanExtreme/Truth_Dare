import client from './client';

const room = (body)=> client.post("/room/create", body);

const join = (body)=> client.post("/room/join", body);

export default {
    room,
    join
};