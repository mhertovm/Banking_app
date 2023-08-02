require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.TOKEN_SECRET;
const {db} = require('../index')

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (token == null){
        return res.sendStatus(401)
    };
    jwt.verify(token, SECRET, (err) => {
        if (err) {
          return res.sendStatus(403)
        };
        const decoded = jwt.decode(token);
        db.query(`SELECT * FROM db.users WHERE email = '${decoded.email}'`, function(err, data){
            if(err){
                return res.sendStatus(403)
            };
            
        })
    })
};

module.exports = { authenticateToken };