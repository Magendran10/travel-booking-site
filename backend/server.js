// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const busRoutes = require('./routes/busRoutes'); // Import bus routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://magendran:mage2005db@cluster0.tqn8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use('/api/buses', busRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
