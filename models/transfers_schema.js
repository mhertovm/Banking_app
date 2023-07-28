function transfersTable(pool) {
    pool.run(
      `CREATE TABLE IF NOT EXISTS transfers(id INTEGER PRIMARY KEY, cartMinus_id INTEGER NOT NULL, cartPlus_id INTEGER NOT NULL, sum_transfer INTEGER NOT NULL, time_transfer DATETIME NOT NULL,
        FOREIGN KEY (cartMinus_id) REFERENCES carts(id), FOREIGN KEY (cartPlus_id) REFERENCES carts(id))`
    );
  };

  module.exports = { transfersTable };