const express = require('express');
const router = express.Router();
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');

//GET single event
router.get('/', getEvent);

//POST single event
router.post('/', createEvent);

//PATCH single event
router.patch('/', updateEvent);

//DEL single event
router.delete('/', deleteEvent);

module.exports = router;