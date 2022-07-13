const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authConfig = require('../config/auth.config');
const { addUserToken, isValidUserToken } = require('../dao/repository/userToken.repository');
const { config } = require('dotenv');

exports.accessToken = (req, res) => {
    const payload = req.body;
    const accessToken = getAccessToken(payload);
    const refreshToken = getRefreshToken();
    addUserToken({
        username: payload.username,
        refreshToken: refreshToken
    }).then(result => {
        console.log('Token saved in DB successfully');
        res.status(200)
        .send({ 
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }).catch(err => {
        console.log('Error in saving request', err);
        res.status(500).send({
            message: `Couldn't complete request. Please try again in sometime!`
        })
    })
    
}

exports.refreshAccessToken = (req, res) => {
    //1. the expired access token - will have the username
    //2. the refreshToken
    const accessToken = req.body.accessToken;
    const decodedToken = jwt.decode(accessToken);
    console.log(decodedToken);
    //Homework 1. if the token has not expired - we can return 204
    //if the token has expired - validate the refreshtoken and the user.
    isValidUserToken({
        username: decodedToken.username,
        refreshToken: req.body.refreshToken
    }).then(result => {
        if(result) {
            res.status(200).send({
                accessToken: getAccessToken({username: decodedToken.username, 
                    permission: decodedToken.permission}),
                refreshToken: req.body.refreshToken
            })
            return;
        }
        res.sendStatus(401);
    }).catch(err => {
        console.log('error occurred!', err);
        res.status(500).send({
            message: `Couldn't complete request. Please try again in sometime!`
        });
    })
}

exports.validate = (req, res) => {
    {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader.split(' ')[1];
        if(!accessToken) {
            res.send(401);
            return;
        }
        jwt.verify(accessToken, authConfig.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) {
                res.sendStatus(403);
                return;
            }
            console.log(`encoded token = `, accessToken);
            const decodedToken = jwt.decode(accessToken);
            console.log(`decoded token = `, decodedToken);
            res.status(200).send(decodedToken);
        });
    }
}
function getRefreshToken() {
    return crypto.randomBytes(64).toString('hex');
}


function getAccessToken(payload) {
    const jitter = parseInt(Math.random()*120);
    console.log(authConfig.ACCESS_TOKEN_SECRET)
    const expiryTime = 600 + jitter;
    return jwt.sign(payload, 
        authConfig.ACCESS_TOKEN_SECRET, 
        {expiresIn: `${expiryTime}s`});
}