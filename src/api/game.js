import client from './client';

const performer = (body)=> client.post("/game/performer", body);

export default {
    performer
};