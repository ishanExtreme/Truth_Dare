import client from './client';

const room = (body)=> client.post("/room/create", body);

const join = (body)=> client.post("/room/join", body);

const complete = (body)=> client.post("/room/complete", body);

export default {
    room,
    join,
    complete
};