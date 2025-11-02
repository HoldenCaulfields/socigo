// routes/auth.js

import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import passport from '../config/passport.js'; // Import the configured passport

const router = express.Router();

// Helper function to send user info and JWT
const sendAuthResponse = (res, user) => {
  const token = generateToken(user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
    token, // Send the JWT
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash is handled by the pre-save middleware in the User model
    const user = await User.create({
      name,
      email,
      // The password is automatically hashed and saved as passwordHash
      passwordHash: password, 
      address,
      role,
    });

    if (user) {
      sendAuthResponse(res, user);
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during sign up' });
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists AND if the password matches the hash
    if (user && (await user.matchPassword(password))) {
      sendAuthResponse(res, user);
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ** Google Auth Routes **

// @desc    Authenticate with Google
// @route   GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`, // Redirect on failure
    session: false // We will handle our own JWT, not relying on Passport sessions
  }),
  (req, res) => {
    // Authentication successful. Send back a JWT (optional: you can redirect 
    // to a frontend page that handles JWT generation from the user object)
    
    // For simplicity, we'll generate the JWT and redirect it with the token as a URL param
    const token = generateToken(req.user._id);
    
    // Redirect to the frontend with the token
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
  }
);


export default router;