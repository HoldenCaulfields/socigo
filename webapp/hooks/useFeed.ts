// hooks/useFeed.ts
import { useState, useEffect } from "react";
import axios from "axios";

export const useFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/feed`, { withCredentials: true })
      .then(res => setFeed(res.data.posts))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return { feed, loading };
};
