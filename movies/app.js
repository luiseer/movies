const express = require('express');
const res = require('express/lib/response');

const app = express();
app.use(express.json());

app.use('/', (req, res) =>{
    res.send('hello')
})



module.exports = { app };
