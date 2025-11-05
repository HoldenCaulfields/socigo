"use client";
import { useEffect, useState, useCallback } from "react";
import { Loader2, Heart, MessageSquare, Star, Share2, TrendingUp, Flame, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePosts } from "@/hooks/usePosts";
import { PostData } from "@/types";
import CreatePost from "@/components/Social/CreatePost";
import MusicEmbed from "@/components/Social/MusicEmbed";
import { useProfile } from "@/hooks/useProfile";

interface PostCardProps {
  post: PostData;
  onLikeToggle: (postId: string) => void;
  currentUserId?: string;
}

const PostCard = ({ post, onLikeToggle, currentUserId }: PostCardProps) => {
  const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  const isReview = post.serviceId && post.rating;
  
  return (
    <Card className="overflow-hidden bg-white hover:shadow-lg transition-all duration-300 border border-gray-200">
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="ring-2 ring-gray-100">
            {post.userId.avatar ? (
              <AvatarImage src={post.userId.avatar} />
            ) : (
              <AvatarFallback className="bg-black text-white">{post.userId.name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-bold text-black">{post.userId.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
        
        <p className="text-gray-900 mb-4 leading-relaxed whitespace-pre-line text-[15px]">
          {post.text}
        </p>
        
        {post.music && <MusicEmbed url={post.music} />}
        
        {post.mood && (
          <p className="text-sm italic text-gray-600 bg-gray-50 px-3 py-2 rounded-lg inline-block">
            Tâm trạng: {post.mood}
          </p>
        )}
        
        {isReview && (
          <div className="flex items-center gap-1 text-yellow-500 mt-3 mb-3">
            {Array(post.rating!)
              .fill(0)
              .map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            <span className="text-sm text-gray-600 ml-2 font-medium">
              {(post.serviceId as any).name || ""}
            </span>
          </div>
        )}
        
        <div className="flex justify-between text-sm mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onLikeToggle(post._id)}
            className={`flex items-center gap-2 transition-all duration-200 px-3 py-1.5 rounded-lg ${
              isLiked ? "text-red-500 bg-red-50" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            <span className="font-medium">{post.likes.length}</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg transition-all">
            <MessageSquare size={18} />
            <span className="font-medium">0</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg transition-all">
            <Share2 size={18} />
            <span className="font-medium">Chia sẻ</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

const TrendingTopics = () => {
  const topics = [
    { name: "#MusicMonday", count: "2.4K bài viết", trending: true },
    { name: "#ReviewCafe", count: "1.8K bài viết", trending: true },
    { name: "#HanoiFood", count: "956 bài viết", trending: false },
    { name: "#WeekendVibes", count: "743 bài viết", trending: false },
  ];
  
  return (
    <Card className="bg-white border-gray-200 sticky top-4">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-black" size={20} />
          <h3 className="font-bold text-black text-lg">Xu hướng</h3>
        </div>
        <div className="space-y-3">
          {topics.map((topic, idx) => (
            <div 
              key={idx} 
              className="hover:bg-gray-50 p-3 rounded-lg cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-black group-hover:text-gray-700">{topic.name}</p>
                {topic.trending && <Flame size={16} className="text-orange-500" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">{topic.count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TrendingUsers = () => {
  const users = [
    { name: "Nguyễn Văn A", avatar: null, posts: 234, followers: "12.5K" },
    { name: "Trần Thị B", avatar: null, posts: 189, followers: "9.8K" },
    { name: "Lê Minh C", avatar: null, posts: 156, followers: "7.2K" },
  ];
  
  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="text-black" size={20} />
          <h3 className="font-bold text-black text-lg">Người dùng nổi bật</h3>
        </div>
        <div className="space-y-4">
          {users.map((user, idx) => (
            <div key={idx} className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <Avatar className="ring-2 ring-gray-100">
                  <AvatarFallback className="bg-black text-white font-bold">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-black text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.followers} người theo dõi</p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all">
                Theo dõi
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ControversialPosts = () => {
  const posts = [
    { title: "Tranh luận về giá cafe Hà Nội", comments: 234, engagement: "Cao" },
    { title: "Review dịch vụ gây sốc", comments: 189, engagement: "Cao" },
    { title: "Ý kiến trái chiều về âm nhạc", comments: 156, engagement: "Trung bình" },
  ];
  
  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="text-orange-500" size={20} />
          <h3 className="font-bold text-black text-lg">Bài viết hot</h3>
        </div>
        <div className="space-y-3">
          {posts.map((post, idx) => (
            <div 
              key={idx} 
              className="hover:bg-gray-50 p-3 rounded-lg cursor-pointer transition-all border-l-4 border-orange-500"
            >
              <p className="font-semibold text-black text-sm mb-2">{post.title}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageSquare size={12} />
                  {post.comments} bình luận
                </span>
                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full font-medium">
                  {post.engagement}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function SocialFeedPage() {
  const { fetchPosts, submitPost, toggleLike } = usePosts();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const currentUserId = "temp_user_id";
  const { data } = useProfile();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.user) {
      setAvatarUrl(data.user.avatarUrl || null);
    }
  }, [data]);

  const loadPosts = useCallback(async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await fetchPosts(pageNumber);
      setPosts(data.posts || []);
      setTotalPages(data.pages || 1);
    } finally {
      setLoading(false);
    }
  }, [fetchPosts]);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  const handleLikeToggle = async (postId: string) => {
    const result = await toggleLike(postId);
    if (!result?.success) return;
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
  };

  const handlePostSubmit = async (newPost: any) => {
    const result = await submitPost(newPost);
    if (result?.success) {
      await loadPosts(1);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-black py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <TrendingTopics />
          </aside>

          {/* Main Feed */}
          <section className="lg:col-span-6 space-y-6">
            <CreatePost onSubmit={handlePostSubmit} userAvatar={avatarUrl || undefined} />
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 size={32} className="animate-spin text-black" />
              </div>
            ) : posts.length === 0 ? (
              <Card className="bg-white border-gray-200">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-gray-600 text-lg">
                    Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-5">
                {posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLikeToggle={handleLikeToggle}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <TrendingUsers />
            <ControversialPosts />
          </aside>
        </div>
      </div>
    </main>
  );
}