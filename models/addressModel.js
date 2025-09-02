const db = require('../db');

const createAddress = (address, callback) => {
  const { customerId, addressLine, city, state, pinCode } = address;
  const sql = `INSERT INTO Addresses (customerId, addressLine, city, state, pinCode) VALUES (?, ?, ?, ?, ?)`;
  const params = [customerId, addressLine, city, state, pinCode];
  db.run(sql, params, function(err) {
    callback(err, this ? this.lastID : null);
  });
};

const getAddressesByCustomerId = (customerId, callback) => {
  db.all(`SELECT * FROM Addresses WHERE customerId = ?`, [customerId], callback);
};

const updateAddress = (id, address, callback) => {
  const { addressLine, city, state, pinCode } = address;
  const sql = `UPDATE Addresses SET addressLine = ?, city = ?, state = ?, pinCode = ? WHERE id = ?`;
  const params = [addressLine, city, state, pinCode, id];
  db.run(sql, params, function(err) {
    callback(err, this ? this.changes : null);
  });
};

const deleteAddress = (id, callback) => {
  db.run(`DELETE FROM Addresses WHERE id = ?`, [id], function(err) {
    callback(err, this ? this.changes : null);
  });
};

const searchAddresses = (filter, callback) => {
  let sql = `SELECT * FROM Addresses WHERE 1=1`;
  const params = [];
  if (filter.city) {
    sql += ` AND city LIKE ?`;
    params.push(`%${filter.city}%`);
  }
  if (filter.state) {
    sql += ` AND state LIKE ?`;
    params.push(`%${filter.state}%`);
  }
  if (filter.pinCode) {
    sql += ` AND pinCode LIKE ?`;
    params.push(`%${filter.pinCode}%`);
  }
  db.all(sql, params, callback);
};

module.exports = {
  createAddress,
  getAddressesByCustomerId,
  updateAddress,
  deleteAddress,
  searchAddresses,
};
