// backend/routes/busRoutes.js
const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// GET route to fetch buses based on origin, destination, and date
router.get('/', async (req, res) => {
    const { origin, destination, date } = req.query;
    try {
        const buses = await Bus.find({ origin, destination, travelDate: date });
        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching buses' });
    }
});

// POST route for booking a seat (simplified for demo purposes)
router.post('/book', async (req, res) => {
    const { busId } = req.body;
    try {
        const bus = await Bus.findById(busId);
        if (bus.availableSeats > 0) {
            bus.availableSeats -= 1;
            await bus.save();
            res.status(200).json({ message: 'Booking successful' });
        } else {
            res.status(400).json({ message: 'No available seats' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error booking bus' });
    }
});

module.exports = router;



// Define route for adding a bus
router.post('/add', async (req, res) => {
    try {
        const newBus = new Bus(req.body);
        await newBus.save();
        res.status(201).json({ message: "Bus added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding bus" });
    }
});

