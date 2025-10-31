"use client";

import React, { useState, useEffect } from 'react';
import { Star, Users, Gift, Smartphone, ChevronRight, Menu, X, Apple, Play, Globe, MapPin, Sparkles, TrendingUp, Award, CheckCircle, Zap } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const images = [
    "/bar.jpg",
    "/car.jpg",
    "/bar.jpg",
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const partners = [
    { name: 'Nha Khoa Diamond', category: 'Nha khoa', discount: '30%' },
    { name: 'Spa Luxury Beauty', category: 'Spa & Thẩm mỹ', discount: '25%' },
    { name: 'Hotel Paradise', category: 'Khách sạn', discount: '40%' },
    { name: 'Premium Car Rental', category: 'Thuê xe', discount: '20%' },
    { name: 'Fitness Center Pro', category: 'Gym & Fitness', discount: '35%' },
    { name: 'Restaurant Gourmet', category: 'Nhà hàng', discount: '15%' },
  ];

  const features = [
    { icon: Star, title: 'Đánh giá chân thực', desc: 'Từ người dùng thật' },
    { icon: Gift, title: 'Voucher hấp dẫn', desc: 'Giảm giá đến 50%' },
    { icon: Users, title: 'Cộng đồng sôi động', desc: 'Hơn 100K+ thành viên' },
    { icon: Award, title: 'Tích điểm đổi quà', desc: 'Mỗi đánh giá có thưởng' },
  ];

  const vouchers = [
    { service: 'Nha Khoa', discount: '30%', code: 'DENTAL30', color: 'from-blue-50 to-blue-100' },
    { service: 'Spa & Làm đẹp', discount: '25%', code: 'SPA25', color: 'from-pink-50 to-pink-100' },
    { service: 'Khách sạn', discount: '40%', code: 'HOTEL40', color: 'from-purple-50 to-purple-100' },
    { service: 'Thuê xe', discount: '20%', code: 'CAR20', color: 'from-green-50 to-green-100' },
  ];

  const reloadPage = () => {
    window.location.href = "/"; // reloads the home page
  };

  const labels = ["Giới thiệu", "Tính năng", "Voucher", "Đối tác", "Tải app"];
  const ids = ["gioi-thieu", "tinh-nang", "voucher", "doi-tac", "tai-app"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
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

              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-wide">
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

            <button className="hidden md:block bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-full hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 font-medium relative overflow-hidden group">
              <span className="relative z-10">Đăng ký ngay</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

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
            <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-3 rounded-full mt-4 hover:shadow-xl transition-all">
              Đăng ký ngay
            </button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100 to-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block animate-in fade-in slide-in-from-top duration-700">
                <span className="bg-gradient-to-r animate-pulse from-gray-900 to-gray-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 inline-flex items-center gap-2">
                  <Zap className="w-4 h-4 animate-pulse" />
                  Ra mắt phiên bản mới 🎉
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="inline-block hover:scale-105 transition-transform duration-300 animate-in fade-in duration-700">Trải nghiệm.</span><br />
                <span className="inline-block hover:scale-105 transition-transform duration-300 animate-in fade-in duration-700" style={{ animationDelay: '200ms' }}>Đánh giá.</span><br />
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300 animate-in fade-in duration-700" style={{ animationDelay: '400ms' }}>Nhận ưu đãi.</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed animate-in fade-in duration-700" style={{ animationDelay: '600ms' }}>
                Nền tảng đánh giá dịch vụ hàng đầu Việt Nam. Chia sẻ trải nghiệm thông qua mô hình <span className="font-bold text-gray-900">"Siêu ứng dụng kết hợp Mạng Xã Hội văn bản"</span> tích hợp công cụ AI.
              </p>

              <div className="flex flex-wrap gap-4 animate-in fade-in duration-700" style={{ animationDelay: '800ms' }}>
                <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg group relative overflow-hidden">
                  <span className="relative z-10">Đăng ký miễn phí</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
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

            <div className="relative animate-in fade-in slide-in-from-right duration-1000">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-200/50">
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ animation: `fadeIn 0.7s ease-in-out ${i * 0.2}s both` }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Star className="w-6 h-6 text-white fill-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="font-semibold">User {i}</div>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mb-2"></div>
                          <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                <div className="text-center animate-pulse">
                  <div className="text-2xl font-bold text-gray-900">-50%</div>
                  <div className="text-xs font-medium text-gray-800">OFF</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="tinh-nang" className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Tại sao chọn SOCIGO?</h2>
            <p className="text-xl text-gray-600">Trải nghiệm đẳng cấp, ưu đãi vượt trội</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-gray-900 group"
                style={{ animation: `fadeInUp 0.7s ease-in-out ${idx * 0.15}s both` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gray-700 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
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
                    <CheckCircle className="w-6 h-6 text-gray-900 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center group hover:shadow-2xl transition-shadow">
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

      {/* Vouchers */}
      <section id="voucher" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,120,120,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Voucher siêu hấp dẫn</h2>
            <p className="text-xl text-gray-600">Đăng ký ngay để nhận ưu đãi</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vouchers.map((voucher, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${voucher.color} rounded-2xl p-6 border-2 border-gray-900/10 hover:border-gray-900 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:rotate-1 group cursor-pointer`}
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
            <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-10 py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg group relative overflow-hidden">
              <span className="relative z-10">Xem tất cả voucher</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Download Apps */}
      <section id="tai-app" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl p-12 md:p-16 relative overflow-hidden shadow-2xl border border-gray-700">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

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

      {/* Partners Carousel */}
      <section id="doi-tac" className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(120,120,120,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">Đối tác của chúng tôi</h2>
          <p className="text-xl text-gray-600 text-center">Hơn 5,000+ doanh nghiệp tin tưởng</p>
        </div>

        <div className="relative">
          <div className="flex space-x-8 animate-scroll">
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <div key={idx} className="flex-shrink-0 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 w-80 border-2 border-transparent hover:border-gray-900 group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl shadow-md group-hover:rotate-12 transition-transform duration-300"></div>
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                    -{partner.discount}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300">{partner.name}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{partner.category}</p>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 md:p-16 border-4 border-gray-900 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Sẵn sàng tham gia?</h2>
            <p className="text-xl text-gray-600 mb-8 relative z-10">
              Đăng ký ngay để nhận <span className="font-bold text-gray-900 bg-gradient-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded">5 voucher miễn phí</span> và tham gia cộng đồng SOCIGO
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6 relative z-10">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-gray-900 focus:outline-none text-lg transition-all duration-300 shadow-sm focus:shadow-lg"
              />
              <button className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap group/btn relative overflow-hidden">
                <span className="relative z-10">Đăng ký ngay</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <p className="text-sm text-gray-500 relative z-10">
              Bằng cách đăng ký, bạn đồng ý với Điều khoản sử dụng của chúng tôi
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <Sparkles className="w-6 h-6 text-gray-900 group-hover:scale-110 transition-transform duration-300" />
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

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fadeIn;
          animation-duration: 0.7s;
        }
        .slide-in-from-top {
          animation: slideInFromTop 0.7s ease-out;
        }
        .slide-in-from-right {
          animation: slideInFromRight 0.7s ease-out;
        }
        @keyframes slideInFromTop {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInFromRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;