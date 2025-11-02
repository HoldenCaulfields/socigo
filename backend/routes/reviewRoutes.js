// routes/reviewRoutes.js

import express from 'express';
import { protect } from '../middleware/auth.js'; 
import { 
    createReviewOrPost, 
    getSocialFeed, 
    getServiceReviews,
    toggleLike
} from '../controllers/reviewController.js';

const router = express.Router();

// Lấy Social Feed (PUBLIC) và Tạo Review/Post (PRIVATE)
router.route('/')
  .get(getSocialFeed)
  .post(protect, createReviewOrPost);

// Thích/Bỏ thích một bài viết cụ thể (PRIVATE)
router.route('/:id/like')
  .put(protect, toggleLike); 

// Lấy tất cả Reviews cho một Service cụ thể (PUBLIC)
router.route('/service/:serviceId')
  .get(getServiceReviews);

export default router;