/*
read about dotenv here - https://zetcode.com/javascript/dotenv/#:~:text=The%20dotenv%20is%20a%20zero,the%20Twelve%2DFactor%20App%20methodology
*/
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST
}