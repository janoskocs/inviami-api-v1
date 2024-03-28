const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth.middleware');
const login = require('../controllers/login.controller');

//GET single attendee
router.post('/login', login);

//GET all attendees
router.use(checkAuth);

router.get('/:eventLink', (req, res) => {
  const {eventLink} = req.params;
  console.log(eventLink);
});


module.exports = router;
