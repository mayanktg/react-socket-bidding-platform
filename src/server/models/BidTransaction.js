'use strict';

var mongoose = require('mongoose');

var bidTransactionsSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  bid_id: { type: String, required: true },
  status: { type: String, enum: ['invited', 'bided', 'winner' ], default: 'invited' },
  invitation_status: {
    status: { type: String, enum: [ 'pending', 'accepted', 'rejected' ], default: 'pending' },
    reject_reason: { type: String }
  },
  bid_amount: { type: Number },

  created_at: { type: Date, default: new Date() }
});

module.exports = mongoose.model('BidTransaction', bidTransactionsSchema);
