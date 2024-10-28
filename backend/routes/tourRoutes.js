/// backend/routes/tourRoutes.js
const express = require('express');
const router = express.Router();
const Tour = require('../models/tour*');

// Route to add a tour (for admin or similar)
router.post('/add', async (req, res) => {
    const { name, location, startDate, endDate, price, availableSpots, description } = req.body;

    const newTour = new Tour({
        name,
        location,
        startDate,
        endDate,
        price,
        availableSpots,
        description
    });

    try {
        const savedTour = await newTour.save();
        res.status(201).json(savedTour);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to search for available tours
router.get('/search', async (req, res) => {
    const { location, startDate, endDate, guestCount } = req.query;

    try {
        const availableTours = await Tour.find({
            location: location,
            startDate: { $gte: new Date(startDate) },
            endDate: { $lte: new Date(endDate) },
            availableSpots: { $gte: guestCount }
        });

        res.status(200).json(availableTours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
