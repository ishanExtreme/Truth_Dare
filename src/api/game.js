import client from './client';

const performer = (body)=> client.post("/game/performer", body);
const task_giver = (body)=> client.post("/game/task_giver", body);
const score_update = (body)=> client.post("/game/score_update", body);

export default {
    performer,
    task_giver,
    score_update
};