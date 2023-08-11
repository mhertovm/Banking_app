require('dotenv').config();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const log4js = require("log4js");
const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
});
log4js.configure({
    appenders: { 
        APIlogs: { type: "file", filename: "API.log" },
        queryLogs: { type: "file", filename: "Query.log" },
        errorLogs: { type: "file", filename: "Error.log" }
    },
    categories: {
        default: { appenders: ["APIlogs"], level: "info" }, 
        queryLogs : { appenders: ["queryLogs"], level: "info" },
        errorLogs : { appenders: ["errorLogs"], level: "error"}
    },
});
const loggerAPI = log4js.getLogger("APIlogs");
const loggerQuery = log4js.getLogger("queryLogs");
const loggerError = log4js.getLogger("errorLogs");
const { generateAccessToken } = require("../generateAccessToken/generateAccessToken");

async function register(req, res){
    try{
        loggerAPI.info(`request "${req.url}" method "${req.method}"`);
        const {name,surname,email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        const query = db.query(`SELECT * FROM db.users WHERE email = ?`, [email],
        function(err, data){
            if(err){
                return loggerError.error(`query error "${err.sql}"`)
            } else if(data.length === 0){
                db.query(`INSERT INTO db.users (name, surname, email, password) VALUES (?, ?, ?, ?)`, [name, surname, email, hashed_password],
                async function(err, data){
                    if(err){
                        return loggerError.error(`query error "${err.sql}"`)
                    };
                    const user_id = await data.insertId
                    const query = db.query(`INSERT INTO db.cards (user_id, cardNumber, cardName, sum, dateCreated) VALUES (?, ?, 'id bank default card', '0', now())`, [user_id, `1234${Math.random()}`],
                    function(err){
                        if (err){
                            return loggerError.error(`query error "${err.sql}"`)
                        };
                        res.json({response: "registered"})
                    })
                    loggerQuery.info(`DB query "${query.sql}"`);
                })
                loggerQuery.info(`DB query "${query.sql}"`);
            } else {
                res.json({response: "email is already registered"})
            }
        })
        loggerQuery.info(`DB query "${query.sql}"`);
    } catch (err){
        loggerError.error(`catch error "${err}"`)
    }
};

function login (req, res){
    try{
        loggerAPI.info(`request "${req.url}" method "${req.method}"`);
        const { email, password } = req.body;
        const query = db.query(`SELECT * FROM db.users WHERE email = ?`, [`${email}`],
        async function(err, data){
            if(err){
                return res.sendStatus(404);
            } else if(data.length === 0){
                return res.json({response: "user is not found"})
            }
            const validPassword = await bcrypt.compare(password, data[0].password);
            if (email === data[0].email && validPassword){
                const token = generateAccessToken(data[0].email);
                res.json({response: "login", jwt: token, user_id: data[0].id});
            } else {
                res.json({response: "invalid password"})
            }
        })
        loggerQuery.info(`DB query "${query.sql}"`)
    } catch (err){
        loggerError.error(`catch error "${err}"`)
    }
};

module.exports = {register, login};