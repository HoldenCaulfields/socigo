'use client'


import { UserAuthData } from "@/types";
import { useProfile } from '@/hooks/useProfile';
import SidebarLeft from './SidebarLeft'
import FeedCenter from './CenterFeed'
import SidebarRight from './SidebarRight'


interface UserHomeProps {
  user: UserAuthData;
}

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

export default function Page({ user }: UserHomeProps) {
  const { data, loading, error } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return null;

/*   const posts = data.posts || []; */
  const bookings = data.bookings || [];


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

  const categories = Array.from(new Set(services.map((s) => s.category)))

  return (
    <main className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <SidebarLeft profileUser={data.user} suggestions={suggestions} trendingTags={trendingTags} />
      <FeedCenter posts={posts} stories={stories} services={services} categories={categories} bookings={bookings} />
      <SidebarRight services={services} />
    </main>
  )
}
