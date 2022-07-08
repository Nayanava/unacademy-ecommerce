require('dotenv').config();
console.log(process.env.ACCESS_TOKEN_SECRET);

module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET
}