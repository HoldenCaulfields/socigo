// controllers/bookingController.js

import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// @desc    Create a new booking (by Customer)
// @route   POST /api/bookings
// @access  Private (User)
export const createBooking = asyncHandler(async (req, res) => {
    const { serviceId, date, time, people } = req.body;
    
    // 1. Validate required fields
    if (!serviceId || !date || !time || !people) {
        res.status(400);
        throw new Error('Please provide serviceId, date, time, and number of people.');
    }

    // 2. Ensure service exists and is available (optional check)
    const service = await Service.findById(serviceId);

    if (!service) {
        res.status(404);
        throw new Error('Service not found.');
    }

    // 3. Prevent partners from booking their own service (optional logic)
    if (service.partnerId.toString() === req.user._id.toString()) {
        res.status(400);
        throw new Error('Cannot book your own service.');
    }
    
    // 4. Create the booking
    const booking = await Booking.create({
        userId: req.user._id, // Customer ID from auth middleware
        serviceId,
        date,
        time,
        people,
        // status defaults to 'pending'
    });

    res.status(201).json({
        success: true,
        message: 'Booking successfully created and is pending confirmation.',
        booking,
    });
});


// @desc    Get all bookings made by the logged-in customer
// @route   GET /api/bookings/my
// @access  Private (User)
export const getMyBookings = asyncHandler(async (req, res) => {
    // Find all bookings where the userId matches the logged-in user's ID
    const bookings = await Booking.find({ userId: req.user._id })
        .populate('serviceId', 'name address images partnerId') // Populate service details
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: bookings.length,
        bookings,
    });
});


// @desc    Get all bookings for services owned by the logged-in partner
// @route   GET /api/bookings/partner
// @access  Private (Partner/Admin)
export const getPartnerBookings = asyncHandler(async (req, res) => {
    // 1. Find all services owned by the logged-in user (partner)
    const partnerServices = await Service.find({ partnerId: req.user._id }).select('_id');
    const serviceIds = partnerServices.map(service => service._id);

    // 2. Find all bookings associated with those service IDs
    const bookings = await Booking.find({ serviceId: { $in: serviceIds } })
        .populate('userId', 'name email') // Populate customer details
        .populate('serviceId', 'name address') // Populate service name and address
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: bookings.length,
        bookings,
    });
});


// @desc    Update booking status (by Partner)
// @route   PUT /api/bookings/:id/status
// @access  Private (Partner/Admin)
export const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id: bookingId } = req.params;

    if (!status || !['confirmed', 'completed', 'cancelled'].includes(status)) {
        res.status(400);
        throw new Error('Invalid status update. Must be confirmed, completed, or cancelled.');
    }

    const booking = await Booking.findById(bookingId).populate('serviceId');

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found.');
    }

    // 1. Authorization check: Ensure the user is the owner (partnerId) of the service being booked
    if (booking.serviceId.partnerId.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this booking status.');
    }
    
    // 2. Update status and handle points earned if completed
    booking.status = status;
    
    if (status === 'completed') {
        // Simple logic for points earned (e.g., 10 points per person booked)
        booking.pointsEarned = booking.people * 10; 
        
        // TODO: Future logic needed here to actually update the User model's total points.
    }

    const updatedBooking = await booking.save();

    res.status(200).json({
        success: true,
        message: `Booking status updated to ${status}.`,
        booking: updatedBooking,
    });
});