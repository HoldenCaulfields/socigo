"use client";

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Feature from '@/components/Feature';
import Vision from '@/components/Vision';
import Voucher from '@/components/Voucher';
import Download from '@/components/Download';
import Partners from '@/components/Partners';
import Subcribe from '@/components/Subcribe';
import Footer from '@/components/Footer';

const Home = () => {
  
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      {/* Navbar*/}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features */}
      <Feature />

      {/* Vision */}
      <Vision />

      {/* Vouchers */}
      <Voucher />

      {/* Download Apps */}
      <Download />

      {/* Partners Carousel */}
      <Partners />

      {/* Subcribe Section */}
      <Subcribe />

      {/* Footer */}
      <Footer />

      <style>{`
        
      `}</style>
    </div>
  );
};

export default Home;