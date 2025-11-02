// hooks/useServices.ts
"use client";

import { useState, useCallback } from 'react';
import axios from 'axios';
import { ServiceData } from '@/types';

interface FetchParams {
    search?: string;
    type?: string;
    city?: string;
    page?: number;
    limit?: number;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/services`;

export const useServices = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Lấy danh sách dịch vụ với các tham số truy vấn
    const fetchServices = useCallback(async (params: FetchParams = {}) => {
        setLoading(true);
        setError(null);
        
        try {
            // Chuyển đổi params thành query string
            const queryString = new URLSearchParams(params as any).toString();
            
            const { data } = await axios.get<{ services: ServiceData[], totalPages: number }>(`${API_URL}?${queryString}`);
            
            return {
                services: data.services,
                totalPages: data.totalPages,
            };
        } catch (err) {
            const message = axios.isAxiosError(err) 
                ? err.response?.data?.message || 'Không thể tải danh sách dịch vụ.'
                : 'Lỗi không mong muốn xảy ra.';
            setError(message);
            return { services: [], totalPages: 0 };
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        fetchServices,
    };
};