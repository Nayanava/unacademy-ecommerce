//https://www.npmjs.com/package/axios

const { config } = require('dotenv');
const { header } = require('express/lib/request');

const axios = require('axios').default;
axios.defaults.baseURL = config.AUTH_SERVER_ENDPOINT;

const getAuthToken = async (payload) => {
    return await axios.post('/auth/getAccessToken', payload);
}

const validateToken = async (userToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': userToken
    }
    return await axios.get('/auth/validate', {
        headers: headers
    });
}

module.exports = {
    getAuthToken: getAuthToken,
    validateToken: validateToken
}