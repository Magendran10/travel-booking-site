const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: String,
    location: String,
    pricePerNight: Number,
    availableRooms: Number,
    amenities: [String],
});

const Hotel = mongoose.model('Hotel', hotelSchema);