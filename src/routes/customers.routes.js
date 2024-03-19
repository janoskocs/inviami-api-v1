const express = require('express');
const router = express.Router();

const {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customers.controllers');

//GET single customer
router.get('/', getCustomer);

//POST single customer
router.post('/', createCustomer);

//PATCH single customer
router.patch('/', updateCustomer);

//DEL single customer
router.del('/', deleteCustomer);
