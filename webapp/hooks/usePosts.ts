"use client";

import axios from "axios";
import { useState, useCallback } from "react";
import { PostData } from "@/types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/posts`;

export const usePosts = () => {
  const [loading, setLoading] = useState(false);

  console.log("📡 submitPost to:", API_URL);


  const fetchPosts = useCallback(async (page = 1) => {
    const res = await axios.get(`${API_URL}?page=${page}`);
    return res.data;
  }, []);

  const submitPost = useCallback(async (data: Partial<PostData>) => {
    const res = await axios.post(API_URL, data, { withCredentials: true });
    return res.data;
  }, []);

  const toggleLike = useCallback(async (postId: string) => {
    const res = await axios.patch(`${API_URL}/${postId}/like`, {}, { withCredentials: true });
    return res.data;
  }, []);


  return { loading, fetchPosts, submitPost, toggleLike };
};
