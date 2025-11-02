// models/BookingModel.js

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    // Khách hàng
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Dịch vụ được đặt
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    
    // Chi tiết đặt lịch
    date: {
        type: Date,
        required: [true, 'Ngày đặt dịch vụ là bắt buộc.'],
    },
    time: {
        type: String, // Có thể dùng Date hoặc String 'HH:MM'
        required: [true, 'Giờ đặt dịch vụ là bắt buộc.'],
    },
    people: {
        type: Number,
        required: [true, 'Số người tham gia là bắt buộc.'],
        min: [1, 'Số người phải lớn hơn 0'],
    },

    // Trạng thái & Tích điểm
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
    pointsEarned: { // Điểm tích lũy cho người dùng sau khi hoàn thành
        type: Number,
        default: 0,
    },
}, {
    timestamps: true // Thêm createdAt và updatedAt
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;