function cartsTable(pool) {
    pool.run(
      `CREATE TABLE IF NOT EXISTS carts(id INTEGER PRIMARY KEY, account_number INTEGER NOT NULL, sum INTEGER NOT NULL)`
    );
  };

  module.exports = { cartsTable };