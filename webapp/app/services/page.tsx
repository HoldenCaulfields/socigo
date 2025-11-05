'use client'

import React, { useEffect, useState } from 'react'
import { useServices } from '@/hooks/useServices'
import ServiceCard from '@/components/Services/ServiceCard'
import { ServiceData } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Search, SlidersHorizontal, Star, MapPin, Flame } from 'lucide-react'

export default function ServicesListPage() {
  const { loading, error, fetchServices } = useServices()
  const [services, setServices] = useState<ServiceData[]>([])
  const [filters, setFilters] = useState({ search: '', type: '', city: '' })
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const loadServices = async (pageNum: number, f = filters) => {
    const result = await fetchServices({
      page: pageNum,
      search: f.search,
      type: f.type,
      city: f.city,
    })
    setServices(result.services)
    setTotalPages(result.totalPages)
    setPage(pageNum)
  }

  useEffect(() => {
    loadServices(1, filters)
  }, [filters])

  const handleFilterChange = (name: keyof typeof filters, value: string) =>
    setFilters((prev) => ({ ...prev, [name]: value }))

  const topServices = services.slice(0, 5)
  const popularServices = services.slice(5, 10)
  const nearBy = services.slice(10, 15)
  const categories = [
    {
      name: 'Ẩm thực',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Spa & Làm đẹp',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Nhà Hàng',
      image: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=889',
    },
    {
      name: 'Khách sạn',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
    },
    {
      name: 'Nha Khoa',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=868',
    },
  ]


  return (
    <section className="max-w-6xl mx-auto py-12 px-4 space-y-12 text-gray-900">

      {/* 🌟 Categories Section */}
      <div className="bg-white border rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-700" />
            Khám phá theo danh mục
          </h2>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black">
            Tất cả
          </Button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group relative min-w-[90px] flex flex-col items-center text-center cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
              </div>
              <p className="text-xs mt-2 text-gray-700 group-hover:text-black font-medium transition-colors">
                {cat.name}
              </p>
            </div>
          ))}
        </div>

        {/* Filter Section */}
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex w-full sm:flex-1 items-center gap-2 border rounded-md px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <Input
              placeholder="Tìm kiếm dịch vụ..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="border-0 focus:ring-0 focus:outline-none"
            />
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="border rounded-md px-3 py-2 text-sm text-gray-700"
            >
              <option value="">Tất cả loại hình</option>
              <option value="restaurant">Nhà hàng</option>
              <option value="hotel">Khách sạn</option>
              <option value="spa">Spa</option>
              <option value="clinic">Phòng khám</option>
              <option value="other">Khác</option>
            </select>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="border rounded-md px-3 py-2 text-sm text-gray-700"
            >
              <option value="">Tất cả thành phố</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
            </select>
          </div>
          <Button variant="secondary" className="flex items-center gap-2 text-gray-700 border-gray-300">
            <SlidersHorizontal size={16} /> Bộ lọc
          </Button>
        </CardContent>
      </div>

      {/* Sections */}
      <Section title="🔥 Dịch vụ đang nổi bật" icon={<Flame className="text-gray-800 w-5 h-5" />}>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {topServices.map((s) => (
            <div key={s._id} className="min-w-[220px]">
              <ServiceCard service={s} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="⭐ Dịch vụ được yêu thích nhất" icon={<Star className="text-gray-800 w-5 h-5" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularServices.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      </Section>

      <Section title="📍 Dịch vụ gần bạn" icon={<MapPin className="text-gray-800 w-5 h-5" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nearBy.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      </Section>

      {/* Main Feed */}
      <div className="space-y-5">
        <h2 className="font-semibold text-lg">Tất cả dịch vụ</h2>
        {loading && services.length === 0 ? (
          <Card className="border-gray-200">
            <CardContent className="flex justify-center items-center p-16 text-gray-500">
              <Loader2 size={28} className="animate-spin mr-3" />
              Đang tải danh sách dịch vụ...
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-800">
          <div>
            <p className="font-semibold text-lg">📩 Nhận thông báo dịch vụ mới</p>
            <p className="text-sm text-gray-500">
              Đừng bỏ lỡ khuyến mãi và trải nghiệm mới mỗi tuần.
            </p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Input placeholder="Email của bạn" className="border-gray-300" />
            <Button className="bg-black text-white hover:bg-gray-800">Đăng ký</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

// Component section wrapper
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            {icon} {title}
          </h2>
          <Button variant="link" className="text-sm text-gray-500">Xem thêm</Button>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
