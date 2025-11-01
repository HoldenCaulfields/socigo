import { Gift } from 'lucide-react';

export default function Loyalty() {
   
    const rewards = [
        // Cập nhật cấu trúc: points tách thành pointValue (số) và pointUnit (chuỗi)
        { service: 'Giảm giá Nha Khoa', pointValue: 200, pointUnit: 'điểm', code: 'DENTAL30', description: 'Voucher Giảm 30% Dịch vụ', color: 'from-blue-50 to-blue-100' },
        { service: 'Ưu đãi Spa & Làm đẹp', pointValue: 150, pointUnit: 'điểm', code: 'SPA25', description: 'Voucher Giảm 25% Dịch vụ', color: 'from-pink-50 to-pink-100' },
        { service: 'Khách sạn/Lưu trú', pointValue: 300, pointUnit: 'điểm', code: 'HOTEL40', description: 'Voucher Giảm 40% Đặt phòng', color: 'from-purple-50 to-purple-100' },
        { service: 'Dịch vụ Thuê xe', pointValue: 100, pointUnit: 'điểm', code: 'CAR20', description: 'Voucher Giảm 20% Thuê xe', color: 'from-green-50 to-green-100' },
    ];

    return (
        <section id="tich-diem" className="py-20 bg-linear-to-b from-gray-50 to-white relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-[radial-linear(circle_at_30%_50%,rgba(120,120,120,0.05),transparent_50%)]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black hover:scale-105 transition-transform  animate-in fade-in duration-700">
                        Tích Điểm Đổi Quà Cực Hot
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 font-sans">Đổi điểm tích lũy để nhận ngay những ưu đãi hấp dẫn!</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rewards.map((reward, idx) => (
                        <div
                            key={idx}
                            className={`bg-linear-to-br ${reward.color} rounded-2xl p-6 border-2 border-gray-900/10 hover:border-gray-900 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:rotate-1 group cursor-pointer font-sans`}
                            style={{ animation: `fadeInScale 0.7s ease-in-out ${idx * 0.1}s both` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Gift className="w-8 h-8 text-gray-800 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                                
                                {/* TÁCH BIỆT HIỂN THỊ SỐ VÀ ĐƠN VỊ ĐIỂM */}
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-3xl font-extrabold text-gray-900 group-hover:scale-105 transition-transform duration-300">
                                        {reward.pointValue}
                                    </span>
                                    <span className="text-lg font-bold text-gray-700">
                                        {reward.pointUnit}
                                    </span>
                                </div>
                                {/* KẾT THÚC TÁCH BIỆT */}

                            </div>
                            <h3 className="text-xl font-bold mb-1 text-gray-800 group-hover:translate-x-1 transition-transform duration-300 font-sans">{reward.service}</h3>
                            <p className="text-base text-gray-600 mb-4 font-sans">{reward.description}</p>

                            <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-2 font-bold text-center mt-4 text-gray-900 transition-all duration-300 shadow-md group-hover:shadow-lg font-sans">
                                ĐỔI NGAY
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}