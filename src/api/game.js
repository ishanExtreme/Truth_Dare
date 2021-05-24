import client from './client';

const performer = (body)=> client.post("/game/performer", body);
const task_giver = (body)=> client.post("/game/task_giver", body);
const score_update = (body)=> client.post("/game/score_update", body);
const spin_over = (body)=> client.post("/game/spin_over", body);
const get_scores = (body)=> client.post("/game/get_scores", body);
const get_winners = (body)=> client.post("/game/get_winners", body);

export default {
    performer,
    task_giver,
    score_update,
    spin_over,
    get_scores,
    get_winners
};