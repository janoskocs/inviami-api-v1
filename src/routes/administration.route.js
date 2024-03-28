const express = require('express');

const router = express.Router();

//GET single attendee
router.get('/:eventLink', (req, res) => {
  const {eventLink} = req.params;
  console.log(eventLink);
});


module.exports = router;
