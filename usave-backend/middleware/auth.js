const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'

    // Check if the token is provided
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        // Save the decoded user info for use in other routes
        req.user = decoded;
        next();
    });
};
