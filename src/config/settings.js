require('dotenv').config();

const setting = {
    dev: {
        apiUrl: 'https://truth-dare-api-2.herokuapp.com/api'
    },
    prod: {
        apiUrl: 'https://truth-dare-api-2.herokuapp.com/api'
    },
}

const getCurrentSettings = ()=>{

    if(process.env.STAGE === 'development') return setting.dev;
    else return setting.prod;
}

export default getCurrentSettings();