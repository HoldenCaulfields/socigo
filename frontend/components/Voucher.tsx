import { Gift } from 'lucide-react';

export default function Voucher() {

    const vouchers = [
        { service: 'Nha Khoa', discount: '30%', code: 'DENTAL30', color: 'from-blue-50 to-blue-100' },
        { service: 'Spa & Làm đẹp', discount: '25%', code: 'SPA25', color: 'from-pink-50 to-pink-100' },
        { service: 'Khách sạn', discount: '40%', code: 'HOTEL40', color: 'from-purple-50 to-purple-100' },
        { service: 'Thuê xe', discount: '20%', code: 'CAR20', color: 'from-green-50 to-green-100' },
    ];

    return (
        <section id="tich-diem" className="py-20 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-linear(circle_at_30%_50%,rgba(120,120,120,0.05),transparent_50%)]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Voucher siêu hấp dẫn</h2>
                    <p className="text-xl text-gray-600">Đăng ký ngay để nhận ưu đãi</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {vouchers.map((voucher, idx) => (
                        <div
                            key={idx}
                            className={`bg-linear-to-br ${voucher.color} rounded-2xl p-6 border-2 border-gray-900/10 hover:border-gray-900 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:rotate-1 group cursor-pointer`}
                            style={{ animation: `fadeInScale 0.7s ease-in-out ${idx * 0.1}s both` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Gift className="w-8 h-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                                <span className="text-3xl font-bold group-hover:scale-110 transition-transform duration-300">{voucher.discount}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300">{voucher.service}</h3>
                            <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-2 font-mono font-bold text-center mt-4 group-hover:bg-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                                {voucher.code}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-linear-to-r from-gray-900 to-gray-700 text-white px-10 py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg group relative overflow-hidden">
                        <span className="relative z-10">Xem tất cả voucher</span>
                        <div className="absolute inset-0 bg-linear-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}