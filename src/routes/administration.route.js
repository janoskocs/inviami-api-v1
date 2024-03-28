const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth.middleware');

//GET single attendee
router.post('/login', (req, res) => {
  res.status(200).json({message: 'Login page'});
});

//GET all attendees
router.use(checkAuth);

router.get('/:eventLink', (req, res) => {
  const {eventLink} = req.params;
  console.log(eventLink);
});


module.exports = router;
