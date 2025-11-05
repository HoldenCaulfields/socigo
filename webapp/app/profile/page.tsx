// app/profile/page.tsx
// Enhanced Profile page with avatar, edit form, Cloudinary upload, and API integration.
// Requirements (set in your environment):
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
// Server-side: provide an API endpoint to accept profile updates at /api/profile (example included below)

'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Loader2, User, Clock, MessageSquare, Edit2, Check, X } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { data, loading: profileLoading, error, refetchProfile } = useProfile();

  // Local form state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [localAvatarFile, setLocalAvatarFile] = useState<File | null>(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      <div className="flex justify-center items-center h-screen bg-neutral-50 text-neutral-800">
        <Loader2 size={28} className="animate-spin mr-3" />
        <span className="text-lg font-medium">Đang tải hồ sơ của bạn...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-50 text-center px-6">
        <h2 className="text-3xl font-bold text-neutral-900 mb-3">🚫 Bạn chưa đăng nhập</h2>
        <p className="text-neutral-600 mb-6">Đăng nhập để xem thông tin cá nhân và hoạt động của bạn.</p>
        <Link href="/login?modal=true" className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-neutral-800 transition">
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

  const { user: profileUser, bookings, posts } = data || { user: {}, bookings: [], posts: [] };

  async function handleAvatarSelect(e: ChangeEvent<HTMLInputElement>) {
    setErrorMsg(null);
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    // quick client-side validation
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chọn file ảnh.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB.');
      return;
    }
    setLocalAvatarFile(file);
    // preview
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  }

  async function uploadToCloudinary(file: File) {
    // Uses unsigned upload preset configured in Cloudinary dashboard
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !preset) throw new Error('Cloudinary is not configured (NEXT_PUBLIC_CLOUDINARY_*).');

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
        // Upload and replace finalAvatar
        finalAvatar = await uploadToCloudinary(localAvatarFile);
      }

      // Call our backend to update the user profile
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

      // Revalidate profile data from useProfile
      refetchProfile();
      setIsEditing(false);
      setLocalAvatarFile(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoadingSave(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 px-4 md:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-10 border-b border-neutral-200 pb-6">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-neutral-400" />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-1">{profileUser.name}</h1>
              <p className="text-neutral-600">Thành viên từ {new Date(profileUser.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="mt-4 md:mt-0 px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition font-medium flex items-center gap-2">
                <Edit2 size={16} /> Chỉnh sửa Hồ sơ
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={handleSaveProfile} disabled={loadingSave} className="px-4 py-2 rounded-full bg-black text-white font-medium flex items-center gap-2">
                  {loadingSave ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Lưu
                </button>
                <button onClick={() => { setIsEditing(false); setErrorMsg(null); setLocalAvatarFile(null); }} className="px-4 py-2 rounded-full border border-neutral-300 hover:bg-neutral-100 transition flex items-center gap-2">
                  <X size={16} /> Hủy
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md border border-neutral-200 p-6 transition-all hover:shadow-lg hover:border-neutral-300">
  <h2 className="text-xl font-semibold mb-6 flex items-center text-neutral-800">
    <User size={22} className="mr-2 text-primary" /> 
    Thông tin cá nhân
  </h2>

  {/* Edit Form */}
  <div className="space-y-5 text-sm text-neutral-700">
    {/* Avatar */}
    <div>
      <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1">
        Ảnh đại diện
      </label>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-neutral-200 bg-neutral-50 flex items-center justify-center shadow-sm">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <User size={28} className="text-neutral-400" />
          )}
        </div>

        {isEditing && (
          <div className="flex flex-col">
            <input
              onChange={handleAvatarSelect}
              type="file"
              accept="image/*"
              className="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
            />
            <p className="text-xs text-neutral-500 mt-1">
              Kích thước tối đa 5MB (JPG/PNG)
            </p>
          </div>
        )}
      </div>
    </div>

    {/* Name */}
    <div>
      <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1">
        Họ & tên
      </label>
      {isEditing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-neutral-200 px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
        />
      ) : (
        <p className="mt-1 text-neutral-800 font-medium">{profileUser.name}</p>
      )}
    </div>

    {/* Email */}
    <div>
      <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1">
        Email
      </label>
      {isEditing ? (
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-neutral-200 px-3 py-2 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
        />
      ) : (
        <p className="mt-1 text-neutral-800">{profileUser.email}</p>
      )}
    </div>

    {/* Role */}
    <div>
      <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wide mb-1">
        Vai trò
      </label>
      <p className="mt-1 text-neutral-800 font-medium capitalize">
        {profileUser.role}
      </p>
    </div>

    {errorMsg && (
      <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2 border border-red-200 mt-3">
        {errorMsg}
      </p>
    )}
  </div>
</div>


          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center"><Clock size={20} className="mr-2" /> Lịch sử đặt chỗ <span className="ml-2 text-sm font-medium text-neutral-500">({bookings.length})</span></h2>
              {bookings.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-300">
                  {bookings.map((booking: any) => (
                    <div key={booking._id} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition">
                      <p className="font-semibold text-neutral-900">Mã: #{booking._id.slice(-6)}</p>
                      <p className="text-sm text-neutral-700">Dịch vụ: {booking.serviceName || 'N/A'}</p>
                      <p className={`text-sm font-medium ${booking.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>{booking.status === 'completed' ? 'Hoàn tất' : 'Đang xử lý'}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500">Chưa có lịch sử đặt chỗ.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center"><MessageSquare size={20} className="mr-2" /> Bài viết của bạn <span className="ml-2 text-sm font-medium text-neutral-500">({posts.length})</span></h2>
              {posts.length > 0 ? (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-300">
                  {posts.map((post: any) => (
                    <div key={post._id} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition">
                      <p className="text-neutral-900 font-medium line-clamp-2">{post.text}</p>
                      <div className="flex items-center space-x-4 text-sm text-neutral-500 mt-2">
                        <span className="flex items-center"><Clock size={14} className="mr-1" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center"><MessageSquare size={14} className="mr-1" /> {post.likes.length} lượt thích</span>
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
}

/* -------------------------------------------------------------------------- */
/* Example backend handler: pages/api/profile.ts (Next.js API route)          */
/* This is an example — adapt to your authentication and DB.                  */
/* -------------------------------------------------------------------------- */

/*
// pages/api/profile.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@/lib/auth'; // your auth helper
import { db } from '@/lib/db'; // your DB helper

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'PUT') {
    const { name, email, avatar } = req.body;
    try {
      // Find and update user in DB
      const updated = await db.user.update({
        where: { id: session.user.id },
        data: { name, email, avatar },
      });
      return res.status(200).json({ user: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
*/

/* -------------------------------------------------------------------------- */
/* Notes
 - Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in your environment (.env.local)
 - The example uses unsigned Cloudinary uploads (upload preset). If you prefer signed uploads, implement a server endpoint to generate signatures.
 - The backend must validate and persist changes. Protect the API with your auth middleware.
 - The component uses useProfile() and useAuth() from your app — ensure mutate() is supported to revalidate data.
*/
