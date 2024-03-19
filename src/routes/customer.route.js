const express = require('express');
const router = express.Router();

const {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customer.controller');

//GET single customer
router.get('/', getCustomer);

//POST single customer
router.post('/', createCustomer);

//PATCH single customer
router.patch('/', updateCustomer);

//DEL single customer
router.delete('/', deleteCustomer);

module.exports = router;
