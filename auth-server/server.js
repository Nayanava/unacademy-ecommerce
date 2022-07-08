const express = require('express');
const { createUserTokensTable } = require('./dao/repository/userToken.repository');
const authRouter = require('./routes/authRouter')
const app = express();
app.use(express.json());
app.use('/auth', authRouter);

(() => {
    createUserTokensTable();
})();

app.listen(4000, (err) => {
    if(err) {
        console.log('Error in starting server', err);
    }
})