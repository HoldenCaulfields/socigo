// controllers/serviceController.js

import Service from '../models/Service.js'; // Import Service Model
import asyncHandler from 'express-async-handler'; // Dùng để bọc các hàm async, xử lý lỗi tự động
import mongoose from 'mongoose';

// @desc    Tạo dịch vụ mới
// @route   POST /api/services
// @access  Private (Chỉ dành cho Partner/Admin)
export const createService = asyncHandler(async (req, res) => {
    // 1. Kiểm tra vai trò (role) của người dùng
    // Giả định middleware authMiddleware gắn user object vào req.
    // Nếu bạn muốn chỉ Partner mới được tạo, bạn có thể thêm logic kiểm tra vai trò tại đây
    // if (req.user.role !== 'partner' && req.user.role !== 'admin') {
    //     res.status(403);
    //     throw new Error('Chỉ có đối tác (Partner) hoặc Admin mới được tạo dịch vụ.');
    // }

    const { name, type, description, images, address, city, priceRange } = req.body;

    // 2. Kiểm tra các trường bắt buộc
    if (!name || !type || !address || !city) {
        res.status(400);
        throw new Error('Vui lòng cung cấp tên, loại, địa chỉ và thành phố cho dịch vụ.');
    }

    // 3. Tạo dịch vụ
    const service = await Service.create({
        partnerId: req.user._id, // ID của người dùng (Partner) đang đăng nhập
        name,
        type,
        description,
        images,
        address,
        city,
        priceRange,
        // rating và totalReviews mặc định là 0
    });

    res.status(201).json({
        success: true,
        message: 'Dịch vụ được tạo thành công!',
        service,
    });
});

// @desc    Lấy danh sách TẤT CẢ dịch vụ
// @route   GET /api/services
// @access  Public
export const getServices = asyncHandler(async (req, res) => {
    // Thêm logic tìm kiếm, phân trang (pagination) và lọc (filtering) ở đây
    
    // Ví dụ đơn giản: lấy tất cả và populate thông tin partner
    const services = await Service.find({})
        .populate('partnerId', 'name email') // Lấy tên và email của Partner
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: services.length,
        services,
    });
});

// @desc    Lấy chi tiết dịch vụ theo ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = asyncHandler(async (req, res) => {
    // Kiểm tra ID có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error('ID dịch vụ không hợp lệ.');
    }

    const service = await Service.findById(req.params.id).populate('partnerId', 'name email');

    if (service) {
        res.status(200).json({
            success: true,
            service,
        });
    } else {
        res.status(404);
        throw new Error('Không tìm thấy dịch vụ.');
    }
});

// @desc    Cập nhật dịch vụ
// @route   PUT /api/services/:id
// @access  Private (Chỉ cho phép Chủ sở hữu Service hoặc Admin)
export const updateService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Không tìm thấy dịch vụ.');
    }

    // 1. Kiểm tra Quyền Hạn
    // Đảm bảo người dùng đăng nhập là Partner đã tạo dịch vụ này HOẶC là Admin
    if (service.partnerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Bạn không có quyền cập nhật dịch vụ này.');
    }

    // 2. Cập nhật các trường
    const updatedService = await Service.findByIdAndUpdate(
        req.params.id,
        req.body, // Cập nhật tất cả các trường được gửi trong body
        {
            new: true, // Trả về tài liệu đã được cập nhật
            runValidators: true, // Chạy lại các validators của Mongoose
        }
    ).populate('partnerId', 'name email');


    res.status(200).json({
        success: true,
        message: 'Dịch vụ đã được cập nhật thành công.',
        service: updatedService,
    });
});

// @desc    Xóa dịch vụ
// @route   DELETE /api/services/:id
// @access  Private (Chỉ cho phép Chủ sở hữu Service hoặc Admin)
export const deleteService = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id);

    if (!service) {
        res.status(404);
        throw new Error('Không tìm thấy dịch vụ.');
    }

    // 1. Kiểm tra Quyền Hạn (tương tự như update)
    if (service.partnerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Bạn không có quyền xóa dịch vụ này.');
    }

    // 2. Xóa dịch vụ
    await Service.deleteOne({ _id: req.params.id });

    // TODO: Cần thêm logic xóa tất cả Bookings và Reviews liên quan đến Service này.

    res.status(200).json({
        success: true,
        message: 'Dịch vụ đã được xóa thành công.',
    });
});

export const getTopServices = asyncHandler(async (req, res) => {
    // 1. Xác định số lượng dịch vụ top muốn lấy
    const limit = 5; // Ví dụ: Lấy 4 dịch vụ hàng đầu

    // 2. Định nghĩa tiêu chí sắp xếp:
    // Sắp xếp theo: 
    // - rating (giảm dần)
    // - totalReviews (giảm dần)
    const topServices = await Service.find({})
        .sort({ rating: -1, totalReviews: -1 }) // Dịch vụ có rating cao nhất và nhiều reviews nhất lên đầu
        .limit(limit) // Chỉ lấy số lượng đã định nghĩa
        .populate('partnerId', 'name'); // Lấy tên đối tác

    if (topServices.length === 0) {
        // Nếu không có dịch vụ nào, trả về mảng rỗng
        return res.status(200).json({
            success: true,
            message: 'Chưa có dịch vụ nào được xếp hạng.',
            services: [],
        });
    }

    res.status(200).json({
        success: true,
        services: topServices,
    });
});