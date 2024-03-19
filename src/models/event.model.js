const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  eventDateTime: {
    type: Date,
    required: true,
  },
  RSPVBy: {
    type: Date,
    required: false
  },
  attendees: [
    {
      attendeeId: String,
      createdAt: Date,
    },
  ],
  invitationTemaple: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  eventApproval: {
    type: Boolean,
    required: true,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedDate: {
    type: Date,
    default: null,
  },
},

{ timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);