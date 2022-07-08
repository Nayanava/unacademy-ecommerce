const config = require("../../config/dbconfig");
const {Sequelize, DataTypes} = require("sequelize");

const connection = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

module.exports = {
    connection: connection,
    DataTypes: DataTypes
}