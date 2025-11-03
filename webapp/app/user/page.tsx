'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Bell,
  Home,
  Store,
  Users,
  Wallet,
  Settings,
  MessageCircle,
  Search,
  Heart,
  Bookmark,
  Star,
  Tag,
  Calendar,
  MapPin,
  Phone,
} from 'lucide-react'

type Post = {
  id: number
  user: string
  avatar: string
  time: string
  caption?: string
  images?: string[]
  place?: string
  likes: number
  comments: number
  saves?: number
  tags?: string[]
}

type Service = {
  id: number
  name: string
  img: string
  rating: number
  price: string
  category: string
  city?: string
}

type UserSuggestion = { id: number; name: string; avatar: string; mutual: number }

export default function Page() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  const stories = [
    { id: 1, name: 'Bạn A', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 2, name: 'Bạn B', avatar: 'https://randomuser.me/api/portraits/men/66.jpg' },
    { id: 3, name: 'Bạn C', avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
    { id: 4, name: 'Bạn D', avatar: 'https://randomuser.me/api/portraits/men/68.jpg' },
    { id: 5, name: 'Bạn E', avatar: 'https://randomuser.me/api/portraits/women/69.jpg' },
    { id: 6, name: 'Bạn F', avatar: 'https://randomuser.me/api/portraits/men/70.jpg' },
  ]

  const posts: Post[] = [
    {
      id: 1,
      user: 'Anna Nguyễn',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '1 giờ trước',
      caption:
        'Nhà hàng mới ở quận 1 — không gian chill, món ăn ngon, nhân viên thân thiện. Mình đặt bàn thử tối qua và cực ưng! 🌿🍣',
      images: ['https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1200&q=80'],
      place: 'Sakura Dine',
      likes: 412,
      comments: 52,
      saves: 33,
      tags: ['#nhahang', '#saigon'],
    },
    {
      id: 2,
      user: 'David Trần',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      time: '3 giờ trước',
      caption: 'Spa thư giãn 120 phút — recommend level 10. Massage vừa, dầu thơm, phòng ấm áp.',
      images: [
        'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1200&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
      ],
      place: 'Zen Garden Spa',
      likes: 289,
      comments: 24,
      saves: 15,
      tags: ['#spa', '#relax'],
    },
    {
      id: 3,
      user: 'Linh Phạm',
      avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      time: 'Hôm qua',
      caption: 'Nha khoa Smile Pro tư vấn cực tận tâm, đã lấy lịch chữa răng sứ. Giá hợp lý hơn mình nghĩ.',
      images: ['https://images.unsplash.com/photo-1588776814546-1c7a9d90f1e9?w=1200&q=80'],
      place: 'Smile Pro Dental',
      likes: 198,
      comments: 9,
      saves: 8,
      tags: ['#nhakhoa', '#smile'],
    },
    {
      id: 4,
      user: 'Group Tour',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      time: '2 ngày trước',
      caption:
        'Trải nghiệm cuối tuần: buffet + nhạc sống tại Riverside. Rất hợp cho nhóm bạn đông, đã dùng voucher giảm 20%.',
      images: [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80',
      ],
      place: 'Riverside Grill',
      likes: 650,
      comments: 101,
      saves: 80,
      tags: ['#buffet', '#nhahang', '#group'],
    },
  ]

  const services: Service[] = [
    {
      id: 1,
      name: 'Nhà hàng Sakura',
      img: 'https://images.unsplash.com/photo-1555992336-03a23cda1e63?w=1200&q=80',
      rating: 4.8,
      price: '500k - 1tr',
      category: 'Nhà hàng',
      city: 'HCM',
    },
    {
      id: 2,
      name: 'Spa Zen Garden',
      img: 'https://images.unsplash.com/photo-1600334129128-7a3b46e92a7f?w=1200&q=80',
      rating: 4.9,
      price: '300k - 800k',
      category: 'Spa',
      city: 'HCM',
    },
    {
      id: 3,
      name: 'Nha khoa Smile Pro',
      img: 'https://images.unsplash.com/photo-1606813902910-3a2a4b9a5a1e?w=1200&q=80',
      rating: 4.7,
      price: 'Tư vấn miễn phí',
      category: 'Nha khoa',
      city: 'HCM',
    },
    {
      id: 4,
      name: 'Chez Moi - Brunch',
      img: 'https://images.unsplash.com/photo-1543966882-40bdb0f28617?w=1200&q=80',
      rating: 4.6,
      price: '200k - 450k',
      category: 'Nhà hàng',
      city: 'HCM',
    },
    {
      id: 5,
      name: 'Glow Beauty Studio',
      img: 'https://images.unsplash.com/photo-1542317854-48a1f0b5a8d3?w=1200&q=80',
      rating: 4.5,
      price: '150k - 700k',
      category: 'Spa',
      city: 'HCM',
    },
    {
      id: 6,
      name: 'DentCare 24/7',
      img: 'https://images.unsplash.com/photo-1531384699906-8d62d0b7f2c7?w=1200&q=80',
      rating: 4.4,
      price: '500k+',
      category: 'Nha khoa',
      city: 'HCM',
    },
  ]

  const suggestions: UserSuggestion[] = [
    { id: 1, name: 'Minh Phạm', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', mutual: 4 },
    { id: 2, name: 'Lan Anh', avatar: 'https://randomuser.me/api/portraits/women/21.jpg', mutual: 8 },
    { id: 3, name: 'Huy Nguyễn', avatar: 'https://randomuser.me/api/portraits/men/25.jpg', mutual: 2 },
  ]

  const trendingTags = ['#nhahang', '#spa', '#deal', '#tichdiem', '#banbe', '#khuyenmai']

  // helpers
  const filterServices = (category?: string) =>
    services.filter((s) => (category ? s.category === category : true))

  const categories = Array.from(new Set(services.map((s) => s.category)))

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      
      {/* MAIN */}
      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 self-start">
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" />
                      <AvatarFallback>AN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Anna Nguyễn</p>
                      <p className="text-xs text-gray-500">Thành viên • 120 điểm</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="text-center py-2 border rounded-lg">
                      <p className="text-sm font-semibold">12</p>
                      <p className="text-xs text-gray-500">Đơn đã đặt</p>
                    </div>
                    <div className="text-center py-2 border rounded-lg">
                      <p className="text-sm font-semibold">120</p>
                      <p className="text-xs text-gray-500">Tích điểm</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                        <Button size="sm" variant="ghost">
                          Kết bạn
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <p className="font-semibold mb-2">Xu hướng</p>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.map((t) => (
                      <button
                        key={t}
                        className="px-3 py-1 text-sm border rounded-full hover:bg-gray-50"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* CENTER FEED */}
          <section className="lg:col-span-6 space-y-5">
            {/* STORIES */}
            <div className="bg-white border rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">Stories</p>
                <div className="text-xs text-gray-500">Xem tất cả</div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {stories.map((s) => (
                  <Story key={s.id} name={s.name} avatar={s.avatar} />
                ))}
                <div className="flex items-center justify-center min-w-[74px]">
                  <button className="w-16 h-16 rounded-full border-dashed border-2 border-gray-300 flex items-center justify-center text-sm">
                    Thêm
                  </button>
                </div>
              </div>
            </div>

            {/* CREATE POST */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/10.jpg" />
                    <AvatarFallback>BN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input placeholder="Hôm nay bạn trải nghiệm gì?" className="mb-3" />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 text-sm text-gray-600">
                        <button className="px-3 py-1 border rounded-md">Ảnh</button>
                        <button className="px-3 py-1 border rounded-md">Dịch vụ</button>
                        <button className="px-3 py-1 border rounded-md">Check-in</button>
                      </div>
                      <Button>Đăng</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FEED POSTS */}
            <div className="space-y-4">
              {posts.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>

            {/* PROMO BANNER */}
            <div className="rounded-lg overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=1200&q=80"
                alt="promo"
                className="w-full h-52 object-cover brightness-[0.75]"
              />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="text-white max-w-lg">
                  <h3 className="text-2xl font-bold">Ưu đãi cuối tuần</h3>
                  <p className="text-sm mt-1">Giảm đến 30% cho nhà hàng & spa — chỉ trong cuối tuần này.</p>
                </div>
                <div>
                  <Button className="bg-black text-white">Khám phá ngay</Button>
                </div>
              </div>
            </div>

            {/* SERVICE CATEGORIES (horizontal rows) */}
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{cat} nổi bật</h3>
                    <div className="text-sm text-gray-500">Xem tất cả</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filterServices(cat).map((s) => (
                      <ServiceCard key={s.id} s={s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* RECENT EXPERIENCES */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Trải nghiệm mới đăng</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {posts.slice(0, 3).map((p) => (
                  <ExperienceCard key={p.id} p={p} />
                ))}
              </div>
            </div>

            {/* CTA - Newsletter */}
            <Card>
              <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">Nhận thông báo khuyến mãi hàng tuần</p>
                  <p className="text-sm text-gray-500">Tin khuyến mãi, voucher, sự kiện đặc biệt.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input
                    placeholder="Email của bạn"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-w-0"
                  />
                  <Button>Đăng ký</Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* RIGHTBAR */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-20 self-start space-y-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold">Gợi ý dịch vụ</p>
                  <p className="text-xs text-gray-500">Dành cho bạn</p>
                </div>
                <div className="space-y-2">
                  {services.slice(0, 3).map((s) => (
                    <div key={s.id} className="flex items-center gap-3">
                      <img src={s.img} className="w-16 h-12 object-cover rounded-md" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-gray-500">
                          ⭐ {s.rating} • {s.price}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost">
                        Đặt
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <p className="font-semibold mb-3">Gợi ý khám phá</p>
                <div className="flex flex-col gap-2 text-sm">
                  <button className="text-left p-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <Tag size={16} /> Ưu đãi theo vùng
                  </button>
                  <button className="text-left p-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <Calendar size={16} /> Sự kiện cuối tuần
                  </button>
                  <button className="text-left p-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <MapPin size={16} /> Địa điểm hot
                  </button>
                  <button className="text-left p-2 rounded-md hover:bg-gray-50 flex items-center gap-2">
                    <Phone size={16} /> Hỗ trợ & Liên hệ
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <p className="font-semibold mb-2">Tải app Socigo</p>
                <p className="text-sm text-gray-500 mb-3">Trải nghiệm nhanh hơn, nhận thông báo ưu đãi.</p>
                <div className="flex gap-2">
                  <button className="flex-1 border rounded-md py-2 text-sm">App Store</button>
                  <button className="flex-1 border rounded-md py-2 text-sm">Google Play</button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        {/* LONG FOOTER */}
        <footer className="border-t border-gray-200 mt-8">
          <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-lg">Socigo</h4>
              <p className="text-sm text-gray-600 mt-2">
                Nền tảng mạng xã hội & marketplace dịch vụ trải nghiệm — đặt bàn, thuê dịch vụ, tích điểm, đánh
                giá.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Sản phẩm</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Trang chủ</li>
                <li>Dịch vụ</li>
                <li>Khuyến mãi</li>
                <li>Đối tác</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Hỗ trợ</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Trung tâm trợ giúp</li>
                <li>Quy định & Điều khoản</li>
                <li>Liên hệ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Liên hệ</h5>
              <p className="text-sm text-gray-600">hello@socigo.app</p>
              <p className="text-sm text-gray-600 mt-2">© {new Date().getFullYear()} Socigo</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

/* ------------------------
   Subcomponents
   ------------------------ */

function NavButton({ label, icon, active }: { label: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-1 rounded-md ${
        active ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-700'
      } text-sm`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function SidebarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 text-sm">
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function Story({ name, avatar }: { name: string; avatar: string }) {
  return (
    <div className="min-w-[74px]">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent hover:border-black transition">
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="text-xs text-center mt-2">{name}</p>
    </div>
  )
}

function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar>
            <AvatarImage src={post.avatar} />
            <AvatarFallback>{post.user[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{post.user}</p>
                <p className="text-xs text-gray-500">{post.time} • {post.place}</p>
              </div>
              <div className="text-sm text-gray-400">...</div>
            </div>
            {post.caption && <p className="mt-3 text-sm">{post.caption}</p>}
            {post.images && post.images.length > 0 && (
              <div className={`mt-3 grid ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-2`}>
                {post.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-full h-40 object-cover rounded-md"
                    alt={`post-${post.id}-${i}`}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 hover:text-black">
                  <Heart size={16} /> <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-black">
                  <Bookmark size={16} /> <span>{post.saves ?? 0}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-black">
                  <Star size={16} /> <span>{post.comments}</span>
                </button>
              </div>
              <div className="text-xs text-gray-500">{post.tags?.slice(0, 3).join(' ')}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <Card className="hover:shadow-md transition">
      <div className="flex gap-3">
        <img src={s.img} alt={s.name} className="w-32 h-24 object-cover rounded-l-md hidden sm:block" />
        <CardContent className="p-3 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-gray-500 mt-1">{s.category} • {s.city}</p>
              <p className="text-xs text-gray-500 mt-2">⭐ {s.rating} • {s.price}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" variant="outline">Chi tiết</Button>
              <Button size="sm">Đặt ngay</Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

function ExperienceCard({ p }: { p: Post }) {
  return (
    <div className="border rounded-md overflow-hidden">
      <img src={p.images?.[0] ?? 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80'} className="w-full h-28 object-cover" />
      <div className="p-3">
        <p className="font-medium text-sm">{p.place}</p>
        <p className="text-xs text-gray-500 mt-1">{p.user} • {p.time}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs text-gray-600">❤️ {p.likes}</span>
          <span className="text-xs text-gray-600">💬 {p.comments}</span>
        </div>
      </div>
    </div>
  )
}
