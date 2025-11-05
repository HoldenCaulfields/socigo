"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/friends`;

export const useFriends = () => {
  const [friends, setFriends] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}`, { withCredentials: true });
      setFriends(res.data.friends || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Lỗi tải danh sách bạn bè");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSuggestions = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/suggestions`, { withCredentials: true });
      setSuggestions(res.data.suggestions || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const sendRequest = useCallback(async (friendId: string) => {
    try {
      await axios.post(`${API_URL}/request/${friendId}`, {}, { withCredentials: true });
      await fetchSuggestions(); // refresh suggestions
    } catch (err: any) {
      alert(err.response?.data?.message || "Không thể gửi lời mời kết bạn");
    }
  }, [fetchSuggestions]);

  const respondRequest = useCallback(async (requestId: string, action: "accept" | "reject") => {
    try {
      await axios.put(`${API_URL}/respond/${requestId}`, { action }, { withCredentials: true });
      await fetchFriends();
    } catch (err: any) {
      alert(err.response?.data?.message || "Không thể phản hồi lời mời");
    }
  }, [fetchFriends]);

  useEffect(() => {
    fetchFriends();
    fetchSuggestions();
  }, [fetchFriends, fetchSuggestions]);

  return {
    friends,
    suggestions,
    loading,
    error,
    sendRequest,
    respondRequest,
    refresh: fetchFriends,
  };
};
