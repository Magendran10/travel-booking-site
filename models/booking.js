const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },  // e.g., "bus", "hotel", "tour"
    details: { type: Object, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
