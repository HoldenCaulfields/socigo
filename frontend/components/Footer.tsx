import Image from "next/image";

export default function Footer() {

    return (
      <footer className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-linear(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6 group">
                <div className="relative w-7 h-7 group-hover:rotate-12 transition-all duration-300">
                  <Image
                    src="/socigologo.jpg"
                    alt="SOCIGO Logo"
                    fill
                    className="object-cover rounded-xl transition-opacity duration-300"
                  />
                </div>
                <span className="text-2xl font-bold">SOCIGO</span>
              </div>

              <p className="text-gray-400">
                Nền tảng đánh giá dịch vụ và ưu đãi hàng đầu Việt Nam
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Sản phẩm</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Tính năng</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Voucher</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Đối tác</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Giá cả</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Công ty</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Liên hệ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Kết nối</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Facebook</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Instagram</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Twitter</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 SOCIGO. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 hover:scale-110">Điều khoản</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 hover:scale-110">Bảo mật</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-all duration-300 hover:scale-110">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    );
}