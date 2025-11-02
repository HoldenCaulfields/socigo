// utils/generateToken.js

import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Generate a JWT with the user's ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export default generateToken;