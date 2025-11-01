import { Star, ChevronRight, Zap } from 'lucide-react';
import MobileCard from './mobile-card/MobileCard';

export default function HeroSection() {
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-gray-100 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-pink-100 to-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-block animate-in fade-in slide-in-from-top duration-700">
                            <span className="bg-linear-to-r animate-pulse from-gray-900 to-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 inline-flex items-center gap-2">
                                <Zap className="w-4 h-4 animate-pulse" />
                                Ra mắt phiên bản mới 🎉
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="inline-block hover:scale-105 transition-transform  animate-in fade-in duration-700">Trải nghiệm.</span><br />
                            <span className="inline-block hover:scale-105 transition-transform  animate-in fade-in duration-700" style={{ animationDelay: '200ms' }}>Đánh giá.</span><br />
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed animate-in fade-in duration-700" style={{ animationDelay: '600ms' }}>
                            Nền tảng đánh giá dịch vụ hàng đầu Việt Nam. Chia sẻ trải nghiệm thông qua mô hình <span className="font-bold text-gray-900">"Siêu ứng dụng kết hợp Mạng Xã Hội văn bản"</span> tích hợp công cụ AI.
                        </p>

                        <div className="flex flex-wrap gap-4 animate-in fade-in duration-700" style={{ animationDelay: '800ms' }}>
                            <a href='#dang-ky' className="bg-linear-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg group relative overflow-hidden">
                                <span className="relative z-10">Đăng ký miễn phí</span>
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                                <div className="absolute inset-0 bg-linear-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </a>
                            <button className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-medium hover:bg-gray-700 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl">
                                Xem demo
                            </button>
                        </div>

                        <div className="flex items-center space-x-8 pt-4 animate-in fade-in duration-700" style={{ animationDelay: '1000ms' }}>
                            <div className="group">
                                <div className="text-3xl font-bold group-hover:scale-110 transition-transform">10K+</div>
                                <div className="text-gray-600 text-sm">Người dùng</div>
                            </div>
                            <div className="w-px h-12 bg-gray-300"></div>
                            <div className="group">
                                <div className="text-3xl font-bold group-hover:scale-110 transition-transform">500+</div>
                                <div className="text-gray-600 text-sm">Đối tác</div>
                            </div>
                            <div className="w-px h-12 bg-gray-300"></div>
                            <div className="group">
                                <div className="text-3xl font-bold group-hover:scale-110 transition-transform">4.9★</div>
                                <div className="text-gray-600 text-sm">Đánh giá</div>
                            </div>
                        </div>
                    </div>

                    <MobileCard />
                </div>
            </div>
        </section>
    );
}