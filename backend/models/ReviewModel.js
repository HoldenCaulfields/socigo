// models/ReviewModel.js

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    // Người dùng đăng bài/đánh giá
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Dịch vụ được đánh giá (Nếu là bài viết không liên quan dịch vụ, trường này có thể null/undefined)
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        // required: false, // Tùy chọn: Nếu là bài viết mạng xã hội chung thì không cần
    },
    
    // Chi tiết Review
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: function() { return !!this.serviceId; } // Bắt buộc phải có rating nếu có serviceId
    },
    text: {
        type: String,
        required: [true, 'Nội dung bài viết/đánh giá là bắt buộc.'],
        maxlength: [2000, 'Nội dung không được vượt quá 2000 ký tự'],
    },
    images: [
        { type: String } // Danh sách URLs hình ảnh
    ],
    
    // Tính năng mạng xã hội
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Danh sách người dùng đã like
        }
    ],

}, {
    timestamps: true
});


/** * Middleware Quan Trọng: Cập nhật Rating/Review của Service 
 * Sẽ chạy sau khi một Review được lưu (hoặc xóa)
 */
reviewSchema.post('save', async function() {
    const review = this;
    if (review.serviceId) {
        // Dùng mô hình Service (import Service)
        const Service = mongoose.model('Service'); 
        
        // 1. Tính toán lại Rating trung bình và tổng số Reviews
        const stats = await review.constructor.aggregate([
            { $match: { serviceId: review.serviceId } },
            { $group: { 
                _id: '$serviceId', 
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 }
            }}
        ]);

        // 2. Cập nhật Service
        await Service.findByIdAndUpdate(review.serviceId, {
            rating: stats.length > 0 ? stats[0].averageRating : 0,
            totalReviews: stats.length > 0 ? stats[0].totalReviews : 0,
        });
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;