const eventModel = require('../models/event.model');

const getEvent = async (req, res) => {
  try {
    res.status(200).json({event: 'GET 1 event'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createEvent = async (req, res) => {
  console.log(req.body);
  const {eventName, customer, description, location, eventDateTime, RSPVBy, invitationTemplate, link} = req.body;

  const allowedFields = ['eventName', 'customer', 'description', 'location', 'eventDateTime', 'RSPVBy', 'invitationTemplate', 'link'];
  const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));

  if (extraFields.length) {
    res.status(400).json({error: `Invalid field(s): ${extraFields.join(', ')}`});
    return;
  }

  if (!eventName || !customer || !description || !location || !eventDateTime || !RSPVBy || !invitationTemplate || !link) {
    res.status(404).json({error: 'Error creating an event. Please check all the details in: eventName, customer, description, location, eventDateTime, RSPVBy, invitationTemplate, link.'});
    return;
  }

  try {
    const createEvent = await eventModel.create(req.body);
    res.status(200).json(createEvent);
  } catch (error) {
    res.status(500).json({errorMessage: 'Failed to create event. Please contact the seller.', error: error});
  }
};

const updateEvent = async (req, res) => {
  try {
    res.status(200).json({event: 'PATCH 1 event'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    res.status(200).json({event: 'DELETE 1 event'});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};