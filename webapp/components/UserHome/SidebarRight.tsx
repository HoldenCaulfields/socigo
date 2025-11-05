'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tag, Calendar, MapPin, Phone } from 'lucide-react'

export default function SidebarRight({ services }: { services: any[] }) {
  return (
    <aside className="lg:col-span-3 hidden lg:block sticky top-20 self-start space-y-4">
      {/* Gợi ý dịch vụ */}
      <Card>
        <CardContent className="p-3">
          <p className="font-semibold mb-2">Gợi ý dịch vụ</p>
          {services.slice(0, 3).map((s) => (
            <div key={s.id} className="flex items-center gap-3 mb-2">
              <img src={s.img} className="w-16 h-12 object-cover rounded-md" />
              <div className="flex-1">
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">⭐ {s.rating} • {s.price}</p>
              </div>
              <Button size="sm" variant="ghost">Đặt</Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Gợi ý khám phá */}
      <Card>
        <CardContent className="p-3 flex flex-col gap-2 text-sm">
          <p className="font-semibold">Gợi ý khám phá</p>
          <SidebarLink icon={<Tag size={16} />} label="Ưu đãi theo vùng" />
          <SidebarLink icon={<Calendar size={16} />} label="Sự kiện cuối tuần" />
          <SidebarLink icon={<MapPin size={16} />} label="Địa điểm hot" />
          <SidebarLink icon={<Phone size={16} />} label="Hỗ trợ & Liên hệ" />
        </CardContent>
      </Card>
    </aside>
  )
}

function SidebarLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="text-left p-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
      {icon} {label}
    </button>
  )
}
