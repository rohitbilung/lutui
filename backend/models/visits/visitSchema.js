const mongoose = require('mongoose');

const visitorEntrySchema = new mongoose.Schema({
    date: {
        type: String, // Format: YYYY-MM-DD
        required: true,
    },
    ips: [String],
});

const visitSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
    },
    visitorsByDate: [visitorEntrySchema],
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
