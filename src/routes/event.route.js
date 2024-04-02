const express = require('express');
const router = express.Router();
const {
  getEventByLink,
  createEvent,
  updateEvent,
  deleteEvent,
  addAttendee,
  checkLink
} = require('../controllers/event.controller');
const checkAuth = require('../middlewares/auth.middleware');

//GET single event
router.get('/:eventLink', getEventByLink);

//POST single event
router.post('/', createEvent);

router.post('/checkLink', checkLink);

//PATCH single event
router.patch('/:eventLink', updateEvent);

router.patch('/:eventLink/attend', addAttendee);

//DEL single event
router.delete('/:eventLink', deleteEvent);

module.exports = router;