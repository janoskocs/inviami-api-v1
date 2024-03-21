const eventModel = require('../models/event.model');

const getEventByLink = async (req, res) => {
  const { eventLink } = req.params;

  try {
    const event = await eventModel.findOne({ link: eventLink });
    if (!event) {
      res.status(404).json({ error: 'Event not found.' });
      return;
    }

    if (event.deleted) {
      res.status(404).json({ error: 'Event not found.' });
      return;
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
      adminCode: event.adminCode
    };

    res.status(200).json(filteredEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get event.', errorMessage: error.message });
  }
};

const createEvent = async (req, res) => {
  const {eventName, customer, description, location, eventDateTime, RSPVBy, invitationTemplate, link, email, giftCode, adminCode} = req.body;

  const allowedFields = ['eventName', 'customer', 'description', 'location', 'eventDateTime', 'RSPVBy', 'invitationTemplate', 'link', 'email', 'giftCode', 'adminCode'];
  const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));

  if (extraFields.length) {
    res.status(400).json({error: `Invalid field(s): ${extraFields.join(', ')}.`});
    return;
  }

  if (!eventName || !customer || !description || !location || !eventDateTime || !RSPVBy || !invitationTemplate || !link || !email || !adminCode) {
    res.status(404).json({error: 'Error creating an event. Please check all the details in: event name, customer, description, location, event date, RSPV time, link, email, adminCode.'});
    return;
  }

  try {
    const existingEvent = await eventModel.findOne({ link });
    if (existingEvent) {
      res.status(400).json({ error: 'Event with the same link already exists.' });
      return;
    }
    const createEvent = await eventModel.create(req.body);
    res.status(200).json(createEvent);
  } catch (error) {
    res.status(500).json({errorMessage: 'Failed to create event. Please contact the seller.', error: error});
  }
};

const updateEvent = async (req, res) => {
  const { eventLink } = req.params;
  const { eventName, customer, description, location, eventDateTime, RSPVBy, invitationTemplate, email } = req.body;

  const allowedFields = ['eventName', 'customer', 'description', 'location', 'eventDateTime', 'RSPVBy', 'invitationTemplate', 'email'];

  const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));

  if (extraFields.length) {
    res.status(400).json({ error: `Invalid field(s): ${extraFields.join(', ')}` });
    return;
  }

  if (!eventName || !customer || !description || !location || !eventDateTime || !RSPVBy || !invitationTemplate || !email) {
    res.status(400).json({ error: 'Missing required field(s).' });
    return;
  }

  try {
    const existingEvent = await eventModel.findOne({ link: eventLink });
    if (!existingEvent) {
      res.status(404).json({ error: 'Event not found.' });
      return;
    }

    const updatedEvent = await eventModel.findOneAndUpdate({ link: eventLink }, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event.', errorMessage: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { eventLink } = req.params;

  try {
    const existingEvent = await eventModel.findOne({ link: eventLink });
    if (!existingEvent) {
      res.status(404).json({ error: 'Event not found.' });
      return;
    }

    const updatedEvent = await eventModel.findOneAndUpdate(
      { link: eventLink },
      { deleted: true, deletedDate: new Date() },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event.', errorMessage: error.message });
  }
};

module.exports = {
  getEventByLink,
  createEvent,
  updateEvent,
  deleteEvent
};