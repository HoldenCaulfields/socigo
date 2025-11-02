// controllers/reviewController.js

import Review from '../models/ReviewModel.js';
import Service from '../models/Service.js'; // Cần để kiểm tra serviceId
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// @desc    Tạo Review/Post mới
// @route   POST /api/reviews
// @access  Private
export const createReviewOrPost = asyncHandler(async (req, res) => {
    const { serviceId, rating, text, images } = req.body;
    const userId = req.user._id;

    // 1. Kiểm tra nội dung
    if (!text) {
        res.status(400);
        throw new Error('Nội dung (text) là bắt buộc cho mọi bài viết/đánh giá.');
    }

    // 2. Nếu có serviceId, xác nhận Service và Rating
    if (serviceId) {
        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            res.status(400);
            throw new Error('Service ID không hợp lệ.');
        }
        
        const service = await Service.findById(serviceId);
        if (!service) {
            res.status(404);
            throw new Error('Không tìm thấy dịch vụ để đánh giá.');
        }
        
        // Đánh giá là bắt buộc khi đánh giá dịch vụ
        if (!rating || rating < 1 || rating > 5) {
            res.status(400);
            throw new Error('Rating (1-5) là bắt buộc khi đánh giá dịch vụ.');
        }
        
        // Tùy chọn: Ngăn người dùng đánh giá cùng một dịch vụ nhiều lần
        const existingReview = await Review.findOne({ userId, serviceId });
        if (existingReview) {
             res.status(400);
             throw new Error('Bạn đã đánh giá dịch vụ này rồi.');
        }
    }
    
    // 3. Tạo Review/Post
    const reviewOrPost = await Review.create({
        userId,
        serviceId: serviceId || undefined, // Lưu undefined nếu không có serviceId
        rating,
        text,
        images: images || [],
    });

    res.status(201).json({
        success: true,
        message: 'Bài viết/Đánh giá được tạo thành công!',
        data: reviewOrPost,
    });
});

// @desc    Lấy tất cả bài viết/đánh giá (dùng cho Social Feed)
// @route   GET /api/reviews
// @access  Public
export const getSocialFeed = asyncHandler(async (req, res) => {
    // Thêm phân trang (pagination) và lọc (filtering) ở đây
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    const skip = pageSize * (page - 1);

    const posts = await Review.find({})
        .populate('userId', 'name email') // Lấy tên và email của người đăng
        .populate('serviceId', 'name type') // Lấy tên và loại dịch vụ (nếu có)
        .sort({ createdAt: -1 }) // Bài mới nhất lên đầu
        .limit(pageSize)
        .skip(skip);

    const count = await Review.countDocuments();

    res.status(200).json({
        success: true,
        page,
        pages: Math.ceil(count / pageSize),
        posts,
    });
});

// @desc    Lấy tất cả Reviews cho một Service cụ thể
// @route   GET /api/reviews/service/:serviceId
// @access  Public
export const getServiceReviews = asyncHandler(async (req, res) => {
    const { serviceId } = req.params;

    // Chỉ lấy những bài có Rating (đánh giá thực sự)
    const reviews = await Review.find({ serviceId: serviceId, rating: { $exists: true, $ne: null } })
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: reviews.length,
        reviews,
    });
});

// @desc    Thích/Bỏ thích (Like/Unlike) một bài viết/đánh giá
// @route   PUT /api/reviews/:id/like
// @access  Private
export const toggleLike = asyncHandler(async (req, res) => {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);

    if (!review) {
        res.status(404);
        throw new Error('Không tìm thấy bài viết/đánh giá.');
    }

    // Kiểm tra xem user đã like chưa
    const alreadyLiked = review.likes.includes(userId);

    if (alreadyLiked) {
        // Bỏ thích (Unlike)
        review.likes.pull(userId);
    } else {
        // Thích (Like)
        review.likes.push(userId);
    }

    await review.save();

    res.status(200).json({
        success: true,
        message: alreadyLiked ? 'Đã bỏ thích.' : 'Đã thích.',
        likesCount: review.likes.length,
    });
});