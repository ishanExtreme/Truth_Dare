import client from './client';

const video = (body)=> client.post("/video/token", body)

export default {
    video,
};