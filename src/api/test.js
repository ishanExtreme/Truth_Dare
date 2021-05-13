import client from './client';

const test = (body)=> client.post("/room/list", body)

export default {
    test,
};