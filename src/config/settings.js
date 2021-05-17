require('dotenv').config();

const setting = {
    dev: {
        apiUrl: 'http://localhost:3001/api'
    },
    prod: {
        apiUrl: 'http://localhost:3001/api'
    },
}

const getCurrentSettings = ()=>{

    if(process.env.STAGE === 'development') return setting.dev;
    else return setting.prod;
}

export default getCurrentSettings();