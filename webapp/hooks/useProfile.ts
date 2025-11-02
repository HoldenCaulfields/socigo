// hooks/useProfile.ts
"use client";

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
// Giả định bạn có các types sau
// import { UserData, BookingData, ReviewData } from '@/types'; 

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/profile`;

interface ProfileData {
    user: any; // UserData
    bookings: any[]; // BookingData[]
    posts: any[]; // ReviewData[]
}

export const useProfile = () => {
    const { user } = useAuth();
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = useCallback(async () => {
        if (!user || !user.token) {
            setLoading(false);
            setError('Bạn cần đăng nhập để xem trang cá nhân.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Backend cần trả về user, bookings và posts cho người dùng này
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            
            // Tạm thời chỉ fetch thông tin user (cần cập nhật route Backend để trả về đủ dữ liệu)
            const { data } = await axios.get(API_URL, config); 
            
            // Giả định Backend trả về: { user, bookings: [], posts: [] }
            setData({
                user: data.user, 
                bookings: data.bookings || [], 
                posts: data.posts || []
            });

        } catch (err) {
            const message = axios.isAxiosError(err) 
                ? err.response?.data?.message || 'Không thể tải thông tin cá nhân.'
                : 'Lỗi không mong muốn xảy ra.';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);
    
    // Hàm để refetch (tải lại) dữ liệu sau khi có thay đổi
    const refetchProfile = () => fetchProfile();

    return { data, loading, error, refetchProfile };
};