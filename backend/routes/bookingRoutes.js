// routes/bookingRoutes.js

import express from 'express';
import { protect } from '../middleware/auth.js'; // Assuming you have a 'protect' middleware
import { 
    createBooking, 
    getMyBookings,
    getPartnerBookings,
    updateBookingStatus
} from '../controllers/bookingController.js';

const router = express.Router();

// Base routes for creating and listing customer's own bookings
router.route('/')
  .post(protect, createBooking); 

router.route('/my')
  .get(protect, getMyBookings);

// Route for partners to see bookings for their services
router.route('/partner')
  .get(protect, getPartnerBookings);

// Route for partners to update a specific booking status
router.route('/:id/status')
  .put(protect, updateBookingStatus);

export default router;