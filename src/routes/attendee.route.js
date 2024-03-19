const express = require('express');
const router = express.Router();

const {
  getAttendee,
  createAttendee,
  updateAttendee,
  deleteAttendee
} = require('../controllers/attendee.controller');

//GET single attendee
router.get('/:attendeeId', getAttendee);

//POST single attendee
router.post('/', createAttendee);

//PATCH single attendee
router.patch('/:attendeeId', updateAttendee);

//DEL single attendee
router.delete('/:attendeeId', deleteAttendee);

module.exports = router;
