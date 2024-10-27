// backend/models/Bus.js
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    number: String,
    origin: String,
    destination: String,
    travelDate: String,
    departureTime: String,
    availableSeats: Number,
    price: Number
});

module.exports = mongoose.model('Bus', busSchema);
