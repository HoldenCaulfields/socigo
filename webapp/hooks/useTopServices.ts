// hooks/useTopServices.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ServiceData } from '@/types'; // Sử dụng kiểu dữ liệu ServiceData đã có

// Định nghĩa kiểu dữ liệu cho dữ liệu trả về (có thể chỉ là 2-4 dịch vụ)
type TopServiceData = Pick<ServiceData, '_id' | 'name' | 'images' | 'city' | 'priceRange' | 'rating' | 'totalReviews'> & {
    detail?: string; // Thêm trường detail nếu cần
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/services/top`; // Endpoint giả định

export const useTopServices = () => {
    const [topServices, setTopServices] = useState<TopServiceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTopServices = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // NOTE: Bạn cần đảm bảo Backend có endpoint này
            const { data } = await axios.get<{ services: ServiceData[] }>(API_URL);
            
            // Xử lý dữ liệu thô từ ServiceData thành định dạng Brands cho UI
            const formattedData: TopServiceData[] = data.services.map(service => ({
                _id: service._id,
                name: service.name.toUpperCase(),
                images: service.images,
                city: service.city,
                priceRange: service.priceRange,
                rating: service.rating,
                totalReviews: service.totalReviews,
                detail: `${service.city}, ${service.priceRange.toUpperCase()}`
            }));

            setTopServices(formattedData);
        } catch (err) {
            const message = axios.isAxiosError(err) 
                ? err.response?.data?.message || 'Không thể tải Top Thương hiệu.'
                : 'Lỗi không mong muốn xảy ra.';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTopServices();
    }, [fetchTopServices]);

    return {
        topServices,
        loading,
        error,
    };
};