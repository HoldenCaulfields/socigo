// components/MobileAppVideoCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, DollarSign, Clock, AlertCircle } from 'lucide-react';

// Dữ liệu hình ảnh và icon
const slides = [
    '/gioithieu.png', // Mạng xã hội/Bài viết
    '/gioithieu2.png', // Đánh giá dịch vụ (xe sang)
    '/gioithieu3.png', // Danh sách dịch vụ (Hotel, Bar...)
    '/gioithieu4.png', // Trang chi tiết dịch vụ (BAR ROYAL)
    '/gioithieu5.png', // Đặt lịch thành công
];

// Danh sách các icon trang trí và vị trí tương đối
const decorativeIcons = [
    { icon: Share2, color: 'text-gray-500', position: 'top-1/4 left-0 -translate-x-1/2', size: 'h-10 w-10' }, // Chia sẻ
    { icon: MessageCircle, color: 'text-gray-600', position: 'top-1/2 left-0 -translate-x-1/4', size: 'h-12 w-12' }, // Chat/Bình luận
    { icon: DollarSign, color: 'text-green-500', position: 'bottom-1/4 left-0 -translate-x-1/2', size: 'h-10 w-10' }, // Giao dịch/Dịch vụ
    { icon: Heart, color: 'text-red-500', position: 'top-1/4 right-0 translate-x-1/2', size: 'h-12 w-12' }, // Yêu thích
    { icon: Clock, color: 'text-blue-500', position: 'top-1/2 right-0 translate-x-1/4', size: 'h-10 w-10' }, // Thời gian/Lịch hẹn
    { icon: AlertCircle, color: 'text-yellow-500', position: 'bottom-1/4 right-0 translate-x-1/2', size: 'h-12 w-12' }, // Lưu ý/Thông báo
];

const MobileCard: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = slides.length;
    const intervalTime = 3000; // Thời gian chuyển slide: 3 giây

    useEffect(() => {
        // Logic tự động chuyển slide
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, intervalTime);

        // Dọn dẹp interval khi component unmount
        return () => clearInterval(interval);
    }, [totalSlides]);

    return (
        <div className="relative flex justify-center items-center w-full max-w-lg mx-auto py-12">
            {/* Container chính với hiệu ứng 3D và đổ bóng nổi bật */}
            <div className="relative w-[300px] h-[600px] sm:w-[320px] sm:h-[640px] perspective-1000">
                {/* Khung điện thoại giả lập */}
                <div className="absolute inset-0 z-10 p-2 rounded-[3rem] bg-gray-900 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25),0_18px_36px_-18px_rgba(0,0,0,0.3)] border-10 border-gray-900 overflow-hidden transform rotate-x-10 rotate-z-3 transition-all duration-700 hover:rotate-x-0 hover:rotate-z-0">
                    {/* Lớp chứa màn hình: Đảm bảo 'w-full h-full' và 'relative' */}
                    <div className="relative w-full h-full rounded-4xl overflow-hidden">
                        {/* Carousel Ảnh: Hiển thị slide hiện tại */}
                        <div className="flex w-full h-full transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {slides.map((slide, index) => (
                                < div key={index} className="shrink-0 w-full h-full" >
                                    <img
                                        src={slide}
                                        alt={`App Screen ${index + 1}`}

                                        className="w-full h-full object-cover"
                                        loading={index === currentSlide ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Thanh hiển thị tiến trình (Indicators) */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                            {slides.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-gray-400 opacity-60'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Các Icon trang trí động: Floating Icons */}
            {
                decorativeIcons.map(({ icon: Icon, color, position, size }, index) => (
                    <div
                        key={index}
                        className={`absolute ${position} transition-all duration-1000 ease-in-out animate-bounce-slow-delay-${index} opacity-80 z-0`}
                        style={{
                            animationDelay: `${index * 0.5}s`,
                            animationDuration: `${4 + (index % 3) * 0.5}s`,
                        }}
                    >
                        <Icon className={`${size} ${color} drop-shadow-lg`} />
                    </div>
                ))
            }
        </div >
    );
};

export default MobileCard;