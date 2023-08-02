require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
});

function user(req, res){
    try{
        const {user_id} = req.body
        db.query(`SELECT * FROM db.users WHERE id = ${user_id}`, function(err, data){
            if(err){
                return res.sendStatus(404)
            }
            res.json(data)
        })
    } catch(err){
        console.log(err)
    }
};

function carts(req, res){
    try{
        const {user_id} = req.body
        db.query(`SELECT * FROM db.carts WHERE user_id = ${user_id}`, function(err, data){
            if(err){
                return res.sendStatus(404)
            }
            res.json(data)
        })
    } catch(err){
        console.log(err)
    }
};

function plusSum(req, res){
    try{
        const {cart_number, sum} = req.body;
        db.query(`SELECT * FROM db.carts WHERE cart_number = ${cart_number}`, function(err, data){
            if(err){
                return res.json({response: "card not found"});
            };
            db.query(`UPDATE db.carts SET sum = ${+data[0].sum + +sum} WHERE id = ${data[0].id}`, function(err){
                if(err){
                    return res.json({response: "failed plus sum"});
                };
                res.json({response: "sum added"});
            })
        })
      
    } catch(err){
        console.log(err)
    }
};

function transfer(req, res){
    try{
        const {minus_cart_number, plus_cart_number, sum} = req.body;
        db.query(`SELECT * FROM db.carts WHERE cart_number = '${minus_cart_number}'`, function(err, dataMinus_cart){
            if(err){
                return res.json({response: "card not found"});
            } else if(+dataMinus_cart[0].sum >= +sum){
                db.query(`UPDATE db.carts SET sum = ${+dataMinus_cart[0].sum - +sum} WHERE id = ${dataMinus_cart[0].id}`, function(err){
                    if(err){
                        return console.log(err)
                    }
                    db.query(`SELECT * FROM db.carts WHERE cart_number = '${plus_cart_number}'`, function(err, dataPlus_cart){
                        if(err){
                            return console.log(err)
                        };
                        db.query(`UPDATE db.carts SET sum = ${+dataPlus_cart[0].sum + +sum} WHERE id = ${dataPlus_cart[0].id}`, function(err){
                            if(err){
                                return console.log(err)
                            }
                        });
                        db.query(`INSERT INTO db.transfers (cartMinus_id, cartPlus_id, sum_transfer, time_transfer) VALUES ('${dataMinus_cart[0].id}', '${dataPlus_cart[0].id}', '${sum}', now())`, function(err){
                            if(err){
                                return console.log(err)
                            }
                        })
                        return res.json({response: "transfer has occurred"})
                    })
                })
                
            } else {
                res.json({response: "not enough money"})
            };
        })
    } catch(err){
        console.log(err)
    }
};

module.exports = {plusSum, transfer, user, carts}