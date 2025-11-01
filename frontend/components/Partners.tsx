import { TrendingUp, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Partners() {

    const partners = [
        { name: 'Nha Khoa Diamond', category: 'Nha khoa', discount: '30%', },
        { name: 'Spa Luxury Beauty', category: 'Spa & Thẩm mỹ', discount: '25%' },
        { name: 'Hotel Paradise', category: 'Khách sạn', discount: '40%' },
        { name: 'Premium Car Rental', category: 'Thuê xe', discount: '20%' },
        { name: 'Fitness Center Pro', category: 'Gym & Fitness', discount: '35%' },
        { name: 'Restaurant Gourmet', category: 'Nhà hàng', discount: '15%' },
    ];

    return (
        <section id="doi-tac" className="py-20 bg-linear-to-b from-white to-gray-50 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-linear(circle_at_70%_50%,rgba(120,120,120,0.05),transparent_50%)]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Đối tác của chúng tôi</h2>
                <p className="text-xl text-gray-600 text-center">Hơn 5,000+ doanh nghiệp tin tưởng</p>
            </div>

            <div className="relative">
                <div className="flex space-x-8 animate-scroll">
                    {[...partners, ...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="shrink-0 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 w-80 border-2 border-transparent hover:border-gray-900 group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-linear-to-br from-gray-900 to-gray-700 rounded-xl shadow-md group-hover:rotate-12 transition-transform duration-300"></div>
                                <span className="bg-linear-to-r from-yellow-300 to-orange-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                                    -{partner.discount}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300">{partner.name}</h3>
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{partner.category}</p>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-gray-50 to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-gray-50 to-transparent pointer-events-none"></div>
            </div>
        </section>
    );
}