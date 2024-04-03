const eventModel = require('../models/event.model');
const bcrypt = require('bcrypt');

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
      schedule: event.schedule,
    };

    res.status(200).json(filteredEvent);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to get event.', errorMessage: error.message });
  }
};

const createEvent = async (req, res) => {
  const {
    eventName,
    customer,
    description,
    location,
    eventDateTime,
    // RSPVBy,
    invitationTemplate,
    link,
    email,
    adminCode,
    isAgreedToTerms,
    schedule,
  } = req.body;

  const allowedFields = [
    'eventName',
    'customer',
    'description',
    'location',
    'eventDateTime',
    // 'RSPVBy',
    'invitationTemplate',
    'link',
    'email',
    'adminCode',
    'isAgreedToTerms',
    'schedule',
  ];
  const extraFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length) {
    res
      .status(400)
      .json({ error: `Invalid field(s): ${extraFields.join(', ')}.` });
    return;
  }

  if (
    !eventName ||
    !customer ||
    !description ||
    !location ||
    !eventDateTime ||
    // !RSPVBy ||
    !invitationTemplate ||
    !link ||
    !email ||
    !adminCode ||
    !isAgreedToTerms ||
    !schedule
  ) {
    res.status(404).json({
      error: 'Error creating an event. Please check all the details.',
    });
    return;
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(adminCode.toString(), salt);
  const adminCodeToUser = req.body.adminCode;
  req.body.adminCode = hash;

  try {
    const existingEvent = await eventModel.findOne({ link });
    if (existingEvent) {
      res
        .status(400)
        .json({ error: 'Event with the same link already exists.' });
      return;
    }

    const createEvent = await eventModel.create(req.body);
    const sendConfirmation = await eventModel.findOne({ link: req.body.link });
    const confirmationObject = {
      eventName: sendConfirmation.eventName,
      customer: sendConfirmation.customer,
      description: sendConfirmation.description,
      location: sendConfirmation.location,
      eventDateTime: sendConfirmation.eventDateTime,
      RSPVBy: sendConfirmation.RSPVBy,
      invitationTemplate: sendConfirmation.invitationTemplate,
      link: sendConfirmation.link,
      schedule: sendConfirmation.schedule,
    };
    
    res.status(200).json({ ...confirmationObject, adminCode: adminCodeToUser });
  } catch (error) {
    res.status(500).json({
      errorMessage: 'Failed to create event. Please contact the seller.',
      error: error,
    });
  }
};

const updateEvent = async (req, res) => {
  const { eventLink } = req.params;
  const {
    eventName,
    customer,
    description,
    location,
    eventDateTime,
    RSPVBy,
    invitationTemplate,
    email,
  } = req.body;

  const allowedFields = [
    'eventName',
    'customer',
    'description',
    'location',
    'eventDateTime',
    'RSPVBy',
    'invitationTemplate',
    'email',
  ];

  const extraFields = Object.keys(req.body).filter(
    (field) => !allowedFields.includes(field)
  );

  if (extraFields.length) {
    res
      .status(400)
      .json({ error: `Invalid field(s): ${extraFields.join(', ')}` });
    return;
  }

  if (
    !eventName ||
    !customer ||
    !description ||
    !location ||
    !eventDateTime ||
    !RSPVBy ||
    !invitationTemplate ||
    !email
  ) {
    res.status(400).json({ error: 'Missing required field(s).' });
    return;
  }

  try {
    const existingEvent = await eventModel.findOne({ link: eventLink });
    if (!existingEvent) {
      res.status(404).json({ error: 'Event not found.' });
      return;
    }

    const updatedEvent = await eventModel.findOneAndUpdate(
      { link: eventLink },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to update event.', errorMessage: error.message });
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
    res
      .status(500)
      .json({ error: 'Failed to delete event.', errorMessage: error.message });
  }
};

const addAttendee = async (req, res) => {
  const { eventLink } = req.params;

  try {
    const existingEvent = await eventModel.findOne({ link: eventLink });
    if (!existingEvent) {
      res.status(404).json({ error: 'Event not found.' });
      return;
    }

    const updateAttendeeList = await eventModel.updateOne(
      { link: eventLink },
      {
        $push: {
          attendees: {
            $each: [{ ...req.body, createdAt: new Date() }],
          },
        },
      }
    );

    res.status(200).json(updateAttendeeList);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to add attendee.', errorMessage: error.message });
  }
};

const checkLink = async (req, res) => {
  const { link } = req.body;

  try {
    const existingEvent = await eventModel.findOne({ link });
    if (!existingEvent) {
      res.status(200).json({ message: 'Event link is valid.', available: true});
    } else {
      res.status(200).json({ message: 'Event link is not available.', available: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Failed to check event link.', errorMessage: error.message });
  }
};

module.exports = {
  getEventByLink,
  createEvent,
  updateEvent,
  deleteEvent,
  addAttendee,
  checkLink
};
