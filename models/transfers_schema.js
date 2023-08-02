
function transfersTable(db) {
  const sql = `CREATE TABLE db.transfers(id INTEGER AUTO_INCREMENT PRIMARY KEY, cartMinus_id INTEGER NOT NULL, cartPlus_id INTEGER NOT NULL, sum_transfer INTEGER NOT NULL, time_transfer DATETIME NOT NULL,
    FOREIGN KEY (cartMinus_id) REFERENCES carts(id), FOREIGN KEY (cartPlus_id) REFERENCES carts(id))`
  db.query(sql);
};

module.exports = { transfersTable };