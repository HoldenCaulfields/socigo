import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Menu } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const labels = ["Giới thiệu", "Tính năng", "Doanh Ngiệp", "Khách Hàng", "Tải app"];
  const ids = ["", "tinh-nang", "nha-cung-cap", "khach-hang", "tai-app"];

  const reloadPage = () => {
    window.location.href = "/"; // reloads the home page
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      {/* Header */}
      <header className={`fixed w-full top-0 z-50 transition-all cursor-pointer duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 group select-none" onClick={reloadPage}>
              {/* Icon container */}
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-2xl overflow-hidden">
                <Image
                  src="/socigologo.jpg"
                  alt="SOCIGO Logo"
                  fill
                  className="object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  sizes="40px"
                />
              </div>

              <span className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-wide">
                SOCIGO
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {labels.map((label, index) => (
                <a key={label} href={`#${ids[index]}`} className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-300 relative group">
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            <a href="#dang-ky" className="hidden md:block bg-linear-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-full hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 font-medium relative overflow-hidden group">
              <span className="relative z-10">Đăng ký ngay</span>
              <div className="absolute inset-0 bg-linear-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 animate-in fade-in duration-300">
          <nav className="flex flex-col space-y-4">
            {['Giới thiệu', 'Tính năng', 'Voucher', 'Đối tác', 'Tải app'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-medium py-2 hover:text-gray-700 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
            <a href="#dang-ky" className="bg-linear-to-r from-gray-900 to-gray-700 text-white px-6 py-3 rounded-full mt-4 hover:shadow-xl transition-all">
              Đăng ký ngay
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
