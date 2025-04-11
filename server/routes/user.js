const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        console.log('Register request received:', req.body); // Debugging log
        const { name, username, email, password } = req.body;

        // Validate required fields
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log('Username or email already exists:', existingUser); // Debugging log
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
        const newUser = new User({ name, username, email, password: hashedPassword });

        // Save user to database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare password hashes
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message and token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected route to fetch user data
router.get('/user', jwtMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Use `req.user` set by jwtMiddleware
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/forgot-password', async (req, res) => {
    console.log('Forgot password request received:', req.body); // Debugging log
    try {
        const { email, newPassword } = req.body;

        // Check if the user exists using the username field
        const user = await User.findOne({ username: email });
        if (!user) {
            console.log('User not found for email:', email); // Debugging log
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        await User.findOneAndUpdate(
            { username: email }, // Find the user by username
            { password: hashedPassword }, // Update only the password field
            { new: true } // Return the updated document
        );

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;