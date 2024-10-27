const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Post a new booking (Bus, Hotel, or Tour)
router.post('/book', async (req, res) => {
    const { userId, type, details } = req.body;

    try {
        const booking = new Booking({ userId, type, details });
        await booking.save();
        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        res.status(400).json({ message: 'Booking failed', error });
    }
});

// Get all bookings for a user
router.get('/bookings/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ message: 'Failed to retrieve bookings', error });
    }
});

module.exports = router;
