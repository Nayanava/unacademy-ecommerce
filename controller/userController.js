const bcrypt = require('bcrypt');
const userRepository = require('../dao/repository/user.repository');
const { Op } = require("sequelize");

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
        .send({message: 'Some error occured at the time of registration. Please try again after sometime!'})
    })
}

exports.login = (req, res) => {
    userRepository.fetchUserByCriteria({
        where : {
            [Op.or] : [{
                username: req.body.username
            }]
            // {
            //     emailId: req.body.emailId
            // },
            // {
            //     phoneNumber: req.body.phoneNumber
            // }]
        }
    }).then(user => {
        return authenticateUser(req.body.password, user.password);
    }).then(result => {
        if(!result) {
            res.status(401).send('Invalid username or password');
            return;
        }
        res.status(200).send({message: 'Login Successful!'});
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