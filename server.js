require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router');
const {cardsTable} = require('./models/cards_schema');
const {usersTable} = require('./models/users_schema');
const {transfersTable} = require('./models/transfers_schema');
const {db} = require('./index');

usersTable(db);
cardsTable(db);
transfersTable(db);

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})