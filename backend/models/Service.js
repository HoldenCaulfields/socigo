// models/ServiceModel.js

import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  // Liên kết với đối tác (Partner)
  partnerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Giả định User model có trường role='partner'
    required: true,
  },
  
  // Chi tiết dịch vụ
  name: {
    type: String,
    required: [true, 'Tên dịch vụ là bắt buộc.'],
    trim: true,
    maxlength: [100, 'Tên dịch vụ không được vượt quá 100 ký tự'],
  },
  type: {
    type: String,
    enum: ['restaurant', 'hotel', 'spa', 'clinic', 'car', 'other'], // Thêm 'other' cho linh hoạt
    required: [true, 'Loại dịch vụ là bắt buộc.'],
  },
  description: {
    type: String,
    maxlength: [1000, 'Mô tả không được vượt quá 1000 ký tự'],
  },
  images: [
    { type: String } // Danh sách URLs hình ảnh
  ],
  address: {
    type: String,
    required: [true, 'Địa chỉ là bắt buộc.'],
  },
  city: {
    type: String,
    required: [true, 'Thành phố là bắt buộc.'],
  },
  priceRange: {
    type: String,
    enum: ['$', '$$', '$$$', '$$$$', 'high', 'small', 'medium'], // Ví dụ về mức giá
  },

  // Thống kê (Cập nhật tự động khi có Review mới)
  rating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5, 
    set: (val) => parseFloat(val.toFixed(2)) // Lưu trữ tối đa 2 chữ số thập phân
  },
  totalReviews: { 
    type: Number, 
    default: 0 
  },
  
}, {
  timestamps: true // Thêm createdAt và updatedAt
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;