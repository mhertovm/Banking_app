require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const { generateAccessToken } = require("../generateAccessToken/generateAccessToken");
const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
});

async function register(req, res){
    try{
        const {name,surname,email,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);
        db.query(`SELECT * FROM db.users WHERE email = '${email}'`, function(err, data){
            if(err){
                return res.json({response: "failed to register"})
            } else if(data.length === 0){
                db.query(`INSERT INTO db.users (name, surname, email, password) VALUES ('${name}', '${surname}', '${email}', '${hashed_password}')`, function(err, data){
                    if(err){
                        return res.json({response: "failed to register"})
                    };
                    db.query(`INSERT INTO db.carts (user_id, cart_number, sum) VALUES ('${data.insertId}', '1234${data.insertId}', '0')`, function(err){
                        if (err){
                            return res.json({response: "failed to cart register"})
                        };
                        res.json({response: "registered"})
                    })
                })
            } else {
                res.json({response: "email is already registered"})
            }
        })
        
    } catch (err){
        console.log(err)
    }
};

function login (req, res){
    try{
        const { email, password } = req.body;
        db.query(`SELECT * FROM db.users WHERE email = '${email}'`, async function(err, data){
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
    } catch (err){
        console.log(err)
    }
};

module.exports = {register, login};