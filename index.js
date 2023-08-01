const mysql = require('mysql2')
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
  });

    db.connect((err)=>{
        if(err){
            console.log("error connect db");
        } else {
            console.log("db conected");
        }
    
    })

module.exports =  {db} 