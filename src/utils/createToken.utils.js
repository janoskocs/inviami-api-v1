const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
};

module.exports = createToken;
