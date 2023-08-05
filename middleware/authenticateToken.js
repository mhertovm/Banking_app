require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.TOKEN_SECRET;

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (token == null){
        return res.sendStatus(401)
    };
    jwt.verify(token, SECRET, (err) => {
        if (err) {
          return res.sendStatus(403)
        };
        next()
    })
};

module.exports = { authenticateToken };