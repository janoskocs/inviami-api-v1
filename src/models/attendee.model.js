const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
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
  email: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  cancel: {
    type: Boolean,
    default: false,
  },
  arrivedToEvent: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedDate: {
    type: Date,
    default: null
  },

},

{ timestamps: true }
);

module.exports = mongoose.model('Attendee', attendeeSchema);