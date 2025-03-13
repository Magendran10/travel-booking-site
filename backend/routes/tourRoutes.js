/// backend/routes/tourRoutes.js
const express = require('express');
const router = express.Router();
const Tour = require('../models/tour');

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

router.get('/search', async (req, res) => {
    const { location, startDate, endDate, guestCount } = req.query;

    // Convert query dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate if the dates are correct
    if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ message: "Invalid date format for startDate or endDate." });
    }

    try {
        const availableTours = await Tour.find({
            location: location,
            startDate: { $lte: end },     // Tour must start on or before the end date
            endDate: { $gte: start },      // Tour must end on or after the start date
            availableSpots: { $gte: guestCount }
        });

        res.status(200).json(availableTours);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get('/locations', async (req, res) => {
    try {
        // Use MongoDB's distinct method to get unique locations
        const locations = await Tour.distinct('location');
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
});

module.exports = router;
