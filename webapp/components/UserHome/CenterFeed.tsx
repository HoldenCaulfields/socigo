'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Heart, Bookmark, Star } from 'lucide-react'

export default function FeedCenter({ posts, stories, services, categories, bookings }: any) {
  const [query, setQuery] = useState('')

  return (
    <section className="lg:col-span-6 space-y-5">
      {/* Stories */}
      <div className="bg-white border rounded-lg p-3">
        <p className="font-semibold mb-3">Stories</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {stories.map((s: any) => (
            <div key={s.id} className="min-w-[74px]">
              <img src={s.avatar} alt={s.name} className="w-16 h-16 rounded-full object-cover border" />
              <p className="text-xs text-center mt-2">{s.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Create post */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar><AvatarImage src="/default-avatar.png" /></Avatar>
            <div className="flex-1">
              <Input placeholder="Hôm nay bạn trải nghiệm gì?" className="mb-3" />
              <div className="flex justify-between items-center">
                <div className="flex gap-2 text-sm text-gray-600">
                  <button className="px-3 py-1 border rounded-md">Ảnh</button>
                  <button className="px-3 py-1 border rounded-md">Dịch vụ</button>
                </div>
                <Button>Đăng</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((p: any) => <PostCard key={p.id} post={p} />)}
      </div>

      {/* CTA */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div>
            <p className="font-semibold">Nhận thông báo khuyến mãi</p>
            <p className="text-sm text-gray-500">Tin khuyến mãi & voucher mới mỗi tuần.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input placeholder="Email của bạn" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button>Đăng ký</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function PostCard({ post }: any) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar><AvatarImage src={post.avatar} /></Avatar>
          <div className="flex-1">
            <p className="font-semibold">{post.user}</p>
            <p className="text-xs text-gray-500">{post.time} • {post.place}</p>
            <p className="mt-2 text-sm">{post.caption}</p>
            {post.images?.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {post.images.map((img: string, i: number) => (
                  <img key={i} src={img} className="w-full h-40 object-cover rounded-md" />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
              <div className="flex gap-4">
                <Heart size={16} /> {post.likes}
                <Bookmark size={16} /> {post.saves}
                <Star size={16} /> {post.comments}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
