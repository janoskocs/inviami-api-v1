const jwt = require('jsonwebtoken');

const createToken = (eventLink) => {
  return jwt.sign({ eventLink: eventLink }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = createToken;
