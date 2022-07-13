//https://www.npmjs.com/package/axios

const { header } = require('express/lib/request');

const axios = require('axios').default;
axios.defaults.baseURL = 'http://localhost:4000';

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