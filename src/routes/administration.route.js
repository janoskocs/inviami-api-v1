const express = require('express');
const router = express.Router();
const eventModel = require('../models/event.model');
const checkAuth = require('../middlewares/auth.middleware');
const login = require('../controllers/login.controller');
const jwt = require('jsonwebtoken');

//GET single attendee
router.post('/login', login);

//GET all attendees
router.use(checkAuth);

router.get('/', async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: 'You need to be logged in to access this resource.' });
  }

  const token = authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const eventLink = {
    link: decoded.eventLink,
  };

  const event = await eventModel.findOne(eventLink);
  if (!event) {
    return res.status(404).json({ message: 'Event not found' });
  }

  const filteredEvent = {
    eventName: event.eventName,
    customer: event.customer,
    description: event.description,
    location: event.location,
    eventDateTime: event.eventDateTime,
    RSPVBy: event.RSPVBy,
    invitationTemplate: event.invitationTemplate,
    link: event.link,
    schedule: event.schedule,
    attendees: event.attendees,
  };
  
  res.json(filteredEvent);
});

module.exports = router;
