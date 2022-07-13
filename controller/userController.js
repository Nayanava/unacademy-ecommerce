const bcrypt = require('bcrypt');
const userRepository = require('../dao/repository/user.repository');
const { Op } = require("sequelize");
const authService = require('../external/auth.service');
const { request } = require('express');

exports.registerUser = (req, res) => {
    //requestValidator
    encryptPassword(req.body.password)
    .then(hashedPassword => {
        req.body.password = hashedPassword;
        return userRepository.registerUser(req.body);
    }).then(result => res.status(201).send(result))
    .catch(err => {
        console.log(err);
        res.status(500)
        .send({
            message: 'Some error occured at the time of registration. Please try again after sometime!'
        })
    })
}

exports.login = (req, res) => {
    userRepository.fetchUserByCriteria({
        where : {
            [Op.or] : [{
                username: req.body.username
            }]
        }
    }).then(async (user) => {
        const isValidUser = await authenticateUser(req.body.password, user.password);
        return isValidUser ? user: undefined
    }).then(user => {
        if(!user) {
            res.status(401).send('Invalid username or password');
            return;
        }
        return authService.getAuthToken({
            username: user.username,
            permission: user.permission
        })
    }).then(result => {
        //create the payload and call the auth-server
        //will return the access token.
        console.log(result);
        res.status(200).send(result.data);
    }).catch(err => {
        console.log(err);
        res.status(500)
        .send({message: 'Some error occured at the time of registration. Please try again after sometime!'})
    });
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

const authenticateUser = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}