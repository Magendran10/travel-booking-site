// backend/models/tourModel.js
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    availableSpots: { type: Number, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Tour', tourSchema);
