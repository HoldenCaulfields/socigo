// app/profile/page.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Loader2, User, Clock, MessageSquare } from "lucide-react";
import Link from "next/link";

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const { data, loading: profileLoading, error } = useProfile();

  if (authLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral-50 text-neutral-800">
        <Loader2 size={28} className="animate-spin mr-3" />
        <span className="text-lg font-medium">Đang tải hồ sơ của bạn...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-50 text-center px-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-3">
          🚫 Bạn chưa đăng nhập
        </h2>
        <p className="text-neutral-600 mb-6">
          Đăng nhập để xem thông tin cá nhân và hoạt động của bạn.
        </p>
        <Link
          href="/login"
          className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-neutral-800 transition"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-50 text-center px-6">
        <h2 className="text-3xl font-bold text-yellow-700 mb-3">⚠️ Lỗi tải dữ liệu</h2>
        <p className="text-neutral-600">{error}</p>
      </div>
    );
  }

  const { user: profileUser, bookings, posts } = data || {
    user: {},
    bookings: [],
    posts: [],
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 px-4 md:px-10 py-24">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-10 border-b border-neutral-200 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              {profileUser.name}
            </h1>
            <p className="text-neutral-600">
              Thành viên từ {new Date(profileUser.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-5 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition font-medium">
            Chỉnh sửa Hồ sơ
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User size={20} className="mr-2" /> Thông tin cá nhân
            </h2>
            <div className="space-y-3 text-sm text-neutral-700">
              <p>
                <span className="font-semibold text-neutral-900">Email:</span>{" "}
                {profileUser.email}
              </p>
              <p>
                <span className="font-semibold text-neutral-900">Vai trò:</span>{" "}
                <span className="capitalize">{profileUser.role}</span>
              </p>
              <p>
                <span className="font-semibold text-neutral-900">
                  Ngày tham gia:
                </span>{" "}
                {new Date(profileUser.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking History */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock size={20} className="mr-2" /> Lịch sử đặt chỗ
                <span className="ml-2 text-sm font-medium text-neutral-500">
                  ({bookings.length})
                </span>
              </h2>
              {bookings.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-300">
                  {bookings.map((booking: any) => (
                    <div
                      key={booking._id}
                      className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition"
                    >
                      <p className="font-semibold text-neutral-900">
                        Mã: #{booking._id.slice(-6)}
                      </p>
                      <p className="text-sm text-neutral-700">
                        Dịch vụ: {booking.serviceName || "N/A"}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          booking.status === "completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {booking.status === "completed"
                          ? "Hoàn tất"
                          : "Đang xử lý"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500">Chưa có lịch sử đặt chỗ.</p>
              )}
            </div>

            {/* User Posts */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MessageSquare size={20} className="mr-2" /> Bài viết của bạn
                <span className="ml-2 text-sm font-medium text-neutral-500">
                  ({posts.length})
                </span>
              </h2>
              {posts.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-300">
                  {posts.map((post: any) => (
                    <div
                      key={post._id}
                      className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition"
                    >
                      <p className="text-neutral-900 font-medium line-clamp-2">
                        {post.text}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500 mt-2">
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare size={14} className="mr-1" />{" "}
                          {post.likes.length} lượt thích
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500">Bạn chưa đăng bài viết nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
