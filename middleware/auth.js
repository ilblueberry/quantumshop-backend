const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from headers
  const token = req.header('x-auth-token');

  // If no token, block access
  if (!token) return res.status(401).json({ msg: 'No token, access denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, 'yourSecretKey'); // Use the same secret as in login
    req.user = decoded.id; // Attach user ID to request
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
};
