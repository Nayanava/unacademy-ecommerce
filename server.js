const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const { initializeTables } = require('./dao/repository/tableInitializers');
const { createRoutes } = require('./routes/parentRouter');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send({message: "Welcome to our e-commerce Platform!"});
})
app.listen(serverConfig.PORT, () => {
    console.log(`Server is listening on port: ${serverConfig.PORT}`);
});

//IIFE - immediately invoked function expression!
(() => {
    //1. configure the routers
    createRoutes(app);
    //2. Initialize the databases if environment is development
    initializeTables(false);
})();