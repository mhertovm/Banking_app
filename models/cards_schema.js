
function cardsTable(db) {
  const sql = `CREATE TABLE db.cards(id INTEGER AUTO_INCREMENT PRIMARY KEY, user_id INTEGER NOT NULL, cardName TINYTEXT, cardNumber INTEGER NOT NULL, sum INTEGER NOT NULL, dateCreated DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id))`
  db.query(sql);
};

module.exports = { cardsTable };