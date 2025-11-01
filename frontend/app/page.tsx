"use client";

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Feature from '@/components/Feature';
import Download from '@/components/Download';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';
import Customer from '@/components/Customer';
import Loyalty from '@/components/Loyalty';
import RegisterForm from '@/components/RegisterForm';

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
      <Providers />

      <Customer />

      {/* Vouchers */}
      <Loyalty />

      {/* Download Apps */}
      <Download />

      {/* Partners Carousel */}
      <Partners />

      {/* Subcribe Section */}
      <RegisterForm />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;