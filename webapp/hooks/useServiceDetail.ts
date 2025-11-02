// hooks/useServiceDetail.ts
"use client";

import { useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { ServiceData, ReviewData, BookingInput } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useServiceDetail = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const config = {
        headers: {
            Authorization: user?.token ? `Bearer ${user.token}` : '',
            'Content-Type': 'application/json',
        },
    };

    // 1. Fetch Service Details
    const fetchServiceDetails = useCallback(async (id: string): Promise<ServiceData | null> => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get<{ service: ServiceData }>(`${API_BASE_URL}/services/${id}`);
            return data.service;
        } catch (err) {
            const message = axios.isAxiosError(err) ? err.response?.data?.message || 'Failed to fetch service.' : 'An unexpected error occurred.';
            setError(message);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // 2. Fetch Service Reviews
    const fetchServiceReviews = useCallback(async (serviceId: string): Promise<ReviewData[]> => {
        try {
            const { data } = await axios.get<{ reviews: ReviewData[] }>(`${API_BASE_URL}/reviews/service/${serviceId}`);
            return data.reviews;
        } catch (err) {
            console.error('Failed to fetch reviews:', err);
            return [];
        }
    }, []);
    
    // 3. Create Booking
    const createBooking = async (bookingData: BookingInput) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${API_BASE_URL}/bookings`, bookingData, config);
            return { success: true, message: 'Đặt chỗ thành công! Đang chờ xác nhận từ đối tác.' };
        } catch (err) {
            const message = axios.isAxiosError(err) 
                ? err.response?.data?.message || 'Đặt chỗ thất bại. Vui lòng kiểm tra thông tin.'
                : 'Lỗi không mong muốn xảy ra.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        fetchServiceDetails,
        fetchServiceReviews,
        createBooking,
    };
};