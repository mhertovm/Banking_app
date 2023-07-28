function usersTable(pool) {
    pool.run(
      `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, cart_id INTEGER NOT NULL, email STRING NOT NULL, password STRING NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES carts(id))`
    );
  };

  module.exports = { usersTable };