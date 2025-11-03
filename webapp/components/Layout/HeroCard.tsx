'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, DollarSign, Clock, AlertCircle } from 'lucide-react';

const slides = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=464',
];

const decorativeIcons = [
  { icon: Share2, color: 'text-gray-500', position: 'top-1/4 left-0 -translate-x-1/2', size: 'h-10 w-10' },
  { icon: MessageCircle, color: 'text-gray-600', position: 'top-1/2 left-0 -translate-x-1/4', size: 'h-12 w-12' },
  { icon: DollarSign, color: 'text-green-500', position: 'bottom-1/4 left-0 -translate-x-1/2', size: 'h-10 w-10' },
  { icon: Heart, color: 'text-red-500', position: 'top-1/4 right-0 translate-x-1/2', size: 'h-12 w-12' },
  { icon: Clock, color: 'text-blue-500', position: 'top-1/2 right-0 translate-x-1/4', size: 'h-10 w-10' },
  { icon: AlertCircle, color: 'text-yellow-500', position: 'bottom-1/4 right-0 translate-x-1/2', size: 'h-12 w-12' },
];

const HeroCard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  const intervalTime = 3000; // 3 giây đổi ảnh

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative flex justify-center items-center w-full max-w-lg mx-auto py-12">
      {/* Khối slideshow */}
      <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="shrink-0 w-full h-full">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === currentSlide ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-gray-400 opacity-60'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Icon động xung quanh */}
      {decorativeIcons.map(({ icon: Icon, color, position, size }, index) => (
        <div
          key={index}
          className={`absolute ${position} opacity-80 z-0 animate-bounce-slow`}
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + (index % 3) * 0.5}s`,
          }}
        >
          <Icon className={`${size} ${color} drop-shadow-lg`} />
        </div>
      ))}
    </div>
  );
};

export default HeroCard;
