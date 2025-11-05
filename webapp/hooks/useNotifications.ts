"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/notifications`;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}`, { withCredentials: true });
      const list = res.data.notifications || [];
      setNotifications(list);
      setUnreadCount(list.filter((n: any) => !n.read).length);
    } catch (err) {
      console.error("Lỗi tải thông báo", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await axios.put(`${API_URL}/read`, {}, { withCredentials: true });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Không thể đánh dấu đã đọc", err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    markAllAsRead,
    refresh: fetchNotifications,
  };
};
