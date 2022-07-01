const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const { createRoutes } = require('./routes/parentRouter');
const bodyParser = require('body-parser');
const {initializeTables} = require("./dao/repository/tableCreation.repository")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(serverConfig.PORT, serverConfig.HOST, () => {
    console.log(`Server is listening on ${serverConfig.HOST}:${serverConfig.PORT}`);
});

(() => {
    if(serverConfig.env !== 'PROD') {
        initializeTables();
    }
    createRoutes(app);
})();