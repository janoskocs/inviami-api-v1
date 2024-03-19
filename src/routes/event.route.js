const express = require('express');
const router = express.Router();
const {
  getEventByLink,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/event.controller');

//GET single event
router.get('/:eventLink', getEventByLink);

//POST single event
router.post('/', createEvent);

//PATCH single event
router.patch('/:eventLink', updateEvent);

//DEL single event
router.delete('/:eventLink', deleteEvent);

//GET event details and attendees
router.get('/:eventLink/admin', getEventByLink);

module.exports = router;