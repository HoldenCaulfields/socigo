import { Globe, Truck, Zap, Award } from 'lucide-react';

export default function Feature() {

    const features = [
    { icon: Globe, title: 'Mạng xã hội chia sẻ', desc: 'Đăng bài sau khi sử dụng, tăng tính minh bạch & tin tưởng.', iconColor: 'from-blue-700 via-blue-800 to-blue-900', hoverBorder: 'hover:border-blue-500', hoverText: 'group-hover:text-blue-700' },
    { icon: Truck, title: 'Combo dịch vụ liên ngành', desc: 'Đặt dịch vụ trọn gói (làm răng + ăn tối + ngủ đêm khách sạn) chỉ 1 lần.', iconColor: 'from-indigo-700 via-indigo-800 to-indigo-900', hoverBorder: 'hover:border-indigo-500', hoverText: 'group-hover:text-indigo-700' },
    { icon: Zap, title: 'Đề xuất dịch vụ bằng AI', desc: 'Dựa trên vị trí, thói quen, lịch sử tìm kiếm để đưa ra gợi ý.', iconColor: 'from-teal-700 via-teal-800 to-teal-900', hoverBorder: 'hover:border-teal-500', hoverText: 'group-hover:text-teal-700' },
    { icon: Award, title: 'Tích điểm đổi quà', desc: 'Đổi quà, ưu đãi VIP, mini game, vòng quay may mắn mỗi ngày.', iconColor: 'from-orange-600 via-orange-700 to-orange-700', hoverBorder: 'hover:border-orange-500', hoverText: 'group-hover:text-orange-600' },
  ];

    return (
        <section id="tinh-nang" className="py-20 bg-linear-to-b from-white to-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-100/20 to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black hover:scale-105 transition-transform  animate-in fade-in duration-700">
                        Tính năng nổi bật giúp SOCIGO khác biệt
                    </h2>
                    <p className="text-xl text-gray-600">Những điểm độc đáo không thể tìm thấy ở bất kỳ đâu khác</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 cursor-pointer">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            // Responsive: p-6 sm:p-8
                            // Border hover sử dụng màu accent riêng
                            className={`bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent ${feature.hoverBorder} group relative overflow-hidden`}
                            style={{ animation: `fadeInUp 0.7s ease-in-out ${idx * 0.15}s both` }}
                        >
                            {/* Khối Icon: Sử dụng gradient màu tối riêng */}
                            <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${feature.iconColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl relative z-10`}>
                                {/* Responsive Icon: w-7 h-7 sm:w-8 sm:h-8 */}
                                <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                            </div>
                            {/* Tiêu đề: Màu chữ hover sử dụng màu accent riêng */}
                            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 ${feature.hoverText} transition-colors duration-300 relative z-10">
                                {feature.title}
                            </h3>
                            {/* Mô tả: Giữ tông màu tối giản */}
                            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300 relative z-10">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

