const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create the Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Madmonkey:Madmonkey@travel-booking.scsve.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },  // bus, hotel, or tour
    details: { type: Object, required: true },  // booking details
    createdAt: { type: Date, default: Date.now }
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema);

// Handle POST request to create a new booking
app.post('/api/bookings/book', async (req, res) => {
    try {
        const { userId, type, details } = req.body;
        const newBooking = new Booking({ userId, type, details });
        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
