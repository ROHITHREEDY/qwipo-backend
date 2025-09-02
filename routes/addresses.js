const express = require('express');
const router = express.Router();
const addressModel = require('../models/addressModel');
const { validateAddressInput } = require('../utils/validation');

// Add new address
router.post('/', (req, res) => {
  const errors = validateAddressInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  addressModel.createAddress(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Address created', addressId: id });
  });
});

// Get addresses by customer ID
router.get('/customer/:customerId', (req, res) => {
  addressModel.getAddressesByCustomerId(req.params.customerId, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update address
router.put('/:id', (req, res) => {
  const errors = validateAddressInput(req.body, true);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  addressModel.updateAddress(req.params.id, req.body, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Address not found' });
    res.json({ message: 'Address updated' });
  });
});

// Delete address
router.delete('/:id', (req, res) => {
  addressModel.deleteAddress(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Address not found' });
    res.json({ message: 'Address deleted' });
  });
});

// Search/filter addresses
router.get('/', (req, res) => {
  const filter = {
    city: req.query.city,
    state: req.query.state,
    pinCode: req.query.pinCode,
  };
  addressModel.searchAddresses(filter, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
