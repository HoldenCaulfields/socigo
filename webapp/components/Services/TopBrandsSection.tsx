// components/Services/TopBrandsSection.tsx
"use client";

import Link from 'next/link';
import { useTopServices } from '@/hooks/useTopServices'; // Import hook mới
import { Loader2 } from 'lucide-react';

const TopBrandsSection = () => {
  const { topServices, loading, error } = useTopServices();

  if (loading) {
    return (
      <section className="mt-6 text-center py-8">
        <Loader2 size={24} className="animate-spin inline-block mr-2 text-blue-500" />
        <p className="text-gray-500">Đang tải Top Thương hiệu...</p>
      </section>
    );
  }

  if (error) {
     return (
        <section className="mt-6 text-center py-8 text-red-600">
           <p>Lỗi tải dữ liệu: {error}</p>
        </section>
    );
  }
  
  // Nếu không có dữ liệu, có thể ẩn section hoặc hiển thị thông báo
  if (topServices.length === 0) {
       return null;
  }

  return (
    <section className="mt-6">
      <h2 className="text-lg font-bold mb-3 text-gray-800">Top 1 Thương Hiệu</h2>
      <p className="text-sm text-gray-500 mb-4">Được nhiều người sử dụng</p>
      
      {/* Grid layout: 2 cột trên desktop, cuộn ngang trên mobile */}
      <div className="flex space-x-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:gap-4 md:space-x-0">
        {topServices.map((brand, index) => (
          // SỬ DỤNG LINK ĐỂ CHUYỂN ĐẾN TRANG CHI TIẾT DỊCH VỤ
          <Link 
            href={`/services/${brand._id}`} 
            key={index}
            className="flex-shrink-0 w-64 md:w-full h-40 bg-gray-300 rounded-xl overflow-hidden relative shadow-md transition-shadow duration-300 hover:shadow-xl"
            // Lấy ảnh đầu tiên trong mảng images
            style={{ 
                backgroundImage: `url(${brand.images[0] || '/images/placeholder.jpg'})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
          >
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="text-lg font-bold">{brand.name}</h3>
              {/* Hiển thị chi tiết được tạo trong hook */}
              <p className="text-xs">{brand.detail}</p> 
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopBrandsSection;