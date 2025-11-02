
import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import { protect, checkRole } from './middleware/auth.js';
import landingpage from './landingpage/landingpage.js';
import bookingRoutes from './routes/bookingRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// --- ROUTES ---

// Public Auth routes
app.use('/api/auth', authRoutes);

// **Example of a protected route**
// You would likely have separate routes for the Service model logic
app.get('/api/users/profile', protect, (req, res) => {
  // req.user is available here thanks to the 'protect' middleware
  res.json({
    message: 'User profile accessed successfully',
    user: req.user,
  });
});

// **Example of a protected route with role check**
app.get('/api/admin/dashboard', protect, checkRole('admin'), (req, res) => {
  res.json({
    message: 'Admin dashboard accessed successfully',
    user: req.user,
  });
});

app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);

//landing page
app.use('/register', landingpage);

// --- SERVER START ---

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  () => console.log(`\nServer running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);