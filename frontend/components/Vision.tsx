import { TrendingUp, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Vision() {
    return (
        <section id="gioi-thieu" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full hover:shadow-md transition-shadow">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Tầm nhìn 2030</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Kết nối mọi trải nghiệm dịch vụ
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                SOCIGO hướng đến trở thành nền tảng đánh giá dịch vụ số 1 Việt Nam, nơi mọi người có thể chia sẻ, khám phá và tiết kiệm thông minh với hàng triệu ưu đãi độc quyền.
              </p>
              <div className="space-y-4">
                {['Minh bạch đánh giá 100%', 'Ưu đãi độc quyền hấp dẫn', 'Cộng đồng tin cậy'].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group hover:translate-x-2 transition-transform">
                    <CheckCircle className="w-6 h-6 text-gray-900 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center group hover:shadow-2xl transition-shadow">
              <Image
                src="/socigologo.jpg" // replace with your image path
                alt="Map Pin"
                width={128} // similar size to w-32
                height={128} // similar size to h-32
                className="opacity-10 group-hover:scale-110 transition-transform"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2 group-hover:scale-110 transition-transform">1M+</div>
                  <div className="text-xl font-medium text-gray-600">Đánh giá mỗi năm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}