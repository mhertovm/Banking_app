
function transfersTable(db) {
  const sql = `CREATE TABLE db.transfers(id INTEGER AUTO_INCREMENT PRIMARY KEY, sourceCard INTEGER NOT NULL, destinationCard INTEGER NOT NULL, sumTransfer INTEGER NOT NULL, dataTransfer DATETIME NOT NULL,
    FOREIGN KEY (sourceCard) REFERENCES cards(id), FOREIGN KEY (destinationCard) REFERENCES cards(id))`
  db.query(sql);
};

module.exports = { transfersTable };