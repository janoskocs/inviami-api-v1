const getEvent = async (req, res) => {
  try {
    res.status(200).json({event: 'GET 1 event'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createEvent = async (req, res) => {
  try {
    res.status(200).json({event: 'POST 1 event'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateEvent = async (req, res) => {
  try {
    res.status(200).json({event: 'PATCH 1 event'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    res.status(200).json({event: 'DELETE 1 event'});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};