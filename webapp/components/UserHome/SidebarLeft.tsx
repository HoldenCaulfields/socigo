'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Home, Store, Users, Settings } from 'lucide-react'

interface SidebarLeftProps {
  profileUser: any
  suggestions: { id: number; name: string; avatar: string; mutual: number }[]
  trendingTags: string[]
}

export default function SidebarLeft({ profileUser, suggestions, trendingTags }: SidebarLeftProps) {
  return (
    <aside className="hidden lg:block lg:col-span-3 sticky top-20 self-start space-y-3">
      {/* Profile */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={profileUser.avatarUrl || '/default-avatar.png'} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{profileUser.name}</p>
              <p className="text-xs text-gray-500">{profileUser.role}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="text-center py-2 border rounded-lg">
              <p className="text-sm font-semibold">12</p>
              <p className="text-xs text-gray-500">Đơn đã đặt</p>
            </div>
            <div className="text-center py-2 border rounded-lg">
              <p className="text-sm font-semibold">{profileUser.points ?? 0}</p>
              <p className="text-xs text-gray-500">Tích điểm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu */}
      <Card>
        <CardContent className="p-3">
          <p className="font-semibold mb-3">Menu nhanh</p>
          <div className="flex flex-col gap-2">
            <SidebarButton icon={<Home size={16} />} label="Trang chủ" />
            <SidebarButton icon={<Store size={16} />} label="Dịch vụ của tôi" />
            <SidebarButton icon={<Users size={16} />} label="Bạn bè" />
            <SidebarButton icon={<Settings size={16} />} label="Cài đặt" />
          </div>
        </CardContent>
      </Card>

      {/* Gợi ý kết bạn */}
      <Card>
        <CardContent className="p-3">
          <p className="font-semibold mb-2">Gợi ý kết bạn</p>
          <div className="space-y-2">
            {suggestions.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={s.avatar} />
                    <AvatarFallback>{s.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.mutual} bạn chung</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">Kết bạn</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Xu hướng */}
      <Card>
        <CardContent className="p-3">
          <p className="font-semibold mb-2">Xu hướng</p>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((t) => (
              <button key={t} className="px-3 py-1 text-sm border rounded-full hover:bg-gray-50">
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}

function SidebarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-sm">
      {icon}
      <span>{label}</span>
    </button>
  )
}
