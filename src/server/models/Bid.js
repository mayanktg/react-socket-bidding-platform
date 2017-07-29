'use strict';

var mongoose = require('mongoose');

var bidSchema = mongoose.Schema({
  bid_items: [{ type: String }],
  bid_desc: String,
  min_bid_value: { type: Number, default: 0 },
  max_bid_count: { type: Number },
  invited_bidders: [{ type: String }],
  start_date: { type: Date, default: new Date() },
  end_date: { type: Date, required: true },
  is_active: {  type: Boolean, default: true },

  created_by: String,
  created_at: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Bid', bidSchema);
