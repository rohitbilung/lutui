const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    count: {
      type: Number,
      default: 0,
    },
    visitors: [String], // Store IPs
  });

const visits = mongoose.model('Visit', visitSchema);

module.exports = visits;
