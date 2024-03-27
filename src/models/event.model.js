const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    adminCode: {
      type: Number,
      required: true,
      default: 0o0,
    },
    refunded: {
      type: Boolean,
      default: false,
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
      required: false,
    },
    attendees: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        notes: {
          type: String,
          default: null,
        },
        isAttending: {
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
      },
    ],
    invitationTemplate: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    eventApproval: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAgreedToTerms: {
      type: Boolean,
      required: true
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedDate: {
      type: Date,
      default: null,
    },
    schedule: [
      {
        activity: {
          type: String,
        },
        activityHour: {
          type: String,
        },
        activityIcon: {
          type: String,
          default: 'default-1.svg',
        },
      }
    ]
  },

  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
