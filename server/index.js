require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user');
const { connectDB } = require('./connection/db'); // Database configuration function

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRouter);

// Start the server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        
        // Listen to port
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
