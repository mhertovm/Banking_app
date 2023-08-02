
function usersTable(db) {
  const sql = `CREATE TABLE db.users(id INTEGER AUTO_INCREMENT PRIMARY KEY, name TINYTEXT NOT NULL, surname TINYTEXT NOT NULL, email TINYTEXT NOT NULL, password TINYTEXT NOT NULL)`
  db.query(sql)
};

module.exports = { usersTable };