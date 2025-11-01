import { CheckCircle, Smartphone } from 'lucide-react';
import Image from 'next/image';

export default function CustomerFeatures() {
    const customerFeatures = [
        'Đăng ký / đăng nhập tài khoản',
        'Tìm kiếm dịch vụ theo từ khóa, danh mục, khu vực',
        'Xem chi tiết dịch vụ (giá, hình ảnh, đánh giá, bảng giá minh bạch)',
        'Đặt lịch trực tiếp trên app (có xác nhận tự động)',
        'Thanh toán online / hoặc tại chỗ',
        'Nhận thông báo nhắc lịch, ưu đãi mới, dịch vụ nổi bật',
    ];

    return (
        <section id="khach-hang" className="py-16 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* IMAGE */}
                    <div className="relative h-[300px] sm:h-[500px] lg:h-[600px] flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-105 order-2 lg:order-1">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src="/gioithieu3.png"
                                alt="Minh họa giao diện ứng dụng khách hàng"
                                className="object-contain w-auto h-full max-w-full rounded-3xl shadow-lg transition-transform duration-500 hover:scale-[1.03]"
                            />
                        </div>
                        <div className=" mt-4 flex items-center justify-center p-3 bg-white rounded-xl shadow-lg border border-blue-300">
                            <Smartphone className="w-5 h-5 text-cyan-600 mr-2" />
                            <span className="text-sm font-semibold text-gray-900">Trải nghiệm liền mạch</span>
                        </div>

                    </div>

                    {/* CONTENT */}
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="inline-flex items-center space-x-2 cursor-pointer bg-blue-300 px-4 py-2 rounded-full hover:shadow-md transition-shadow">
                            <Smartphone className="w-5 h-5 text-gray-800" />
                            <span className="font-medium text-gray-800">Dành Cho Khách Hàng</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Đặt lịch dễ dàng, <span className="text-blue-800">tận hưởng dịch vụ</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                            Toàn bộ các bước từ tìm kiếm, xem chi tiết, đặt lịch đến thanh toán đều được thực hiện nhanh chóng, minh bạch ngay trên ứng dụng di động của bạn.
                        </p>

                        <div className="space-y-3 sm:space-y-4">
                            {customerFeatures.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start space-x-3 group hover:translate-x-1 transition-transform duration-300"
                                >
                                    <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-base sm:text-lg text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#tai-app"
                            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-base sm:text-lg font-medium rounded-full shadow-lg text-white bg-linear-to-r from-gray-900 to-gray-800 hover:shadow-xl transition-all transform hover:scale-105 duration-300 whitespace-nowrap"
                        >
                            Tải ứng dụng ngay
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}
