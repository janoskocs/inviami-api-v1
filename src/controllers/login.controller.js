const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const eventModel = require('../models/event.model');
const createToken = require('../utils/createToken.utils');

const login = async (req, res) => {
  const { adminCode, eventLink } = req.body;

  if (!adminCode) {
    return res.status(400).json({ error: 'PIN is required' });
  }
  if (!/^\d{4}$/.test(adminCode)) {
    return res.status(400).json({ error: 'Invalid PIN code.' });
  }

  if (!eventLink) {
    return res.status(400).json({ error: 'Event link is required' });
  }
  if (eventLink.length >= 50) {
    return res.status(400).json({ error: 'Event link is too long' });
  }

  const sanitizedAdminCode = adminCode.trim();
  const sanitizedEventLink = eventLink.trim();

  try {
    const event = await eventModel.findOne({ link: sanitizedEventLink });

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const isMatch = await bcrypt.compare(sanitizedAdminCode, event.adminCode);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid PIN code' });
    }
    const token = createToken(eventLink);
    return res.status(200).json({token});
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = login;
