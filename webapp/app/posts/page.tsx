"use client";

import { useEffect, useState, useCallback } from "react";
import { useReviewPost } from "@/hooks/useReviewPost";
import { ReviewData } from "@/types";
import { Star, Heart, MessageSquare, Loader2 } from "lucide-react";
import PostReviewForm from "@/components/Social/PostReviewForm";

interface PostCardProps {
  post: ReviewData;
  onLikeToggle: (postId: string) => void;
  currentUserId?: string;
}

const PostCard = ({ post, onLikeToggle, currentUserId }: PostCardProps) => {
  const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  const isReview = post.serviceId && post.rating;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 border-b border-neutral-100 pb-3">
        <div>
          <p className="font-semibold text-lg text-neutral-900">
            {post.userId.name}
          </p>
          <p className="text-sm text-neutral-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        {isReview && (
          <div className="flex items-center text-yellow-500">
            {Array(post.rating!)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
          </div>
        )}
      </div>

      {/* Service name */}
      {isReview && post.serviceId && (
        <p className="text-sm text-neutral-600 font-medium mb-3">
          Về dịch vụ:{" "}
          <span className="text-neutral-900">
            {typeof post.serviceId === "object"
              ? (post.serviceId as any).name
              : post.serviceId}
          </span>
        </p>
      )}

      {/* Nội dung bài viết */}
      <p className="text-neutral-800 leading-relaxed whitespace-pre-line mb-4">
        {post.text}
      </p>

      {/* Tương tác */}
      <div className="pt-3 border-t border-neutral-100 flex items-center gap-6 text-sm">
        <button
          onClick={() => onLikeToggle(post._id)}
          className={`flex items-center gap-1 transition-colors ${
            isLiked
              ? "text-red-500"
              : "text-neutral-500 hover:text-red-400 active:scale-95"
          }`}
        >
          <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          <span>{post.likes.length}</span>
        </button>

        <div className="flex items-center gap-1 text-neutral-500">
          <MessageSquare size={18} />
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

const SocialFeedPage = () => {
  const { submitPost, toggleLike, fetchPosts: getPosts } = useReviewPost();
  const [posts, setPosts] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const currentUserId = "temp_user_id";

  const loadPosts = useCallback(
    async (pageNumber: number) => {
      setLoading(true);
      try {
        const data = await getPosts(pageNumber);
        setPosts(data.posts || []);
        setTotalPages(data.pages || 1);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    },
    [getPosts]
  );

  useEffect(() => {
    loadPosts(1);
  }, []);

  const handleLikeToggle = async (postId: string) => {
    const result = await toggleLike(postId);
    if (!result) return;

    if (result.success) {
      setPosts((prev) =>
        prev.map((p) =>
          p._id === postId
            ? {
                ...p,
                likes: p.likes.includes(currentUserId)
                  ? p.likes.filter((id) => id !== currentUserId)
                  : [...p.likes, currentUserId],
              }
            : p
        )
      );
    }
  };

  const handlePostSuccess = () => loadPosts(1);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 px-4 md:px-8 py-20">
      <section className="max-w-3xl mx-auto">
        <header className="mb-12 border-b border-neutral-200 pb-6">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Bảng Tin Cộng Đồng
          </h1>
          <p className="text-neutral-600">
            Nơi mọi người chia sẻ đánh giá, cảm nhận và trải nghiệm dịch vụ.
          </p>
        </header>

        {/* Form */}
        <div className="mb-10">
          <PostReviewForm onPostSuccess={handlePostSuccess} />
        </div>

        {/* Feed */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-neutral-500">
            <Loader2 size={32} className="animate-spin mr-3" />
            Đang tải bảng tin...
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border border-neutral-200 p-10 rounded-2xl text-center text-neutral-500">
            Chưa có bài viết nào được đăng. Hãy là người đầu tiên chia sẻ!
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLikeToggle={handleLikeToggle}
              currentUserId={currentUserId}
            />
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPage(p);
                  loadPosts(p);
                }}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                  p === page
                    ? "bg-black text-white border-black"
                    : "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default SocialFeedPage;
