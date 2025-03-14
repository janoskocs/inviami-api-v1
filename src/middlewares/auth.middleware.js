const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required.' });
  }

  const token = authorization.split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: 'Something went wrong, please log in again.' });
  }
};

module.exports = checkAuth;
