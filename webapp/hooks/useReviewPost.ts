// hooks/useReviewPost.ts
"use client";

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

interface PostInput {
  serviceId?: string;
  rating?: number;
  text: string;
  images?: string[];
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reviews`;

export const useReviewPost = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = {
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : '',
      'Content-Type': 'application/json',
    },
  };

  // 🟢 Đăng bài
  const submitPost = async (postData: PostInput) => {
    if (!user) {
      return { success: false, message: 'Vui lòng đăng nhập.' };
    }
    setLoading(true);
    setError(null);
    try {
      await axios.post(API_URL, postData, config);
      return { success: true, message: 'Đăng bài/đánh giá thành công!' };
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || 'Gửi thất bại. Vui lòng thử lại.'
        : 'Lỗi không mong muốn xảy ra.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ❤️ Like/Unlike
  const toggleLike = async (reviewId: string) => {
    if (!user) {
      alert('Vui lòng đăng nhập để Thích.');
      return;
    }
    try {
      const { data } = await axios.put(`${API_URL}/${reviewId}/like`, {}, config);
      return { success: true, message: data.message, likesCount: data.likesCount };
    } catch (err) {
      console.error('Lỗi khi toggle Like:', err);
      return { success: false, message: 'Không thể thực hiện hành động Thích.' };
    }
  };

  // 🌐 Lấy danh sách bài viết
  // 🌐 Lấy danh sách bài viết
const fetchPosts = async (page: number = 1) => {
  setLoading(true);
  setError(null);
  try {
    console.log("👉 Fetching:", `${API_URL}?page=${page}`);
    const { data } = await axios.get(`${API_URL}?page=${page}`);
    console.log("✅ API response:", data);
    return data; // { posts, pages }
  } catch (err) {
    console.error("❌ Fetch error:", err);
    const message = axios.isAxiosError(err)
      ? err.response?.data?.message || 'Không thể tải bảng tin cộng đồng.'
      : 'Lỗi không mong muốn xảy ra.';
    setError(message);
    return { posts: [], pages: 1, success: false, message };
  } finally {
    setLoading(false);
  }
};

  return { loading, error, submitPost, toggleLike, fetchPosts };
};
