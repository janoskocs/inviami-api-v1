const getCustomer = async (req, res) => {
  try {
    res.status(200).json({customer: 'GET 1 customer'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const createCustomer = async (req, res) => {
  try {
    res.status(200).json({customer: 'POST 1 customer'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    res.status(200).json({customer: 'PATCH 1 customer'});
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    res.status(200).json({customer: 'DELETE 1 customer'});
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
};