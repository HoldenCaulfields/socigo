'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { 
  Loader2, User, Clock, MessageSquare, Edit2, Check, X, 
  Heart, TrendingUp, Award, Calendar, MapPin, ExternalLink,
  Settings, Camera, BarChart3, Users, Star, Bookmark
} from 'lucide-react';
import Link from 'next/link';

// Stats Card Component
const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
        <p className="text-3xl font-bold text-black">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

// Activity Item Component
const ActivityItem = ({ icon: Icon, text, time, color }: any) => (
  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all group">
    <div className={`p-2 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
      <Icon size={18} className="text-white" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-900">{text}</p>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

// Badge Component
const Badge = ({ icon: Icon, label }: any) => (
  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all cursor-pointer">
    <Icon size={16} className="text-gray-700" />
    <span className="text-sm font-medium text-gray-700">{label}</span>
  </div>
);

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { data, loading: profileLoading, error, refetchProfile } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [localAvatarFile, setLocalAvatarFile] = useState<File | null>(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const [bio, setBio] = useState('Yêu thích khám phá những trải nghiệm mới và chia sẻ câu chuyện của mình');
  const [location, setLocation] = useState('Hà Nội, Việt Nam');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (data && data.user) {
      setName(data.user.name || '');
      setEmail(data.user.email || '');
      setRole(data.user.role || 'user');
      setAvatarUrl(data.user.avatarUrl || null);
    }
  }, [data]);

  if (authLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 size={32} className="animate-spin text-black" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6">
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-200 max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold text-black mb-3">Chưa đăng nhập</h2>
          <p className="text-gray-600 mb-6">Đăng nhập để xem và quản lý hồ sơ của bạn</p>
          <Link 
            href="/login?modal=true" 
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-red-200 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-3">Lỗi tải dữ liệu</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const { user: profileUser, bookings, posts } = data || { user: {}, bookings: [], posts: [] };

  async function handleAvatarSelect(e: ChangeEvent<HTMLInputElement>) {
    setErrorMsg(null);
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chọn file ảnh.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB.');
      return;
    }
    setLocalAvatarFile(file);
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  }

  async function uploadToCloudinary(file: File) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) throw new Error('Cloudinary is not configured.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error('Upload thất bại: ' + text);
    }

    const json = await res.json();
    return json.secure_url as string;
  }

  async function handleSaveProfile() {
    setErrorMsg(null);
    setLoadingSave(true);

    try {
      let finalAvatar = profileUser.avatarUrl || null;
      if (localAvatarFile) {
        finalAvatar = await uploadToCloudinary(localAvatarFile);
      }

      if (!user || !user.token) {
        setErrorMsg('Bạn cần đăng nhập để cập nhật hồ sơ.');
        return;
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, email, avatarUrl: finalAvatar }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || 'Cập nhật thất bại');
      }

      refetchProfile();
      setIsEditing(false);
      setLocalAvatarFile(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoadingSave(false);
    }
  }

  // Mock stats
  const stats = {
    posts: posts.length,
    bookings: bookings.length,
    likes: posts.reduce((sum: number, p: any) => sum + p.likes.length, 0),
    followers: 248
  };

  // Mock activities
  const recentActivities = [
    { icon: Heart, text: 'Đã thích bài viết "Review Cafe Hà Nội"', time: '2 giờ trước', color: 'bg-red-500' },
    { icon: MessageSquare, text: 'Đã đăng bài viết mới', time: '5 giờ trước', color: 'bg-blue-500' },
    { icon: Calendar, text: 'Đã đặt dịch vụ Spa & Massage', time: '1 ngày trước', color: 'bg-green-500' },
    { icon: Star, text: 'Đã đánh giá 5 sao cho dịch vụ', time: '2 ngày trước', color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Cover Photo */}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {isEditing && (
          <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition-all">
            <Camera size={18} /> Đổi ảnh bìa
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div className="max-w-7xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black">
                    <User size={48} className="text-white" />
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-all">
                  <Camera size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-3xl font-bold mb-2 border-b-2 border-gray-300 focus:border-black outline-none w-full"
                />
              ) : (
                <h1 className="text-3xl font-bold text-black mb-2">{profileUser.name}</h1>
              )}
              
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="text-gray-600 mb-3 w-full border rounded-lg p-2 focus:border-black outline-none"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600 mb-3">{bio}</p>
              )}

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {isEditing ? (
                  <>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Địa điểm"
                      className="flex items-center gap-2 text-sm text-gray-600 border rounded-lg px-3 py-1"
                    />
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Website"
                      className="flex items-center gap-2 text-sm text-gray-600 border rounded-lg px-3 py-1"
                    />
                  </>
                ) : (
                  <>
                    <Badge icon={MapPin} label={location} />
                    <Badge icon={Calendar} label={`Tham gia ${new Date(profileUser.createdAt).toLocaleDateString('vi-VN')}`} />
                    {website && <Badge icon={ExternalLink} label={website} />}
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 bg-black text-white rounded-lg font-medium flex items-center gap-2 hover:bg-gray-800 transition-all"
                  >
                    <Edit2 size={18} /> Chỉnh sửa
                  </button>
                  <button className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all">
                    <Settings size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleSaveProfile}
                    disabled={loadingSave}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-green-700 transition-all disabled:opacity-50"
                  >
                    {loadingSave ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                    Lưu
                  </button>
                  <button 
                    onClick={() => { setIsEditing(false); setErrorMsg(null); setLocalAvatarFile(null); }}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                  >
                    <X size={18} /> Hủy
                  </button>
                </>
              )}
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errorMsg}</p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard icon={MessageSquare} label="Bài viết" value={stats.posts} color="bg-blue-500" />
          <StatCard icon={Calendar} label="Đặt chỗ" value={stats.bookings} color="bg-green-500" />
          <StatCard icon={Heart} label="Lượt thích" value={stats.likes} color="bg-red-500" />
          <StatCard icon={Users} label="Người theo dõi" value={stats.followers} color="bg-purple-500" />
        </div>

        {/* Tabs */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
              { id: 'posts', label: 'Bài viết', icon: MessageSquare },
              { id: 'bookings', label: 'Lịch sử', icon: Clock },
              { id: 'activity', label: 'Hoạt động', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                      <TrendingUp size={22} />
                      Hoạt động gần đây
                    </h3>
                    <div className="space-y-2">
                      {recentActivities.map((activity, idx) => (
                        <ActivityItem key={idx} {...activity} />
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h3 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                      <Award size={22} />
                      Thành tích
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Star, label: 'Người đánh giá xuất sắc', color: 'bg-yellow-500' },
                        { icon: MessageSquare, label: 'Tác giả tích cực', color: 'bg-blue-500' },
                        { icon: Heart, label: 'Người được yêu thích', color: 'bg-red-500' }
                      ].map((achievement, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-all">
                          <div className={`${achievement.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                            <achievement.icon size={24} className="text-white" />
                          </div>
                          <p className="text-xs font-medium text-gray-700">{achievement.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <h4 className="font-bold text-black mb-4">Thông tin chi tiết</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-medium text-black">{profileUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vai trò</span>
                        <span className="font-medium text-black capitalize">{profileUser.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Trạng thái</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Hoạt động</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-black to-gray-800 rounded-xl p-5 text-white">
                    <h4 className="font-bold mb-2">Nâng cấp Premium</h4>
                    <p className="text-sm text-gray-300 mb-4">Mở khóa tính năng cao cấp và nhận ưu đãi đặc biệt</p>
                    <button className="w-full bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all">
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post: any) => (
                    <div key={post._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                      <p className="text-gray-900 font-medium mb-3 leading-relaxed">{post.text}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {post.likes.length} lượt thích
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Chưa có bài viết nào</p>
                  </div>
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <div key={booking._id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-black">#{booking._id.slice(-6)}</p>
                          <p className="text-sm text-gray-600 mt-1">{booking.serviceName || 'N/A'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status === 'completed' ? 'Hoàn tất' : 'Đang xử lý'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Chưa có lịch sử đặt chỗ</p>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-2">
                {recentActivities.map((activity, idx) => (
                  <ActivityItem key={idx} {...activity} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
}