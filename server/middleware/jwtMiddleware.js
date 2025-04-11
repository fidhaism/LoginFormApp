const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret from .env
        req.user = decoded; // Attach the decoded token (userId) to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};