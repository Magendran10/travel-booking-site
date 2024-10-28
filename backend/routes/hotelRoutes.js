// backend/routes/busRoutes.js
const express = require('express');
const router = express.Router();
const Bus = require('../models/hotel');

// Hotel Search Endpoint
router.get('/search', async (req, res) => {
    const { location, checkinDate, checkoutDate, guests } = req.query;

    try {
        // Find hotels that match location and have enough rooms available
        const hotels = await Hotel.find({
            location: location,
            availableRooms: { $gte: parseInt(guests) }
        });

        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hotels' });
    }
});


// Route to add a new hotel to the database
router.post('/add', async (req, res) => {
    const { name, location, pricePerNight, availableRooms, amenities } = req.body;

    try {
        // Create a new hotel with the provided data
        const newHotel = new Hotel({
            name,
            location,
            pricePerNight,
            availableRooms,
            amenities,
        });

        // Save the new hotel to the database
        await newHotel.save();
        res.status(201).json({ message: 'Hotel added successfully', hotel: newHotel });
    } catch (error) {
        res.status(500).json({ message: 'Error adding hotel', error });
    }
});

module.exports = router;