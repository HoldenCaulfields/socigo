"use client";

import { useState } from "react";
import { Menu, Home, FileText, PlusCircle, BarChart3, Settings, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAuthData } from "@/types";

interface PartnerHomeProps {
  user: UserAuthData;
}

export default function DoanhNghiepPage({ user }: PartnerHomeProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const posts = [
    {
      id: 1,
      title: "Nhà hàng Biển Xanh",
      desc: "Không gian sang trọng, hải sản tươi sống, view biển tuyệt đẹp.",
      img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Spa Serenity",
      desc: "Liệu trình thư giãn chuyên sâu, giúp tái tạo năng lượng sau ngày dài.",
      img: "https://images.unsplash.com/photo-1600508774630-3d27b95b3a5b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Khách sạn SkyView",
      desc: "Trải nghiệm lưu trú đẳng cấp 4 sao, trung tâm thành phố.",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Nha khoa Ánh Dương",
      desc: "Chăm sóc nụ cười tự tin với đội ngũ nha sĩ tận tâm.",
      img: "https://images.unsplash.com/photo-1606813902917-8c3b66e44382?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Thuê xe GoDrive",
      desc: "Dịch vụ thuê xe tự lái uy tín, giao xe tận nơi nhanh chóng.",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Yoga Bloom Studio",
      desc: "Khóa học yoga chuyên sâu, môi trường ấm cúng và yên bình.",
      img: "https://images.unsplash.com/photo-1599447421416-3414500d18d2?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-white border-r border-gray-200 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h1 className="text-xl font-bold">Socigo Doanh Nghiep</h1>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </Button>
        </div>

        <nav className="mt-4 space-y-1 px-2">
          <SidebarItem icon={<Home size={18} />} text="Dashboard" active />
          <SidebarItem icon={<FileText size={18} />} text="Bài đăng" />
          <SidebarItem icon={<PlusCircle size={18} />} text="Thêm dịch vụ" />
          <SidebarItem icon={<BarChart3 size={18} />} text="Thống kê" />
          <SidebarItem icon={<Settings size={18} />} text="Cài đặt" />
        </nav>

        <div className="absolute bottom-4 w-full px-4">
          <Button variant="ghost" className="w-full justify-start gap-2 text-gray-500 hover:text-black">
            <LogOut size={18} /> Đăng xuất
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Xin chào, The Spa House 👋</h2>
            <p className="text-gray-500">Quản lý dịch vụ và bài đăng của bạn tại đây.</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={22} />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard label="Lượt xem" value="12.3K" />
          <StatCard label="Booking" value="845" />
          <StatCard label="Đánh giá" value="4.8★" />
          <StatCard label="Bài đăng" value={posts.length.toString()} />
        </div>

        {/* Posts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow">
              <img src={post.img} alt={post.title} className="w-full h-40 object-cover" />
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{post.desc}</p>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit size={16} /> Chỉnh sửa
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating Action Button */}
        <button
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          title="Tạo bài đăng mới"
        >
          <PlusCircle size={24} />
        </button>
      </main>
    </div>
  );
}

function SidebarItem({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition ${
        active ? "bg-gray-100 font-semibold text-black" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      {text}
    </button>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="text-center shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-500 font-medium">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
