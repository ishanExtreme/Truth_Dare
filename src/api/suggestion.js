import client from './client';

const get_random = (body)=> client.post("/suggestion/get_random", body)

export default {
    get_random,
};