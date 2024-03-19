const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  refunded: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedDate: {
    type: Date,
    default: null,
  },
  adminCode: {
    type: String,
    required: true,
  }
},

{ timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);