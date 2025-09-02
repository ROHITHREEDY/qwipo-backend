const express = require('express');
const router = express.Router();

const { validateCustomerInput } = require('../utils/validation');
const { createCustomer, getAllCustomers } = require('../models/customerModel');

// POST route (keep existing)
router.post('/', (req, res) => {
  const errors = validateCustomerInput(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  createCustomer(req.body, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id, message: 'Customer created successfully' });
  });
});

// NEW: GET route to fetch all customers
router.get('/', (req, res) => {
  getAllCustomers((err, customers) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(customers);
  });
});

module.exports = router;
