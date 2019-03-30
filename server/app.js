const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;
const mPwd = 'password\$1';

// connect to the database ... Note: mongo lab connect from 76.169.144.200 only 
mongoose.connect('mongodb+srv://arkcloudtech:' + mPwd + '@arkcloud0-vujht.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to the remote mongo database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`now listening for requests on port ${PORT}...`);
});