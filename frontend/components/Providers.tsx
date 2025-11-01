import { Briefcase, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Providers() {
    // Các tính năng được trích xuất từ hình ảnh
    const providerFeatures = [
        'Tạo hồ sơ doanh nghiệp, danh sách dịch vụ, bảng giá.',
        'Quản lý lịch đặt, xác nhận lịch hẹn cập nhật (ghế, bàn, phòng...) trống hay có người đang sử dụng.',
        'Trả lời đánh giá, chăm sóc khách hàng trực tiếp.',
        'Tạo chương trình khuyến mãi riêng.',
        'Xem báo cáo doanh thu.',
    ];

    return (
        <section id="nha-cung-cap" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center space-x-2 cursor-pointer bg-blue-300 px-4 py-2 rounded-full hover:shadow-md transition-shadow">
                            <Briefcase className="w-5 h-5 text-gray-800" />
                            <span className="font-medium text-gray-800">Dành Cho Nhà Cung Cấp</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                            Tối ưu vận hành, <span className="text-gray-900">tăng trưởng doanh thu</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Cung cấp công cụ toàn diện giúp quản lý dịch vụ, lịch hẹn, chăm sóc khách hàng và các chương trình khuyến mãi hiệu quả ngay trên một nền tảng duy nhất.
                        </p>
                        
                        <div className="space-y-4">
                            {providerFeatures.map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-3 group hover:translate-x-1 transition-transform">
                                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1 group-hover:scale-105 transition-transform" />
                                    <span className="text-lg text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                        <a
                            href={"#tai-app"}
                            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-linear-to-r from-gray-900 to-gray-700 hover:shadow-xl transition-all transform hover:scale-105 duration-300 **whitespace-nowrap**"
                        > Đăng ký ngay </a>
                    </div>
                    {/* PHẦN HÌNH ẢNH ĐÃ ĐƯỢC CẬP NHẬT */}
                    <div className="relative **h-96** **bg-gray-100** rounded-3xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow p-6">
                        {/* Hình ảnh điện thoại được hiển thị một cách nổi bật hơn */}
                        <div className="relative w-full h-3/4 flex items-center justify-center">
                            <Image
                                src="/provider.png"
                                alt="Minh họa giao diện quản lý nhà cung cấp"
                                width={300} // Tăng nhẹ width (từ 250 lên 300) để ảnh lớn hơn
                                height={600} // Tăng chiều cao tương ứng để giữ tỷ lệ (tối ưu cho ảnh điện thoại dọc)
                                className="object-contain shadow-2xl rounded-3xl" // Shadow và bo tròn mạnh hơn
                            />
                        </div>

                        {/* Thông tin "Công Cụ Toàn Diện" được đặt ở phía dưới, không che ảnh */}
                        <div className="text-center mt-2">
                            <div className="text-xl font-bold text-gray-900 mb-1">Quản lý trên di động</div>
                            <div className="text-base font-medium text-gray-700">Theo dõi doanh thu mọi lúc, mọi nơi</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}