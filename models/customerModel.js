// models/customerModel.js

const db = require('../db');

const createCustomer = (customer, callback) => {
  const { firstName, lastName, phoneNumber, city, state, pinCode } = customer;
  const sql = `INSERT INTO Customers (firstName, lastName, phone, city, state, pinCode) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [firstName, lastName, phoneNumber, city, state, pinCode];
  db.run(sql, params, function(err) {
    callback(err, this ? this.lastID : null);
  });
};

const getAllCustomers = (callback) => {
  const sql = `SELECT * FROM Customers`;
  db.all(sql, [], callback);
};

const getCustomerById = (id, callback) => {
  const sql = `SELECT * FROM Customers WHERE id = ?`;
  db.get(sql, [id], callback);
};

const updateCustomer = (id, customer, callback) => {
  const { firstName, lastName, phoneNumber, city, state, pinCode } = customer;
  const sql = `UPDATE Customers SET firstName = ?, lastName = ?, phone = ?, city = ?, state = ?, pinCode = ? WHERE id = ?`;
  const params = [firstName, lastName, phoneNumber, city, state, pinCode, id];
  db.run(sql, params, function(err) {
    callback(err, this ? this.changes : null);
  });
};

const deleteCustomer = (id, callback) => {
  const sql = `DELETE FROM Customers WHERE id = ?`;
  db.run(sql, [id], function(err) {
    callback(err, this ? this.changes : null);
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
