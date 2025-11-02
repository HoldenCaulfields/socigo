// middleware/auth.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';

const protect = async (req, res, next) => {
  let token;

  // Check for 'Bearer' token in the 'Authorization' header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (split 'Bearer <token>')
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID and attach to request object (excluding passwordHash)
      req.user = await User.findById(decoded.id).select('-passwordHash');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check for specific roles
const checkRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Not authorized for this role' });
  }
  next();
};


export { protect, checkRole };