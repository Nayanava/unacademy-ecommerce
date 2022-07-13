//1. registerUser
//2. authenticateUser

const { defineUser } = require("../models/user.model");
const dbConnection = require("./dbConnection");

const User = defineUser(dbConnection.connection, dbConnection.DataTypes);
const createUserTable = async(forceCreation) => {
    await User.sync({force: forceCreation});
}
const registerUser = async (user) => {
    const dbUser = await User.create({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber
    });
    return {
        username: dbUser.username,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber
    };
}

const fetchUserByCriteria = async(criteria) => {
    return await User.findOne(criteria);
}
module.exports = {
    User: User,
    createUserTable: createUserTable,
    registerUser: registerUser,
    fetchUserByCriteria: fetchUserByCriteria
}