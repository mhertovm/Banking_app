const {db} = require('../index');

function cartsTable() {
  const sql = `CREATE TABLE db.carts(id INTEGER AUTO_INCREMENT PRIMARY KEY, user_id INTEGER NOT NULL, cart_number INTEGER NOT NULL, sum INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id))`
  db.query(sql);
};

module.exports = { cartsTable };