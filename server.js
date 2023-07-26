require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router')

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})