import { Smartphone, Apple, Play, Globe } from 'lucide-react';

export default function Download() {
    return (
        <section id="tai-app" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-gray-50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl border border-gray-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <Smartphone className="w-20 h-20 mx-auto mb-6 animate-bounce" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Tải app ngay hôm nay</h2>
              <p className="text-xl mb-12 text-gray-300">
                Trải nghiệm SOCIGO mọi lúc mọi nơi với ứng dụng di động
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg group">
                  <Apple className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Tải về từ</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>

                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg group">
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Tải về từ</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>

                <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg group">
                  <Globe className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-left">
                    <div className="text-xs text-gray-600">Truy cập</div>
                    <div className="font-bold">Web App</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}