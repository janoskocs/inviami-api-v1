const getAttendee = async (req, res) => {
  try {
    res.status(200).json({attendee: 'GET 1 attendee'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createAttendee = async (req, res) => {
  try {
    res.status(200).json({attendee: 'POST 1 attendee'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAttendee = async (req, res) => {
  try {
    res.status(200).json({attendee: 'PATCH 1 attendee'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteAttendee = async (req, res) => {
  try {
    res.status(200).json({attendee: 'DELETE 1 attendee'});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAttendee,
  createAttendee,
  updateAttendee,
  deleteAttendee
};