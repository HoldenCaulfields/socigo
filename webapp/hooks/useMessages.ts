"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/messages`;

export const useMessages = (friendId: string | null) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!friendId) return;
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/${friendId}`, { withCredentials: true });
      setMessages(res.data.messages || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải tin nhắn");
    } finally {
      setLoading(false);
    }
  }, [friendId]);

  const sendMessage = useCallback(async (text: string) => {
    if (!friendId || !text.trim()) return;
    try {
      const res = await axios.post(
        `${API_URL}`,
        { friendId, text },
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, res.data.message]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể gửi tin nhắn");
    }
  }, [friendId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    refresh: fetchMessages,
  };
};
