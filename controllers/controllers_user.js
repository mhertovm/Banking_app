require('dotenv').config();
const log4js = require("log4js");
const mysql = require('mysql2');
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

function user(req, res){
    loggerAPI.info(`request "${req.url}" method "${req.method}"`);
    try{
        const {user_id} = req.body
        const query = db.query(`SELECT * FROM db.users WHERE id = ${user_id}`,
        function(err, data){
            if(err){
                loggerError.error(`query error "${err.sql}"`)
            }
            res.json(data)
        })
        loggerQuery.info(`DB query "${query.sql}"`);
    } catch(err){
        loggerError.error(`catch error "${err}"`)
    }
};

function cards(req, res){
    loggerAPI.info(`request "${req.url}" method "${req.method}"`);
    try{
        const {user_id} = req.body
        const query = db.query(`SELECT * FROM db.cards WHERE user_id = ${user_id}`,
        function(err, data){
            if(err){
                loggerError.error(`query error "${err.sql}"`)
            }
            res.json(data)
        })
        loggerQuery.info(`DB query "${query.sql}"`);
    } catch(err){
        loggerError.error(`catch error "${err}"`)
    }
};

function plusSum(req, res){
    loggerAPI.info(`request "${req.url}" method "${req.method}"`);
    try{
        const {cartNumber, sum} = req.body;
        const query = db.query(`SELECT * FROM db.cards WHERE cardNumber = ${cartNumber}`,
        function(err, data){
            if(err){
                loggerError.error(`query error "${err.sql}"`)
            };
            const query = db.query(`UPDATE db.cards SET sum = ${+data[0].sum + +sum} WHERE id = ${data[0].id}`,
            function(err){
                if(err){
                    loggerError.error(`query error "${err.sql}"`)
                };
                res.json({response: "sum added"});
            })
            loggerQuery.info(`DB query "${query.sql}"`);
        })
        loggerQuery.info(`DB query "${query.sql}"`);
    } catch(err){
        loggerError.error(`catch error "${err}"`)
    }
};

function transfer(req, res){
    loggerAPI.info(`request "${req.url}" method "${req.method}"`);
    try{
        const {sourceCard, destinationCard, sum} = req.body;
        const query = db.query(`SELECT * FROM db.cards WHERE cardNumber = '${sourceCard}'`,
        function(err, sourceCard){
            if(err){
                loggerError.error(`query error "${err.sql}"`)
            } else if (+sourceCard[0].sum >= +sum){
                const queryTransaction = db.beginTransaction(function(err){
                    if(err){
                        loggerError.error(`queryTransaction error "${err.sql}"`)
                    }
                    const query = db.query(`UPDATE db.cards SET sum = ${+sourceCard[0].sum - +sum} WHERE id = ${sourceCard[0].id}`,
                    function(err){
                        if(err){
                            loggerError.error(`query error "${err.sql}"`)
                        }
                        const query = db.query(`SELECT * FROM db.cards WHERE cardNumber = '${destinationCard}'`,
                        function(err, destinationCard){
                            if(err){
                                loggerError.error(`query error "${err.sql}"`)
                            };
                            const query = db.query(`UPDATE db.cards SET sum = ${+destinationCard[0].sum + +sum} WHERE id = ${destinationCard[0].id}`,
                            function(err){
                                if(err){
                                    loggerError.error(`query error "${err.sql}"`)
                                }
                                const query = db.query(`INSERT INTO db.transfers (sourceCard, destinationCard, sumTransfer, dateTransfer) VALUES ('${sourceCard[0].id}', '${destinationCard[0].id}', '${sum}', now())`,
                                function(err){
                                    if(err){
                                        loggerError.error(`query error "${err.sql}"`)
                                    }
                                    const queryCommit = db.commit(function(err){
                                        if(err){
                                            loggerError.error(`queryCommit error "${err.sql}"`)
                                        }
                                        return res.json({response: "transfer has occurred"})
                                    })
                                    loggerQuery.info(`DB query begin transaction "${queryCommit.sql}"`);
                                })
                                loggerQuery.info(`DB query "${query.sql}"`);
                            });
                            loggerQuery.info(`DB query "${query.sql}"`);
                        })
                        loggerQuery.info(`DB query "${query.sql}"`);
                    })
                    loggerQuery.info(`DB query "${query.sql}"`);
                })
                loggerQuery.info(`DB query begin transaction "${queryTransaction.sql}"`);
            } else {
                return res.json({response: "not enough money"})
            };
        })
        loggerQuery.info(`DB query "${query.sql}"`);
    } catch(err){
        loggerError.error(`catch error "${err}"`)
    }
};

function transfers(req, res){
    loggerAPI.info(`request "${req.url}" method "${req.method}"`);
    try{
        const {user_id} = req.body;
        const query = db.query(`SELECT * FROM db.transfers WHERE sourceCard = ${user_id}`,
        function(err, data){
            if(err){
                loggerError.error(`query error "${err.sql}"`)
            };
            res.json(data)
        })
        loggerQuery.info(`DB query "${query.sql}"`);
    } catch(err){
        loggerError.error(`catch error "${err}"`)
    }
};

function addCard(req, res){
    loggerAPI.info(`request "${req.url}" method "${req.method}"`);
    try{
        const {user_id, cardName} = req.body;
        const query = db.query(`INSERT INTO db.cards (user_id, cardName, cardNumber, sum, dateCreated) VALUES ('${user_id}', '${cardName}', '1234${user_id + Math.random()}', '10000', now())`,
        function(err){
            if (err){
                loggerError.error(`query error "${err.sql}"`)
            };
            res.json({response: "cart added"})
        })
        loggerQuery.info(`DB query "${query.sql}"`);
    } catch(err){
        loggerError.error(`catch error "${err}"`)
    }
}

module.exports = {plusSum, transfer, user, cards, transfers, addCard}
