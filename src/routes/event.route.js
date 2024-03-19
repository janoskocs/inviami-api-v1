const express = require('express');
const router = express.Router();
const {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');

//GET single event
router.get('/:eventId', getEvent);

//POST single event
router.post('/', createEvent);

//PATCH single event
router.patch('/:eventId', updateEvent);

//DEL single event
router.delete('/:eventId', deleteEvent);

module.exports = router;